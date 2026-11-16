// EXERCISE 2 — fetch is a two-stage promise
//
// Stage 1: fetch(url) resolves when the response HEADERS and STATUS have arrived.
// Stage 2: response.json() resolves when the BODY has been downloaded and parsed.
//
// Trap: a 404 or 500 does NOT reject stage 1. You must check response.ok yourself.

export const BASE_URL = "https://api.example.com";
export const API_KEY = "secret";

// 2a. getJSON(url, options)
//     - call fetch(url, options)
//     - if the response is not ok, throw new Error("API problem " + response.status)
//     - otherwise return the parsed body (response.json())
export function getJSON(url, options) {
  // TODO
}

// 2b. searchDishes(params)  e.g. params = {query: "pasta", type: "dessert"}
//     GET  BASE_URL + "/recipes/complexSearch?" + the query string built from params
//     header "X-API-KEY": API_KEY   (use a plain object for headers)
//     Resolve to the `results` array of the response body. Reuse getJSON.
//     Hint: new URLSearchParams(params) builds and escapes the query string.
export function searchDishes(params) {
  // TODO
}

// 2c. Concept questions. Replace each "?".
export const answers = {
  // What does the FIRST promise from fetch resolve with?    "headers and status" | "body"
  stage1: "?",
  // What does the SECOND promise (response.json()) resolve with?   "headers and status" | "parsed body"
  stage2: "?",
  // Does fetch reject its promise when the server answers 404?   true | false
  rejectsOn404: "?",
  // Does fetch reject its promise when there is no network at all?   true | false
  rejectsWithoutNetwork: "?",
};
