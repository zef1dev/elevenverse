import { Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthChoice from "./pages/AuthChoice";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <nav className="sticky top-0 z-40 backdrop-blur bg-slate-950/40 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-bold text-lg">Eleven Verse</Link>
          <div className="text-sm opacity-70">
            <Link to="/register" className="hover:text-emerald-300">Play</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthChoice />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
