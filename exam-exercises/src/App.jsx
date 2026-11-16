import { useEffect, useState } from "react";
import { suites } from "./checks/index.js";
import { runChecks } from "./lib/runner.js";

export function App() {
  const [results, setResults] = useState(null);

  useEffect(function runAllACB() {
    let cancelled = false;
    async function runAll() {
      const out = [];
      for (const suite of suites) {
        out.push({ suite, results: await runChecks(suite.checks) });
        if (!cancelled) setResults([...out]);
      }
    }
    runAll();
    return function cancelACB() { cancelled = true; };
  }, []);

  function suiteCB(entry) {
    const passed = entry.results.filter((r) => r.ok).length;
    const all = passed === entry.results.length;
    return (
      <section key={entry.suite.title} style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 2 }}>
          {all ? "✔" : "✖"} {entry.suite.title}{" "}
          <small style={{ fontWeight: "normal", color: "#666" }}>
            {passed}/{entry.results.length}
          </small>
        </h2>
        <div style={{ color: "#666", fontSize: 13, marginBottom: 6 }}>
          edit <code>{entry.suite.file}</code>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {entry.results.map(function resultCB(r) {
            return (
              <li key={r.name} style={{ color: r.ok ? "#1a7f37" : "#cf222e", marginBottom: 4 }}>
                {r.ok ? "✔" : "✖"} {r.name}
                {!r.ok && (
                  <div style={{ color: "#444", fontSize: 13, marginLeft: 20, whiteSpace: "pre-wrap" }}>
                    {r.message}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 760, margin: "24px auto", padding: "0 16px" }}>
      <h1>Kontrollskrivning exercises</h1>
      <p style={{ color: "#555" }}>
        Edit the files in <code>src/exercises/</code>. This page re-runs every check when you save.
        Search each file for <code>TODO</code>.
      </p>
      {!results && <p>Running checks…</p>}
      {results && results.map(suiteCB)}
    </div>
  );
}
