import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { publicKey, disconnect } = useWallet();
  const name = localStorage.getItem("ev:username") || "Manager";
  const navigate = useNavigate();

  async function handleLogout() {
    await disconnect();
    localStorage.removeItem("ev:username");
    navigate("/register");
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-slate-100">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Eleven Verse</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-400 hover:text-emerald-300 transition"
        >
          Log out
        </button>
      </header>

      <h2 className="text-3xl font-bold">Welcome, {name}!</h2>
      <p className="mt-2 text-slate-400">
        Wallet: {publicKey ? publicKey.toBase58() : "Not connected"}
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-slate-300">
          ✅ You’re successfully connected to Solana devnet.
        </p>
        <p className="text-slate-400 mt-2">
          This is your Eleven Verse dashboard — soon, you’ll manage players, NFTs,
          and upcoming matches here.
        </p>
      </div>
    </section>
  );
}
