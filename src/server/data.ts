import fetch from 'cross-fetch';
import { ObjectId } from 'mongodb';
import { fs, pathDataJson } from './server';

export interface Data {
  _id?: ObjectId
  name: string
  img: string
  height: number
  weight: number
  id: number
  favorite: boolean
}

export const dataList: Data[] = [];

/**
 * THE FUNCTION IS NOT IN USE!
 * The function insert data to JSON database from API and sort it by id.
 *
 * @param {string} dataFile - An object with the pokemon data
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
      })
      .catch(() => console.log(`Error:  fetch fail in  https://pokeapi.co/api/v2/pokemon/${i}`)
      );
  }
}

/**
 * THE FUNCTION IS NOT IN USE!
 * The function update about a favorite pokemon in the JSON database.
 *
 * @param {string} idNumber - An object with the pokemon data
 */
export async function updateDataFavorite(idNumber: string) {
  const readFileData: Data[] | undefined = JSON.parse(
    fs.readFileSync(pathDataJson, 'utf8')
  );
  readFileData?.forEach((ell) => {
    if (ell.id === Number(idNumber)) {
      console.log(ell.favorite);
      ell.favorite = ell.favorite === true ? false : true;
      console.log(ell.favorite);
    }
  });
  await fs.writeFileSync(pathDataJson, JSON.stringify(readFileData));
  console.log(await JSON.parse(fs.readFileSync(pathDataJson, 'utf8'))[0]);
  return idNumber;
}
