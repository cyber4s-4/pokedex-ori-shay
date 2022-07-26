import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import {
  client,
  buildTable,
  get20Pokemons,
  getSpecificPoke,
  updateFavorites,
} from './connect';
import { getPokemonsFromApi } from './data';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

const app = express();
app.use(json());
app.use(express.static('./dist'));

// TODO: Ori:
// V - 1. Finish the fetchRequests function + update the data-interface + data tables
// 2. Return the MongoDB file - that we can choose our database.
// 3. Add option that if we have no match in the search - take the string and search with %??%..
// 4. Match the last task with the scrolling function..

// TODO: Shay:
// 1. Add nav-bar like ron and ori - amram... (sort by, favorites, and more...)
// 2. All the options in the nav-bar - buttons that call function that make fetch-requests !!
// 3. After ori finish with the fetch-Api - display all pokemons by specs - water/ fire..
// 4. Display the pokemon that he will look good - add the star for selectedPoke message !!!

init();

/**
 * The function connects the database and build the table with the pokemon's.
 * Then the function load the server his functions included.
 *
 */
async function init() {
  await client.connect();
  if (false) await buildTable(await getPokemonsFromApi());
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
  app.post('/star', async (req: Request, res: Response) => {
    await updateFavorites(req.body.name, req.body.favoritePoke);
  });

  const port = process.env.PORT;
  app.listen(port, () => console.log('Hosted: http://localhost:' + port));
}
