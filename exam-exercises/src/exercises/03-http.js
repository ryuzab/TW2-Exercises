// EXERCISE 3 — HTTP: method, headers, query string, body, status
import { BASE_URL, API_KEY } from "./02-fetch-two-stages.js";

// 3a. createMenu(name, dishIds)
//     POST to  BASE_URL + "/menus?userId=7"
//     headers (plain object): "X-API-KEY": API_KEY  and  "Content-Type": "application/json"
//     body: JSON text of the object {name: name, dishes: dishIds}
//     Return the promise from fetch (no further processing needed).
export function createMenu(name, dishIds) {
  // TODO
}

// 3b. statusKind(code) returns one of:
//     "success" (200-299), "client error" (400-499), "server error" (500-599), "other"
export function statusKind(code) {
  // TODO
}

// 3c. Concept questions. Replace each "?".
export const answers = {
  // Which meaning fits each status?  Choose from:
  //   "auth" (missing/wrong key) | "not found" | "rate limit" | "server"
  status401: "?",
  status404: "?",
  status429: "?",
  status500: "?",
  // Does a GET request normally carry a body?     true | false
  getHasBody: "?",
  // Where does the API key normally go?           "header" | "body" | "query string only"
  apiKeyGoesIn: "?",
  // What does the Content-Type header say?        "what the body is" | "who is asking"
  contentType: "?",
};
