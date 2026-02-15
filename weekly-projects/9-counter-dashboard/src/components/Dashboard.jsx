import { useState } from "react";
import CounterList from "./CounterList";

export default function Dashboard() {
  console.log("Dashboard rendered");

  const [counters, setCounters] = useState(Array(10).fill(0));

  const increment = (index) => {
    const updated = [...counters];
    updated[index] += 1;
    setCounters(updated);
  };

  return (
    <div>
      <h1>Counter Dashboard</h1>
      <CounterList counters={counters} increment={increment} />
    </div>
  );
}
