"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const pokemonComponent_1 = require("./pokemonComponent");
init();
async function init() {
    const POKEMON_DATA = await (0, data_1.getPokemons)();
    console.log(POKEMON_DATA.pokemon_entries);
    let data1 = {
        name: 'name',
        img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png',
        height: '80',
        weight: '60',
        id: 90,
    };
    const main_container = document.getElementById('sub-container');
    // new PokemonComponent(data1, main_container).render();
    // new PokemonComponent(data1, main_container).render();
    // new PokemonComponent(data1, main_container).render();
    // new PokemonComponent(data1, main_container).render();
    // new PokemonComponent(data1, main_container).render();
    searchInput();
    function searchInput() {
        const searchInput = document.getElementById('search-input');
        const buttonInput = document.getElementById('button-input');
        // console.log(POKEMON_DATA.pokemon_entries[0].entry_number);
        // console.log(POKEMON_DATA.pokemon_entries[0]);
        // console.log(POKEMON_DATA.pokemon_entries[0].pokemon_species);
        // console.log(POKEMON_DATA.pokemon_entries[0].pokemon_species.name);
        buttonInput.addEventListener('click', () => {
            console.log(searchInput.value);
            POKEMON_DATA.pokemon_entries.forEach((element) => {
                if (element.pokemon_species.name === searchInput.value) {
                    console.log(element);
                    main_container.innerHTML = '';
                    new pokemonComponent_1.PokemonComponent(data1, main_container).render();
                }
            });
        });
    }
}
//# sourceMappingURL=app.js.map