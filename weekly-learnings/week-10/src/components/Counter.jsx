import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const doubleCount = count * 2;
  const isEven = count % 2 === 0;

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double: {doubleCount}</h2>
      <h3>{isEven ? "Even" : "Odd"}</h3>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
