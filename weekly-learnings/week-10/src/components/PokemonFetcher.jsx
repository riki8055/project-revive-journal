import { useEffect, useState } from "react";

export default function PokemonFetcher() {
  const [pokemon, setPokemon] = useState(null);
  const [name, setName] = useState("pikachu");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched...");
        setPokemon(data);
      });
  }, [name]);

  return (
    <div>
      <h1>Pokemon Fetcher</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {pokemon && <h2>{pokemon.name}</h2>}
    </div>
  );
}
