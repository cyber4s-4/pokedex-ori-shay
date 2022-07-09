import fetch from 'cross-fetch';
import { fs, pathDataJson } from './app';
export interface Data {
  name: string;
  img: string;
  height: string;
  weight: string;
  id: number;
  favorite: boolean;
}

export const dataList: Data[] = [];

/**
 *
 * The function insert data to json file when the server created.
 */
export async function insertToDataJson(dataFile: string): Promise<void> {
  if (dataFile !== '') return;

  for (let i = 1; i <= 898; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((res) => res.json())
      .then((res) => {
        dataList.push({
          name: res.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
          height: res.height,
          weight: res.weight,
          id: res.id,
          favorite: false,
        });
      })
      .then(() => {
        dataList.sort((a: Data, b: Data) => a.id - b.id);
        fs.writeFileSync(pathDataJson, JSON.stringify(dataList));
      })
      .catch(() =>
        console.log(
          `Error:  fetch fail in  https://pokeapi.co/api/v2/pokemon/${i}`
        )
      );
  }
}
