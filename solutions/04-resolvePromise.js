export function resolvePromise(promise, promiseState) {
  promiseState.promise = promise;
  promiseState.data = null;
  promiseState.error = null;
  if (!promise) return;

  function saveDataACB(result) {
    if (promiseState.promise !== promise) return;   // stale: a newer request replaced us
    promiseState.data = result;
  }
  function saveErrorACB(err) {
    if (promiseState.promise !== promise) return;
    promiseState.error = err;
  }
  promise.then(saveDataACB).catch(saveErrorACB);
}
