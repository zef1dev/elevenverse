export {};

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{
        publicKey: {
          toString(): string;
          toBase58(): string; // modern Phantom returns a PublicKey
        };
      }>;
      disconnect: () => Promise<void>;
      on?: (
        event: "connect" | "disconnect",
        handler: (...args: unknown[]) => void
      ) => void;
    };
  }
}

// Allow TypeScript to import the browser polyfill “process” without error
declare module "process";
