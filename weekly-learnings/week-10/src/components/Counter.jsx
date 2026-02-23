import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [doubleCount, setDoubleCount] = useState(0);
  const [isEven, setIsEven] = useState(true);

  const handleIncrement = () => {
    setCount(count + 1);

    // Update related states separately
    setDoubleCount((count + 1) * 2);
    setIsEven((count + 1) % 2 === 0);

    console.log("Count right after set:", count);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Double: {doubleCount}</h2>
      <h3>{isEven ? "Even" : "Odd"}</h3>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
