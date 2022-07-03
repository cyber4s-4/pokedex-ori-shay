import {
  BUTTON_INPUT,
  FIRST_CONTAINER,
  MAIN_CONTAINER,
  SEARCH_INPUT,
} from './app';
import { AllPokesComponent } from './AllPokesComponent';
import { Data, extractPokemon, Poke } from './data';
import { PokemonComponent } from './pokemonComponent';
import { closeButtonFunc } from './buttons';

const POKEMON_STEPS = 15; // Each scroll the page uploads 15 pokemons.
export let counter = 0;

/**
 * The function add pokemons to the main page when it upload.
 */
export async function addPokemons(pokeList: Poke[]): Promise<void> {
  const poke = pokeList;

  for (let i = 0; i < POKEMON_STEPS; i++) {
    const specificPokemon = await extractPokemon(
      poke[counter].pokemon_species.name
    );
    const elementData: Data = {
      name: poke[counter].pokemon_species.name,
      img: specificPokemon.sprites.front_default,
      height: specificPokemon.height,
      weight: specificPokemon.weight,
      id: poke[counter].entry_number,
    };
    counter++;
    new AllPokesComponent(elementData, FIRST_CONTAINER).render();
  }
}

/**
 * The function shows the searched pokemon.
 *
 * @param {any} element - An object with the pokemon data
 */
export async function viewPokemon(element: Poke): Promise<void> {
  MAIN_CONTAINER.style.display = 'block';
  MAIN_CONTAINER.innerHTML = '';
  const specificPokemon = await extractPokemon(SEARCH_INPUT.value);
  const elementData: Data = {
    name: element.pokemon_species.name,
    img: specificPokemon.sprites.front_default,
    height: specificPokemon.height,
    weight: specificPokemon.weight,
    id: element.entry_number,
  };
  new PokemonComponent(elementData, MAIN_CONTAINER).render();
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
 */
export function searchInputFunc(pokeList: Poke[]): void {
  BUTTON_INPUT.addEventListener('click', async () => {
    pokeList.forEach((element: Poke) => {
      if (SEARCH_INPUT.value === element.pokemon_species.name)
        viewPokemon(element);
    });
    if (MAIN_CONTAINER.style.display === 'none') noResults();
  });
}
