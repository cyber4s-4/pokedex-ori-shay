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
console.log('start app.ts - server - file');
const pathToDataJson: string = path.join(__dirname, '../data/data.json');

function initServer() {
  app.get('*', (req: Request, res: Response) => {
    console.log('Processing request: ', req.url);
    res.sendFile(req.path || 'index.html', { root: './../client/dist' });
  });

  if (!false) {
    insertToDataJson2();
  }
  app.listen(3000, () => console.log('listening to port 3000'));
}

initServer();

async function insertToDataJson2() {
  const dataList: (any | undefined)[] = [];

  for (let i = 1; i < 400; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((res) => res.json())
      .then((res) => {
        dataList.push({
          id: res.id,
          name: res.name,
          weight: res.weight,
          height: res.height,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`,
        });
      })
      .then(() => fs.writeFileSync(pathToDataJson, JSON.stringify(dataList)));
  }
}
