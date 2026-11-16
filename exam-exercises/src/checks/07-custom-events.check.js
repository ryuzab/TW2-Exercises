import { assert, equal } from "../lib/assert.js";
import { findAll } from "../lib/tree.js";
import { SearchResultsView, SearchFormView, makeHandlers } from "../exercises/07-custom-events.jsx";

const DISHES = [
  { id: 1, title: "Pasta", image: "a.jpg" },
  { id: 2, title: "Soup", image: "b.jpg" },
];

function clickAll(tree) {
  return findAll(tree, function hasClickCB(n) { return n.props && typeof n.props.onClick === "function"; });
}

export const checks = [
  {
    name: "7a results: every dish has a key (array rendering)",
    run: function () {
      const tree = SearchResultsView({ searchResults: DISHES, onDishChoice: function () {} });
      const keyed = findAll(tree, function keyedCB(n) { return n.key != null; });
      assert(keyed.length >= 2, "give each rendered item a key");
      const keys = new Set(keyed.map(function keyCB(n) { return n.key; }));
      assert(keys.size === keyed.length, "keys must be unique");
    },
  },
  {
    name: "7a results: clicking a dish fires onDishChoice with THAT dish object",
    run: function () {
      const chosen = [];
      const tree = SearchResultsView({ searchResults: DISHES, onDishChoice: function (d) { chosen.push(d); } });
      const clickables = clickAll(tree);
      assert(clickables.length > 0, "no click listener found: add onClick");
      clickables.forEach(function clickCB(n) { n.props.onClick({ target: {} }); });
      assert(chosen.length > 0, "onDishChoice was never called");
      chosen.forEach(function argCB(d) {
        assert(d === DISHES[0] || d === DISHES[1], "send the dish object, not the click event");
      });
      const ids = new Set(chosen.map(function idCB(d) { return d.id; }));
      assert(ids.has(1) && ids.has(2), "each dish needs its own handler that remembers its dish (define it inside the map callback)");
    },
  },
  {
    name: "7a results: the first element's handler sends dish 1, the second's sends dish 2",
    run: function () {
      const chosen = [];
      const tree = SearchResultsView({ searchResults: DISHES, onDishChoice: function (d) { chosen.push(d.id); } });
      const clickables = clickAll(tree);
      assert(clickables.length >= 2, "one click listener per dish expected");
      clickables[0].props.onClick({ target: {} });
      equal(chosen, [1]);
      clickables[clickables.length - 1].props.onClick({ target: {} });
      equal(chosen, [1, 2]);
    },
  },
  {
    name: "7a results: the click handler name ends in ACB",
    run: function () {
      const tree = SearchResultsView({ searchResults: DISHES, onDishChoice: function () {} });
      const clickables = clickAll(tree);
      assert(clickables.length > 0, "no click listener found");
      clickables.forEach(function nameCB(n) {
        assert(/ACB$/.test(n.props.onClick.name), "name your handler like chooseDishACB (function declaration)");
      });
    },
  },
  {
    name: "7b form: input shows the text prop, or \"\" when undefined",
    run: function () {
      const a = findAll(SearchFormView({ text: "pasta" }), function inputCB(n) { return n.type === "input"; });
      const b = findAll(SearchFormView({}), function inputCB(n) { return n.type === "input"; });
      equal(a[0].props.value, "pasta");
      equal(b[0].props.value, "");
    },
  },
  {
    name: "7b form: typing fires onTextChange(text)",
    run: function () {
      const got = [];
      const tree = SearchFormView({ onTextChange: function (t) { got.push(t); } });
      const input = findAll(tree, function inputCB(n) { return n.type === "input"; })[0];
      assert(typeof input.props.onChange === "function", "add onChange to the input");
      input.props.onChange({ target: { value: "tiramisu" } });
      equal(got, ["tiramisu"]);
    },
  },
  {
    name: "7b form: choosing a type fires onTypeChange(type)",
    run: function () {
      const got = [];
      const tree = SearchFormView({ onTypeChange: function (t) { got.push(t); } });
      const select = findAll(tree, function selectCB(n) { return n.type === "select"; })[0];
      assert(typeof select.props.onChange === "function", "add onChange to the select");
      select.props.onChange({ target: { value: "dessert" } });
      equal(got, ["dessert"]);
    },
  },
  {
    name: "7b form: button fires onSearchNow() with NO parameters",
    run: function () {
      const calls = [];
      const tree = SearchFormView({ onSearchNow: function (...args) { calls.push(args); } });
      const button = findAll(tree, function buttonCB(n) { return n.type === "button"; })[0];
      assert(typeof button.props.onClick === "function", "add onClick to the button");
      button.props.onClick({ target: {} });
      equal(calls, [[]], "call props.onSearchNow() without passing the click event on");
    },
  },
  {
    name: "7c presenter handlers call the model",
    run: function () {
      const calls = [];
      const model = {
        searchParams: { query: "pasta", type: "main course" },
        setSearchQuery: function (q) { calls.push(["setSearchQuery", q]); },
        setSearchType: function (t) { calls.push(["setSearchType", t]); },
        doSearch: function (p) { calls.push(["doSearch", p]); },
        setCurrentDishId: function (id) { calls.push(["setCurrentDishId", id]); },
      };
      const h = makeHandlers(model);
      assert(h.setSearchTextACB && h.setSearchTypeACB && h.searchNowACB && h.chooseDishACB, "return all four handlers");
      h.setSearchTextACB("soup");
      h.setSearchTypeACB("starter");
      h.searchNowACB();
      h.chooseDishACB({ id: 42, title: "x" });
      equal(calls, [
        ["setSearchQuery", "soup"],
        ["setSearchType", "starter"],
        ["doSearch", { query: "pasta", type: "main course" }],
        ["setCurrentDishId", 42],
      ]);
    },
  },
];
