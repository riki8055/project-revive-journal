import { useState } from "react";
import Counter from "./Counter";

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
      {counters.map((count, i) => (
        <Counter
          key={i}
          index={i}
          value={count}
          onIncrement={() => increment(i)}
        />
      ))}
    </div>
  );
}
