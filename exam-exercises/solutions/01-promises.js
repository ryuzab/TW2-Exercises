export function slowDouble(n) {
  return new Promise(function executorACB(resolve) {
    setTimeout(function timerACB() { resolve(n * 2); }, 5);
  });
}

export function addTen(promise) {
  function addTenACB(value) { return value + 10; }
  return promise.then(addTenACB);
}

export function labelDoubled(promise) {
  function doubleACB(value) { return slowDouble(value); }      // returns a promise: the chain waits
  function labelACB(doubled) { return "Result: " + doubled; }
  return promise.then(doubleACB).then(labelACB);
}

export function orFailed(promise) {
  function failedACB() { return "failed"; }
  return promise.catch(failedACB);
}

export const answers = {
  forgotReturn: "undefined",
  returnsPromise: "its resolved value",
  throwSkips: "h",
  changesAfterSettled: 0,
};
