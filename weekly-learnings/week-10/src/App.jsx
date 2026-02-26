import "./App.css";
import Counter from "./components/Counter";
import Cart from "./components/Cart";
import InfiniteLoop from "./components/BadUseEffect";
import PokemonFetcher from "./components/PokemonFetcher";

function App() {
  return <PokemonFetcher />;
}

export default App;
