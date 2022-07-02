import { FIRST_CONTAINER } from "./app"
import { addPokemons, counter } from "./Pokemons"

/**
 * The function responsible for the infinite scrolling in the page. Each time the user
 * get to the end of the page it launches 15 pokemons.
 */
export function scrolling() {
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
