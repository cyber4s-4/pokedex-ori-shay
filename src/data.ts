export interface Data {
  name: string;
  img: string;
  height: string;
  weight: string;
  id: number;
}

export interface Poke {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
}

export const getPokemons = () => {
  return fetch('https://pokeapi.co/api/v2/pokedex/1')
    .then((res) => res.json())
    .then((pokemon) => {
      return pokemon;
    });
};

/**
 * The function extract the data of the pokemon from the API.
 *
 * @param {string} name - An string with the pokemon's name
 */
export function extractPokemon(name: string): any {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => res.json())
    .then((pokemon) => {
      return pokemon;
    });
}
