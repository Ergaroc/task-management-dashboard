// React
import { StrictMode, Suspense } from "react";
// React-DOM
import { createRoot } from "react-dom/client";
// React-router
import { RouterProvider } from "react-router";
import { router } from "@/app/router";
// Atoms
import { LoaderSpinner } from "./ui/atoms";
// Styles
import "@/styles/globals.scss";

// MSW only for dev environment
if (import.meta.env.DEV) {
  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
  await fetch("/api/__ensure-seed");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <output>
          <LoaderSpinner size={64} />
        </output>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
