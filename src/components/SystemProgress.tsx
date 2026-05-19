import { useEffect, useState } from "react";

const metrics = [
  { label: "Voltage Stability", value: 92, color: "#00e5a0", glow: "rgba(0,229,160,0.5)", icon: "V" },
  { label: "Current Balance", value: 85, color: "#ffb020", glow: "rgba(255,176,32,0.5)", icon: "A" },
  { label: "Grid Efficiency", value: 96, color: "#00d4ff", glow: "rgba(0,212,255,0.5)", icon: "η" },
  { label: "THD Compliance", value: 78, color: "#9b6dff", glow: "rgba(155,109,255,0.5)", icon: "~" },
  { label: "Load Factor", value: 88, color: "#ff6b35", glow: "rgba(255,107,53,0.5)", icon: "L" },
];

const Arc = ({ value, color, glow }: { value: number; color: string; glow: string }) => {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9">
      <circle cx={20} cy={20} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
      <circle
        cx={20} cy={20} r={r} fill="none"
        stroke={color} strokeWidth="3"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 20 20)"
        style={{ filter: `drop-shadow(0 0 4px ${glow})` }}
      />
    </svg>
  );
};

export default function SystemProgress() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const overall = Math.round(metrics.reduce((s, m) => s + m.value, 0) / metrics.length);

  return (
    <div className="space-y-4">
      {/* Overall score */}
      <div className="rounded-lg bg-white/3 border border-white/6 p-4 flex items-center gap-4">
        <div className="relative">
          <svg viewBox="0 0 80 80" className="w-16 h-16">
            <circle cx={40} cy={40} r={32} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
            <circle
              cx={40} cy={40} r={32} fill="none"
              stroke={overall >= 90 ? "#00e5a0" : overall >= 75 ? "#ffb020" : "#ff4566"}
              strokeWidth="5"
              strokeDasharray={`${(overall / 100) * 2 * Math.PI * 32} ${2 * Math.PI * 32}`}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
              style={{ filter: `drop-shadow(0 0 8px ${overall >= 90 ? "#00e5a0" : "#ffb020"})`, transition: "stroke-dasharray 1s ease" }}
            />
            <text x={40} y={40} textAnchor="middle" dominantBaseline="middle"
              fill={overall >= 90 ? "#00e5a0" : "#ffb020"}
              fontSize="16" fontWeight="700" fontFamily="Space Mono">{overall}</text>
            <text x={40} y={54} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">HEALTH</text>
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-200">System Health Score</p>
          <p className="text-[11px] text-zinc-600 mt-0.5">Composite of all metrics</p>
          <p className={`text-xs font-semibold mt-1.5 ${overall >= 90 ? "text-emerald-400" : overall >= 75 ? "text-amber-400" : "text-rose-400"}`}>
            {overall >= 90 ? "All Systems Nominal" : overall >= 75 ? "Minor Issues Detected" : "Attention Required"}
          </p>
        </div>
      </div>

      {/* Metric rows */}
      <div className="space-y-3">
        {metrics.map(({ label, value, color, glow, icon }, i) => (
          <div
            key={label}
            className="flex items-center gap-3 opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
          >
            <Arc value={value} color={color} glow={glow} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-zinc-300">{label}</span>
                <span className="mono text-xs font-semibold" style={{ color }}>{value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: visible ? `${value}%` : "0%",
                    background: `linear-gradient(90deg, ${color}88, ${color})`,
                    boxShadow: `0 0 6px ${glow}`,
                    transitionDelay: `${i * 100}ms`,
                  }}
                />
              </div>
            </div>
            <div className="w-6 h-6 rounded-md bg-white/4 border border-white/6 flex items-center justify-center">
              <span className="mono text-[10px] text-zinc-500">{icon}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
