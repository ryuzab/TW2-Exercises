import { equal } from "../lib/assert.js";
import { callbackKinds, directions, roles, claims } from "../exercises/08-callbacks-and-mvp.js";

function answerChecks(prefix, given, expected) {
  return Object.keys(expected).map(function keyCB(key) {
    return {
      name: prefix + " " + key,
      run: function () { equal(given[key], expected[key]); },
    };
  });
}

export const checks = [
  ...answerChecks("8a", callbackKinds, {
    mapCallback: "CB",
    clickHandler: "ACB",
    thenCallback: "ACB",
    filterCallback: "CB",
    autorunCallback: "ACB",
    findCallback: "CB",
  }),
  ...answerChecks("8b", directions, { props: "down", customEvents: "up" }),
  ...answerChecks("8c", roles, {
    setterWithSpread: "model",
    callsPropsHandler: "view",
    callsModelMethod: "presenter",
    picksSuspense: "presenter",
    rendersInput: "view",
    startsRequest: "model",
  }),
  ...answerChecks("8d", claims, {
    viewMayReadTheModel: false,
    presenterRendersHtmlWidgets: false,
    modelKnowsAboutTheUI: false,
    eventCarriesWhatPresenterLacks: true,
  }),
];
