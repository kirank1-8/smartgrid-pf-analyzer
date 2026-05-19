import { useState } from "react";

export default function ThreePhaseCalculator() {

  const [voltage, setVoltage] = useState(230);
  const [current, setCurrent] = useState(10);
  const [pf, setPf] = useState(0.85);
  const [frequency, setFrequency] = useState(50);

  const power =
    Math.sqrt(3) * voltage * current * pf;

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        Three-Phase Power Calculator
      </h2>

      <div className="space-y-4">

        <div>
          <label className="block mb-2">
            Voltage (V)
          </label>

          <input
            type="number"
            value={voltage}
            onChange={(e) =>
              setVoltage(Number(e.target.value))
            }
            className="w-full p-3 rounded-lg bg-black border border-zinc-700"
          />
        </div>

        <div>
          <label className="block mb-2">
            Current (A)
          </label>

          <input
            type="number"
            value={current}
            onChange={(e) =>
              setCurrent(Number(e.target.value))
            }
            className="w-full p-3 rounded-lg bg-black border border-zinc-700"
          />
        </div>

        <div>
          <label className="block mb-2">
            Power Factor
          </label>

          <input
            type="number"
            step="0.01"
            value={pf}
            onChange={(e) =>
              setPf(Number(e.target.value))
            }
            className="w-full p-3 rounded-lg bg-black border border-zinc-700"
          />
        </div>

        <div>
          <label className="block mb-2">
            Frequency (Hz)
          </label>

          <input
            type="number"
            value={frequency}
            onChange={(e) =>
              setFrequency(Number(e.target.value))
            }
            className="w-full p-3 rounded-lg bg-black border border-zinc-700"
          />
        </div>

      </div>

      <div className="mt-6 text-center">

        <p className="text-3xl font-bold text-green-400">
          {power.toFixed(2)} W
        </p>

        <p className="text-zinc-400 mt-2">
          Total Three-Phase Power
        </p>

      </div>

    </div>
  );
}