# ⚽ World Cup 2026 Predictor

A simple, zero-dependency **web app** for forecasting the 2026 FIFA World Cup.
Run thousands of Monte&nbsp;Carlo tournament simulations, see each team's odds of
reaching the quarterfinals / semifinals / final / lifting the trophy, and check
any head-to-head matchup — all in the browser.

This is a self-contained JavaScript port of the statistical methodology from
[**chrispathway/world-cup-prediction-py**](https://github.com/chrispathway/world-cup-prediction-py),
turned into something you can open and click instead of running a Python CLI.

![tabs: Tournament Simulation · Head-to-Head · Teams & Groups](https://img.shields.io/badge/tabs-Simulation%20%C2%B7%20Head--to--Head%20%C2%B7%20Groups-36c2a4)

## Features

- **🏆 Tournament Simulation** — Monte Carlo over the full 48-team / 12-group
  bracket (group stage → top 2 + 8 best third-placed → 32-team knockout).
  Pick 2,000 / 10,000 / 25,000 runs and watch a live progress bar.
- **🔮 Head-to-Head** — analytic win / draw / win probabilities and expected
  goals for any two teams.
- **📋 Teams & Groups** — all 48 teams with their group and Elo rating.

## How it works

Each team has an Elo strength rating. For a match between A and B:

```
diff  = (eloA - eloB) / 400
mult  = 10 ^ diff
ratio = clamp(sqrt(mult), 0.33, 3)
xgA   = 2.5 * ratio / (1 + ratio)      # total expected goals per match = 2.5
xgB   = 2.5 - xgA
```

Goals are then sampled from independent **Poisson** distributions
(`xgA`, `xgB`) using Knuth's algorithm. Knockout ties go to a lightly
Elo-weighted penalty shootout: `pen_edge = min(0.6, 0.5 + (eloA - eloB)/2000)`.
The default run is **10,000** simulated tournaments — the same constants used by
the original Python project.

### About the ratings

The original tool computes Elo from ~49,000 historical international matches it
downloads at runtime — impractical inside a browser. So the ratings here are
**approximate World-Football-Elo style seeds** (early 2026). The *model math* is
identical; only the rating source differs. Tweak the numbers in
[`model.js`](model.js) to reflect your own view of team strength.

## Run it

It's plain static files — no build step.

```bash
# clone, then serve the folder (any static server works)
python3 -m http.server 8000
# open http://localhost:8000
```

A simple local server is recommended over opening `index.html` directly,
because the simulation runs in a **Web Worker** (`worker.js`), which browsers
block on the `file://` protocol.

### Deploy to GitHub Pages

Push to GitHub, then **Settings → Pages → Build from branch →** `main` / root.
Your app will be live at `https://<user>.github.io/<repo>/`.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure and tabs |
| `style.css`  | Styling |
| `model.js`   | Teams, Elo ratings, and the prediction model (no DOM) |
| `worker.js`  | Runs the Monte Carlo loop off the main thread |
| `app.js`     | UI wiring (tabs, simulation, head-to-head, groups) |

## Credit & disclaimer

Methodology adapted from
[chrispathway/world-cup-prediction-py](https://github.com/chrispathway/world-cup-prediction-py).
Predictions are statistical estimates for **entertainment only** — not betting advice.

Licensed under the [MIT License](LICENSE).
