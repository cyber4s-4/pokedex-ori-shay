import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import { insertToDataJson, updateDataFavorite } from './data';
import { Data } from './data';
import { deleteAll, doublePokemons, main, transferDataToDB } from './mongo';

export const fs = require('fs');
const path = require('path');

const app = express();
app.use(json());
app.use(express.static('./dist'));

export const pathDataJson: string = path.join(__dirname, '../data.json');
const readFileData: string = fs.readFileSync(pathDataJson, 'utf8');
initServer();
// main(JSON.parse(readFileData));

/**
 * The function Init the server on port 3000, and get data from /get-data.
 *
 */
async function initServer() {
  await insertToDataJson(readFileData);
  console.log('The "data.json" file is ready. Starting to run the server: ');

  await continueInit();
  function continueInit() {
    app.get('/', (req: Request, res: Response) => {
      console.log('Processing request: ', req.url);
      res.sendFile(req.path || 'index.html', {
        root: './dist',
      });
    });

    app.get('/get-data', (_req: Request, res: Response) => {
      res.sendFile('data.json', { root: './dist' });
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
