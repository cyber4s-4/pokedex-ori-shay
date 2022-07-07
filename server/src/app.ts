import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import { getPokemons, extractPokemon } from './data';

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

  // insertToDataJson2();

  if (false) {
    insertToDataJson1();
  }
  app.listen(3000, () => console.log('listening to port 3000'));
}

async function insertToDataJson1() {
  const POKEMON_DATA: any = await getPokemons();
  const POKE_LIST = POKEMON_DATA.pokemon_entries;
  fs.writeFileSync(filePath, JSON.stringify(POKE_LIST));
}

initServer();

// Shay : this is the trial of the forEach 'Fetch' 1000 times :)
// async function insertToDataJson2() {
//   const readFileData: any[] = await JSON.parse(
//     fs.readFileSync(filePath, 'utf8')
//   );
//   const POKE_LIST: (any | undefined)[] = [];
//   await readFileData.forEach(async (el) => {
//     const newPokemon = await extractPokemon(el.pokemon_species.name);
//     console.log();
//     await POKE_LIST.push(newPokemon);
//   });
//   await console.log(POKE_LIST);
//   await fs.writeFileSync(filePath2, JSON.stringify(POKE_LIST));
//   await console.log(POKE_LIST);
// }
