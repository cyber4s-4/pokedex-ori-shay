import { Data } from "./data"
import { searchInputFunc } from "./Pokemons"
import { scrolling } from "./scrollingComponent"

export const FIRST_CONTAINER = getDivElement("first-container")
export const MAIN_CONTAINER = getDivElement("sub-container")
export const BUTTON_INPUT = getInputElement("button-input")
export const SEARCH_INPUT = getButtonElement("search-input")

init()
async function init() {
  // Load the page
  MAIN_CONTAINER.style.display = "none"
  const pokemon_data: Data[] = await (await fetch(`http://localhost:3000/get-data`))
    .json()
    .catch(console.log)

  searchInputFunc(pokemon_data)
  scrolling(pokemon_data)
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
