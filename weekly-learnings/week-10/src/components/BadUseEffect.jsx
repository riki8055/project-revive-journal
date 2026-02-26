import { useEffect } from "react";

export default function InfiniteLoop() {
  const logSomething = () => {
    console.log("Hello");
  };

  useEffect(() => {
    console.log("Effect running...");
  }, [logSomething]);

  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
