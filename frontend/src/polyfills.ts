// Robust Node builtins for browser (Vite 5)
import { Buffer } from "buffer";
import process from "process";

// Make Buffer & process available without using "any"

type BufferProcessWindow = typeof window & {
  Buffer?: typeof Buffer;
  process?: typeof process;
};

type BufferProcessGlobal = typeof globalThis & {
  Buffer?: typeof Buffer;
  process?: typeof process;
};

const w = window as BufferProcessWindow;
const g = globalThis as BufferProcessGlobal;

// Buffer shim
w.Buffer = w.Buffer ?? Buffer;
g.Buffer = g.Buffer ?? Buffer;

// Process shim
w.process = w.process ?? process;
g.process = g.process ?? process;
