import React, { useState } from "react";

const ChildA = React.memo(function ChildA({ label, onClick }) {
  console.log("Child A rendered");
  return <button onClick={onClick}>{label}</button>;
});

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

  function handleClick() {
    console.log("clicked");
  }

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <div>
        <ChildA label="Static Label" onClick={handleClick} />
        <ChildB />
        <ChildC />
      </div>
    </div>
  );
}
