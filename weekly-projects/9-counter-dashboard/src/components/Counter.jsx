export default function Counter({ value, onIncrement, index }) {
  console.log("Counter rendered:", index);

  return (
    <div style={{ margin: "10px" }}>
      <h3>Counter {index}</h3>
      <p>Value: {value}</p>
      <button onClick={onIncrement}>Increment</button>
    </div>
  );
}
