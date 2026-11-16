import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";

// Re-run all checks from scratch whenever you save a file
if (import.meta.hot) {
  import.meta.hot.on("vite:beforeUpdate", () => location.reload());
}

createRoot(document.getElementById("root")).render(<App />);
