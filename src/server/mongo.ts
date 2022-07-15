import { Data } from './data';
import { MongoClient, Db, Collection } from 'mongodb';
import { key } from './key';

export async function getJsonPokemons() {
  const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  await client.connect();

  const arrPoke = await client
    .db('pokedex-project')
    .collection('json-file')
    .find()
    .toArray()
    .catch(console.log);

  return arrPoke;
}

export async function getMillionPokemons() {
  const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  await client.connect();
  const db: Db = client.db('pokedex-project');
  const milionKPokeColl: Collection<Data> = db.collection('90K-poke');

  const arrPoke = milionKPokeColl
    .find({})
    // .limit(2000)
    .toArray()
    .catch(console.log);

  return arrPoke;
}

/**
 * TODO: write here comment explain:
 */
export async function insertToAtlas(data: Data[]) {
  const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  await client.connect();
  const db: Db = client.db('pokedex-project');
  const jsonFileColl: Collection<Data> = db.collection('json-file');
  const milionKPokeColl: Collection<Data> = db.collection('90K-poke');
  if (false) {
    insertJsonPokemons(data, jsonFileColl);
    insertMillionPokemons(data, milionKPokeColl);
  }
}

async function insertJsonPokemons(data: Data[], collection: Collection<Data>) {
  const options = { ordered: true };
  const result = await collection.insertMany(data, options);
  console.log(`${result.insertedCount} documents were inserted`);
}

async function insertMillionPokemons(
  dataArray: Data[],
  collection: Collection<Data>
) {
  const newDatabase: Data[] = [];
  let counter: number = dataArray.length + 1;
  for (let out = 0; out < dataArray.length; out++) {
    for (let inn = 0; inn <= 100; inn++) {
      const firstPokemon = dataArray[out];
      const secondPokemon = dataArray[inn];
      if (firstPokemon.name === secondPokemon.name) break;
      newDatabase.push({
        name: firstPokemon.name + '-' + secondPokemon.name + 'p',
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
