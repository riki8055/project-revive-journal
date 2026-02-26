import { useEffect, useState } from "react";

export default function InfiniteLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
}
