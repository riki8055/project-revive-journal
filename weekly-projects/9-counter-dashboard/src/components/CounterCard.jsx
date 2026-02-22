import { useState } from "react";

export default function CounterCard({ index }) {
  const [count, setCount] = useState(0);

  console.log("CounterCard rendered:", index);

  return (
    <div style={{ margin: "10px", border: "1px solid gray", padding: "10px" }}>
      <h3>Counter {index}</h3>
      <p>Value: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
