import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import { Data, dataList, insertToDataJson } from './data';

export const fs = require('fs');
const path = require('path');

const app = express();
app.use(json());
app.use(express.static('./../client/dist'));

export const pathDataJson: string = path.join(__dirname, '../data/data.json');
const readFileData: string = fs.readFileSync(pathDataJson, 'utf8');

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
      res.sendFile(req.path || 'index.html', { root: './../client/dist' });
    });

    app.get('/get-data', (req: Request, res: Response) => {
      res.sendFile('data.json', { root: './../server/data' });
    });

    app.post('/?name', (req: Request, res: Response) => {
      const name: any = req.body;
      const name2 = req.query;
      console.log(name);
      console.log(name2);
      // console.log(JSON.parse(readFileData))
      // const findPokemon = JSON.parse(readFileData).find(
      //   (el) => el.name === name
      // );
      // if (findPokemon) {
      //   const newArr = readFileData.filter((el) => el.name !== name);
      //   fs.writeFileSync(pathDataJson, JSON.stringify(newArr));
      //   res.send(newArr);
      // } else {
      //   res.send('No find name');
      // }
    });

    app.listen(3000, () => console.log('listening to port 3000'));
  }
}

initServer();
