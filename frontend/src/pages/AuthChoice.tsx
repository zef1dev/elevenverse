import { Link } from "react-router-dom";


export default function AuthChoice() {
return (
<section className="mx-auto max-w-3xl px-4 py-16">
<h2 className="text-3xl font-bold">Welcome to Eleven Verse</h2>
<p className="mt-2 text-slate-300/90">Choose how you want to continue.</p>


<div className="mt-8 grid md:grid-cols-2 gap-4">
<Link to="/register" className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/15 p-6">
<h3 className="font-semibold text-lg">Register</h3>
<p className="mt-1 text-sm text-slate-300/90">New here? Create a profile and connect a wallet.</p>
</Link>
<a href="#" className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-6">
<h3 className="font-semibold text-lg">Login</h3>
<p className="mt-1 text-sm text-slate-300/90">Already have a wallet? You can connect it on the next screen.</p>
</a>
</div>
</section>
);
}