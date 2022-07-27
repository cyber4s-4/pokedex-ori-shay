import { Data } from './data';
import { MongoClient, Db, Collection, WithId } from 'mongodb';
export const { ServerApiVersion } = require('mongodb');

//  TODO: merge the lines in buildData function :
//  TODO: merge the lines in getSpecificPoke function :
//  TODO: Add the env to heroku... :

import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
const key = process.env.MONGO_DB_URL;

const uri = `mongodb+srv://${key}@cluster0.f6khn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const db: Db = client.db('pokedex');

export async function clientConnect() {
  await client.connect();
}

export async function buildData(data: Data[]) {
  console.log('start to insert pokemons - MongoDB');
  const collection = db.collection('pokemons');
  const options = { ordered: true };
  const result = await collection.insertMany(data, options);
  const result2 = await collection.insertMany(insertMore(data), options);
  console.log(`${result.insertedCount} documents were inserted`);
  console.log(`${result2.insertedCount} documents were inserted`);
  console.log('Finish buildTable function - MongoDB ');
}

export async function get20Pokemons(from = 0) {
  const arrPoke = await db
    .collection('pokemons')
    .find()
    .skip(from)
    .limit(20)
    .toArray()
    .catch(console.log);
  console.log(arrPoke);
  return arrPoke;
}

export async function getSpecificPoke(inputValue: string | number) {
  if (inputValue == Number(inputValue)) {
    return await db
      .collection('pokemons')
      .findOne({ id: Number(inputValue) })
      .catch(console.log);
  } else {
    return await db
      .collection('pokemons')
      .findOne({ name: inputValue })
      .catch(console.log);
  }
}

export async function updateFavorites(pokemonName: string, favorite: boolean) {
  try {
    const filter = { name: pokemonName };
    const updateDoc = { $set: { favorite: favorite } };
    db.collection('pokemons').updateMany(filter, updateDoc).then(console.log);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Finish update ' + pokemonName);
  }
}

/**
 * THE FUNCTION IS USED ONLY ONCE!
 * The function insert 100k of pokemon's data to Atlas database from the JSON file.
 *
 *  @param {Data} data - An object with the pokemon's data
 */

function insertMore(data: Data[]): Data[] {
  const newDatabase: Data[] = [];
  let counter: number = data.length + 1;
  for (let out = 0; out < data.length; out++) {
    for (let inn = 0; inn <= 5; inn++) {
      const firstPokemon = data[out];
      const secondPokemon = data[inn];
      if (firstPokemon.name === secondPokemon.name) break;
      const firstPokemonName = firstPokemon.name.substring(0, 4);
      const secondPokemonName =
        secondPokemon.name.charAt(0).toUpperCase() +
        secondPokemon.name.substring(1, 4);

      newDatabase.push({
        name: firstPokemonName + secondPokemonName,
        img: secondPokemon.img,
        height: Math.floor((firstPokemon.height + secondPokemon.height) / 2),
        weight: Math.floor((firstPokemon.height + secondPokemon.height) / 2),
        id: counter,
        favorite: false,
        type1: secondPokemon.type1,
        type2: secondPokemon.type2,
      });
      counter++;
    }
  }
  return newDatabase;
}
