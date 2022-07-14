import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import { updateDataFavorite } from './data';
import { getAllCollection, getJsonCollection, main } from './mongo';

export const fs = require('fs');
const path = require('path');

const app = express();
app.use(json());
app.use(express.static('./dist'));

export const pathDataJson: string = path.join(__dirname, '../data.json');
const readFileData: string = fs.readFileSync(pathDataJson, 'utf8');
initServer();

/**
 * The function Init the server on port 3000, and get data from /get-data.
 *
 */
async function initServer() {
  // main(JSON.parse(readFileData));
  // await insertToDataJson(readFileData);
  const dataInit = await getJsonCollection();
  const bigDataInit = await getAllCollection();

  await continueInit();
  function continueInit() {
    console.log('ready');
    app.get('/', (req: Request, res: Response) => {
      console.log('Processing request: ', req.url);
      res.sendFile(req.path || 'index.html', {
        root: './dist',
      });
    });

    app.get('/get-data', (_req: Request, res: Response) => {
      res.send(dataInit);
    });

    app.get('/get-all-data', (_req: Request, res: Response) => {
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
