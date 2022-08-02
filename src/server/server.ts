import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import {
  clientConnect,
  buildData,
  get20Pokemons,
  getSpecificPoke,
  updateFavorites,
} from './connect';
// } from './mongo';
import { getPokemonsFromApi } from './data';

import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const app = express();
app.use(json());
app.use(express.static('./dist'));

const validation = require('./validation');
app.use('/validation', validation);

init();

/**
 * The function connects the database and build the table with the pokemon's.
 * Then the function load the server his functions included.
 *
 */
async function init() {
  await clientConnect();
  if (false) await buildData(await getPokemonsFromApi());
  await loadServer();
}

/**
 * The function load the functions of the server
 *
 */
async function loadServer() {
  // Get 20 pokemon's from the database from counter number
  app.get('/get20Pokemons/:counter', async (req: Request, res: Response) => {
    res.send(await get20Pokemons(Number(req.params.counter)));
  });

  // Get a specific pokemon from database
  app.get('/get-specific/:specific', async (req: Request, res: Response) => {
    res.send(await getSpecificPoke(req.params.specific));
  });

  // Update if pokemon is marked as favorite or not
  app.post('/star', async (req: Request, res: Response) => {
    await updateFavorites(req.body.name, req.body.favoritePoke);
  });

  const port = process.env.PORT;
  app.listen(port, () => console.log('Hosted: http://localhost:' + port));
}

// TODO: Ori:
// - Update the dataBases that they include the users data...
// - Update the dataBases requests that every user have his favorites..
// - Use the 'load' mode from itai and nitzan code.
// - Separate the scss to files and specific folder + change gulp file
// - Css for the new HTML's
// - Use my laptops project for the scss...
// - extra: Add option that if we have no match in the search - take the string and search with %??%..
// - extra: Match the last task with the scrolling function..

// TODO: Shay:
// - All the options in the nav-bar - buttons that call function that make fetch-requests !!
// - Display the pokemon that he will look good - add the star for selectedPoke message !!!
// - Add our favicon
// - Update the users information in the database.
// - Show favorites for a specific user.
// - if pokemon clicked, show specific pokemon.

// TODO: Future:
// - Testing - see the task-03 js in the 10-testing solutions (ori)  - way to check requests...
// - When i working on the auth - i need try use 1 file of html + 1 file of typesrcipt -
// that every stage its change the body of the html...
// Fix the css ! specific on the validation.scss...
