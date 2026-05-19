import { useEffect, useState, useRef } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const pf = payload[0]?.value;
  const color = pf >= 0.95 ? "#00e5a0" : pf >= 0.8 ? "#ffb020" : "#ff4566";
  return (
    <div className="rounded-lg border border-white/10 bg-[#14141a]/95 backdrop-blur px-3 py-2 text-xs">
      <p className="text-zinc-500 mono mb-1">T+{label}s</p>
      <p className="font-semibold mono" style={{ color }}>PF = {pf?.toFixed(3)}</p>
    </div>
  );
};

export default function PFChart() {
  const [data, setData] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      time: i + 1,
      pf: parseFloat((0.78 + Math.random() * 0.2).toFixed(3)),
    }))
  );
  const [paused, setPaused] = useState(false);
  const counterRef = useRef(21);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      const newPF = parseFloat((0.75 + Math.random() * 0.25).toFixed(3));
      setData((prev) => [
        ...prev.slice(1),
        { time: counterRef.current++, pf: newPF },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, [paused]);

  const latest = data[data.length - 1]?.pf ?? 0;
  const avg = parseFloat((data.reduce((s, d) => s + d.pf, 0) / data.length).toFixed(3));
  const min = parseFloat(Math.min(...data.map((d) => d.pf)).toFixed(3));
  const max = parseFloat(Math.max(...data.map((d) => d.pf)).toFixed(3));

  const latestColor = latest >= 0.95 ? "#00e5a0" : latest >= 0.8 ? "#ffb020" : "#ff4566";
  const gradientId = "pfGradient";

  return (
    <div className="space-y-4">
      {/* Mini stat row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Current", val: latest, color: latestColor },
          { label: "Average", val: avg, color: "#00d4ff" },
          { label: "Min", val: min, color: "#ff4566" },
          { label: "Max", val: max, color: "#00e5a0" },
        ].map(({ label, val, color }) => (
          <div key={label} className="rounded-lg bg-white/3 border border-white/5 px-3 py-2.5">
            <div className="text-[10px] text-zinc-600 tracking-widest uppercase mb-1">{label}</div>
            <div className="mono text-base font-bold" style={{ color }}>{val.toFixed(3)}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="relative h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 6" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: "#4a4a60", fontSize: 10, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} />
            <YAxis domain={[0.7, 1.0]} tickCount={4} tick={{ fill: "#4a4a60", fontSize: 10, fontFamily: "Space Mono" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0.95} stroke="#00e5a0" strokeDasharray="4 4" strokeOpacity={0.4} label={{ value: "0.95", fill: "#00e5a040", fontSize: 9, fontFamily: "Space Mono" }} />
            <ReferenceLine y={0.8} stroke="#ffb020" strokeDasharray="4 4" strokeOpacity={0.35} label={{ value: "0.80", fill: "#ffb02040", fontSize: 9, fontFamily: "Space Mono" }} />
            <Area type="monotone" dataKey="pf" stroke="#00d4ff" strokeWidth={2} fill={`url(#${gradientId})`} dot={false} activeDot={{ r: 4, fill: "#00d4ff", stroke: "#060608", strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-[10px] text-zinc-600">
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-px bg-emerald-500/50 inline-block" style={{ borderTop: "1px dashed" }} />
            Optimal (0.95)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-6 h-px bg-amber-500/50 inline-block" />
            Warning (0.80)
          </span>
        </div>
        <button
          onClick={() => setPaused((p) => !p)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-medium border transition-all
            ${paused
              ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25"
              : "bg-white/4 border-white/8 text-zinc-400 hover:border-white/15"}`}
        >
          {paused ? (
            <><svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor"><path d="M2 2l8 4-8 4V2z"/></svg> Resume</>
          ) : (
            <><svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor"><rect x="2" y="2" width="3" height="8"/><rect x="7" y="2" width="3" height="8"/></svg> Pause</>
          )}
        </button>
      </div>
    </div>
  );
}
