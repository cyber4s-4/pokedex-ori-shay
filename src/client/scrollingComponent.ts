import { addPokemons } from './Pokemons';
import { Data } from '../server/data';
let counter = 0;

/**
 * The function responsible for the infinite scrolling in the page. Each time the user
 * get to the end of the page it launches 15 pokemons.
 *
 * @param {Data} pokeList - An object with the pokemon data
 */
export function scrolling() {
  window.addEventListener(
    'scroll',
    async () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      // setTimeout(() => {}, 200);
      if (scrollTop + clientHeight >= scrollHeight - 5 && counter < 801) {
        load20Poke();
      }
    },
    {
      passive: true,
    }
  );
}
export async function load20Poke() {
  const poke20Array: Data[] = await (await fetch(`/get20Pokemons/${counter}`))
    .json()
    .catch(console.log);
  console.log(poke20Array);
  addPokemons(poke20Array);
  counter += 20;
}
