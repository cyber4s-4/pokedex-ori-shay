import { searchInputFunc } from './Pokemons';
import { load20Poke, scrolling } from './scrollingComponent';

export const FIRST_CONTAINER = getDivElement('first-container');
export const MAIN_CONTAINER = getDivElement('sub-container');
export const BUTTON_INPUT = getInputElement('button-input');
export const SEARCH_INPUT = getButtonElement('search-input');

MAIN_CONTAINER.style.display = 'none';
load20Poke();
scrolling();
searchInputFunc();

// Auxiliary Function
function getDivElement(id: string): HTMLDivElement {
  return document.getElementById(id) as HTMLDivElement;
}

// Auxiliary Function
function getInputElement(id: string): HTMLInputElement {
  return document.getElementById(id) as HTMLInputElement;
}

// Auxiliary Function
function getButtonElement(id: string): HTMLButtonElement {
  return document.getElementById(id) as HTMLButtonElement;
}
