import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const abbrev = (s: string) =>
  (s.length > 12 ? `${s.slice(0, 4)}…${s.slice(-4)}` : s);

export default function Profile() {
  const { connected, publicKey, disconnect } = useWallet();
  const { connection } = useConnection();
  const navigate = useNavigate();

  const [balance, setBalance] = useState<number | null>(null);
  const [airdropping, setAirdropping] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("ev:username") || ""
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!connected) navigate("/register");
  }, [connected, navigate]);

  useEffect(() => {
    if (!publicKey) return;
    connection.getBalance(publicKey).then((lamports) => {
      setBalance(lamports / LAMPORTS_PER_SOL);
    });
  }, [publicKey, connection]);

  async function onAirdrop() {
    if (!publicKey) return;
    setAirdropping(true);
    const sig = await connection.requestAirdrop(
      publicKey,
      1 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(sig, "confirmed");
    const lamports = await connection.getBalance(publicKey);
    setBalance(lamports / LAMPORTS_PER_SOL);
    setAirdropping(false);
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      localStorage.setItem("ev:username", username.trim());
      navigate("/dashboard");
    } finally {
      // In practice you'll navigate away, but this keeps ESLint happy
      setSaving(false);
    }
  }

  async function handleLogout() {
    await disconnect();
    localStorage.removeItem("ev:username");
    navigate("/register");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-slate-100">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Eleven Verse</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-slate-400 transition hover:text-emerald-300"
        >
          Log out
        </button>
      </header>

      <h2 className="mb-2 text-3xl font-bold">Create your profile</h2>
      <p className="mb-8 text-slate-400">
        Fund your wallet (devnet) and choose a display name to continue.
      </p>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-emerald-300">
            Wallet: {publicKey ? abbrev(publicKey.toBase58()) : "—"}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Balance: {balance?.toFixed(3) || "0.000"} SOL
          </p>
          <button
            onClick={onAirdrop}
            disabled={airdropping}
            className="mt-3 rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:opacity-50"
          >
            {airdropping ? "Airdropping…" : "Airdrop 1 SOL"}
          </button>
        </div>

        <form
          onSubmit={onSave}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <label className="mb-2 block text-sm text-slate-300/90">
            Display name
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. MossCoach11"
            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 outline-none focus:border-emerald-400/60"
          />
          <button
            type="submit"
            disabled={saving}
            className="mt-4 rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-300 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save & Continue"}
          </button>
        </form>
      </div>
    </section>
  );
}
