import "./App.css";
import Counter from "./components/Counter";
import Cart from "./components/Cart";
import InfiniteLoop from "./components/BadUseEffect";
import PokemonFetcher from "./components/PokemonFetcher";
import Timer from "./components/Time";
import Parent from "./components/UncontrolledRerender";

function App() {
  return <Parent />;
}

export default App;
