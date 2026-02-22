import { useState } from "react";
import CounterCard from "./CounterCard";

export default function Dashboard() {
  const [resetSignal, setResetSignal] = useState(0);

  console.log("Dashboard rendered");

  return (
    <div>
      <h1>Counter Dashboard</h1>
      {Array.from({ length: 10 }).map((_, i) => (
        <CounterCard key={i} index={i} resetSignal={resetSignal} />
      ))}

      <button onClick={() => setResetSignal((r) => r + 1)}>Reset All</button>
    </div>
  );
}
