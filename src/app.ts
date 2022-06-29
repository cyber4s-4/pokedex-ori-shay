import { getPokemons, Data, extractPokemon } from "./data"
import { PokemonComponent } from "./pokemonComponent"

const main_container = document.getElementById("sub-container") as HTMLDivElement
const buttonInput = document.getElementById("button-input") as HTMLButtonElement
const searchInput = document.getElementById("search-input") as HTMLInputElement

init()
async function init() {
  const POKEMON_DATA = await getPokemons()
  console.log(POKEMON_DATA.pokemon_entries)

  searchInputFunc()
  function searchInputFunc() {
    buttonInput.addEventListener("click", () => {
      POKEMON_DATA.pokemon_entries.forEach(async (element: any) => {
        try {
          if (searchInput.value === element.pokemon_species.name) {
            let specificPokemon = await extractPokemon(searchInput.value)
            console.log(specificPokemon)

            const elementData: Data = {
              name: element.pokemon_species.name,
              img: specificPokemon.sprites.front_default,
              height: specificPokemon.height,
              weight: specificPokemon.weight,
              id: element.entry_number,
            }
            new PokemonComponent(elementData, main_container).render()
          }
        } catch {
          alert(`There is no ${searchInput.value} pokemon`)
        }
      })
    })
  }
}
