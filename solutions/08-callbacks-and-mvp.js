export const callbackKinds = {
  mapCallback: "CB",
  clickHandler: "ACB",
  thenCallback: "ACB",
  filterCallback: "CB",
  autorunCallback: "ACB",
  findCallback: "CB",
};

export const directions = { props: "down", customEvents: "up" };

export const roles = {
  setterWithSpread: "model",
  callsPropsHandler: "view",
  callsModelMethod: "presenter",
  picksSuspense: "presenter",
  rendersInput: "view",
  startsRequest: "model",
};

export const claims = {
  viewMayReadTheModel: false,
  presenterRendersHtmlWidgets: false,
  modelKnowsAboutTheUI: false,
  eventCarriesWhatPresenterLacks: true,
};
