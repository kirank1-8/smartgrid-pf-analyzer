import { useState, useEffect } from "react";

const GaugeArc = ({ pf }: { pf: number }) => {
  const clamped = Math.max(0, Math.min(1, pf));
  const angle = clamped * 180;
  const r = 60;
  const cx = 80, cy = 75;

  const toXY = (deg: number) => {
    const rad = ((deg - 180) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const start = toXY(0);
  const end = toXY(angle);
  const large = angle > 180 ? 1 : 0;

  const color = pf >= 0.95 ? "#00e5a0" : pf >= 0.8 ? "#ffb020" : "#ff4566";
  const trackColor = "rgba(255,255,255,0.06)";

  return (
    <svg viewBox="0 0 160 90" className="w-full max-w-[200px]">
      {/* Track */}
      <path
        d={`M ${toXY(0).x} ${toXY(0).y} A ${r} ${r} 0 1 1 ${toXY(180).x} ${toXY(180).y}`}
        fill="none" stroke={trackColor} strokeWidth="8" strokeLinecap="round"
      />
      {/* Fill */}
      {angle > 0 && (
        <path
          d={`M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`}
          fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      )}
      {/* Needle */}
      <line
        x1={cx} y1={cy}
        x2={cx + (r - 14) * Math.cos(((angle - 180) * Math.PI) / 180)}
        y2={cy + (r - 14) * Math.sin(((angle - 180) * Math.PI) / 180)}
        stroke={color} strokeWidth="2" strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${color})` }}
      />
      <circle cx={cx} cy={cy} r="3.5" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      {/* Labels */}
      <text x="14" y="82" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">0.0</text>
      <text x="72" y="22" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">0.5</text>
      <text x="132" y="82" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="Space Mono">1.0</text>
    </svg>
  );
};

export default function PFCalculator() {
  const [realPower, setRealPower] = useState(1000);
  const [apparentPower, setApparentPower] = useState(1200);
  const [animate, setAnimate] = useState(false);

  const pf = apparentPower > 0 ? Math.min(1, realPower / apparentPower) : 0;
  const reactivePower = Math.sqrt(Math.max(0, apparentPower ** 2 - realPower ** 2));

  const status = pf >= 0.95 ? "Excellent" : pf >= 0.8 ? "Good" : "Poor";
  const statusColor = pf >= 0.95 ? "text-emerald-400" : pf >= 0.8 ? "text-amber-400" : "text-rose-400";
  const statusBg = pf >= 0.95 ? "bg-emerald-500/10 border-emerald-500/25" : pf >= 0.8 ? "bg-amber-500/10 border-amber-500/25" : "bg-rose-500/10 border-rose-500/25";

  const capacitorKVAR = reactivePower / 1000;

  useEffect(() => {
    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(t);
  }, [pf]);

  return (
    <div className="rounded-xl border border-white/6 bg-[#0e0e12] p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold tracking-wider uppercase text-zinc-300">PF Calculator</h2>
          <p className="text-[11px] text-zinc-600 mt-0.5">Real-time power factor analysis</p>
        </div>
        <div className={`px-2.5 py-1 rounded-md border text-[11px] font-semibold mono tracking-wider ${statusBg} ${statusColor}`}>
          {status.toUpperCase()}
        </div>
      </div>

      {/* Gauge */}
      <div className="flex justify-center">
        <div className="relative flex flex-col items-center">
          <GaugeArc pf={pf} />
          <div className={`-mt-2 text-center transition-all duration-300 ${animate ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}>
            <div className={`mono text-4xl font-bold tracking-tight ${statusColor}`} style={{ textShadow: `0 0 20px currentColor` }}>
              {pf.toFixed(3)}
            </div>
            <div className="text-[11px] text-zinc-600 mt-0.5 tracking-widest uppercase">Power Factor</div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Real Power", unit: "W", value: realPower, set: setRealPower },
          { label: "Apparent Power", unit: "VA", value: apparentPower, set: setApparentPower },
        ].map(({ label, unit, value, set }) => (
          <div key={label} className="group">
            <label className="block text-[11px] font-medium text-zinc-500 tracking-wider uppercase mb-1.5">
              {label}
            </label>
            <div className="relative">
              <input
                type="number"
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full mono px-3 py-2.5 pr-10 rounded-lg bg-[#060608] border border-white/6 text-white text-sm
                  focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/15
                  hover:border-white/12 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 font-medium">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Reactive Power", value: `${reactivePower.toFixed(0)}`, unit: "VAR" },
          { label: "Capacitor Needed", value: `${capacitorKVAR.toFixed(2)}`, unit: "kVAR" },
          { label: "Phase Angle", value: `${(Math.acos(pf) * 180 / Math.PI).toFixed(1)}°`, unit: "" },
        ].map(({ label, value, unit }) => (
          <div key={label} className="rounded-lg bg-white/3 border border-white/5 p-3 text-center">
            <div className="mono text-sm font-bold text-zinc-200">{value}<span className="text-zinc-500 text-[10px] ml-0.5">{unit}</span></div>
            <div className="text-[10px] text-zinc-600 mt-1 leading-tight">{label}</div>
          </div>
        ))}
      </div>

      {/* Alert */}
      <div className={`rounded-lg border px-4 py-3 flex items-start gap-3 ${statusBg}`}>
        <span className={`text-sm mt-0.5 ${statusColor}`}>
          {status === "Excellent" ? "✓" : status === "Good" ? "⚡" : "⚠"}
        </span>
        <div>
          <p className={`text-xs font-semibold tracking-wide ${statusColor}`}>
            {status === "Excellent" ? "OPTIMAL OPERATION" : status === "Good" ? "MODERATE — CORRECTION ADVISED" : "CRITICAL — IMMEDIATE ACTION REQUIRED"}
          </p>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            {status === "Excellent"
              ? "No capacitor correction needed."
              : status === "Good"
              ? `Install ~${capacitorKVAR.toFixed(2)} kVAR capacitor bank to reach 0.95+`
              : `Severe reactive load. Install ${capacitorKVAR.toFixed(2)} kVAR immediately.`}
          </p>
        </div>
      </div>
    </div>
  );
}
