import { useState } from "react";

export default function PFCalculator() {

  const [realPower, setRealPower] = useState(1000);
  const [apparentPower, setApparentPower] = useState(1200);

  const pf = realPower / apparentPower;

  let status = "";

  if (pf >= 0.95) {
    status = "Excellent";
  } else if (pf >= 0.8) {
    status = "Good";
  } else {
    status = "Poor";
  }

  let alertMessage = "";

  if (pf < 0.8) {
    alertMessage = "⚠️ Critical: Low Power Factor";
  } else if (pf < 0.95) {
    alertMessage = "⚡ Warning: Moderate Power Factor";
  } else {
    alertMessage = "✅ System Operating Efficiently";
  }

  let capacitorSuggestion = "";

  if (pf >= 0.95) {
    capacitorSuggestion = "No capacitor correction needed.";
  } else if (pf >= 0.8) {
    capacitorSuggestion = "Recommend small capacitor bank.";
  } else {
    capacitorSuggestion = "Immediate PF correction required.";
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg w-full max-w-md">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Power Factor Calculator
      </h2>

      <div className="mb-4">
        <label className="block mb-2">
          Real Power (W)
        </label>

        <input
          type="number"
          value={realPower}
          onChange={(e) => setRealPower(Number(e.target.value))}
          className="w-full p-3 rounded-lg bg-black border border-zinc-700"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Apparent Power (VA)
        </label>

        <input
          type="number"
          value={apparentPower}
          onChange={(e) => setApparentPower(Number(e.target.value))}
          className="w-full p-3 rounded-lg bg-black border border-zinc-700"
        />
      </div>

      <div className="mt-6 text-center">

        <p className="text-3xl font-bold">
          PF = {pf.toFixed(2)}
        </p>

        <p
          className={`mt-3 text-lg font-semibold ${
            status === "Excellent"
              ? "text-green-400"
              : status === "Good"
              ? "text-yellow-400"
              : "text-red-400"
          }`}
        >
          Status: {status}
        </p>

        <div className="mt-4 bg-black border border-zinc-700 rounded-xl p-4">
          {alertMessage}
        </div>

        <div className="mt-4 bg-black border border-green-700 rounded-xl p-4">

          <p className="text-green-400 font-semibold">
            Capacitor Recommendation
          </p>

          <p className="mt-2 text-zinc-300">
            {capacitorSuggestion}
          </p>

        </div>

      </div>

    </div>
  );
}