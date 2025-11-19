export {};

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{
        publicKey: { toString(): string; toBase58(): string };
      }>;
      disconnect: () => Promise<void>;
      on?: (
        event: "connect" | "disconnect",
        handler: (...args: unknown[]) => void
      ) => void;
    };
  }
}
