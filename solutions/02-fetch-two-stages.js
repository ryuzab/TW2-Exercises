export const BASE_URL = "https://api.example.com";
export const API_KEY = "secret";

export function getJSON(url, options) {
  function gotResponseACB(response) {
    if (!response.ok) throw new Error("API problem " + response.status);   // stage 1: status is here
    return response.json();                                                // stage 2: the body
  }
  return fetch(url, options).then(gotResponseACB);
}

export function searchDishes(params) {
  function extractResultsACB(data) { return data.results; }
  return getJSON(BASE_URL + "/recipes/complexSearch?" + new URLSearchParams(params), {
    headers: { "X-API-KEY": API_KEY },
  }).then(extractResultsACB);
}

export const answers = {
  stage1: "headers and status",
  stage2: "parsed body",
  rejectsOn404: false,
  rejectsWithoutNetwork: true,
};
