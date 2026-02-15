import CounterCard from "./CounterCard";

export default function CounterList({ counters, increment }) {
  console.log("CounterList rendered");

  return (
    <>
      {counters.map((count, i) => (
        <CounterCard
          key={i}
          index={i}
          value={count}
          onIncrement={() => increment(i)}
        />
      ))}
    </>
  );
}
