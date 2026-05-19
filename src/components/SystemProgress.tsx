export default function SystemProgress() {

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        System Performance
      </h2>

      <div className="space-y-6">

        <div>
          <div className="flex justify-between mb-2">
            <span>Voltage Stability</span>
            <span>92%</span>
          </div>

          <div className="w-full bg-black rounded-full h-4">
            <div className="bg-green-500 h-4 rounded-full w-[92%] glow-green"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Current Balance</span>
            <span>85%</span>
          </div>

          <div className="w-full bg-black rounded-full h-4">
            <div className="bg-yellow-500 h-4 rounded-full w-[85%]"></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span>Grid Efficiency</span>
            <span>96%</span>
          </div>

          <div className="w-full bg-black rounded-full h-4">
            <div className="bg-cyan-500 h-4 rounded-full w-[96%] glow-blue"></div>
          </div>
        </div>

      </div>

    </div>
  );
}