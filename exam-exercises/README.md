# Kontrollskrivning exercises (Nov 18)

Hands-on practice for: promises, fetch as a two-stage promise, HTTP (method / headers / query string /
body / status), promise state and race conditions, suspense and conditional rendering, side effects in
reactive objects, plus a recap of custom events, CB vs ACB, and Model/View/Presenter.

## How it works

1. Open the app. It shows every exercise with a ✔ or ✖ per task.
2. Edit the files in `src/exercises/` (search for `TODO` and `"?"`). The page re-runs all checks when you save.
3. Do them in order, they build on each other: 01 → 08.
4. `solutions/` has reference answers. Try first, then compare.

| File | Topic |
|---|---|
| 01-promises.js | `.then` chains, returning promises, `.catch`, forgotten `return` |
| 02-fetch-two-stages.js | the two stages of fetch, why a 404 does not reject |
| 03-http.js | POST with headers + body, status codes |
| 04-resolvePromise.js | fix the race condition (starter is buggy on purpose) |
| 05-suspense.jsx | SuspenseView and conditional rendering in a presenter |
| 06-side-effects.js | `autorun` and `reaction`, the `model.ready` guard |
| 07-custom-events.jsx | firing, handling, array rendering with per-item handlers |
| 08-callbacks-and-mvp.js | CB/ACB, props down / events up, MVP roles |

## Running it

- **StackBlitz:** put this folder in a GitHub repo and open `https://stackblitz.com/github/<user>/<repo>`.
- **Locally:** `npm install` then `npm run dev`.
