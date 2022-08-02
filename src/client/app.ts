import axios from 'axios';
import { searchInputFunc } from './Pokemons';
import { load20Poke, scrolling } from './scrollingComponent';
import { buttons } from './buttons';

export const FIRST_CONTAINER = getDivElement('first-container');
export const MAIN_CONTAINER = getDivElement('sub-container');
export const BUTTON_INPUT = getInputElement('button-input');
export const SEARCH_INPUT = getButtonElement('search-input');

init();

function init() {
  axios.get(location.origin + '/validation/init').then((res) => {
    if (res.data.message) {
      MAIN_CONTAINER.style.display = 'none';
      load20Poke();
      scrolling();
      searchInputFunc();
      buttons();
    } else window.location.pathname = '/login.html';
  });
}

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
