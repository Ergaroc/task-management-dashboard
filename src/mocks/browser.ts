// Msw
import { setupWorker } from "msw/browser";
// Handlers
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
