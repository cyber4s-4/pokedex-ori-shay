var app;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/tsc/data.js":
/*!**************************!*\
  !*** ./dist/tsc/data.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extractPokemon = exports.getPokemons = void 0;
const getPokemons = () => {
    return fetch(`https://pokeapi.co/api/v2/pokedex/1`)
        .then((res) => res.json())
        .then((pokemon) => {
        return pokemon;
    });
};
exports.getPokemons = getPokemons;
function extractPokemon(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((res) => res.json())
        .then((pokemon) => {
        return pokemon;
    });
}
exports.extractPokemon = extractPokemon;
// TODO: get the api from the websites of the pokimons...
// TODO: build component of pokemon file
// TODO: Add hyper link to all the pokemons
// TODO: Add search machine that search all the pokemons and return the selected search..
// TODO:


/***/ }),

/***/ "./dist/tsc/pokemonComponent.js":
/*!**************************************!*\
  !*** ./dist/tsc/pokemonComponent.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PokemonComponent = void 0;
class PokemonComponent {
    constructor(data, parent) {
        this.data = data;
        this.parent = parent;
        // this.render();
    }
    render() {
        // Enter the data into a template - parent and children:
        const main_container = this.parent;
        console.log('render');
        const pokemonTemplate = document.createElement('div');
        pokemonTemplate.classList.add('pokemon-template');
        main_container.appendChild(pokemonTemplate);
        pokemonTemplate.addEventListener('click', () => this.clickjunc(this.data.id));
        const image = document.createElement('img');
        image.src = this.data.img;
        image.classList.add('img');
        pokemonTemplate.appendChild(image);
        // this.insertData('idNumber', this.data.id.toString(), pokemonTemplate);
        const idNumber = document.createElement('div');
        idNumber.innerHTML = 'Id number:    ' + this.data.id.toString();
        pokemonTemplate.appendChild(idNumber);
        const name = document.createElement('div');
        name.innerHTML = 'Name:     ' + this.data.name;
        pokemonTemplate.appendChild(name);
        const height = document.createElement('div');
        height.innerHTML = 'Height:     ' + this.data.height;
        pokemonTemplate.appendChild(height);
        const weight = document.createElement('div');
        weight.innerHTML = 'Weight:       ' + this.data.weight;
        pokemonTemplate.appendChild(weight);
    }
    // insertData(type: string, data: string, container: HTMLDivElement) {
    //   const divType = document.createElement('div') as HTMLDivElement;
    //   divType.innerHTML = type;
    //   const element = document.createElement('span') as HTMLSpanElement;
    //   element.innerHTML = data;
    //   container.appendChild(element);
    // }
    clickjunc(pokemonId) {
        console.log(pokemonId);
    }
}
exports.PokemonComponent = PokemonComponent;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************!*\
  !*** ./dist/tsc/app.js ***!
  \*************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const data_1 = __webpack_require__(/*! ./data */ "./dist/tsc/data.js");
const pokemonComponent_1 = __webpack_require__(/*! ./pokemonComponent */ "./dist/tsc/pokemonComponent.js");
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

})();

app = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=app.js.map