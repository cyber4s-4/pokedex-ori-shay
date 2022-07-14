import { Data } from './data';
import { MongoClient, Db, Collection /*, WithId*/ } from 'mongodb';
import { key } from './key';

export async function main(data: Data[]) {
  const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  await client.connect();
  const db: Db = client.db('pokedex-project');
  const jsonFileColl: Collection<Data> = db.collection('json-file');
  const milionKPokeColl: Collection<Data> = db.collection('90K-poke');
  // transferDataToDB(data, jsonFileColl);
  // doublePokemons(data, milionKPokeColl);
}

export async function transferDataToDB(
  data: Data[],
  collection: Collection<Data>
) {
  const options = { ordered: true };
  const result = await collection.insertMany(data, options);
  console.log(`${result.insertedCount} documents were inserted`);
}

export async function doublePokemons(
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
        name: firstPokemon.name + secondPokemon.name,
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

export async function getJsonCollection() {
  const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  await client.connect();

  const arr = await client
    .db('pokedex-project')
    .collection('json-file')
    .find()
    .toArray()
    .catch(console.log);

  return arr;
}

export async function getAllCollection() {
  const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  await client.connect();
  const db: Db = client.db('pokedex-project');
  const milionKPokeColl: Collection<Data> = db.collection('90K-poke');

  const dataJson = milionKPokeColl
    .find({})
    .limit(2000)
    .toArray()
    .catch(console.log);

  return dataJson;
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
