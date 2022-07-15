import { Data } from "../server/data"
import { searchInputFunc } from "./Pokemons"
import { scrolling } from "./scrollingComponent"

export const FIRST_CONTAINER = getDivElement("first-container")
export const MAIN_CONTAINER = getDivElement("sub-container")
export const BUTTON_INPUT = getInputElement("button-input")
export const SEARCH_INPUT = getButtonElement("search-input")

init()

/**
 * The function init the web on the client side. The function get all the data from
 * database and init the scrolling and searchInputFunc functions.
 */
async function init() {
  MAIN_CONTAINER.style.display = "none"
  // Load the page
  const pokemon_json_file: Data[] = await (await fetch("/get-data"))
    .json()
    .catch(console.log)
  console.log(pokemon_json_file)

  scrolling(pokemon_json_file)
  searchInputFunc(pokemon_json_file)
}

// Auxiliary Function
function getDivElement(id: string): HTMLDivElement {
  return document.getElementById(id) as HTMLDivElement
}

// Auxiliary Function
function getInputElement(id: string): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement
}

// Auxiliary Function
function getButtonElement(id: string): HTMLButtonElement {
  return document.getElementById(id) as HTMLButtonElement
}
