import fetch from "cross-fetch"

export interface Data {
  name: string
  img: string
  height: string
  weight: string
  id: number
}

export const getPokemons = () => {
  return fetch("https://pokeapi.co/api/v2/pokedex/1")
    .then((res) => res.json())
    .then((pokemon) => {
      return pokemon
    })
}

/**
 * The function extract the data of the pokemon from the API.
 *
 * @param {string} name - An string with the pokemon's name
 */
export function extractPokemon(id: number): any {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((pokemon) => {
      return pokemon
    })
}
