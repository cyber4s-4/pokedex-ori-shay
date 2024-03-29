import axios from 'axios';
import { searchInputFunc } from './Pokemons';
import { scrolling } from './scrollingComponent';
import { buttons } from './buttons';

export const FIRST_CONTAINER = getDivElement('first-container');
export const MAIN_CONTAINER = getDivElement('sub-container');
export const BUTTON_INPUT = getInputElement('button-input');
export const SEARCH_INPUT = getButtonElement('search-input');

init();

function init() {
  axios.get(location.origin + '/validation/init').then((res) => {
    if (res.data.message) {
      scrolling();
      searchInputFunc();
      buttons();
      MAIN_CONTAINER.style.display = 'none';
      const loader = document.querySelector(
        '.loader-background'
      ) as HTMLDivElement;
      loader.style.display = 'none';
    } else {
      console.log('message: ' + res.data.message);
      window.location.pathname = '/validation/login';
    }
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
