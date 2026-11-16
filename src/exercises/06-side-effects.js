// EXERCISE 6 — Side effects in reactive objects
//
// A side effect is a function that re-runs when the reactive properties it READ change.
// Reads must go through the reactive object (the `model` parameter), not an import
// of the plain model, otherwise nothing is tracked.
//
// Two forms:
//   autorun(effectACB)                 one callback: reads what to watch AND does the work.
//                                      Runs once immediately, then on every change.
//   reaction(watchedACB, effectACB)    two callbacks: the first RETURNS what to watch, the
//                                      second runs when that result changes. Not run at start.
import { autorun } from "mobx";

// 6a. installDishEffect(model, resolveFn)
//     Use autorun. Whenever model.currentDishId changes (and once at the start),
//     call resolveFn(model.currentDishId). It must NOT run when other properties change.
export function installDishEffect(model, resolveFn) {
  // TODO
}

// 6b. installPersistence(model, saveFn, watchFunction)
//     watchFunction is `reaction` (MobX) or `watch` (Vue), passed in so this code does not
//     depend on the reactivity library. Call it with two callbacks:
//       1st: return [model.numberOfGuests, model.dishes, model.currentDishId]
//       2nd: if model.ready is true, call saveFn({numberOfGuests, dishes, currentDishId})
//     (We never save while the model is being read from the cloud: ready is false then.)
export function installPersistence(model, saveFn, watchFunction) {
  // TODO
}

// 6c. Concept questions. Replace each "?".
export const answers = {
  // Reading a property of the PLAIN (non-reactive) model inside an effect:
  //   "is tracked" | "is not tracked"
  plainModelRead: "?",
  // Which form does NOT run its effect at startup?   "autorun" | "reaction"
  noRunAtStart: "?",
  // In which form do you declare what to watch in a separate first callback?   "autorun" | "reaction"
  separateWatchCallback: "?",
};
