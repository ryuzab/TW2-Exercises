export function DishView(props) {
  return <h2>{props.dish.title}</h2>;
}

export function SuspenseView(props) {
  if (!props.promise) return <span>no data</span>;
  if (props.error) return <span>{props.error.toString()}</span>;
  return <img src="https://brfenergi.se/iprog/loading.gif" />;
}

export function Details(props) {
  const state = props.promiseState;
  if (!state.data) return <SuspenseView promise={state.promise} error={state.error} />;
  return <DishView dish={state.data} />;
}
