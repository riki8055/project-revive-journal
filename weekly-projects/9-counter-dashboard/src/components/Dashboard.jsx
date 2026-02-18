import { useCallback, useState } from "react";
import CounterList from "./CounterList";

export default function Dashboard() {
  console.log("Dashboard rendered");

  const [counters, setCounters] = useState(Array(10).fill(0));

  const increment = useCallback((index) => {
    setCounters((prev) => {
      const updated = [...prev];
      updated[index] += 1;
      return updated;
    });
  }, []);

  return (
    <div>
      <h1>Counter Dashboard</h1>
      <CounterList counters={counters} increment={increment} />
    </div>
  );
}
