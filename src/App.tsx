import { useState } from "react";
import PFCalculator from "./components/PFCalculator";
import PFChart from "./components/PFChart";
import ThreePhaseCalculator from "./components/ThreePhaseCalculator";
import LiveClock from "./components/LiveClock";
import DownloadReport from "./components/DownloadReport";
import SystemProgress from "./components/SystemProgress";

// ── KPI Card ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  accent: "green" | "red" | "amber" | "cyan" | "violet";
  icon: string;
  trend?: string;
  trendUp?: boolean;
}

const accentMap = {
  green:  { border: "border-emerald-500/20", text: "text-emerald-400", bg: "bg-emerald-500/5",  bar: "#00e5a0", glow: "rgba(0,229,160,0.3)" },
  red:    { border: "border-rose-500/20",    text: "text-rose-400",    bg: "bg-rose-500/5",     bar: "#ff4566", glow: "rgba(255,69,102,0.3)" },
  amber:  { border: "border-amber-500/20",   text: "text-amber-400",   bg: "bg-amber-500/5",    bar: "#ffb020", glow: "rgba(255,176,32,0.3)" },
  cyan:   { border: "border-cyan-500/20",    text: "text-cyan-400",    bg: "bg-cyan-500/5",     bar: "#00d4ff", glow: "rgba(0,212,255,0.3)" },
  violet: { border: "border-violet-500/20",  text: "text-violet-400",  bg: "bg-violet-500/5",   bar: "#9b6dff", glow: "rgba(155,109,255,0.3)" },
};

