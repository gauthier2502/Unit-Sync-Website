"use client";

import { useMemo, useRef, useState } from "react";
import {
  TEAMS,
  GROUP_NAMES,
  headToHead,
  emptyCounters,
  tallySimulations,
  buildRows,
  type SimRow,
  type Team,
} from "@/lib/model";

type Tab = "sim" | "h2h" | "teams";
const pct = (x: number) => (x * 100).toFixed(1) + "%";

export default function Home() {
  const [tab, setTab] = useState<Tab>("sim");

  return (
    <>
      <header>
        <h1>⚽ World Cup 2026 Predictor</h1>
        <p className="subtitle">
          Elo-based expected-goals model with Monte&nbsp;Carlo tournament simulation.
        </p>
      </header>

      <nav className="tabs">
        <button className={"tab" + (tab === "sim" ? " active" : "")} onClick={() => setTab("sim")}>
          🏆 Tournament Simulation
        </button>
        <button className={"tab" + (tab === "h2h" ? " active" : "")} onClick={() => setTab("h2h")}>
          🔮 Head-to-Head
        </button>
        <button className={"tab" + (tab === "teams" ? " active" : "")} onClick={() => setTab("teams")}>
          📋 Teams &amp; Groups
        </button>
      </nav>

      {tab === "sim" && <SimulationPanel />}
      {tab === "h2h" && <HeadToHeadPanel />}
      {tab === "teams" && <TeamsPanel />}

      <footer>
        <p>
          Model ported from{" "}
          <a href="https://github.com/chrispathway/world-cup-prediction-py" target="_blank" rel="noopener noreferrer">
            chrispathway/world-cup-prediction-py
          </a>
          . Elo ratings are approximate seeds &mdash; predictions are for fun, not betting.
        </p>
      </footer>
    </>
  );
}

function SimulationPanel() {
  const [numSims, setNumSims] = useState(10000);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rows, setRows] = useState<SimRow[] | null>(null);
  const [meta, setMeta] = useState("");
  const runId = useRef(0);

  // Runs the Monte Carlo loop in async batches so the progress bar stays live.
  function run() {
    const id = ++runId.current;
    setRunning(true);
    setRows(null);
    setProgress(0);
    setMeta(`Simulating ${numSims.toLocaleString()} tournaments…`);

    const counters = emptyCounters();
    let done = 0;
    const BATCH = 250;

    const step = () => {
      if (id !== runId.current) return; // superseded by a newer run
      const end = Math.min(done + BATCH, numSims);
      tallySimulations(end - done, counters);
      done = end;
      setProgress(Math.floor((done / numSims) * 100));
      if (done < numSims) {
        setTimeout(step, 0);
        return;
      }
      const result = buildRows(counters, numSims);
      setRows(result);
      setMeta(
        `Based on ${numSims.toLocaleString()} simulated tournaments. Favourite: ${result[0].flag} ${result[0].name}.`
      );
      setRunning(false);
    };
    setTimeout(step, 0);
  }

  const maxC = rows && rows.length ? rows[0].champion : 1;

  return (
    <section className="panel">
      <div className="controls">
        <label htmlFor="numSims">Simulations:</label>
        <select
          id="numSims"
          value={numSims}
          disabled={running}
          onChange={(e) => setNumSims(parseInt(e.target.value, 10))}
        >
          <option value={2000}>2,000 (fast)</option>
          <option value={10000}>10,000 (default)</option>
          <option value={25000}>25,000 (slow)</option>
        </select>
        <button onClick={run} disabled={running}>
          {running ? "Running…" : "Run simulation"}
        </button>
      </div>

      {running && (
        <div className="progress-wrap">
          <div className="progress-bar" style={{ width: progress + "%" }} />
          <span>{progress}%</span>
        </div>
      )}

      <p className="meta">{meta}</p>

      {rows && (
        <table className="results">
          <thead>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>Grp</th>
              <th>Elo</th>
              <th>Champion</th>
              <th>Final</th>
              <th>Semifinal</th>
              <th>Quarterfinal</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.name}>
                <td>{i + 1}</td>
                <td>
                  {r.flag} {r.name}
                </td>
                <td>{r.group}</td>
                <td>{r.elo}</td>
                <td className="bar-cell">
                  <span className="fill" style={{ width: (maxC ? (r.champion / maxC) * 100 : 0) + "%" }} />
                  <span className="val">{pct(r.champion)}</span>
                </td>
                <td>{pct(r.finalist)}</td>
                <td>{pct(r.semifinal)}</td>
                <td>{pct(r.quarterfinal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

function HeadToHeadPanel() {
  const sorted = useMemo(
    () => [...TEAMS].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  const [a, setA] = useState("Argentina");
  const [b, setB] = useState("France");

  const teamA = TEAMS.find((t) => t.name === a) as Team;
  const teamB = TEAMS.find((t) => t.name === b) as Team;
  const result = a !== b ? headToHead(teamA, teamB) : null;

  return (
    <section className="panel">
      <div className="controls">
        <select value={a} onChange={(e) => setA(e.target.value)}>
          {sorted.map((t) => (
            <option key={t.name} value={t.name}>
              {t.flag} {t.name}
            </option>
          ))}
        </select>
        <span className="vs">vs</span>
        <select value={b} onChange={(e) => setB(e.target.value)}>
          {sorted.map((t) => (
            <option key={t.name} value={t.name}>
              {t.flag} {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="h2h-result">
        {!result ? (
          <p className="meta">Pick two different teams.</p>
        ) : (
          <>
            <div className="h2h-line">
              <span>
                {teamA.flag} {teamA.name}
              </span>
              <span>
                {teamB.flag} {teamB.name}
              </span>
            </div>
            <div className="h2h-bars">
              <div className="seg-a" style={{ width: Math.max(result.winA * 100, 6) + "%" }}>
                {(result.winA * 100).toFixed(1)}%
              </div>
              <div className="seg-d" style={{ width: Math.max(result.draw * 100, 6) + "%" }}>
                {(result.draw * 100).toFixed(1)}%
              </div>
              <div className="seg-b" style={{ width: Math.max(result.winB * 100, 6) + "%" }}>
                {(result.winB * 100).toFixed(1)}%
              </div>
            </div>
            <p className="h2h-xg">
              Expected goals: {teamA.name} {result.xgA.toFixed(2)} &ndash; {result.xgB.toFixed(2)} {teamB.name}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function TeamsPanel() {
  return (
    <section className="panel">
      <div className="groups-grid">
        {GROUP_NAMES.map((g) => {
          const members = TEAMS.filter((t) => t.group === g).sort((a, b) => b.elo - a.elo);
          return (
            <div className="group-card" key={g}>
              <h3>Group {g}</h3>
              {members.map((t) => (
                <div className="row" key={t.name}>
                  <span>
                    {t.flag} {t.name}
                  </span>
                  <span className="elo">{t.elo}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
