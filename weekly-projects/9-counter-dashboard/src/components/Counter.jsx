import React, { useState } from "react";

function Counter() {
  console.log("Counter function executed");

  const [count, setCount] = useState(0);

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Count: ", count),
    React.createElement(
      "button",
      {
        onClick: () => setCount(count + 1),
      },
      "Increment",
    ),
  );
}

export default Counter;
