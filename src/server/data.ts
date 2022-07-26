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
  type2: string;
  id_serial?: number;
}

export async function getPokemonsFromApi() {
  let arr: number[] = [];
  const dataList: Data[] = [];

  for (let i = 1; i < 910; i++) arr.push(i);
  await Promise.all(arr.map(throat(2, async (num) => fetchRequests(num))));

  async function fetchRequests(num: number) {
    try {
      const res = await (
        await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
      ).json();

      let type2 = '- - -';
      if (res.types[1] !== undefined) type2 = res.types[1].type.name;

      dataList.push({
        name: res.name,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`,
        height: res.height,
        weight: res.weight,
        id: res.id,
        favorite: false,
        type1: res.types[0].type.name,
        type2: type2,
      });
      return await res;
    } catch (error) {
      console.log('error in ' + num);
    } finally {
      if (
        num === 150 ||
        num === 300 ||
        num === 500 ||
        num === 700 ||
        num === 800
      )
        console.log('finish -' + num);
    }
  }
  console.log('Finish the fetchRequests Api');
  return dataList;
}
