import { checks as c1 } from "./01-promises.check.js";
import { checks as c2 } from "./02-fetch-two-stages.check.js";
import { checks as c3 } from "./03-http.check.js";
import { checks as c4 } from "./04-resolvePromise.check.js";
import { checks as c5 } from "./05-suspense.check.js";
import { checks as c6 } from "./06-side-effects.check.js";
import { checks as c7 } from "./07-custom-events.check.js";
import { checks as c8 } from "./08-callbacks-and-mvp.check.js";

export const suites = [
  { title: "1. Promises", file: "src/exercises/01-promises.js", checks: c1 },
  { title: "2. fetch as a two-stage promise", file: "src/exercises/02-fetch-two-stages.js", checks: c2 },
  { title: "3. HTTP method, headers, query string, body, status", file: "src/exercises/03-http.js", checks: c3 },
  { title: "4. Promise state and race conditions", file: "src/exercises/04-resolvePromise.js", checks: c4 },
  { title: "5. Conditional rendering and suspense", file: "src/exercises/05-suspense.jsx", checks: c5 },
  { title: "6. Side effects in reactive objects", file: "src/exercises/06-side-effects.js", checks: c6 },
  { title: "7. Custom events and array rendering", file: "src/exercises/07-custom-events.jsx", checks: c7 },
  { title: "8. Callbacks, data flow, Model/View/Presenter", file: "src/exercises/08-callbacks-and-mvp.js", checks: c8 },
];
