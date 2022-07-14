import {
  BUTTON_INPUT,
  FIRST_CONTAINER,
  MAIN_CONTAINER,
  SEARCH_INPUT,
} from './app';
import { AllPokesComponent } from './AllPokesComponent';
import { Data } from '../server/data';
import { PokemonComponent } from './pokemonComponent';
import { closeButtonFunc } from './buttons';

const POKEMON_STEPS = 15; // Each scroll the page uploads 15 pokemons.
export let counter = 0;

/**
 * The function add pokemons to the main page when it upload.
 *
 * @param {Data} pokeList - An object with the pokemon data
 */
export async function addPokemons(pokeList: Data[]): Promise<void> {
  for (let i = 0; i < POKEMON_STEPS; i++) {
    new AllPokesComponent(pokeList[counter], FIRST_CONTAINER).render();
    counter++;
  }
}

/**
 * The function shows the searched pokemon.
 *
 * @param {Data} element - An object with the pokemon data
 */
export async function viewPokemon(element: Data): Promise<void> {
  MAIN_CONTAINER.style.display = 'block';
  MAIN_CONTAINER.innerHTML = '';
  new PokemonComponent(element, MAIN_CONTAINER).render();
}

/**
 * Function that returns a no result message - if there is no pokemon
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
 * The function check if there is a pokemon from the API pokemon's list.
 * If there is a pokemon - it initiate viewPokemon function. else initiate noResult function.
 *
 * @param {Poke} pokeList - An object with the pokemon data
 */
export function searchInputFunc(pokeList: Data[]): void {
  console.log(pokeList.length);
  console.log('searchInputFunc function');
  BUTTON_INPUT.addEventListener('click', async () => {
    pokeList.forEach((element: Data) => {
      if (SEARCH_INPUT.value === element.name) viewPokemon(element);
    });
    if (MAIN_CONTAINER.style.display === 'none') noResults();
  });
}
