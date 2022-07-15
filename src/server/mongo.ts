import { Data } from './data';
import { MongoClient, Db, Collection } from 'mongodb';
import { key } from './key';

/**
 * The function connects to Atlas.
 *
 *  @param {string} signInDetails - The username and the password of the user.
 */
export async function connectToAtlas(signInDetails: string) {
  const uri = `mongodb+srv://${signInDetails}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  await client.connect();
  let db: Db = client.db('pokedex-project');
  return db;
}

/**
 * The function returns array with the regular amount of pokemons from Atlas Database.
 */
export async function getPokemonsFromAtlas() {
  const db = await connectToAtlas(key);
  const arrPoke = await db
    .collection('json-file')
    .find()
    .toArray()
    .catch(console.log);

  return arrPoke;
}

/**
 * The function returns array with 100K pokemons from Atlas Database.
 */
export async function getMillionPokemons() {
  const db = await connectToAtlas(key);
  const millionPokeColl: Collection<Data> = db.collection('90K-poke');
  const arrPoke = millionPokeColl
    .find({})
    // .limit(2000)
    .toArray()
    .catch(console.log);

  return arrPoke;
}

/**
 * THE FUNCTION IS USED ONLY ONCE!
 * The function insert data to Atlas database from the JSON file.
 *
 *  @param {Data} data - An object with the pokemon's data
 */
export async function insertDataToAtlas(data: Data[]) {
  const db = await connectToAtlas(key);
  const jsonFileColl: Collection<Data> = db.collection('json-file');
  const millionPokeColl: Collection<Data> = db.collection('90K-poke');
  if (true) {
    insertRegularAmount(data, jsonFileColl);
    insertMillionPokemons(data, millionPokeColl);
  }
}

/**
 * THE FUNCTION IS USED ONLY ONCE!
 * The function insert regular amount of pokemon's data to Atlas database from the JSON file.
 *
 *  @param {Collection<Data>} collection - Collection which the data is inserted
 *  @param {Data} data - An object with the pokemon's data
 */
async function insertRegularAmount(data: Data[], collection: Collection<Data>) {
  const options = { ordered: true };
  const result = await collection.insertMany(data, options);
  console.log(`${result.insertedCount} documents were inserted`);
}

/**
 * THE FUNCTION IS USED ONLY ONCE!
 * The function insert 100k of pokemon's data to Atlas database from the JSON file.
 *
 *  @param {Collection<Data>} collection - Collection which the data is inserted
 *  @param {Data} data - An object with the pokemon's data
 */
async function insertMillionPokemons(
  data: Data[],
  collection: Collection<Data>
) {
  const newDatabase: Data[] = [];
  let counter: number = data.length + 1;
  for (let out = 0; out < data.length; out++) {
    for (let inn = 0; inn <= 100; inn++) {
      const firstPokemon = data[out];
      const secondPokemon = data[inn];
      if (firstPokemon.name === secondPokemon.name) break;
      newDatabase.push({
        name:
          firstPokemon.name.split('', 2) +
          '-' +
          secondPokemon.name.split('', 2),
        img: secondPokemon.img,
        height: Math.floor((firstPokemon.height + secondPokemon.height) / 2),
        weight: Math.floor((firstPokemon.height + secondPokemon.height) / 2),
        id: counter,
        favorite: false,
      });
      counter++;
    }
  }
  const options = { ordered: true };
  const result = await collection.insertMany(newDatabase, options);
  console.log(`${result.insertedCount} documents were inserted`);
}

// ------------------Example how itayMeytav do it: ---------------------
// export async function get20Pokemons() {
//   try {
//     const connect = await create();
//     const collectionName = await collection('pokedex', 'pokemons');
//     return await collectionName.find({}).limit(20).toArray();
//   } catch (e) {
//     console.error(e);
//   } finally {
//     console.log('done');
//     client.close();
//   }
// }
