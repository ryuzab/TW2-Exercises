// EXERCISE 8 — Callbacks (CB vs ACB), props/events direction, Model / View / Presenter roles
// Replace each "?" with one of the allowed answers.

// 8a. CB (runs immediately, synchronously)  or  ACB (runs later, asynchronously)?
export const callbackKinds = {
  mapCallback: "?",          // dishes.map(function dishCB(d){ ... })
  clickHandler: "?",         // <button onClick={function clickACB(){ ... }}>
  thenCallback: "?",         // promise.then(function saveDataACB(data){ ... })
  filterCallback: "?",       // dishes.filter(function keepDishCB(d){ ... })
  autorunCallback: "?",      // autorun(function sideEffectACB(){ ... })
  findCallback: "?",         // dishes.find(function isDishInMenuCB(d){ ... })
};

// 8b. Direction of data flow.  "down" | "up"
export const directions = {
  props: "?",                // props travel ...
  customEvents: "?",         // custom events travel ...
};

// 8c. Which part of MVP does each piece of code belong in?   "model" | "view" | "presenter"
export const roles = {
  setterWithSpread: "?",     // addToMenu(dish){ this.dishes = [...this.dishes, dish]; }
  callsPropsHandler: "?",    // function addACB(){ props.onAddToMenu(); }   (inside a component that only gets props)
  callsModelMethod: "?",     // function addACB(){ props.model.addToMenu(state.data); }
  picksSuspense: "?",        // if(!state.data) return <SuspenseView .../>;   (in the component that reads the model)
  rendersInput: "?",         // <input value={props.text || ""} onChange={textChangeACB} />
  startsRequest: "?",        // resolvePromise(getDishDetails(id), this.currentDishPromiseState)
};

// 8d. True or false?
export const claims = {
  viewMayReadTheModel: "?",              // true | false
  presenterRendersHtmlWidgets: "?",      // true | false   (apart from a Fragment or grouping div)
  modelKnowsAboutTheUI: "?",             // true | false
  eventCarriesWhatPresenterLacks: "?",   // true | false   (e.g. onTextChange has the text, onAddToMenu has none)
};
