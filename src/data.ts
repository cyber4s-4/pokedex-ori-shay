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

export function extractPokemon(name: string): any {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => res.json())
    .then((pokemon) => {
      return pokemon
    })
}
