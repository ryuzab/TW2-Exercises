export function assert(cond, msg) {
  if (!cond) throw new Error(msg || "assertion failed");
}

export function equal(actual, expected, msg) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) throw new Error((msg ? msg + ": " : "") + "expected " + e + " but got " + a);
}

// A promise you can settle by hand, to control the order in which answers arrive
export function deferred() {
  let resolve, reject;
  const promise = new Promise(function executorACB(res, rej) {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// Let all pending promise callbacks run
export function tick() {
  return new Promise(function executorACB(resolve) { setTimeout(resolve, 0); });
}
