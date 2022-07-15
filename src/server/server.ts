import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import { updateDataFavorite } from './data';
import { getMillionPokemons, getJsonPokemons, insertToAtlas } from './mongo';

export const fs = require('fs');
const path = require('path');

const app = express();
app.use(json());
app.use(express.static('./dist'));

/**
 * * TODO: write here comment explain:
 */
export const pathDataJson: string = path.join(__dirname, '../data.json');
const readFileData: string = fs.readFileSync(pathDataJson, 'utf8');
if (false) insertToAtlas(JSON.parse(readFileData));

initServer();

/**
 * The function Init the server on port 3000, and get data from /get-data.
 *
 */
async function initServer() {
  const dataInit = await getJsonPokemons();

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
      console.log(req.body.idNumber);
      res.json(await updateDataFavorite(req.body.idNumber));
    });

    app.listen(process.env.PORT || 3000, () =>
      console.log('listening to port 3000')
    );
  }
}
