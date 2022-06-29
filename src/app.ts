import { getPokemons, getPokemons2, Data } from "./data"
import { PokemonComponent } from "./pokemonComponent"

init()
async function init() {
  const POKEMON_DATA = await getPokemons()
  console.log(POKEMON_DATA.pokemon_entries)

  const POKEMON_DATA2 = await getPokemons2()
  console.log(POKEMON_DATA2)

  const data1: Data = {
    name: "name",
    img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
    height: "80",
    weight: "60",
    id: 90,
  }
  const main_container = document.getElementById("sub-container") as HTMLDivElement

  searchInput()
  function searchInput() {
    const searchInput = document.getElementById("search-input") as HTMLInputElement
    const buttonInput = document.getElementById("button-input") as HTMLButtonElement

    buttonInput.addEventListener("click", () => {
      console.log(searchInput.value)
      POKEMON_DATA.pokemon_entries.forEach((element: any) => {
        if (searchInput.value === element.pokemon_species.name) {
          const elementData: Data = {
            name: element.pokemon_species.name,
            img: element.pokemon_species.url,
            height: "80",
            weight: "60",
            id: element.entry_number,
          }
          console.log("inside")
          // console.log(elementData);
          // main_container.innerHTML = '';
          new PokemonComponent(elementData, main_container).render()
          // new PokemonComponent(elementData, main_container).render();
        }
        // else main_container.innerHTML = 'No results';
      })
    })
  }
}
