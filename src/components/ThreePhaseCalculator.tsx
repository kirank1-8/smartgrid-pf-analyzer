import { useState } from "react";

const PhaseBar = ({ label, angle, color }: { label: string; angle: number; color: string }) => {
  const r = 38;
  const cx = 44, cy = 44;
  const rad = ((angle - 90) * Math.PI) / 180;
  const x2 = cx + r * Math.cos(rad);
  const y2 = cy + r * Math.sin(rad);
  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg viewBox="0 0 88 88" className="w-16 h-16">
        <circle cx={cx} cy={cy} r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="28" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={color} strokeWidth="2.5" strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
        <circle cx={cx} cy={cy} r="3" fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
        <circle cx={x2} cy={y2} r="2" fill={color} opacity={0.7} />
      </svg>
      <span className="text-[10px] font-semibold mono" style={{ color }}>{label}</span>
      <span className="text-[10px] text-zinc-600">{angle}°</span>
    </div>
  );
};

export default function ThreePhaseCalculator() {
  const [voltage, setVoltage] = useState(230);
  const [current, setCurrent] = useState(10);
  const [pf, setPf] = useState(0.85);
  const [frequency, setFrequency] = useState(50);

  const power = Math.sqrt(3) * voltage * current * pf;
  const apparentPower = Math.sqrt(3) * voltage * current;
  const reactivePower = Math.sqrt(Math.max(0, apparentPower ** 2 - power ** 2));
  const phaseAngle = Math.acos(Math.min(1, pf)) * 180 / Math.PI;
  const phaseAngles = [0, 120, 240].map((a) => (a + phaseAngle) % 360);

  const fields = [
    { label: "Line Voltage", unit: "V", value: voltage, set: setVoltage, step: 1 },
    { label: "Line Current", unit: "A", value: current, set: setCurrent, step: 0.1 },
    { label: "Power Factor", unit: "cos φ", value: pf, set: setPf, step: 0.01 },
    { label: "Frequency", unit: "Hz", value: frequency, set: setFrequency, step: 1 },
  ];

  const pfColor = pf >= 0.95 ? "#00e5a0" : pf >= 0.8 ? "#ffb020" : "#ff4566";

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3">
        {fields.map(({ label, unit, value, set, step }) => (
          <div key={label}>
            <label className="block text-[11px] font-medium text-zinc-500 tracking-wider uppercase mb-1.5">{label}</label>
            <div className="relative">
              <input
                type="number"
                step={step}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full mono px-3 py-2.5 pr-12 rounded-lg bg-[#060608] border border-white/6 text-white text-sm
                  focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/15
                  hover:border-white/12 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Phasors */}
      <div className="rounded-lg bg-white/2 border border-white/5 p-4">
        <p className="text-[10px] text-zinc-600 tracking-widest uppercase mb-3">Phase Diagram</p>
        <div className="flex justify-around">
          {["L1", "L2", "L3"].map((l, i) => (
            <PhaseBar
              key={l}
              label={l}
              angle={Math.round(phaseAngles[i])}
              color={["#00d4ff", "#00e5a0", "#9b6dff"][i]}
            />
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Active Power", value: `${(power / 1000).toFixed(2)}`, unit: "kW", color: pfColor },
          { label: "Apparent Power", value: `${(apparentPower / 1000).toFixed(2)}`, unit: "kVA", color: "#00d4ff" },
          { label: "Reactive Power", value: `${(reactivePower / 1000).toFixed(2)}`, unit: "kVAR", color: "#ffb020" },
        ].map(({ label, value, unit, color }) => (
          <div key={label} className="rounded-lg bg-white/3 border border-white/5 p-3 text-center">
            <div className="mono text-sm font-bold" style={{ color }}>{value}<span className="text-zinc-500 text-[10px] ml-0.5">{unit}</span></div>
            <div className="text-[10px] text-zinc-600 mt-1 leading-tight">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
