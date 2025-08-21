import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "@/app/router";
import "@/styles/globals.scss";

// MSW only for dev environment
if (import.meta.env.DEV) {
  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
  await fetch("/api/__ensure-seed");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<output>Cargando…</output>}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
