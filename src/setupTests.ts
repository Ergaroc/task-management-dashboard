// React testing library
import "@testing-library/jest-dom";
// Utils
import { TextEncoder, TextDecoder } from "util";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;
