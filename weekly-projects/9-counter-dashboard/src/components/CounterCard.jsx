import CounterButton from "./CounterButton";

export default function CounterCard({ value, onIncrement, index }) {
  console.log("CounterCard rendered:", index);

  return (
    <div style={{ margin: "10px", border: "1px solid gray", padding: "10px" }}>
      <h3>Counter {index}</h3>
      <p>Value: {value}</p>
      <CounterButton index={index} onIncrement={onIncrement} />
    </div>
  );
}
