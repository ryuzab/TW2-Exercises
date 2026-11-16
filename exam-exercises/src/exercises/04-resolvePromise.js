// EXERCISE 4 — Promise state and race conditions
//
// promiseState is an object {promise, data, error} that lives in the model.
// resolvePromise(promise, promiseState) keeps it up to date.
//
// This starter version has a BUG on purpose. Scenario:
//   t=0  search "pizza" sent   (promise A)
//   t=1  search "pasta" sent   (promise B)
//   t=2  B arrives -> data = pasta   OK
//   t=3  A arrives -> data = pizza   WRONG, an old answer overwrote the newer one
//
// TODO: fix it so that an answer is ignored if a newer request has replaced it.
// Hint: each call has its own `promise` variable (closure). promiseState.promise
// always holds the newest one. Compare the two inside the callbacks.

export function resolvePromise(promise, promiseState) {
  promiseState.promise = promise;
  promiseState.data = null;
  promiseState.error = null;
  if (!promise) return;

  function saveDataACB(result) {
    promiseState.data = result;
  }
  function saveErrorACB(err) {
    promiseState.error = err;
  }
  promise.then(saveDataACB).catch(saveErrorACB);
}
