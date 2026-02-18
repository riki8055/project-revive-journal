import React from "react";

export default React.memo(function CounterButton({ increment, index }) {
  console.log("CounterButton rendered:", index);

  return <button onClick={() => increment(index)}>Increment</button>;
});
