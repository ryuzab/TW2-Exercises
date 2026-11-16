// EXERCISE 7 — Custom events, array rendering, props down / events up
//
// Naming rule of the course: callbacks that run synchronously (map, filter, find) end in CB;
// callbacks that run later (event handlers, .then, watchers) end in ACB.

// 7a. SearchResultsView({searchResults, onDishChoice})
//     Fire the custom event onDishChoice(result) when the user clicks a result.
//     - The handler must be defined INSIDE searchResultCB so it can see `result`
//     - Pass the dish object itself (not the click event)
//     - One listener on the span is enough: clicks on the image and the name bubble up
//     - Name the handler so that it ends in ACB
export function SearchResultsView(props) {
  function searchResultCB(result) {
    return (
      <span key={result.id}>
        <img src={result.image} height="100" />
        <div>{result.title}</div>
      </span>
    );
  }
  return <div>{props.searchResults.map(searchResultCB)}</div>;
}

// 7b. SearchFormView({text, onTextChange, onTypeChange, onSearchNow})
//     - input: value shows props.text (or "" if undefined); on change fire onTextChange(text typed)
//     - select: on change fire onTypeChange(selected option)
//     - button: on click fire onSearchNow() with NO parameters
//       (the presenter already knows the text and type from the earlier events)
//     Remember: the typed text is evt.target.value
export function SearchFormView(props) {
  return (
    <div>
      <input />
      <select>
        <option value="">Choose:</option>
      </select>
      <button>Search!</button>
    </div>
  );
}

// 7c. makeHandlers(model): the PRESENTER side, "handling" the events.
//     Return an object with these four functions, each calling the model:
//       setSearchTextACB(text)  -> model.setSearchQuery(text)
//       setSearchTypeACB(type)  -> model.setSearchType(type)
//       searchNowACB()          -> model.doSearch(model.searchParams)
//       chooseDishACB(dish)     -> model.setCurrentDishId(dish.id)
export function makeHandlers(model) {
  // TODO
  return {};
}
