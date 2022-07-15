import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import { updateDataFavorite } from './data';
import {
  getMillionPokemons,
  getPokemonsFromAtlas,
  insertDataToAtlas,
} from './mongo';

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

initServer();

/**
 * The function Init the server on port 3000.
 * In main page the server send the HTML.
 * In /get-data the server send the regular amount of pokemons.
 * In /get-all-data the server send 100K pokemon's.
 * In /star the server change the favorite value of chosen pokemon.
 */
async function initServer() {
  if (!false) await insertDataToAtlas(JSON.parse(readFileData));
  console.log('insertDataToAtlas  -- finish');
  const dataInit = await getPokemonsFromAtlas();
  console.log('getPokemonsFromAtlas -- finish');

  await continueInit();
  function continueInit() {
    app.get('/', (req: Request, res: Response) => {
      res.sendFile(req.path || 'index.html', {
        root: './dist',
      });
    });

    app.get('/get-data', (_req: Request, res: Response) => {
      res.send(dataInit);
    });

    app.get('/get-all-data', async (_req: Request, res: Response) => {
      console.log('Start getMillionPokemons from Atlas');
      const bigDataInit = await getMillionPokemons();
      console.log('Finish getMillionPokemons from Atlas');
      res.send(bigDataInit);
    });

    app.post('/star', async (req: Request, res: Response) => {
      await updateDataFavorite(req.body.idNumber);
    });

    app.listen(process.env.PORT || 3000, () =>
      console.log('listening to port 3000')
    );
  }
}
