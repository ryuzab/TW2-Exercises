import { assert, equal, deferred, tick } from "../lib/assert.js";
import { resolvePromise } from "../exercises/04-resolvePromise.js";

export const checks = [
  {
    name: "starts a request: promise set, data and error cleared",
    run: function () {
      const d = deferred();
      const state = { data: "old", error: "old error" };
      resolvePromise(d.promise, state);
      assert(state.promise === d.promise, "state.promise must be the new promise");
      equal(state.data, null);
      equal(state.error, null);
    },
  },
  {
    name: "stores the data when the promise resolves",
    run: async function () {
      const d = deferred();
      const state = {};
      resolvePromise(d.promise, state);
      d.resolve("pasta results");
      await tick();
      equal(state.data, "pasta results");
      equal(state.error, null);
    },
  },
  {
    name: "stores the error when the promise rejects",
    run: async function () {
      const d = deferred();
      const state = {};
      resolvePromise(d.promise, state);
      d.reject(new Error("API problem 500"));
      await tick();
      equal(state.data, null);
      assert(state.error && state.error.message === "API problem 500", "error must be stored");
    },
  },
  {
    name: "a null promise clears the state without crashing",
    run: function () {
      const state = { promise: {}, data: "x", error: "y" };
      resolvePromise(null, state);
      assert(!state.promise, "promise cleared");
      equal(state.data, null);
      equal(state.error, null);
    },
  },
  {
    name: "starting a new request clears the old data again",
    run: async function () {
      const a = deferred();
      const b = deferred();
      const state = {};
      resolvePromise(a.promise, state);
      a.resolve("A");
      await tick();
      equal(state.data, "A");
      resolvePromise(b.promise, state);
      equal(state.data, null, "while loading B, the old data must be gone (so the loading image shows)");
    },
  },
  {
    name: "RACE: an old answer arriving last must be ignored",
    run: async function () {
      const pizza = deferred();
      const pasta = deferred();
      const state = {};
      resolvePromise(pizza.promise, state);   // request A, sent first
      resolvePromise(pasta.promise, state);   // request B, sent second
      pasta.resolve("pasta");                 // B arrives first
      await tick();
      pizza.resolve("pizza");                 // A arrives last
      await tick();
      equal(state.data, "pasta", "the newest request must win, whatever the arrival order");
    },
  },
  {
    name: "RACE: an old FAILURE arriving late must be ignored too",
    run: async function () {
      const a = deferred();
      const b = deferred();
      const state = {};
      resolvePromise(a.promise, state);
      resolvePromise(b.promise, state);
      b.resolve("fresh data");
      await tick();
      a.reject(new Error("old request failed"));
      await tick();
      equal(state.data, "fresh data");
      equal(state.error, null, "a stale error must not appear on screen");
    },
  },
];
