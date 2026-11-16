import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { assert } from "../lib/assert.js";
import { SuspenseView, Details } from "../exercises/05-suspense.jsx";

const GIF = "https://brfenergi.se/iprog/loading.gif";

function html(component, props) {
  return renderToStaticMarkup(createElement(component, props));
}

export const checks = [
  {
    name: "5a SuspenseView: no promise -> <span>no data</span>",
    run: function () {
      const out = html(SuspenseView, {});
      assert(out.includes("<span>no data</span>"), "got: " + out);
      assert(!out.includes("img"), "no image when there is no promise");
    },
  },
  {
    name: "5a SuspenseView: promise + error -> the error text in a span",
    run: function () {
      const out = html(SuspenseView, { promise: {}, error: new Error("boom") });
      assert(out.includes("<span>") && out.includes("boom"), "got: " + out);
      assert(!out.includes(GIF), "no loading image when failed");
    },
  },
  {
    name: "5a SuspenseView: promise only -> loading image",
    run: function () {
      const out = html(SuspenseView, { promise: {} });
      assert(out.includes("<img") && out.includes(GIF), "got: " + out);
      assert(!out.includes("no data"), "must not say no data while loading");
    },
  },
  {
    name: "5b Details: empty state -> no data (and does not crash)",
    run: function () {
      const out = html(Details, { promiseState: {} });
      assert(out.includes("no data"), "got: " + out);
    },
  },
  {
    name: "5b Details: loading -> loading image (and does not crash)",
    run: function () {
      const out = html(Details, { promiseState: { promise: {} } });
      assert(out.includes(GIF), "got: " + out);
    },
  },
  {
    name: "5b Details: error -> error text",
    run: function () {
      const out = html(Details, { promiseState: { promise: {}, error: new Error("kaput") } });
      assert(out.includes("kaput") && !out.includes(GIF), "got: " + out);
    },
  },
  {
    name: "5b Details: data -> the dish view",
    run: function () {
      const out = html(Details, { promiseState: { promise: {}, data: { title: "Pasta" } } });
      assert(out.includes("<h2>Pasta</h2>"), "got: " + out);
      assert(!out.includes(GIF) && !out.includes("no data"), "no suspense once the data exists");
    },
  },
];
