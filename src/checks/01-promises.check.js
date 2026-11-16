import { assert, equal } from "../lib/assert.js";
import { addTen, labelDoubled, orFailed, answers } from "../exercises/01-promises.js";

function isPromise(p) { return p && typeof p.then === "function"; }

export const checks = [
  {
    name: "1a addTen returns a promise of value + 10",
    run: async function () {
      const p = addTen(Promise.resolve(5));
      assert(isPromise(p), "addTen must return a promise (did you forget `return`?)");
      equal(await p, 15);
    },
  },
  {
    name: "1b labelDoubled waits for the inner promise (slowDouble)",
    run: async function () {
      const p = labelDoubled(Promise.resolve(4));
      assert(isPromise(p), "labelDoubled must return a promise");
      equal(await p, "Result: 8");
    },
  },
  {
    name: "1c orFailed passes the value through when the promise works",
    run: async function () {
      equal(await orFailed(Promise.resolve(3)), 3);
    },
  },
  {
    name: "1c orFailed turns a rejection into \"failed\"",
    run: async function () {
      const rejected = Promise.reject(new Error("x"));
      rejected.catch(function ignoreACB() {});     // keeps an unfinished exercise from causing an "unhandled rejection"
      equal(await orFailed(rejected), "failed");
    },
  },
  {
    name: "1d forgotReturn answer",
    run: function () { equal(answers.forgotReturn, "undefined"); },
  },
  {
    name: "1d returnsPromise answer",
    run: function () { equal(answers.returnsPromise, "its resolved value"); },
  },
  {
    name: "1d throwSkips answer",
    run: function () { equal(answers.throwSkips, "h"); },
  },
  {
    name: "1d changesAfterSettled answer",
    run: function () { equal(answers.changesAfterSettled, 0); },
  },
];
