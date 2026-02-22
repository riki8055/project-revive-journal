import CounterCard from "./CounterCard";

export default function Dashboard() {
  console.log("Dashboard rendered");

  return (
    <div>
      <h1>Counter Dashboard</h1>
      {Array.from({ length: 10 }).map((_, i) => (
        <CounterCard key={i} index={i} />
      ))}
    </div>
  );
}
