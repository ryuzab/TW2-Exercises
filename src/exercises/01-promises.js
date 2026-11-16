// EXERCISE 1 — Promises
//
// Godot analogy: a promise is a one-shot signal that remembers what it fired with.
// .then(ACB) is like connect(...): your function runs LATER, so it is an ACB.

// Helper (do not edit). Returns a promise that resolves to n*2 after a short delay.
export function slowDouble(n) {
  return new Promise(function executorACB(resolve) {
    setTimeout(function timerACB() { resolve(n * 2); }, 5);
  });
}

// 1a. Return a NEW promise that resolves to (the value of `promise`) + 10.
export function addTen(promise) {
  // TODO
}

// 1b. Return a promise that resolves to the string "Result: <N>", where N is
//     slowDouble(value of `promise`). slowDouble returns a promise itself, so your
//     .then callback will return a promise. The chain waits for it.
export function labelDoubled(promise) {
  // TODO
}

// 1c. Return a promise that NEVER rejects: it resolves to the value of `promise`,
//     or to the string "failed" if `promise` rejects.
export function orFailed(promise) {
  // TODO
}

// 1d. Concept questions. Replace each "?" with one of the allowed answers.
export const answers = {
  // p.then(function f(x){ x * 2 }).then(function g(y){ ... })
  // What does g receive as y?                     "undefined" | "x*2"
  forgotReturn: "?",

  // p.then(function f(){ return otherPromise; }).then(function g(y){ ... })
  // What does g receive as y?                     "the promise itself" | "its resolved value"
  returnsPromise: "?",

  // p.then(function f(){ throw new Error("x"); }).then(g).catch(h)
  // Which callbacks run?                          "g" | "h" | "g and h"
  throwSkips: "?",

  // How many times can a promise change state after it has settled?   0 | 1 | "many"
  changesAfterSettled: "?",
};
