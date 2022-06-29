export const getPokemons = () => {
  return fetch(`https://pokeapi.co/api/v2/pokedex/1`)
    .then((res) => res.json())
    .then((pokemon) => {
      return pokemon;
    });
};

// TODO: get the api from the websites of the pokimons...
// TODO: build component of pokemon file
// TODO: Add hyper link to all the pokemons
// TODO: Add search machine that search all the pokemons and return the selected search..
// TODO:
