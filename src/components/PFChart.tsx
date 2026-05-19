import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function PFChart() {

  const [data, setData] = useState([
    { time: "1", pf: 0.82 },
    { time: "2", pf: 0.85 },
    { time: "3", pf: 0.78 },
    { time: "4", pf: 0.91 },
    { time: "5", pf: 0.95 },
  ]);

  useEffect(() => {

    const interval = setInterval(() => {

      const newPF = Number((0.75 + Math.random() * 0.25).toFixed(2));

      setData((prevData) => {

        const updated = [
          ...prevData.slice(1),
          {
            time: `${prevData.length + 1}`,
            pf: newPF,
          },
        ];

        return updated;
      });

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        Live PF Graph
      </h2>

      <div className="w-full h-[300px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis domain={[0.7, 1]} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="pf"
              stroke="#22c55e"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}