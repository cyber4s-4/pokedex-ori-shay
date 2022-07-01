import { getPokemons, Data, extractPokemon } from "./data"
import { PokemonComponent } from "./pokemonComponent"
import { AllPokesComponent } from "./AllPokesComponent"
import { closeButtonFunc } from "./buttons"

export const FIRST_CONTAINER = getDivElement("first-container")
const MAIN_CONTAINER = getDivElement("sub-container")
const BUTTON_INPUT = getInputElement("button-input")
const SEARCH_INPUT = getButtonElement("search-input")

init()
async function init() {
  // Load the page:
  MAIN_CONTAINER.style.display = "none"
  let counter = 0
  const POKEMON_DATA = await getPokemons()
  const poke = POKEMON_DATA.pokemon_entries
  addPokemons()
  searchInputFunc()

  async function addPokemons(): Promise<void> {
    for (let i = 0; i < 15; i++) {
      const specificPokemon = await extractPokemon(
        poke[counter].pokemon_species.name
      )
      const elementData: Data = {
        name: poke[counter].pokemon_species.name,
        img: specificPokemon.sprites.front_default,
        height: specificPokemon.height,
        weight: specificPokemon.weight,
        id: poke[counter].entry_number,
      }
      counter++
      new AllPokesComponent(elementData, FIRST_CONTAINER).render()
    }
  }

  function searchInputFunc(): void {
    BUTTON_INPUT.addEventListener("click", () => {
      POKEMON_DATA.pokemon_entries.forEach((element: any) => {
        if (SEARCH_INPUT.value === element.pokemon_species.name) viewPokemon(element)
      })
      if (MAIN_CONTAINER.style.display === "none") noResults()
    })
  }

  async function viewPokemon(element: any): Promise<void> {
    MAIN_CONTAINER.style.display = "block"
    MAIN_CONTAINER.innerHTML = ""
    const specificPokemon = await extractPokemon(SEARCH_INPUT.value)
    const elementData: Data = {
      name: element.pokemon_species.name,
      img: specificPokemon.sprites.front_default,
      height: specificPokemon.height,
      weight: specificPokemon.weight,
      id: element.entry_number,
    }
    new PokemonComponent(elementData, MAIN_CONTAINER).render()
  }

  function noResults(): void {
    MAIN_CONTAINER.style.display = "block"
    MAIN_CONTAINER.innerHTML = ""

    const h1Element = document.createElement("h1") as HTMLElement
    h1Element.innerHTML = "No results !"
    MAIN_CONTAINER.appendChild(h1Element)

    closeButtonFunc(MAIN_CONTAINER, MAIN_CONTAINER)
  }
}

function getDivElement(id: string): HTMLDivElement {
  return document.getElementById(id) as HTMLDivElement
}
function getInputElement(id: string): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement
}
function getButtonElement(id: string): HTMLButtonElement {
  return document.getElementById(id) as HTMLButtonElement
}

// TODO: Improve the Css order - more '@mixin'...
// TODO: Check the typeScript - no 'any' !!
