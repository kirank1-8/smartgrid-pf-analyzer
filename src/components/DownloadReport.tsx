import { useState } from "react";

export default function DownloadReport() {
  const [downloading, setDownloading] = useState(false);

  const downloadReport = () => {
    setDownloading(true);

    const now = new Date();
    const report = `
╔══════════════════════════════════════════════════════╗
║         SMARTGRID PF ANALYZER — SYSTEM REPORT        ║
╠══════════════════════════════════════════════════════╣
║  Generated  : ${now.toLocaleString().padEnd(38)}║
║  Version    : 2.0.0                                  ║
╠══════════════════════════════════════════════════════╣
║  ELECTRICAL PARAMETERS                               ║
║  System Voltage    : 230 V                           ║
║  System Current    : 12 A                            ║
║  Frequency         : 50 Hz                           ║
╠══════════════════════════════════════════════════════╣
║  POWER FACTOR METRICS                                ║
║  Real Power        : 1000 W                          ║
║  Apparent Power    : 1200 VA                         ║
║  Power Factor      : 0.83                            ║
║  PF Status         : GOOD                            ║
╠══════════════════════════════════════════════════════╣
║  SYSTEM HEALTH                                       ║
║  Grid Health       : STABLE                          ║
║  Efficiency        : 96%                             ║
║  Power Loss        : 4%                              ║
║  Energy Usage      : 12.5 kWh                        ║
╠══════════════════════════════════════════════════════╣
║  RECOMMENDATIONS                                     ║
║  • Consider small capacitor bank installation        ║
║  • Monitor current balance (85%)                     ║
║  • Schedule next maintenance within 30 days          ║
╚══════════════════════════════════════════════════════╝
    `.trim();

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SmartGrid_Report_${now.toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <button
      onClick={downloadReport}
      disabled={downloading}
      className="relative group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200
        bg-cyan-500/10 border border-cyan-500/30 text-cyan-400
        hover:bg-cyan-500/20 hover:border-cyan-400/60 hover:text-cyan-300
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg
        className={`w-3.5 h-3.5 transition-transform ${downloading ? "animate-bounce" : "group-hover:-translate-y-0.5"}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
      >
        {downloading
          ? <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-4-4l4 4 4-4" />
          : <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        }
      </svg>
      {downloading ? "Generating…" : "Export Report"}
    </button>
  );
}
