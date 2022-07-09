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

    app.post('/:name', (req: Request, res: Response) => {
      const name = req.params.name;
      const name2 = req.query.name;
      console.log(name);
      console.log(name2);
      console.log(readFileData);
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
//       console.log(num + 'succes');
//       fs.writeFileSync(pathDataJson, JSON.stringify(dataList));
//     })
//     .catch(async () => {
//       await console.log(`Error:  fetch fail in  ${num}`);
//       await fetchAgain(num);
//     });
// }
