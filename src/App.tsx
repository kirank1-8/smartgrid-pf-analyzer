import PFCalculator from "./components/PFCalculator";
import PFChart from "./components/PFChart";
import ThreePhaseCalculator from "./components/ThreePhaseCalculator";
import LiveClock from "./components/LiveClock";
import DownloadReport from "./components/DownloadReport";
import SystemProgress from "./components/SystemProgress";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">

      <div className="max-w-6xl mx-auto">

        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            SmartGrid PF Analyzer ⚡
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Industrial Power Factor Monitoring System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

          <div className="bg-zinc-900 rounded-2xl p-5 border border-green-500 glow-green">
            <p className="text-zinc-400">Efficiency</p>
            <h2 className="text-3xl font-bold text-green-400 mt-2">
              96%
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 border border-red-500 glow-red">
            <p className="text-zinc-400">Power Loss</p>
            <h2 className="text-3xl font-bold text-red-400 mt-2">
              4%
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 border border-yellow-500">
            <p className="text-zinc-400">Grid Health</p>
            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              Stable
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 border border-cyan-500 glow-blue">
            <p className="text-zinc-400">Energy Usage</p>
            <h2 className="text-3xl font-bold text-cyan-400 mt-2">
              12.5 kWh
            </h2>
          </div>

          <LiveClock />

        </div>

        <div className="mb-6 flex justify-end">
          <DownloadReport />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <PFCalculator />

          <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-4">
              System Status
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block mb-2">
                  Voltage (V)
                </label>

                <input
                  type="number"
                  placeholder="230"
                  className="w-full p-3 rounded-xl bg-black border border-zinc-700"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Current (A)
                </label>

                <input
                  type="number"
                  placeholder="12"
                  className="w-full p-3 rounded-xl bg-black border border-zinc-700"
                />
              </div>

              <div>
                <label className="block mb-2">
                  Frequency (Hz)
                </label>

                <input
                  type="number"
                  placeholder="50"
                  className="w-full p-3 rounded-xl bg-black border border-zinc-700"
                />
              </div>

              <div className="bg-black p-4 rounded-xl border border-zinc-700 text-yellow-400">
                Alert: Moderate PF
              </div>

            </div>

          </div>

        </div>

        <div className="mt-6">
          <PFChart />
        </div>

        <div className="mt-6">
          <ThreePhaseCalculator />
        </div>

        <div className="mt-6">
          <SystemProgress />
        </div>

      </div>

    </div>
  );
}