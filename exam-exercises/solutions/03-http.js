import { BASE_URL, API_KEY } from "./02-fetch-two-stages.js";

export function createMenu(name, dishIds) {
  return fetch(BASE_URL + "/menus?userId=7", {
    method: "POST",
    headers: { "X-API-KEY": API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, dishes: dishIds }),
  });
}

export function statusKind(code) {
  if (code >= 200 && code < 300) return "success";
  if (code >= 400 && code < 500) return "client error";
  if (code >= 500 && code < 600) return "server error";
  return "other";
}

export const answers = {
  status401: "auth",
  status404: "not found",
  status429: "rate limit",
  status500: "server",
  getHasBody: false,
  apiKeyGoesIn: "header",
  contentType: "what the body is",
};
