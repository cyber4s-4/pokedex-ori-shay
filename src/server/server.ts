import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { updateDataFavorite } from './data';
import { client, buildTable, get20Pokemons, getSpecificPoke } from './connect';

// TODO: ori:
// V - 1. The 'scrolling bug'
// V - 2. Improve the scss
// V - 3. Play with the fetch requests in the data.ts - promise.all...
// V - 4. Look at the tasks i wrote in the google notes...

// TODO: shay:
// 1. Fix the favorite - and see if it's happen.
// 2. Explainig comments

export const fs = require('fs');
const path = require('path');

const app = express();
app.use(json());
app.use(express.static('./dist'));

/**
 * THIS PART OF CODE IS NOT IN USED!
 * It works only once when we insert the data to atlas.
 */
export const pathDataJson: string = path.join(__dirname, '../data.json');
const readFileData: string = fs.readFileSync(pathDataJson, 'utf8');

init();

/**
 * The function Init the server on port 3000.
 * In main page the server send the HTML.
 * In /get-data the server send the regular amount of pokemons.
 * In /get-all-data the server send 100K pokemon's.
 * In /star the server change the favorite value of chosen pokemon.
 */

async function init() {
  await client.connect();
  if (!false) await buildTable(JSON.parse(readFileData));
  await loadServer();
}

async function loadServer() {
  app.get('/', (req: Request, res: Response) => {
    res.sendFile(req.path || 'index.html', {
      root: './dist',
    });
  });

  app.get('/get20Pokemons/:counter', async (req: Request, res: Response) => {
    res.send(await get20Pokemons(Number(req.params.counter)));
  });

  app.get('/get-specific/:specific', async (req: Request, res: Response) => {
    res.send(await getSpecificPoke(req.params.specific));
  });

  // app.post('/star', async (req: Request, res: Response) => {
  //   console.log(req.body.favorite);
  //   await updateDataFavorite(req.body.idNumber, req.body.favorite);
  // });

  app.listen(process.env.PORT || 3000, () =>
    console.log('listening to port 3000')
  );
}
