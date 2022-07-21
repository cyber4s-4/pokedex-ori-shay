import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { updateDataFavorite } from './data';
import { client, buildTable, get20Pokemons, getSpecificPoke } from './connect';

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

client.connect();
initServer();

/**
 * The function Init the server on port 3000.
 * In main page the server send the HTML.
 * In /get-data the server send the regular amount of pokemons.
 * In /get-all-data the server send 100K pokemon's.
 * In /star the server change the favorite value of chosen pokemon.
 */
async function initServer() {
  if (!false) {
    console.log('Start buildTable function ');
    await buildTable(JSON.parse(readFileData));
    console.log('Finish buildTable function ');
  }

  continueInit();
  function continueInit() {
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
}
