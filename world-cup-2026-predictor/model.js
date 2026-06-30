/*
 * World Cup 2026 prediction model.
 *
 * This is a self-contained JavaScript port of the statistical methodology used
 * by chrispathway/world-cup-prediction-py:
 *
 *   - Each team has an Elo strength rating.
 *   - Expected goals for a match are derived from the Elo difference.
 *   - Match goals are sampled from independent Poisson distributions.
 *   - The full 48-team / 12-group tournament is run with Monte Carlo simulation.
 *
 * The original tool computes Elo ratings from ~49,000 historical international
 * matches it downloads at runtime. A browser can't do that, so the ratings
 * below are approximate World-Football-Elo style seeds (early 2026). The model
 * math (formulas + constants) matches the source project exactly.
 *
 * This file uses no DOM APIs, so it is loaded both on the main thread
 * (for head-to-head) and inside the Web Worker (for the Monte Carlo run).
 */

// ---------------------------------------------------------------------------
// Teams: name, flag emoji, group (A-L), and approximate Elo rating.
// ---------------------------------------------------------------------------
var TEAMS = [
  // Group A
  { name: "Mexico",             flag: "🇲🇽", group: "A", elo: 1880 },
  { name: "South Africa",       flag: "🇿🇦", group: "A", elo: 1700 },
  { name: "South Korea",        flag: "🇰🇷", group: "A", elo: 1790 },
  { name: "Czech Republic",     flag: "🇨🇿", group: "A", elo: 1790 },
  // Group B
  { name: "Canada",             flag: "🇨🇦", group: "B", elo: 1780 },
  { name: "Bosnia & Herz.",     flag: "🇧🇦", group: "B", elo: 1720 },
  { name: "Qatar",              flag: "🇶🇦", group: "B", elo: 1680 },
  { name: "Switzerland",        flag: "🇨🇭", group: "B", elo: 1860 },
  // Group C
  { name: "Brazil",             flag: "🇧🇷", group: "C", elo: 2030 },
  { name: "Morocco",            flag: "🇲🇦", group: "C", elo: 1840 },
  { name: "Haiti",              flag: "🇭🇹", group: "C", elo: 1500 },
  { name: "Scotland",           flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", elo: 1780 },
  // Group D
  { name: "USA",                flag: "🇺🇸", group: "D", elo: 1820 },
  { name: "Paraguay",           flag: "🇵🇾", group: "D", elo: 1760 },
  { name: "Australia",          flag: "🇦🇺", group: "D", elo: 1740 },
  { name: "Turkey",             flag: "🇹🇷", group: "D", elo: 1820 },
  // Group E
  { name: "Germany",            flag: "🇩🇪", group: "E", elo: 1930 },
  { name: "Curaçao",       flag: "🇨🇼", group: "E", elo: 1500 },
  { name: "Ivory Coast",        flag: "🇨🇮", group: "E", elo: 1770 },
  { name: "Ecuador",            flag: "🇪🇨", group: "E", elo: 1820 },
  // Group F
  { name: "Netherlands",        flag: "🇳🇱", group: "F", elo: 1990 },
  { name: "Japan",              flag: "🇯🇵", group: "F", elo: 1850 },
  { name: "Sweden",             flag: "🇸🇪", group: "F", elo: 1790 },
  { name: "Tunisia",            flag: "🇹🇳", group: "F", elo: 1690 },
  // Group G
  { name: "Belgium",            flag: "🇧🇪", group: "G", elo: 1930 },
  { name: "Egypt",              flag: "🇪🇬", group: "G", elo: 1740 },
  { name: "Iran",               flag: "🇮🇷", group: "G", elo: 1800 },
  { name: "New Zealand",        flag: "🇳🇿", group: "G", elo: 1600 },
  // Group H
  { name: "Spain",              flag: "🇪🇸", group: "H", elo: 2080 },
  { name: "Cape Verde",         flag: "🇨🇻", group: "H", elo: 1600 },
  { name: "Saudi Arabia",       flag: "🇸🇦", group: "H", elo: 1670 },
  { name: "Uruguay",            flag: "🇺🇾", group: "H", elo: 1900 },
  // Group I
  { name: "France",             flag: "🇫🇷", group: "I", elo: 2080 },
  { name: "Senegal",            flag: "🇸🇳", group: "I", elo: 1830 },
  { name: "Iraq",               flag: "🇮🇶", group: "I", elo: 1660 },
  { name: "Norway",             flag: "🇳🇴", group: "I", elo: 1820 },
  // Group J
  { name: "Argentina",          flag: "🇦🇷", group: "J", elo: 2140 },
  { name: "Algeria",            flag: "🇩🇿", group: "J", elo: 1780 },
  { name: "Austria",            flag: "🇦🇹", group: "J", elo: 1810 },
  { name: "Jordan",             flag: "🇯🇴", group: "J", elo: 1620 },
  // Group K
  { name: "Portugal",           flag: "🇵🇹", group: "K", elo: 1990 },
  { name: "DR Congo",           flag: "🇨🇩", group: "K", elo: 1720 },
  { name: "Uzbekistan",         flag: "🇺🇿", group: "K", elo: 1700 },
  { name: "Colombia",           flag: "🇨🇴", group: "K", elo: 1880 },
  // Group L
  { name: "England",            flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L", elo: 2010 },
  { name: "Croatia",            flag: "🇭🇷", group: "L", elo: 1870 },
  { name: "Ghana",              flag: "🇬🇭", group: "L", elo: 1720 },
  { name: "Panama",             flag: "🇵🇦", group: "L", elo: 1640 }
];

var GROUP_NAMES = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

// ---------------------------------------------------------------------------
// Core math (mirrors the source project's fallback model).
// ---------------------------------------------------------------------------

// Expected goals for each side from the Elo difference.
// Total expected goals per match = 2.5; Elo scale = 400; dominance capped 0.33-3x.
function expectedGoals(eloA, eloB) {
  var diff = (eloA - eloB) / 400;
  var mult = Math.pow(10, diff);
  var ratio = Math.min(Math.max(Math.sqrt(mult), 0.33), 3);
  var xgA = (2.5 * ratio) / (1 + ratio);
  var xgB = 2.5 - xgA;
  return [xgA, xgB];
}

// Knuth's algorithm for a Poisson-distributed integer.
function poissonSample(lambda) {
  var L = Math.exp(-lambda);
  var k = 0;
  var p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

// Poisson probability mass function, used for analytic head-to-head odds.
function poissonPmf(k, lambda) {
  var logp = -lambda + k * Math.log(lambda);
  for (var i = 2; i <= k; i++) logp -= Math.log(i);
  return Math.exp(logp);
}

// Simulate a single match, returning sampled goals for each side.
function sampleMatch(eloA, eloB) {
  var xg = expectedGoals(eloA, eloB);
  return [poissonSample(xg[0]), poissonSample(xg[1])];
}

// Decide a knockout winner. Ties go to a slightly Elo-weighted shootout.
// Returns true if team A advances.
function knockoutWinnerA(teamA, teamB) {
  var goals = sampleMatch(teamA.elo, teamB.elo);
  if (goals[0] > goals[1]) return true;
  if (goals[1] > goals[0]) return false;
  var penEdge = Math.min(0.6, 0.5 + (teamA.elo - teamB.elo) / 2000);
  return Math.random() < penEdge;
}

// ---------------------------------------------------------------------------
// Analytic head-to-head probabilities (no sampling needed).
// ---------------------------------------------------------------------------
function headToHead(teamA, teamB) {
  var xg = expectedGoals(teamA.elo, teamB.elo);
  var MAX = 12;
  var pA = 0, pDraw = 0, pB = 0;
  for (var i = 0; i <= MAX; i++) {
    var pi = poissonPmf(i, xg[0]);
    for (var j = 0; j <= MAX; j++) {
      var pj = poissonPmf(j, xg[1]);
      var prob = pi * pj;
      if (i > j) pA += prob;
      else if (i < j) pB += prob;
      else pDraw += prob;
    }
  }
  return { xgA: xg[0], xgB: xg[1], winA: pA, draw: pDraw, winB: pB };
}

// ---------------------------------------------------------------------------
// One full tournament simulation.
// Group stage (round robin) -> top 2 + 8 best thirds -> 32-team knockout.
// Returns, for each team name, the furthest stage reached this run.
// Stage codes: champion, final, semifinal, quarterfinal, round16, round32, groups.
// ---------------------------------------------------------------------------
function simulateTournament() {
  var stage = {}; // team name -> furthest stage code

  function setStage(team, code) { stage[team.name] = code; }

  // ---- Group stage ----
  var groups = {};
  for (var g = 0; g < GROUP_NAMES.length; g++) groups[GROUP_NAMES[g]] = [];
  for (var t = 0; t < TEAMS.length; t++) {
    var team = TEAMS[t];
    groups[team.group].push({ team: team, pts: 0, gf: 0, ga: 0 });
  }

  var winners = [], runnersUp = [], thirds = [];

  for (var gi = 0; gi < GROUP_NAMES.length; gi++) {
    var table = groups[GROUP_NAMES[gi]];
    // Round robin: every pair plays once.
    for (var a = 0; a < table.length; a++) {
      for (var b = a + 1; b < table.length; b++) {
        var res = sampleMatch(table[a].team.elo, table[b].team.elo);
        table[a].gf += res[0]; table[a].ga += res[1];
        table[b].gf += res[1]; table[b].ga += res[0];
        if (res[0] > res[1]) table[a].pts += 3;
        else if (res[1] > res[0]) table[b].pts += 3;
        else { table[a].pts += 1; table[b].pts += 1; }
      }
    }
    table.sort(compareStandings);
    setStage(table[0].team, "groups");
    setStage(table[1].team, "groups");
    setStage(table[2].team, "groups");
    setStage(table[3].team, "groups");
    winners.push(table[0]);
    runnersUp.push(table[1]);
    thirds.push(table[2]);
  }

  // Best 8 of the 12 third-placed teams advance.
  thirds.sort(compareStandings);
  var bestThirds = thirds.slice(0, 8);

  // ---- Build the 32-team knockout field, seeded by Elo. ----
  var field = [];
  for (var w = 0; w < winners.length; w++) field.push(winners[w].team);
  for (var r = 0; r < runnersUp.length; r++) field.push(runnersUp[r].team);
  for (var c = 0; c < bestThirds.length; c++) field.push(bestThirds[c].team);

  field.sort(function (x, y) { return y.elo - x.elo; }); // 1 = strongest

  // Standard seeded bracket: seed i vs seed (n-1-i).
  var round = [];
  var n = field.length;
  for (var s = 0; s < n / 2; s++) round.push([field[s], field[n - 1 - s]]);

  // Everyone in the field has at least reached the Round of 32.
  for (var f = 0; f < field.length; f++) setStage(field[f], "round32");

  var stageOrder = ["round16", "quarterfinal", "semifinal", "final", "champion"];
  var stageIdx = 0;

  while (round.length > 1) {
    var next = [];
    var advancedCode = stageOrder[stageIdx];
    for (var m = 0; m < round.length; m++) {
      var pair = round[m];
      var aWins = knockoutWinnerA(pair[0], pair[1]);
      var winner = aWins ? pair[0] : pair[1];
      setStage(winner, advancedCode);
      next.push(winner);
    }
    // Re-pair winners in order to form the next round.
    var paired = [];
    for (var p = 0; p < next.length; p += 2) paired.push([next[p], next[p + 1]]);
    round = paired;
    stageIdx++;
  }

  // round now holds the single final pairing's... actually the loop above
  // collapses to the champion via the last pairing. Handle the final explicitly:
  // (When round.length === 1 we still have a pair to decide.)
  if (round.length === 1) {
    var finalPair = round[0];
    setStage(finalPair[0], "final");
    setStage(finalPair[1], "final");
    var champA = knockoutWinnerA(finalPair[0], finalPair[1]);
    setStage(champA ? finalPair[0] : finalPair[1], "champion");
  }

  return stage;
}

// Group-table comparator: points, then goal difference, then goals for, then Elo.
function compareStandings(x, y) {
  if (y.pts !== x.pts) return y.pts - x.pts;
  var xgd = x.gf - x.ga, ygd = y.gf - y.ga;
  if (ygd !== xgd) return ygd - xgd;
  if (y.gf !== x.gf) return y.gf - x.gf;
  return y.team.elo - x.team.elo;
}

// Expose for importScripts (worker) and module-style access if ever needed.
if (typeof self !== "undefined") {
  self.TEAMS = TEAMS;
  self.simulateTournament = simulateTournament;
}
