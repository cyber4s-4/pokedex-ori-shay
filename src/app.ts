import { getPokemons, Data, extractPokemon } from "./data"
import { PokemonComponent } from "./pokemonComponent"
import { AllPokesComponent } from "./AllPokesComponent"
import { closeButtonFunc } from "./buttons"

export const FIRST_CONTAINER = getDivElement("first-container")
const MAIN_CONTAINER = getDivElement("sub-container")
const BUTTON_INPUT = getInputElement("button-input")
const SEARCH_INPUT = getButtonElement("search-input")
const POKEMON_STEPS = 15
let counter = 0

init()
async function init() {
  // Load the page:
  MAIN_CONTAINER.style.display = "none"
  const POKEMON_DATA = await getPokemons()
  const poke = POKEMON_DATA.pokemon_entries
  searchInputFunc()

  async function addPokemons(): Promise<void> {
    let temp = counter
    for (let i = counter; i < POKEMON_STEPS + temp; i++) {
      const specificPokemon = await extractPokemon(poke[i].pokemon_species.name)
      const elementData: Data = {
        name: poke[i].pokemon_species.name,
        img: specificPokemon.sprites.front_default,
        height: specificPokemon.height,
        weight: specificPokemon.weight,
        id: poke[i].entry_number,
      }
      counter++
      new AllPokesComponent(elementData, FIRST_CONTAINER).render()
    }
  }

  /**
   * The funciton check if there is a pokemon from the API pokemon's list.
   * If there is a pokemon - it initiate viewPokemon function. else initiate noResult function.
   */
  function searchInputFunc(): void {
    BUTTON_INPUT.addEventListener("click", () => {
      POKEMON_DATA.pokemon_entries.forEach((element: any) => {
        if (SEARCH_INPUT.value === element.pokemon_species.name) viewPokemon(element)
      })
      if (MAIN_CONTAINER.style.display === "none") noResults()
    })
  }

  /**
   * Creates a new laptop item
   *
   * @param {element} any - An object with the laptop data
   */
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

  /**
   * Function that returns a no result message - if there is no pokemon
   */
  function noResults(): void {
    MAIN_CONTAINER.style.display = "block"
    MAIN_CONTAINER.innerHTML = ""

    const h1Element = document.createElement("h1") as HTMLElement
    h1Element.innerHTML = `There is no ${SEARCH_INPUT.value} Pokemon... try another one!`
    MAIN_CONTAINER.appendChild(h1Element)

    closeButtonFunc(MAIN_CONTAINER, MAIN_CONTAINER)
  }

  function scrolling() {
    const hideLoader = () => {
      FIRST_CONTAINER.classList.remove("show")
    }

    const showLoader = () => {
      FIRST_CONTAINER.classList.add("show")
    }

    const hasMorePokemons = () => {
      if (counter < 800) return true
    }

    // Load Pokemons
    const loadPokemons = async () => {
      // show the loader
      showLoader()

      // 0.5 second later
      setTimeout(async () => {
        try {
          // if having more Pokemons to fetch
          if (hasMorePokemons()) {
            addPokemons()
          }
        } catch (error: any) {
          console.log(error.message)
        } finally {
          hideLoader()
        }
      }, 500)
    }

    window.addEventListener(
      "scroll",
      () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement

        if (scrollTop + clientHeight >= scrollHeight - 5 && hasMorePokemons()) {
          addPokemons()
        }
      },
      {
        passive: true,
      }
    )

    // initialize
    loadPokemons()
  }
  scrolling()
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

// TODO: Check the typeScript - no 'any' !!
