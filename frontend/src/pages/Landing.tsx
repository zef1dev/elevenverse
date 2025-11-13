import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const onPlayClick = () => navigate("/auth");

  return (
    <>
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[32rem] w-[32rem] bg-emerald-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-40 left-10 h-[28rem] w-[28rem] bg-cyan-500/10 blur-3xl rounded-full" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 grid gap-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300/90 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full">
              New • Web3 Football Manager
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-black leading-tight">
              Play. Build.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                Own the Game
              </span>
              .
            </h1>
            <p className="mt-5 text-slate-300/90 text-lg">
              Eleven Verse is a decentralized football universe on Solana. Mint unique player NFTs, simulate matches, and climb the global ladder — with on-chain fairness.
            </p>

            <div className="mt-8">
              <button
                onClick={onPlayClick}
                className="px-8 py-4 rounded-2xl bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition"
              >
                Play Game
              </button>
              <p className="text-xs text-slate-400 mt-2">
                You’ll choose a wallet or register on the next step.
              </p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-4" id="features">
            {[
              { title: "True Ownership", desc: "Each footballer is an on-chain NFT with unique attributes and value." },
              { title: "Fast & Low-Cost", desc: "Built on Solana for instant, affordable gameplay at scale." },
              { title: "Fair Match Logic", desc: "Anchor smart contracts ensure transparent results and progression." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-300/90">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          {[
            { n: 1, title: "Connect", desc: "Use Phantom or any Solana wallet." },
            { n: 2, title: "Mint Player", desc: "Generate a unique NFT footballer." },
            { n: 3, title: "Play Match", desc: "Simulate matches and earn XP." },
            { n: 4, title: "Climb", desc: "Rank up on the global ladder." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-emerald-300 text-sm">Step {s.n}</div>
              <div className="mt-2 font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-slate-300/90">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MINT CTA */}
      <section id="mint" className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Mint your first player</h3>
              <p className="mt-3 text-slate-300/90">
                Kick off your journey by generating a procedurally-rolled footballer. Attributes like pace, vision, power and luck shape your playstyle.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={onPlayClick}
                  className="px-5 py-3 rounded-2xl bg-emerald-400 text-slate-900 font-semibold hover:bg-emerald-300 transition"
                >
                  Generate Player
                </button>
                <a
                  href="#roadmap"
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 font-medium"
                >
                  View Roadmap
                </a>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-slate-300/70">
              <div className="text-center px-6">
                <div className="text-6xl">⚽️</div>
                <p className="mt-2 text-sm">Player card preview area</p>
                <p className="text-xs">(Hook this to the NFT later)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold">MVP Roadmap</h2>
        <ol className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            {
              title: "Phase 1 — Core MVP",
              pts: ["Play button connect", "Mint player NFT", "Simple match sim", "Leaderboard (client)"],
            },
            { title: "Phase 2 — Progression", pts: ["XP & leveling", "Basic training", "Match history on-chain"] },
            { title: "Phase 3 — Economy", pts: ["Market for players", "Seasons & cups", "Rewards & cosmetics"] },
          ].map((p) => (
            <li key={p.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold">{p.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-300/90 list-disc pl-5">
                {p.pts.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
