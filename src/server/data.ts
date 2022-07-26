import fetch from 'cross-fetch';
import throat from 'throat';

export interface Data {
  name: string;
  img: string;
  height: number;
  weight: number;
  id: number;
  favorite: boolean | string;
  type1: string;
  type2?: undefined | string;
  id_serial?: number;
}

export async function getPokemonsFromApi() {
  const dataList: Data[] = [];
  let arr: number[] = [];
  for (let i = 1; i < 250; i++) arr.push(i);
  const dataFetch = await Promise.all(
    arr.map(throat(2, async (num) => fetchRequests(num)))
  );

  async function fetchRequests(num: number) {
    try {
      const res = await (
        await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      ).json();
      // if (res.types[1].type.name) {
      //   console.log(res.types[1].type.name);
      // }

      dataList.push({
        name: res.name,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`,
        height: res.height,
        weight: res.weight,
        id: res.id,
        favorite: false,
        type1: res.types[0].type.name,
        type2: undefined,
      });
      console.log(res.types[0].type.name);
      // console.log(res.types[1].type.name || undefined);
      return await res;
    } catch (error) {
      console.log('Error in "fetchRequests" function');
    } finally {
      console.log('finish -' + num);
    }
  }
  console.log('Finish the fetchRequests');
  // console.log(dataList);
  return dataList;
}
