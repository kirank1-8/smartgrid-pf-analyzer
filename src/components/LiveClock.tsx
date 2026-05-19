import { useEffect, useState } from "react";

export default function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const h = pad(time.getHours());
  const m = pad(time.getMinutes());
  const s = pad(time.getSeconds());

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 bg-white/3">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-dot" />
      <span className="mono text-xs text-cyan-300 tracking-widest">
        {h}<span className="animate-blink text-cyan-500/60">:</span>{m}<span className="animate-blink text-cyan-500/60">:</span>{s}
      </span>
      <span className="text-[10px] text-zinc-600 hidden sm:block">
        {time.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </span>
    </div>
  );
}