const StatCard = ({ label, value, unit, accent, icon, trend, trendUp }: StatCardProps) => {
  const c = accentMap[accent];
  return (
    <div className={`relative rounded-xl border ${c.border} ${c.bg} p-5 flex flex-col gap-3 overflow-hidden group hover:border-opacity-60 transition-all duration-300`}>
      {/* top corner glow */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-600">{label}</span>
        <span className={`text-base ${c.text} opacity-70`}>{icon}</span>
      </div>
      <div className="flex items-end gap-1.5">
        <span className={`mono text-3xl font-bold tabular-nums ${c.text}`} style={{ textShadow: `0 0 16px ${c.glow}` }}>
          {value}
        </span>
        {unit && <span className="text-xs text-zinc-600 mb-1 font-medium">{unit}</span>}
      </div>
      {trend && (
        <p className={`text-[10px] font-medium ${trendUp ? "text-emerald-500" : "text-rose-500"}`}>
          {trendUp ? "↑" : "↓"} {trend}
        </p>
      )}
      {/* bottom bar */}
      <div className="absolute bottom-0 left-0 h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${c.bar}60, transparent)` }} />
    </div>
  );
};

// ── System Status Panel ───────────────────────────────────────────────────────
const SystemStatusPanel = () => {
  const [values, setValues] = useState({ voltage: "", current: "", frequency: "" });

  const fields = [
    { key: "voltage",   label: "Voltage",   unit: "V",  placeholder: "230" },
    { key: "current",   label: "Current",   unit: "A",  placeholder: "12" },
    { key: "frequency", label: "Frequency", unit: "Hz", placeholder: "50" },
  ] as const;

  const v = parseFloat(values.voltage || "230");
  const i = parseFloat(values.current || "12");
  const f = parseFloat(values.frequency || "50");

  const apparentPower = (v * i / 1000).toFixed(2);
  const nominalOk = v >= 210 && v <= 250 && i >= 0 && i <= 16 && f >= 49.5 && f <= 50.5;

  return (
    <div className="rounded-xl border border-white/6 bg-[#0e0e12] p-6 flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-300">System Status</h2>
          <p className="text-[11px] text-zinc-600 mt-0.5">Live electrical readings</p>
        </div>
        <div className={`flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border font-semibold
          ${nominalOk ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" : "text-amber-400 bg-amber-500/10 border-amber-500/25"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${nominalOk ? "bg-emerald-400" : "bg-amber-400"} animate-pulse-dot`} />
          {nominalOk ? "Nominal" : "Check"}
        </div>
      </div>

      <div className="space-y-4">
        {fields.map(({ key, label, unit, placeholder }) => (
          <div key={key}>
            <div className="flex justify-between mb-1.5">
              <label className="text-[11px] font-medium text-zinc-500 tracking-wider uppercase">{label}</label>
              <span className="text-[10px] text-zinc-700 mono">{unit}</span>
            </div>
            <input
              type="number"
              placeholder={placeholder}
              value={values[key]}
              onChange={(e) => setValues((p) => ({ ...p, [key]: e.target.value }))}
              className="w-full mono px-3 py-2.5 rounded-lg bg-[#060608] border border-white/6 text-white text-sm
                placeholder:text-zinc-700 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/15
                hover:border-white/12 transition-colors"
            />
          </div>
        ))}
      </div>

      {/* Computed */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white/3 border border-white/5 px-3 py-2.5">
          <div className="text-[10px] text-zinc-600 tracking-widest uppercase mb-1">Apparent</div>
          <div className="mono text-sm font-bold text-cyan-400">{apparentPower} <span className="text-zinc-600 text-[10px]">kVA</span></div>
        </div>
        <div className="rounded-lg bg-white/3 border border-white/5 px-3 py-2.5">
          <div className="text-[10px] text-zinc-600 tracking-widest uppercase mb-1">Frequency</div>
          <div className={`mono text-sm font-bold ${f >= 49.5 && f <= 50.5 ? "text-emerald-400" : "text-rose-400"}`}>
            {f.toFixed(1)} <span className="text-zinc-600 text-[10px]">Hz</span>
          </div>
        </div>
      </div>

      {/* Alert */}
      <div className={`mt-auto rounded-lg border px-4 py-3 flex items-start gap-3 ${nominalOk ? "bg-emerald-500/5 border-emerald-500/20" : "bg-amber-500/5 border-amber-500/20"}`}>
        <span className={`text-sm mt-0.5 ${nominalOk ? "text-emerald-400" : "text-amber-400"}`}>{nominalOk ? "✓" : "⚠"}</span>
        <div>
          <p className={`text-xs font-semibold tracking-wide ${nominalOk ? "text-emerald-400" : "text-amber-400"}`}>
            {nominalOk ? "ALL PARAMETERS NOMINAL" : "MODERATE PF ALERT"}
          </p>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            {nominalOk ? "System operating within IEC 61000 standards." : "Power factor below optimal threshold. Consider correction."}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<"overview" | "analysis">("overview");

  return (
    <div className="min-h-screen bg-[#060608] text-white font-sans antialiased grid-bg">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#080809]/90 px-6 py-3.5 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                <path d="M10 2L3 7v6l7 5 7-5V7l-7-5z" stroke="#00d4ff" strokeWidth="1.5" fill="rgba(0,212,255,0.1)" />
                <path d="M10 8v4M8 10h4" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-white leading-none">SmartGrid PF Analyzer</h1>
              <p className="text-[10px] text-zinc-600 mt-0.5 tracking-wide">Industrial Power Factor Monitoring</p>
            </div>
          </div>

          {/* Tabs (desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-white/3 border border-white/6 rounded-lg p-1">
            {(["overview", "analysis"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-xs font-medium tracking-wider uppercase transition-all duration-200
                  ${activeTab === tab ? "bg-white/8 text-white border border-white/10" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              Live Feed
            </div>
            <LiveClock />
            <DownloadReport />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Efficiency"    value="96"   unit="%" accent="green"  icon="◎" trend="2.1% vs last hour" trendUp={true} />
          <StatCard label="Power Loss"    value="4"    unit="%" accent="red"    icon="▲" trend="0.3% vs last hour" trendUp={false} />
          <StatCard label="Grid Health"   value="Stable"       accent="amber"  icon="◈" />
          <StatCard label="Energy Usage"  value="12.5" unit="kWh" accent="cyan" icon="◉" trend="Today" />
        </div>

        {/* Main 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <PFCalculator />
          <SystemStatusPanel />
        </div>

        {/* Chart */}
        <div className="rounded-xl border border-white/6 bg-[#0e0e12] p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-300">PF Trend</h2>
              <p className="text-[11px] text-zinc-600 mt-0.5">Last 20 readings · 2s interval</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-zinc-600">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-dot" />
              Real-time
            </div>
          </div>
          <PFChart />
        </div>

        {/* Bottom 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl border border-white/6 bg-[#0e0e12] p-6">
            <div className="mb-5">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-300">Three-Phase Analysis</h2>
              <p className="text-[11px] text-zinc-600 mt-0.5">√3 · V · I · cos φ calculation</p>
            </div>
            <ThreePhaseCalculator />
          </div>
          <div className="rounded-xl border border-white/6 bg-[#0e0e12] p-6">
            <div className="mb-5">
              <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-300">System Progress</h2>
              <p className="text-[11px] text-zinc-600 mt-0.5">Performance metrics overview</p>
            </div>
            <SystemProgress />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/4 mt-8 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-zinc-700">
          <div className="flex items-center gap-3">
            <span className="mono">SmartGrid PF Analyzer v2.0</span>
            <span className="w-px h-3 bg-zinc-800" />
            <span>IEC 61000 · IEEE 519 Compliant</span>
          </div>
          <span className="mono">© {new Date().getFullYear()} Industrial Monitoring Systems</span>
        </div>
      </footer>
    </div>
  );
}
