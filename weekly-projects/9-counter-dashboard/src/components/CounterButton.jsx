export default function CounterButton({ onIncrement, index }) {
  console.log("CounterButton rendered:", index);

  return <button onClick={onIncrement}>Increment</button>;
}
