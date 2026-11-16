export function SearchResultsView(props) {
  function searchResultCB(result) {
    function chooseDishACB() {
      props.onDishChoice(result);
    }
    return (
      <span key={result.id} onClick={chooseDishACB}>
        <img src={result.image} height="100" />
        <div>{result.title}</div>
      </span>
    );
  }
  return <div>{props.searchResults.map(searchResultCB)}</div>;
}

export function SearchFormView(props) {
  function textChangeACB(evt) { props.onTextChange(evt.target.value); }
  function typeChangeACB(evt) { props.onTypeChange(evt.target.value); }
  function searchClickACB() { props.onSearchNow(); }
  return (
    <div>
      <input value={props.text || ""} onChange={textChangeACB} />
      <select value={props.type || ""} onChange={typeChangeACB}>
        <option value="">Choose:</option>
      </select>
      <button onClick={searchClickACB}>Search!</button>
    </div>
  );
}

export function makeHandlers(model) {
  function setSearchTextACB(text) { model.setSearchQuery(text); }
  function setSearchTypeACB(type) { model.setSearchType(type); }
  function searchNowACB() { model.doSearch(model.searchParams); }
  function chooseDishACB(dish) { model.setCurrentDishId(dish.id); }
  return { setSearchTextACB, setSearchTypeACB, searchNowACB, chooseDishACB };
}
