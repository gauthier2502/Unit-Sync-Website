/*
 * Web Worker that runs the Monte Carlo tournament simulation off the main
 * thread so the UI stays responsive and can show a progress bar.
 */
importScripts("model.js");

// Stage codes ranked from earliest exit to champion.
var STAGE_RANK = {
  groups: 0,
  round32: 1,
  round16: 2,
  quarterfinal: 3,
  semifinal: 4,
  final: 5,
  champion: 6
};

onmessage = function (e) {
  var numSims = e.data.numSims || 10000;

  // Per-team counters.
  var champ = {}, finalist = {}, semi = {}, quarter = {};
  for (var i = 0; i < TEAMS.length; i++) {
    var nm = TEAMS[i].name;
    champ[nm] = 0; finalist[nm] = 0; semi[nm] = 0; quarter[nm] = 0;
  }

  var reported = 0;
  for (var s = 0; s < numSims; s++) {
    var stages = simulateTournament();
    for (var name in stages) {
      var rank = STAGE_RANK[stages[name]];
      if (rank >= STAGE_RANK.champion) champ[name]++;
      if (rank >= STAGE_RANK.final) finalist[name]++;
      if (rank >= STAGE_RANK.semifinal) semi[name]++;
      if (rank >= STAGE_RANK.quarterfinal) quarter[name]++;
    }

    // Throttled progress updates (~ every 2%).
    var pct = Math.floor(((s + 1) / numSims) * 100);
    if (pct >= reported + 2 || s === numSims - 1) {
      reported = pct;
      postMessage({ type: "progress", pct: pct });
    }
  }

  // Build sorted results.
  var rows = [];
  for (var j = 0; j < TEAMS.length; j++) {
    var team = TEAMS[j];
    rows.push({
      name: team.name,
      flag: team.flag,
      group: team.group,
      elo: team.elo,
      champion: champ[team.name] / numSims,
      finalist: finalist[team.name] / numSims,
      semifinal: semi[team.name] / numSims,
      quarterfinal: quarter[team.name] / numSims
    });
  }
  rows.sort(function (a, b) { return b.champion - a.champion; });

  postMessage({ type: "done", rows: rows, numSims: numSims });
};
