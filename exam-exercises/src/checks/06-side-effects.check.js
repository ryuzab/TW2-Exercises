import { observable, reaction, configure } from "mobx";
import { assert, equal } from "../lib/assert.js";
import { installDishEffect, installPersistence, answers } from "../exercises/06-side-effects.js";

configure({ enforceActions: "never" });

function makeModel() {
  return observable({ numberOfGuests: 2, dishes: [], currentDishId: null, ready: false, unrelated: "x" });
}

export const checks = [
  {
    name: "6a runs once at the start with the current id",
    run: function () {
      const model = makeModel();
      const seen = [];
      installDishEffect(model, function resolveFn(id) { seen.push(id); });
      equal(seen, [null]);
    },
  },
  {
    name: "6a runs again when currentDishId changes",
    run: function () {
      const model = makeModel();
      const seen = [];
      installDishEffect(model, function resolveFn(id) { seen.push(id); });
      model.currentDishId = 715446;
      model.currentDishId = 12;
      equal(seen, [null, 715446, 12]);
    },
  },
  {
    name: "6a does NOT run when other properties change",
    run: function () {
      const model = makeModel();
      let calls = 0;
      installDishEffect(model, function resolveFn() { calls++; });
      model.numberOfGuests = 5;
      model.unrelated = "y";
      equal(calls, 1, "only the initial run is expected");
    },
  },
  {
    name: "6b does not save at the start",
    run: function () {
      const model = makeModel();
      model.ready = true;
      let saves = 0;
      installPersistence(model, function saveFn() { saves++; }, reaction);
      equal(saves, 0, "a two-callback watcher does not run at startup");
    },
  },
  {
    name: "6b does not save while model.ready is false",
    run: function () {
      const model = makeModel();
      let saves = 0;
      installPersistence(model, function saveFn() { saves++; }, reaction);
      model.numberOfGuests = 3;
      equal(saves, 0, "never save while reading from the cloud");
    },
  },
  {
    name: "6b saves when guests, dishes or currentDishId change and ready is true",
    run: function () {
      const model = makeModel();
      const saved = [];
      installPersistence(model, function saveFn(data) { saved.push(data); }, reaction);
      model.ready = true;
      model.numberOfGuests = 4;
      equal(saved.length, 1);
      equal(saved[0].numberOfGuests, 4);
      model.dishes = [{ id: 1 }];
      equal(saved.length, 2);
      equal(saved[1].dishes, [{ id: 1 }]);
      model.currentDishId = 99;
      equal(saved.length, 3);
      equal(saved[2].currentDishId, 99);
    },
  },
  {
    name: "6b does not save when an unrelated property changes",
    run: function () {
      const model = makeModel();
      let saves = 0;
      installPersistence(model, function saveFn() { saves++; }, reaction);
      model.ready = true;
      model.unrelated = "changed";
      equal(saves, 0);
    },
  },
  {
    name: "6b uses the watchFunction it is given (not a hard-coded import)",
    run: function () {
      const model = makeModel();
      const watchedCalls = [];
      installPersistence(model, function saveFn() {}, function fakeWatch(a, b) { watchedCalls.push([typeof a, typeof b]); });
      equal(watchedCalls, [["function", "function"]]);
    },
  },
  { name: "6c plainModelRead answer", run: function () { equal(answers.plainModelRead, "is not tracked"); } },
  { name: "6c noRunAtStart answer", run: function () { equal(answers.noRunAtStart, "reaction"); } },
  { name: "6c separateWatchCallback answer", run: function () { equal(answers.separateWatchCallback, "reaction"); } },
];
