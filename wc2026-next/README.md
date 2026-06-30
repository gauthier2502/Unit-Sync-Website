# ⚽ World Cup 2026 Predictor (Next.js)

A **Next.js** app that forecasts the 2026 FIFA World Cup. Run thousands of
Monte&nbsp;Carlo tournament simulations, see each team's odds of reaching the
quarterfinals / semifinals / final / lifting the trophy, and check any
head-to-head matchup.

Model methodology ported from
[chrispathway/world-cup-prediction-py](https://github.com/chrispathway/world-cup-prediction-py).

## Run it locally

You need [Node.js](https://nodejs.org) 18.18+ installed.

```bash
cd wc2026-next
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser. (This is `localhost` on
*your own machine*, so it just works.)

For a production build:

```bash
npm run build
npm start
```

## Deploy a public URL (Vercel)

Next.js deploys to [Vercel](https://vercel.com) in a couple of clicks:

1. Push this folder to a GitHub repo.
2. On Vercel, **Add New → Project**, import the repo, set the **Root Directory**
   to `wc2026-next`, and deploy. You'll get a live `https://….vercel.app` URL.

## How it works

Each team has an Elo rating. For a match between A and B:

```
diff  = (eloA - eloB) / 400
mult  = 10 ^ diff
ratio = clamp(sqrt(mult), 0.33, 3)
xgA   = 2.5 * ratio / (1 + ratio)      # total expected goals per match = 2.5
xgB   = 2.5 - xgA
```

Goals are sampled from independent **Poisson** distributions (Knuth's algorithm).
Knockout ties go to a lightly Elo-weighted shootout
(`pen = min(0.6, 0.5 + (eloA - eloB)/2000)`). The default run is **10,000**
simulated tournaments — matching the original Python project's constants.

The simulation runs client-side in async batches, so the UI and progress bar
stay responsive.

### Ratings

The original tool computes Elo from ~49,000 historical matches downloaded at
runtime — impractical in the browser — so ratings here are approximate
early-2026 seeds. Edit them in [`lib/model.ts`](lib/model.ts).

## Structure

| Path | Purpose |
|------|---------|
| `app/page.tsx` | UI: tabs, simulation, head-to-head, groups |
| `app/layout.tsx` | Root layout & metadata |
| `app/globals.css` | Styles |
| `lib/model.ts` | Teams, Elo ratings, and the prediction model |

Predictions are statistical estimates for **entertainment only** — not betting advice.
