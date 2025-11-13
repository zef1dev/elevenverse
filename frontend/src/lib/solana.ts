import { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const endpoint = clusterApiUrl("devnet");
export const connection = new Connection(endpoint, "confirmed");

export async function getBalance(pubkey: PublicKey) {
  const lamports = await connection.getBalance(pubkey);
  return lamports / LAMPORTS_PER_SOL;
}

export async function airdrop(pubkey: PublicKey, sol = 1) {
  const sig = await connection.requestAirdrop(pubkey, sol * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(sig, "confirmed");
  return sig;
}

// small helper
export const abbrev = (s: string) => (s.length > 12 ? `${s.slice(0,4)}…${s.slice(-4)}` : s);
