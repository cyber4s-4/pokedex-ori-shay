import { searchInputFunc } from './Pokemons';
import { scrolling } from './scrollingComponent';
import { getPokemons } from './data';

export const FIRST_CONTAINER = getDivElement('first-container');
export const MAIN_CONTAINER = getDivElement('sub-container');
export const BUTTON_INPUT = getInputElement('button-input');
export const SEARCH_INPUT = getButtonElement('search-input');

init();
async function init() {
  // Load the page
  MAIN_CONTAINER.style.display = 'none';

  const POKEMON_DATA = await getPokemons();
  const POK_LIST = POKEMON_DATA.pokemon_entries;
  console.log(POK_LIST);

  searchInputFunc(POK_LIST);
  scrolling(POK_LIST);
}

function getDivElement(id: string): HTMLDivElement {
  return document.getElementById(id) as HTMLDivElement;
}
function getInputElement(id: string): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement;
}
function getButtonElement(id: string): HTMLButtonElement {
  return document.getElementById(id) as HTMLButtonElement;
}
