import { assert, equal } from "../lib/assert.js";
import { createMenu, statusKind, answers } from "../exercises/03-http.js";
import { BASE_URL, API_KEY } from "../exercises/02-fetch-two-stages.js";

export const checks = [
  {
    name: "3a createMenu sends a POST to the right URL",
    run: async function () {
      const original = globalThis.fetch;
      const calls = [];
      globalThis.fetch = function fakeFetch(url, options) {
        calls.push({ url, options });
        return Promise.resolve({ ok: true, status: 201, json: function () { return Promise.resolve({}); } });
      };
      try {
        await createMenu("Carbonara night", [11, 12]);
      } finally {
        globalThis.fetch = original;
      }
      assert(calls.length === 1, "call fetch exactly once");
      const { url, options } = calls[0];
      equal(url, BASE_URL + "/menus?userId=7");
      assert(options, "pass an options object");
      equal(options.method, "POST");
      assert(options.headers, "set headers");
      equal(options.headers["Content-Type"], "application/json");
      equal(options.headers["X-API-KEY"], API_KEY);
      assert(typeof options.body === "string", "body must be a string: use JSON.stringify");
      equal(JSON.parse(options.body), { name: "Carbonara night", dishes: [11, 12] });
    },
  },
  { name: "3b statusKind(200)", run: function () { equal(statusKind(200), "success"); } },
  { name: "3b statusKind(201)", run: function () { equal(statusKind(201), "success"); } },
  { name: "3b statusKind(404)", run: function () { equal(statusKind(404), "client error"); } },
  { name: "3b statusKind(429)", run: function () { equal(statusKind(429), "client error"); } },
  { name: "3b statusKind(500)", run: function () { equal(statusKind(500), "server error"); } },
  { name: "3b statusKind(301)", run: function () { equal(statusKind(301), "other"); } },
  { name: "3c 401 means auth", run: function () { equal(answers.status401, "auth"); } },
  { name: "3c 404 means not found", run: function () { equal(answers.status404, "not found"); } },
  { name: "3c 429 means rate limit", run: function () { equal(answers.status429, "rate limit"); } },
  { name: "3c 500 means server", run: function () { equal(answers.status500, "server"); } },
  { name: "3c GET has no body", run: function () { equal(answers.getHasBody, false); } },
  { name: "3c API key goes in a header", run: function () { equal(answers.apiKeyGoesIn, "header"); } },
  { name: "3c Content-Type", run: function () { equal(answers.contentType, "what the body is"); } },
];
