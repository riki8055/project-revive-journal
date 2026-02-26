import { useEffect } from "react";

export default function InfiniteLoop() {
  const obj = { count: 1 };

  useEffect(() => {
    console.log("Effect running...");
  }, [obj]);

  return (
    <div>
      <h1>{obj.count}</h1>
    </div>
  );
}
