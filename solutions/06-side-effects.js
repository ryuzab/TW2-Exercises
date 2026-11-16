import { autorun } from "mobx";

export function installDishEffect(model, resolveFn) {
  function sideEffectACB() {
    resolveFn(model.currentDishId);
  }
  autorun(sideEffectACB);
}

export function installPersistence(model, saveFn, watchFunction) {
  function watchedPropertiesACB() {
    return [model.numberOfGuests, model.dishes, model.currentDishId];
  }
  function saveModelACB() {
    if (model.ready) {
      saveFn({
        numberOfGuests: model.numberOfGuests,
        dishes: model.dishes,
        currentDishId: model.currentDishId,
      });
    }
  }
  watchFunction(watchedPropertiesACB, saveModelACB);
}

export const answers = {
  plainModelRead: "is not tracked",
  noRunAtStart: "reaction",
  separateWatchCallback: "reaction",
};
