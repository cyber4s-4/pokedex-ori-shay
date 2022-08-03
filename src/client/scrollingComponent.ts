import { addPokemons } from './Pokemons';
import { Data } from '../server/data';
let counter = 0;
let oneTime = true;

/**
 * The function responsible for the infinite scrolling in the page. Each time the user
 * get to the end of the page it launches 15 pokemons.
 */
export function scrolling() {
  load20Poke();
  window.addEventListener(
    'scroll',
    () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const loading = document.querySelector('.loading') as HTMLDivElement;
      if (scrollTop + clientHeight >= scrollHeight - 8 && oneTime === true) {
        loading.classList.add('show');
        oneTime = false;
        load20Poke();
        loading.classList.remove('show');
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
  oneTime = true;
}
