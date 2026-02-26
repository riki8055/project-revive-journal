import "./App.css";
import Counter from "./components/Counter";
import Cart from "./components/Cart";
import InfiniteLoop from "./components/BadUseEffect";

function App() {
  return <InfiniteLoop />;
}

export default App;
