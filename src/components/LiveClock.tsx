import { useEffect, useState } from "react";

export default function LiveClock() {

  const [time, setTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (
    <div className="bg-zinc-900 rounded-2xl p-5 border border-blue-500 glow-blue">

      <p className="text-zinc-400">
        System Time
      </p>

      <h2 className="text-3xl font-bold text-blue-400 mt-2">
        {time.toLocaleTimeString()}
      </h2>

      <p className="text-zinc-500 mt-2">
        {time.toDateString()}
      </p>

    </div>
  );
}