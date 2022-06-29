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
exports.getPokemons2 = exports.getPokemons = void 0;
const getPokemons = () => {
    return fetch(`https://pokeapi.co/api/v2/pokedex/1`)
        .then((res) => res.json())
        .then((pokemon) => {
        return pokemon;
    });
};
exports.getPokemons = getPokemons;
const getPokemons2 = () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/bulbasaur`)
        .then((res) => res.json())
        .then((pokemon) => {
        return pokemon;
    });
};
exports.getPokemons2 = getPokemons2;
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
        const idNumber = document.createElement('div');
        idNumber.classList.add('idNumber');
        idNumber.innerHTML = this.data.id.toString();
        pokemonTemplate.appendChild(idNumber);
        const name = document.createElement('div');
        name.classList.add('name');
        name.innerHTML = this.data.name;
        pokemonTemplate.appendChild(name);
    }
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
init();
async function init() {
    const POKEMON_DATA = await (0, data_1.getPokemons)();
    console.log(POKEMON_DATA.pokemon_entries);
    const POKEMON_DATA2 = await (0, data_1.getPokemons2)();
    console.log(POKEMON_DATA2);
    const data1 = {
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
                if (searchInput.value === element.pokemon_species.name) {
                    const elementData = {
                        name: element.pokemon_species.name,
                        img: element.pokemon_species.url,
                        height: '80',
                        weight: '60',
                        id: element.entry_number,
                    };
                    console.log('inside');
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
// bulbasaur

})();

app = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=app.js.map