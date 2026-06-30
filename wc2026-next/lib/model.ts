/*
 * World Cup 2026 prediction model.
 *
 * Self-contained TypeScript port of the methodology from
 * chrispathway/world-cup-prediction-py:
 *   Elo strength rating -> expected goals -> Poisson match sampling
 *   -> Monte Carlo simulation of the full 48-team / 12-group tournament.
 *
 * The original computes Elo from ~49,000 historical matches downloaded at
 * runtime; here the ratings are approximate early-2026 seeds (edit freely).
 * The model math (formulas + constants) matches the source exactly.
 */

export interface Team {
  name: string;
  flag: string;
  group: string;
  elo: number;
}

export const TEAMS: Team[] = [
  { name: "Mexico", flag: "🇲🇽", group: "A", elo: 1880 },
  { name: "South Africa", flag: "🇿🇦", group: "A", elo: 1700 },
  { name: "South Korea", flag: "🇰🇷", group: "A", elo: 1790 },
  { name: "Czech Republic", flag: "🇨🇿", group: "A", elo: 1790 },
  { name: "Canada", flag: "🇨🇦", group: "B", elo: 1780 },
  { name: "Bosnia & Herz.", flag: "🇧🇦", group: "B", elo: 1720 },
  { name: "Qatar", flag: "🇶🇦", group: "B", elo: 1680 },
  { name: "Switzerland", flag: "🇨🇭", group: "B", elo: 1860 },
  { name: "Brazil", flag: "🇧🇷", group: "C", elo: 2030 },
  { name: "Morocco", flag: "🇲🇦", group: "C", elo: 1840 },
  { name: "Haiti", flag: "🇭🇹", group: "C", elo: 1500 },
  { name: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", elo: 1780 },
  { name: "USA", flag: "🇺🇸", group: "D", elo: 1820 },
  { name: "Paraguay", flag: "🇵🇾", group: "D", elo: 1760 },
  { name: "Australia", flag: "🇦🇺", group: "D", elo: 1740 },
  { name: "Turkey", flag: "🇹🇷", group: "D", elo: 1820 },
  { name: "Germany", flag: "🇩🇪", group: "E", elo: 1930 },
  { name: "Curaçao", flag: "🇨🇼", group: "E", elo: 1500 },
  { name: "Ivory Coast", flag: "🇨🇮", group: "E", elo: 1770 },
  { name: "Ecuador", flag: "🇪🇨", group: "E", elo: 1820 },
  { name: "Netherlands", flag: "🇳🇱", group: "F", elo: 1990 },
  { name: "Japan", flag: "🇯🇵", group: "F", elo: 1850 },
  { name: "Sweden", flag: "🇸🇪", group: "F", elo: 1790 },
  { name: "Tunisia", flag: "🇹🇳", group: "F", elo: 1690 },
  { name: "Belgium", flag: "🇧🇪", group: "G", elo: 1930 },
  { name: "Egypt", flag: "🇪🇬", group: "G", elo: 1740 },
  { name: "Iran", flag: "🇮🇷", group: "G", elo: 1800 },
  { name: "New Zealand", flag: "🇳🇿", group: "G", elo: 1600 },
  { name: "Spain", flag: "🇪🇸", group: "H", elo: 2080 },
  { name: "Cape Verde", flag: "🇨🇻", group: "H", elo: 1600 },
  { name: "Saudi Arabia", flag: "🇸🇦", group: "H", elo: 1670 },
  { name: "Uruguay", flag: "🇺🇾", group: "H", elo: 1900 },
  { name: "France", flag: "🇫🇷", group: "I", elo: 2080 },
  { name: "Senegal", flag: "🇸🇳", group: "I", elo: 1830 },
  { name: "Iraq", flag: "🇮🇶", group: "I", elo: 1660 },
  { name: "Norway", flag: "🇳🇴", group: "I", elo: 1820 },
  { name: "Argentina", flag: "🇦🇷", group: "J", elo: 2140 },
  { name: "Algeria", flag: "🇩🇿", group: "J", elo: 1780 },
  { name: "Austria", flag: "🇦🇹", group: "J", elo: 1810 },
  { name: "Jordan", flag: "🇯🇴", group: "J", elo: 1620 },
  { name: "Portugal", flag: "🇵🇹", group: "K", elo: 1990 },
  { name: "DR Congo", flag: "🇨🇩", group: "K", elo: 1720 },
  { name: "Uzbekistan", flag: "🇺🇿", group: "K", elo: 1700 },
  { name: "Colombia", flag: "🇨🇴", group: "K", elo: 1880 },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L", elo: 2010 },
  { name: "Croatia", flag: "🇭🇷", group: "L", elo: 1870 },
  { name: "Ghana", flag: "🇬🇭", group: "L", elo: 1720 },
  { name: "Panama", flag: "🇵🇦", group: "L", elo: 1640 },
];

export const GROUP_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

// Expected goals for each side from the Elo difference.
export function expectedGoals(eloA: number, eloB: number): [number, number] {
  const diff = (eloA - eloB) / 400;
  const mult = Math.pow(10, diff);
  const ratio = Math.min(Math.max(Math.sqrt(mult), 0.33), 3);
  const xgA = (2.5 * ratio) / (1 + ratio);
  return [xgA, 2.5 - xgA];
}

// Knuth's algorithm for a Poisson-distributed integer.
export function poissonSample(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

function poissonPmf(k: number, lambda: number): number {
  let lp = -lambda + k * Math.log(lambda);
  for (let i = 2; i <= k; i++) lp -= Math.log(i);
  return Math.exp(lp);
}

function sampleMatch(eloA: number, eloB: number): [number, number] {
  const xg = expectedGoals(eloA, eloB);
  return [poissonSample(xg[0]), poissonSample(xg[1])];
}

function knockoutWinnerA(a: Team, b: Team): boolean {
  const g = sampleMatch(a.elo, b.elo);
  if (g[0] > g[1]) return true;
  if (g[1] > g[0]) return false;
  const pen = Math.min(0.6, 0.5 + (a.elo - b.elo) / 2000);
  return Math.random() < pen;
}

export interface H2H {
  xgA: number;
  xgB: number;
  winA: number;
  draw: number;
  winB: number;
}

export function headToHead(a: Team, b: Team): H2H {
  const xg = expectedGoals(a.elo, b.elo);
  const MAX = 12;
  let pA = 0,
    pD = 0,
    pB = 0;
  for (let i = 0; i <= MAX; i++) {
    const pi = poissonPmf(i, xg[0]);
    for (let j = 0; j <= MAX; j++) {
      const pj = poissonPmf(j, xg[1]);
      const pr = pi * pj;
      if (i > j) pA += pr;
      else if (i < j) pB += pr;
      else pD += pr;
    }
  }
  return { xgA: xg[0], xgB: xg[1], winA: pA, draw: pD, winB: pB };
}

interface Standing {
  team: Team;
  pts: number;
  gf: number;
  ga: number;
}

function compareStandings(x: Standing, y: Standing): number {
  if (y.pts !== x.pts) return y.pts - x.pts;
  const xgd = x.gf - x.ga;
  const ygd = y.gf - y.ga;
  if (ygd !== xgd) return ygd - xgd;
  if (y.gf !== x.gf) return y.gf - x.gf;
  return y.team.elo - x.team.elo;
}

export type Stage =
  | "groups"
  | "round32"
  | "round16"
  | "quarterfinal"
  | "semifinal"
  | "final"
  | "champion";

// One full tournament: group stage -> top 2 + 8 best thirds -> 32-team knockout.
export function simulateTournament(): Record<string, Stage> {
  const stage: Record<string, Stage> = {};
  const set = (t: Team, c: Stage) => {
    stage[t.name] = c;
  };

  const groups: Record<string, Standing[]> = {};
  for (const g of GROUP_NAMES) groups[g] = [];
  for (const tm of TEAMS) groups[tm.group].push({ team: tm, pts: 0, gf: 0, ga: 0 });

  const winners: Standing[] = [];
  const runners: Standing[] = [];
  const thirds: Standing[] = [];

  for (const g of GROUP_NAMES) {
    const tb = groups[g];
    for (let a = 0; a < tb.length; a++) {
      for (let b = a + 1; b < tb.length; b++) {
        const r = sampleMatch(tb[a].team.elo, tb[b].team.elo);
        tb[a].gf += r[0];
        tb[a].ga += r[1];
        tb[b].gf += r[1];
        tb[b].ga += r[0];
        if (r[0] > r[1]) tb[a].pts += 3;
        else if (r[1] > r[0]) tb[b].pts += 3;
        else {
          tb[a].pts += 1;
          tb[b].pts += 1;
        }
      }
    }
    tb.sort(compareStandings);
    set(tb[0].team, "groups");
    set(tb[1].team, "groups");
    set(tb[2].team, "groups");
    set(tb[3].team, "groups");
    winners.push(tb[0]);
    runners.push(tb[1]);
    thirds.push(tb[2]);
  }

  thirds.sort(compareStandings);
  const best = thirds.slice(0, 8);

  const field: Team[] = [
    ...winners.map((s) => s.team),
    ...runners.map((s) => s.team),
    ...best.map((s) => s.team),
  ];
  field.sort((x, y) => y.elo - x.elo);

  let round: [Team, Team][] = [];
  const n = field.length;
  for (let s = 0; s < n / 2; s++) round.push([field[s], field[n - 1 - s]]);
  for (const t of field) set(t, "round32");

  const order: Stage[] = ["round16", "quarterfinal", "semifinal", "final", "champion"];
  let idx = 0;
  while (round.length > 1) {
    const next: Team[] = [];
    const code = order[idx];
    for (const [a, b] of round) {
      const winner = knockoutWinnerA(a, b) ? a : b;
      set(winner, code);
      next.push(winner);
    }
    const paired: [Team, Team][] = [];
    for (let p = 0; p < next.length; p += 2) paired.push([next[p], next[p + 1]]);
    round = paired;
    idx++;
  }
  if (round.length === 1) {
    const [a, b] = round[0];
    set(a, "final");
    set(b, "final");
    set(knockoutWinnerA(a, b) ? a : b, "champion");
  }
  return stage;
}

const STAGE_RANK: Record<Stage, number> = {
  groups: 0,
  round32: 1,
  round16: 2,
  quarterfinal: 3,
  semifinal: 4,
  final: 5,
  champion: 6,
};

export interface SimRow {
  name: string;
  flag: string;
  group: string;
  elo: number;
  champion: number;
  finalist: number;
  semifinal: number;
  quarterfinal: number;
}

// Aggregate a batch of simulations into running counters.
export function tallySimulations(
  count: number,
  counters: {
    champ: Record<string, number>;
    fin: Record<string, number>;
    semi: Record<string, number>;
    quart: Record<string, number>;
  }
): void {
  for (let s = 0; s < count; s++) {
    const st = simulateTournament();
    for (const name in st) {
      const rk = STAGE_RANK[st[name]];
      if (rk >= 6) counters.champ[name]++;
      if (rk >= 5) counters.fin[name]++;
      if (rk >= 4) counters.semi[name]++;
      if (rk >= 3) counters.quart[name]++;
    }
  }
}

export function emptyCounters() {
  const champ: Record<string, number> = {};
  const fin: Record<string, number> = {};
  const semi: Record<string, number> = {};
  const quart: Record<string, number> = {};
  for (const t of TEAMS) {
    champ[t.name] = 0;
    fin[t.name] = 0;
    semi[t.name] = 0;
    quart[t.name] = 0;
  }
  return { champ, fin, semi, quart };
}

export function buildRows(
  counters: ReturnType<typeof emptyCounters>,
  numSims: number
): SimRow[] {
  const rows = TEAMS.map((t) => ({
    name: t.name,
    flag: t.flag,
    group: t.group,
    elo: t.elo,
    champion: counters.champ[t.name] / numSims,
    finalist: counters.fin[t.name] / numSims,
    semifinal: counters.semi[t.name] / numSims,
    quarterfinal: counters.quart[t.name] / numSims,
  }));
  rows.sort((a, b) => b.champion - a.champion);
  return rows;
}
