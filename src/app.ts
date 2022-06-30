import { getPokemons, Data, extractPokemon } from './data';
import { PokemonComponent } from './pokemonComponent';
import { AllPokesComponent } from './AllPokesComponent';

const main_container = document.getElementById(
  'sub-container'
) as HTMLDivElement;
const buttonInput = document.getElementById(
  'button-input'
) as HTMLButtonElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
export const firstContainer = document.getElementById(
  'first-container'
) as HTMLDivElement;

init();
async function init() {
  main_container.style.display = 'none';
  const POKEMON_DATA = await getPokemons();
  const poke = POKEMON_DATA.pokemon_entries;

  for (let i = 0; i < 15; i++) {
    const specificPokemon = await extractPokemon(poke[i].pokemon_species.name);
    const elementData: Data = {
      name: poke[i].pokemon_species.name,
      img: specificPokemon.sprites.front_default,
      height: specificPokemon.height,
      weight: specificPokemon.weight,
      id: poke[i].entry_number,
    };
    new AllPokesComponent(elementData, firstContainer).render();
  }

  searchInputFunc();
  function searchInputFunc() {
    buttonInput.addEventListener('click', () => {
      POKEMON_DATA.pokemon_entries.forEach((element: any) => {
        if (searchInput.value === element.pokemon_species.name)
          viewPokemon(element);
      });
      if (main_container.style.display === 'none') noResults();
    });
  }

  async function viewPokemon(element: any) {
    main_container.style.display = 'block';
    main_container.innerHTML = '';
    const specificPokemon = await extractPokemon(searchInput.value);
    const elementData: Data = {
      name: element.pokemon_species.name,
      img: specificPokemon.sprites.front_default,
      height: specificPokemon.height,
      weight: specificPokemon.weight,
      id: element.entry_number,
    };
    new PokemonComponent(elementData, main_container).render();
    return;
  }

  function noResults() {
    main_container.style.display = 'block';
    main_container.innerHTML = '';

    const h1Element = document.createElement('h1') as HTMLElement;
    h1Element.innerHTML = 'No results !';
    main_container.appendChild(h1Element);

    const closeButton = document.createElement('button') as HTMLButtonElement;
    closeButton.innerHTML = 'Close';
    closeButton.id = 'close-button';
    main_container.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
      main_container.style.display = 'none';
    });
  }
}

// TODO: merge the two place of create the 'closeButton'...
// TODO: Do function for the 'createElement' and the 'getElementById'...
// TODO: Improve the Css of te Buttons...
// TODO: Divided the code for more functions
// TODO: cancel the two links. One is enough !
