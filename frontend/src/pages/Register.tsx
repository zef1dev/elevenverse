import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

const endpoint = clusterApiUrl("devnet");

const INSTALL_LINK: Record<string, string> = {
  Phantom: "https://phantom.app/download",
  Solflare: "https://solflare.com/download",
  Backpack: "https://backpack.app/downloads",
};

const ALLOWED = new Set(["Phantom", "Solflare", "Backpack"]);

const abbrev = (s: string) =>
  (s.length > 12 ? `${s.slice(0, 4)}…${s.slice(-4)}` : s);

async function getBalance(pubkey: PublicKey) {
  const conn = new Connection(endpoint, "confirmed");
  const lamports = await conn.getBalance(pubkey);
  return lamports / LAMPORTS_PER_SOL;
}

export default function Register() {
  const {
    wallets,
    wallet,
    select,
    connect,
    connected,
    publicKey,
    disconnect,
  } = useWallet();
  const navigate = useNavigate();

  const [pendingSelect, setPendingSelect] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const supported = wallets.filter((w) => ALLOWED.has(w.adapter.name));

  // Auto-connect after selecting a wallet
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

  // Load balance once connected
  useEffect(() => {
    if (connected && publicKey) {
      (async () => {
        try {
          const sol = await getBalance(publicKey);
          setBalance(sol);
        } catch (e) {
          console.error(e);
        }
      })();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey]);

  function handleSelect(name: string) {
    const w = supported.find((x) => x.adapter.name === name);
    if (!w) {
      window.open(INSTALL_LINK[name], "_blank");
      return;
    }

    const rs = w.readyState;
    const installed =
      rs === WalletReadyState.Installed || rs === WalletReadyState.Loadable;

    if (!installed) {
      window.open(INSTALL_LINK[name], "_blank");
      return;
    }

    // adapter.name already has the correct WalletName type
    select(w.adapter.name);
    setPendingSelect(name);
  }

  async function handleContinue() {
    const hasName = !!localStorage.getItem("ev:username");
    navigate(hasName ? "/dashboard" : "/profile");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-slate-100">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Eleven Verse</h1>
        {connected && (
          <button
            onClick={disconnect}
            className="text-sm text-slate-400 transition hover:text-emerald-300"
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
        <p className="mb-4 text-sm text-slate-300">Recommended wallets</p>
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
                className={`rounded-xl px-4 py-2 font-semibold transition ${
                  installed
                    ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                    : "bg-white/10 text-slate-300 hover:bg-white/15"
                }`}
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
            <p className="mt-1 text-slate-400">
              Devnet balance: {balance !== null ? balance.toFixed(3) : "0.000"}{" "}
              SOL
            </p>
            <button
              onClick={handleContinue}
              className="mt-4 rounded-xl bg-emerald-400 px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-300"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
