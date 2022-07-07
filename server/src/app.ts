import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import { getPokemons } from './data';
// import { ll } from '../../client/src/';

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
function initServer() {
  app.get('*', (req: Request, res: Response) => {
    console.log('Processing request: ', req.url);
    res.sendFile(req.path || 'index.html', { root: './../client/dist' });
  });

  if (false) {
    insertToDataJson();
  }
  app.listen(3000, () => console.log('listening to port 3000'));
}

async function insertToDataJson() {
  const POKEMON_DATA: any = await getPokemons();
  const POKE_LIST = POKEMON_DATA.pokemon_entries;
  fs.writeFileSync(filePath, JSON.stringify(POKE_LIST));
  console.log(POKE_LIST);
}

initServer();
