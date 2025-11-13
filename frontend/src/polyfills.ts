// Robust Node builtins for browser (Vite 5)
import { Buffer } from "buffer";
import process from "process";

// Make Buffer available everywhere
// Some libs read window.Buffer, others globalThis.Buffer
(window as any).Buffer = (window as any).Buffer || Buffer;
(globalThis as any).Buffer = (globalThis as any).Buffer || Buffer;

// Process shim (used by some crypto libs)
(window as any).process = (window as any).process || process;
(globalThis as any).process = (globalThis as any).process || process;
