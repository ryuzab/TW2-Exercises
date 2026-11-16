// Runs each check; a check that hangs for more than 1.5 s counts as failed.
export async function runChecks(checks) {
  const results = [];
  for (const check of checks) {
    let timer;
    const timeout = new Promise(function timeoutExecutorACB(_, reject) {
      timer = setTimeout(function timeoutACB() {
        reject(new Error("timed out: your promise never settled (missing return in a .then?)"));
      }, 1500);
    });
    try {
      await Promise.race([Promise.resolve().then(check.run), timeout]);
      results.push({ name: check.name, ok: true });
    } catch (err) {
      results.push({ name: check.name, ok: false, message: String(err && err.message ? err.message : err) });
    } finally {
      clearTimeout(timer);
    }
  }
  return results;
}
