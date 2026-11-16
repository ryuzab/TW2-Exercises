// EXERCISE 5 — Good UX while loading: conditional rendering and suspense
import { createElement } from "react";

// Given (do not edit): the "real" view, only valid when the dish data exists.
export function DishView(props) {
  return <h2>{props.dish.title}</h2>;
}

// 5a. SuspenseView({promise, error}) renders exactly one of:
//     - no promise                -> <span>no data</span>
//     - promise and error         -> <span>{the error as text, via error.toString()}</span>
//     - promise, no data, no error-> <img src="https://brfenergi.se/iprog/loading.gif" />
export function SuspenseView(props) {
  // TODO
  return <span>TODO</span>;
}

// 5b. Details({promiseState}) where promiseState = {promise, data, error}
//     - while there is no data: render <SuspenseView promise=... error=... />
//     - when there is data: render <DishView dish={data} />
//     The starter below CRASHES while loading, because it reads data before it exists.
export function Details(props) {
  const state = props.promiseState;
  return createElement(DishView, { dish: state.data });
}
