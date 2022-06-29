"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const pokemonComponent_1 = require("./pokemonComponent");
const main_container = document.getElementById("sub-container");
const buttonInput = document.getElementById("button-input");
const searchInput = document.getElementById("search-input");
init();
async function init() {
    const POKEMON_DATA = await (0, data_1.getPokemons)();
    console.log(POKEMON_DATA.pokemon_entries);
    searchInputFunc();
    function searchInputFunc() {
        buttonInput.addEventListener("click", () => {
            POKEMON_DATA.pokemon_entries.forEach(async (element) => {
                try {
                    if (searchInput.value === element.pokemon_species.name) {
                        let specificPokemon = await (0, data_1.extractPokemon)(searchInput.value);
                        console.log(specificPokemon);
                        const elementData = {
                            name: element.pokemon_species.name,
                            img: specificPokemon.sprites.front_default,
                            height: specificPokemon.height,
                            weight: specificPokemon.weight,
                            id: element.entry_number,
                        };
                        new pokemonComponent_1.PokemonComponent(elementData, main_container).render();
                    }
                }
                catch {
                    alert(`There is no ${searchInput.value} pokemon`);
                }
            });
        });
    }
}
//# sourceMappingURL=app.js.map