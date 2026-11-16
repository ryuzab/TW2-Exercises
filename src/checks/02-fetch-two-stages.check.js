import { assert, equal } from "../lib/assert.js";
import { getJSON, searchDishes, answers, BASE_URL, API_KEY } from "../exercises/02-fetch-two-stages.js";

// Fake fetch: records calls and answers with a fake Response (two stages: status first, body via json()).
async function withFakeFetch(status, body, test) {
  const original = globalThis.fetch;
  const calls = [];
  let jsonCalls = 0;
  globalThis.fetch = function fakeFetch(url, options) {
    calls.push({ url, options });
    return Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: function jsonFake() { jsonCalls++; return Promise.resolve(body); },
    });
  };
  try {
    await test(calls, () => jsonCalls);
  } finally {
    globalThis.fetch = original;
  }
}

export const checks = [
  {
    name: "2a getJSON returns the parsed body on success",
    run: function () {
      return withFakeFetch(200, { hello: "world" }, async function (calls) {
        const p = getJSON("https://x.test/a", { headers: { A: "b" } });
        assert(p && typeof p.then === "function", "getJSON must return a promise");
        equal(await p, { hello: "world" });
        equal(calls[0].url, "https://x.test/a");
        equal(calls[0].options, { headers: { A: "b" } }, "options must be passed on to fetch");
      });
    },
  },
  {
    name: "2a getJSON throws \"API problem 404\" when response.ok is false",
    run: function () {
      return withFakeFetch(404, {}, async function (calls, jsonCalls) {
        let message = null;
        try { await getJSON("https://x.test/missing"); } catch (e) { message = e.message; }
        equal(message, "API problem 404", "a 404 must reach the caller as a rejection");
        equal(jsonCalls(), 0, "do not read the body of a failed response");
      });
    },
  },
  {
    name: "2b searchDishes builds the URL with a query string",
    run: function () {
      return withFakeFetch(200, { results: [{ id: 1 }] }, async function (calls) {
        await searchDishes({ query: "pasta", type: "dessert" });
        equal(calls[0].url, BASE_URL + "/recipes/complexSearch?query=pasta&type=dessert");
      });
    },
  },
  {
    name: "2b searchDishes sends the API key header",
    run: function () {
      return withFakeFetch(200, { results: [] }, async function (calls) {
        await searchDishes({ query: "x" });
        const headers = calls[0].options && calls[0].options.headers;
        assert(headers, "pass an options object with headers");
        equal(headers["X-API-KEY"], API_KEY);
      });
    },
  },
  {
    name: "2b searchDishes resolves to the results array",
    run: function () {
      return withFakeFetch(200, { results: [{ id: 1 }, { id: 2 }], totalResults: 2 }, async function () {
        equal(await searchDishes({ query: "x" }), [{ id: 1 }, { id: 2 }]);
      });
    },
  },
  {
    name: "2b searchDishes rejects on a 500",
    run: function () {
      return withFakeFetch(500, {}, async function () {
        let failed = false;
        try { await searchDishes({ query: "x" }); } catch (e) { failed = true; }
        assert(failed, "a 500 response must make the returned promise reject");
      });
    },
  },
  { name: "2c stage1 answer", run: function () { equal(answers.stage1, "headers and status"); } },
  { name: "2c stage2 answer", run: function () { equal(answers.stage2, "parsed body"); } },
  { name: "2c rejectsOn404 answer", run: function () { equal(answers.rejectsOn404, false); } },
  { name: "2c rejectsWithoutNetwork answer", run: function () { equal(answers.rejectsWithoutNetwork, true); } },
];
