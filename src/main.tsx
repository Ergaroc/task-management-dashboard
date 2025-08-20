// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: { url: "/mockServiceWorker.js" },
  });
  await fetch("/api/__ensure-seed");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>test mode</div>
  </StrictMode>
);
