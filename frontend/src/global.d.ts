export {};

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{
        publicKey: { toString(): string };
      }>;
      disconnect: () => Promise<void>;
      on?: (event: "connect" | "disconnect", handler: (...a: any[]) => void) => void;
    };
  }
}
