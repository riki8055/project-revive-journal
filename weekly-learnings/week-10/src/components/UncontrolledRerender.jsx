import { useState } from "react";

function ChildA({ label }) {
  console.log("Child A rendered");
  return <h2>{label}</h2>;
}

function ChildB() {
  console.log("Child B rendered");
  return <h2>Child B</h2>;
}

function ChildC() {
  console.log("Child C rendered");
  return <h2>Child C</h2>;
}

export default function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <ChildA label="Static Label" />
      <ChildB />
      <ChildC />
    </div>
  );
}
