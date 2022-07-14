import { Data } from './data';
import { fs, pathDataJson } from './server';
import { MongoClient, Db, Collection /*, WithId*/ } from 'mongodb';
import { key } from './key';

const example: Data = {
  name: 'bulbasaur',
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  height: 7,
  weight: 69,
  id: 1,
  favorite: false,
};
export async function main(data: Data[]) {
  const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);
  await client.connect();
  const db: Db = client.db('pokedex-project');
  const jsonFileColl: Collection<Data> = db.collection('json-file');
  const milionKPokeColl: Collection<Data> = db.collection('90K-poke');
  // transferDataToDB(data, jsonFileColl);
  // doublePokemons(data, milionKPokeColl);
  deleteAll(jsonFileColl);
  deleteAll(milionKPokeColl);
}

// jsonFileColl.insertOne(example).then((res) => console.log(res.insertedId));

export async function transferDataToDB(
  data: Data[],
  collection: Collection<Data>
) {
  const options = { ordered: true };
  const result = await collection.insertMany(data, options);
  console.log(`${result.insertedCount} documents were inserted`);
}

export async function deleteAll(collection: Collection<Data>) {
  const result = await collection.deleteMany({});
  console.log(`${result.deletedCount} documents were deleted`);
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

  setTimeout(() => {
    console.log(dataArray.length * 100 + dataArray.length);
    console.log();
    console.log(newDatabase.length);
  }, 300);
}
