import express from 'express';
import { Request, Response } from 'express';
import { json } from 'body-parser';
import { insertToDataJson, Data, updateDataFavorite } from './data';

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

    app.post('/star', (req: Request, res: Response) => {
      res.json(updateDataFavorite(req.body.idNumber));
      // console.log(req.body);
      // console.log('req.body');
      // const readFileData: Data[] | undefined = JSON.parse(
      //   fs.readFileSync(pathDataJson, 'utf8')
      // );
      // readFileData?.forEach((ell) => {
      //   if (ell.id === req.body.idNumber) {
      //     console.log(ell.favorite);
      //     ell.favorite = ell.favorite === true ? false : true;
      //     console.log(ell.favorite);
      //   }
      // });
      // fs.writeFileSync(pathDataJson, JSON.stringify(readFileData));
      // res.json(req.body);
    });

    app.listen(3000, () => console.log('listening to port 3000'));
  }
}

initServer();

// const dataList: Data[] = [];
// async function insertToDataJson() {
//   for (let i = 1; i < 898; i++) {
//     fetchAgain(i);
//   }
// }

// async function fetchAgain(num: number) {
//   fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
//     .then((res) => res.json())
//     .then((res) => {
//       dataList.push({
//         name: res.name,
//         img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`,
//         height: res.height,
//         weight: res.weight,
//         id: res.id,
//       });
//     })
//     .then(() => {
//       dataList.sort((a: Data, b: Data) => a.id - b.id);
//       console.log(num + 'success');
//       fs.writeFileSync(pathDataJson, JSON.stringify(dataList));
//     })
//     .catch(async () => {
//       await console.log(`Error:  fetch fail in  ${num}`);
//       await fetchAgain(num);
//     });
// }
