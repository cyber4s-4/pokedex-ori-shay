import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import { getPokemons, extractPokemon } from './data';
import fetch from 'cross-fetch';

const fs = require('fs');
const path = require('path');

const app = express();
app.use(json());

interface User {
  name: string;
  about: string;
  avatar: string;
  id: string;
}
console.log('start server-file');
const filePath: string = path.join(__dirname, '../data/data.json');
const filePath2: string = path.join(__dirname, '../data/data2.json');

function initServer() {
  app.get('*', (req: Request, res: Response) => {
    console.log('Processing request: ', req.url);
    res.sendFile(req.path || 'index.html', { root: './../client/dist' });
  });

  if (!false) {
    // insertToDataJson1();
    insertToDataJson2();
  }
  app.listen(3000, () => console.log('listening to port 3000'));
}

async function insertToDataJson1() {
  const POKEMON_DATA: any = await getPokemons();
  const POKE_LIST = POKEMON_DATA.pokemon_entries;
  fs.writeFileSync(filePath, JSON.stringify(POKE_LIST));
  console.log(POKE_LIST.length);
}

initServer();

// Shay : this is the trial of the forEach 'Fetch' 1000 times :)
// async function insertToDataJson2() {
//   const POKEMON_DATA: any = await getPokemons();
//   const POKE_LIST2: (any | undefined)[] = [];
//   // await console.log(POKEMON_DATA.pokemon_entries);
//   await POKEMON_DATA.pokemon_entries.forEach(async (el: any) => {
//     try {
//       const newPokemon = await extractPokemon(el.pokemon_species.name);
//       console.log(POKE_LIST2.length);
//       await POKE_LIST2.push(newPokemon);
//     } catch (error) {
//       console.log(error);
//     }
//   });
//   await console.log(POKE_LIST2);
//   await console.log('end Data2');
//   // await fs.writeFileSync(filePath2, JSON.stringify(POKE_LIST));
//   // await console.log(POKE_LIST);
// }
// }
async function insertToDataJson2() {
  const POKE_LIST2: (any | undefined)[] = [];

  for (let i = 1; i < 400; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((res) => res.json())
      .then((res) => {
        POKE_LIST2.push({
          id: res.id,
          name: res.name,
          weight: res.weight,
          height: res.height,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
        });
      })
      .then(() => fs.writeFileSync(filePath2, JSON.stringify(POKE_LIST2)));
  }
}
