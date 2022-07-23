import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import {
  client,
  buildTable,
  get20Pokemons,
  getSpecificPoke,
  updateFavorites,
} from './connect';

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
 * The function connects the database and build the table with the pokemon's
 * then the function load the server his functions included.
 *
 */
async function init() {
  await client.connect();
  if (!false) await buildTable(JSON.parse(readFileData));
  await loadServer();
}

/**
 * The function load the functions of the server
 *
 */
async function loadServer() {
  app.get('/', (req: Request, res: Response) => {
    res.sendFile(req.path || 'index.html', {
      root: './dist',
    });
  });

  // Get 20 pokemon's from the database from counter number
  app.get('/get20Pokemons/:counter', async (req: Request, res: Response) => {
    res.send(await get20Pokemons(Number(req.params.counter)));
  });

  // Get a specific pokemon from database
  app.get('/get-specific/:specific', async (req: Request, res: Response) => {
    res.send(await getSpecificPoke(req.params.specific));
  });

  // Update if pokemon is marked as favorite or not
  app.put('/star', async (req: Request, res: Response) => {
    res.send(await updateFavorites(req.body.name, req.body.favoritePoke));
    console.log(getSpecificPoke(req.body.name));
  });

  app.listen(process.env.PORT || 3000, () => console.log('listening to port 3000'));
}
