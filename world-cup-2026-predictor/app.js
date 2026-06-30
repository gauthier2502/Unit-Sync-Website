/* UI wiring for the World Cup 2026 Predictor. */

(function () {
  "use strict";

  // ---- Tab switching -----------------------------------------------------
  var tabs = document.querySelectorAll(".tab");
  var panels = document.querySelectorAll(".panel");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      panels.forEach(function (p) { p.classList.remove("active"); });
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  // ---- Tournament simulation (via Web Worker) ----------------------------
  var runBtn = document.getElementById("runBtn");
  var numSimsSel = document.getElementById("numSims");
  var progressWrap = document.getElementById("progressWrap");
  var progressBar = document.getElementById("progressBar");
  var progressText = document.getElementById("progressText");
  var simMeta = document.getElementById("simMeta");
  var resultsTable = document.getElementById("resultsTable");
  var tbody = resultsTable.querySelector("tbody");

  function pct(x) { return (x * 100).toFixed(1) + "%"; }

  function renderResults(rows, numSims) {
    tbody.innerHTML = "";
    var maxChamp = rows.length ? rows[0].champion : 1;
    rows.forEach(function (r, i) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + (i + 1) + "</td>" +
        "<td>" + r.flag + " " + r.name + "</td>" +
        "<td>" + r.group + "</td>" +
        "<td>" + r.elo + "</td>" +
        '<td class="bar-cell"><span class="fill" style="width:' +
          (maxChamp ? (r.champion / maxChamp) * 100 : 0) + '%"></span>' +
          '<span class="val">' + pct(r.champion) + "</span></td>" +
        "<td>" + pct(r.finalist) + "</td>" +
        "<td>" + pct(r.semifinal) + "</td>" +
        "<td>" + pct(r.quarterfinal) + "</td>";
      tbody.appendChild(tr);
    });
    resultsTable.classList.remove("hidden");
    simMeta.textContent = "Based on " + numSims.toLocaleString() +
      " simulated tournaments. Favourite: " + rows[0].flag + " " + rows[0].name + ".";
  }

  function runSimulation() {
    var numSims = parseInt(numSimsSel.value, 10);
    runBtn.disabled = true;
    resultsTable.classList.add("hidden");
    progressWrap.classList.remove("hidden");
    progressBar.style.width = "0%";
    progressText.textContent = "0%";
    simMeta.textContent = "Simulating " + numSims.toLocaleString() + " tournaments…";

    var worker = new Worker("worker.js");
    worker.onmessage = function (e) {
      var msg = e.data;
      if (msg.type === "progress") {
        progressBar.style.width = msg.pct + "%";
        progressText.textContent = msg.pct + "%";
      } else if (msg.type === "done") {
        progressWrap.classList.add("hidden");
        renderResults(msg.rows, msg.numSims);
        runBtn.disabled = false;
        worker.terminate();
      }
    };
    worker.onerror = function (err) {
      simMeta.textContent = "Simulation error: " + err.message;
      progressWrap.classList.add("hidden");
      runBtn.disabled = false;
    };
    worker.postMessage({ numSims: numSims });
  }

  runBtn.addEventListener("click", runSimulation);

  // ---- Head-to-head ------------------------------------------------------
  var teamASel = document.getElementById("teamA");
  var teamBSel = document.getElementById("teamB");
  var predictBtn = document.getElementById("predictBtn");
  var h2hResult = document.getElementById("h2hResult");

  var sortedTeams = TEAMS.slice().sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  sortedTeams.forEach(function (t, i) {
    var optA = new Option(t.flag + " " + t.name, t.name);
    var optB = new Option(t.flag + " " + t.name, t.name);
    teamASel.add(optA);
    teamBSel.add(optB);
  });
  teamASel.value = "Argentina";
  teamBSel.value = "France";

  function findTeam(name) {
    for (var i = 0; i < TEAMS.length; i++) if (TEAMS[i].name === name) return TEAMS[i];
    return null;
  }

  function predict() {
    var a = findTeam(teamASel.value);
    var b = findTeam(teamBSel.value);
    if (!a || !b) return;
    if (a === b) {
      h2hResult.innerHTML = "<p class='meta'>Pick two different teams.</p>";
      return;
    }
    var r = headToHead(a, b);
    var wa = (r.winA * 100).toFixed(1);
    var dr = (r.draw * 100).toFixed(1);
    var wb = (r.winB * 100).toFixed(1);
    h2hResult.innerHTML =
      "<div class='h2h-line'><span>" + a.flag + " " + a.name + "</span>" +
      "<span>" + b.flag + " " + b.name + "</span></div>" +
      "<div class='h2h-bars'>" +
        "<div class='seg-a' style='width:" + Math.max(r.winA * 100, 6) + "%'>" + wa + "%</div>" +
        "<div class='seg-d' style='width:" + Math.max(r.draw * 100, 6) + "%'>" + dr + "%</div>" +
        "<div class='seg-b' style='width:" + Math.max(r.winB * 100, 6) + "%'>" + wb + "%</div>" +
      "</div>" +
      "<p class='h2h-xg'>Expected goals: " + a.name + " " + r.xgA.toFixed(2) +
        " &ndash; " + r.xgB.toFixed(2) + " " + b.name + "</p>";
  }

  predictBtn.addEventListener("click", predict);
  predict();

  // ---- Teams & groups view ----------------------------------------------
  var grid = document.getElementById("groupsGrid");
  var byGroup = {};
  TEAMS.forEach(function (t) {
    (byGroup[t.group] = byGroup[t.group] || []).push(t);
  });
  Object.keys(byGroup).sort().forEach(function (g) {
    var card = document.createElement("div");
    card.className = "group-card";
    var rows = byGroup[g]
      .slice()
      .sort(function (a, b) { return b.elo - a.elo; })
      .map(function (t) {
        return "<div class='row'><span>" + t.flag + " " + t.name +
          "</span><span class='elo'>" + t.elo + "</span></div>";
      })
      .join("");
    card.innerHTML = "<h3>Group " + g + "</h3>" + rows;
    grid.appendChild(card);
  });
})();
