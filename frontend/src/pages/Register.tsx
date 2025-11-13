import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

const endpoint = clusterApiUrl("devnet");
const INSTALL_LINK: Record<string, string> = {
  Phantom: "https://phantom.app/download",
  Solflare: "https://solflare.com/download",
  Backpack: "https://backpack.app/downloads",
};
const ALLOWED = new Set(["Phantom", "Solflare", "Backpack"]);
const abbrev = (s: string) => (s.length > 12 ? `${s.slice(0, 4)}…${s.slice(-4)}` : s);

async function getBalance(pubkey: string) {
  const conn = new Connection(endpoint, "confirmed");
  const lamports = await conn.getBalance(new window.solanaWeb3.PublicKey(pubkey));
  return lamports / LAMPORTS_PER_SOL;
}

export default function Register() {
  const { wallets, wallet, select, connect, connected, publicKey, disconnect } = useWallet();
  const navigate = useNavigate();
  const [pendingSelect, setPendingSelect] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [balance, setBalance] = useState<number | null>(null);

  const supported = wallets.filter((w) => ALLOWED.has(w.adapter.name));

  useEffect(() => {
    if (pendingSelect && wallet?.adapter.name === pendingSelect) {
      (async () => {
        try {
          await connect();
        } catch (e) {
          console.error(e);
        } finally {
          setPendingSelect(null);
        }
      })();
    }
  }, [wallet, connect, pendingSelect]);

  useEffect(() => {
    if (connected && publicKey) {
      (async () => {
        const conn = new Connection(endpoint);
        const lamports = await conn.getBalance(publicKey);
        setBalance(lamports / LAMPORTS_PER_SOL);
        setStep(2);
      })();
    }
  }, [connected, publicKey]);

  function handleSelect(name: string) {
    const w = supported.find((x) => x.adapter.name === name);
    if (!w) return window.open(INSTALL_LINK[name], "_blank");

    const rs = w.readyState;
    const installed =
      rs === WalletReadyState.Installed || rs === WalletReadyState.Loadable;
    if (!installed) {
      window.open(INSTALL_LINK[name], "_blank");
      return;
    }
    select(name);
    setPendingSelect(name);
  }

  async function handleContinue() {
    const hasName = !!localStorage.getItem("ev:username");
    navigate(hasName ? "/dashboard" : "/profile");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-slate-100">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Eleven Verse</h1>
        {connected && (
          <button
            onClick={disconnect}
            className="text-sm text-slate-400 hover:text-emerald-300 transition"
          >
            Log out
          </button>
        )}
      </header>

      <h2 className="text-3xl font-bold">Create your account</h2>
      <p className="mt-2 text-slate-400">
        Choose a wallet to get started on Solana devnet.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <p className="text-sm text-slate-300 mb-4">Recommended wallets</p>
        <div className="flex flex-wrap gap-3">
          {["Phantom", "Solflare", "Backpack"].map((name) => {
            const w = supported.find((x) => x.adapter.name === name);
            const installed =
              w &&
              (w.readyState === WalletReadyState.Installed ||
                w.readyState === WalletReadyState.Loadable);
            return (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                className={`px-4 py-2 rounded-xl font-semibold ${
                  installed
                    ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                    : "bg-white/10 text-slate-300 hover:bg-white/15"
                } transition`}
              >
                {installed ? `Connect ${name}` : `Install ${name}`}
              </button>
            );
          })}
        </div>

        {connected && publicKey && (
          <div className="mt-6 text-sm">
            <p className="text-emerald-300">
              Connected: {abbrev(publicKey.toBase58())}
            </p>
            <p className="text-slate-400 mt-1">
              Devnet balance: {balance?.toFixed(3) || "0.000"} SOL
            </p>
            <button
              onClick={handleContinue}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
