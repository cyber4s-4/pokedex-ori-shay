import { BUTTON_INPUT, FIRST_CONTAINER, MAIN_CONTAINER, SEARCH_INPUT } from './app';
import { AllPokesComponent } from './AllPokesComponent';
import { Data } from '../server/data';
import { PokemonComponent } from './pokemonComponent';
import { closeButtonFunc } from './buttons';

/**
 * The function add pokemons to the main page when it upload.
 *
 * @param {Data[]} pokeList - An object with the pokemon data
 */
export async function addPokemons(pokeList: Data[]): Promise<void> {
  for (let i = 0; i < pokeList.length; i++) {
    new AllPokesComponent(pokeList[i], FIRST_CONTAINER).render();
  }
}

/**
 * The function shows the searched pokemon.
 *
 * @param {Data} selectedPoke - An object with the pokemon data
 */
export async function viewPokemon(selectedPoke: Data): Promise<void> {
  MAIN_CONTAINER.style.display = 'block';
  MAIN_CONTAINER.innerHTML = '';
  new PokemonComponent(selectedPoke, MAIN_CONTAINER).render();
}

/**
 * Function that returns a no result message - if there is no pokemon
 * same as the search input value
 *
 */
export function noResults(): void {
  MAIN_CONTAINER.style.display = 'block';
  MAIN_CONTAINER.innerHTML = '';

  const h1Element = document.createElement('h1') as HTMLElement;
  h1Element.innerHTML = `There is no  '${SEARCH_INPUT.value}' Pokemon... try another one!`;
  MAIN_CONTAINER.appendChild(h1Element);

  closeButtonFunc(MAIN_CONTAINER, MAIN_CONTAINER);
}

/**
 * The function search pokemon from the DataBase pokemon's list, while the user is writing.
 * If there is a pokemon - it initiate viewPokemon function. else initiate noResult function.
 *
 */
export async function searchInputFunc() {
  BUTTON_INPUT.addEventListener('click', async () => {
    try {
      const searchedPoke: Data = await (
        await fetch(`/get-specific/${SEARCH_INPUT.value}`)
      ).json();
      viewPokemon(searchedPoke);
    } catch (error) {
      if (MAIN_CONTAINER.style.display === 'none') noResults();
    }
  });
}
