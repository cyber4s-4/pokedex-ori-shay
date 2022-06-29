"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const pokemonComponent_1 = require("./pokemonComponent");
init();
async function init() {
    const POKEMON_DATA = await (0, data_1.getPokemons)();
    console.log(POKEMON_DATA.pokemon_entries);
    const POKEMON_DATA2 = await (0, data_1.getPokemons2)();
    console.log(POKEMON_DATA2);
    const data1 = {
        name: "name",
        img: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
        height: "80",
        weight: "60",
        id: 90,
    };
    const main_container = document.getElementById("sub-container");
    searchInput();
    function searchInput() {
        const searchInput = document.getElementById("search-input");
        const buttonInput = document.getElementById("button-input");
        buttonInput.addEventListener("click", () => {
            console.log(searchInput.value);
            POKEMON_DATA.pokemon_entries.forEach((element) => {
                if (searchInput.value === element.pokemon_species.name) {
                    const elementData = {
                        name: element.pokemon_species.name,
                        img: element.pokemon_species.url,
                        height: "80",
                        weight: "60",
                        id: element.entry_number,
                    };
                    console.log("inside");
                    // console.log(elementData);
                    // main_container.innerHTML = '';
                    new pokemonComponent_1.PokemonComponent(elementData, main_container).render();
                    // new PokemonComponent(elementData, main_container).render();
                }
                // else main_container.innerHTML = 'No results';
            });
        });
    }
}
//# sourceMappingURL=app.js.map