import { Data } from './data';
import { fs, pathForMongo } from './server';
import { MongoClient, Db, Collection /*, WithId*/ } from 'mongodb';
import { key } from './key';

interface Item {
  ori: string;
  //   shay: number;
}

const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
client.connect();
const db: Db = client.db('pokedex-project');
console.log();
const jsonFileColl: Collection<Item> = db.collection('json-file');
jsonFileColl
  .insertOne({ ori: 'thee' })
  .then((res) => console.log(res.insertedId));

const readJsonData: Data[] = JSON.parse(fs.readFileSync(pathForMongo, 'utf8'));
console.log(readJsonData);
// const newDatabase: Data[] = [];

// async function create_connect(collectionName: string) {
//   const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
//   const client = new MongoClient(uri);
//   await client.connect();
//   const db: Db = client.db('pokedex-project');
//   const collection: Collection<Item> = db.collection(collectionName);
//   return collection;
// }

// Insert Documents
// async function transferDataToDB(client: any) {
//   const options = { ordered: true };
//   const result = await client.insertMany(readJsonData, options);
//   console.log(`${result.insertedCount} documents were inserted`);
// }
// transferDataToDB(jsonFileColl);

// function doublePokemons() {
//   let counter: number = readJsonData.length;
//   for (let i = 0; i < readJsonData.length; i++) {
//     for (let j = 0; j <= 100; j++) {
//       const firstPokemon = readJsonData[i];
//       const secondPokemon = readJsonData[j];
//       if (firstPokemon.name === secondPokemon.name) break;
//       newDatabase.push({
//         name: secondPokemon.name,
//         img: secondPokemon.img,
//         height: firstPokemon.height,
//         weight: firstPokemon.weight,
//         id: counter++,
//         favorite: false,
//       });
//       counter++;
//     }
//   }
// }
