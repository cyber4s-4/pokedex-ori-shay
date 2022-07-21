import { Client } from 'pg';
import { Data } from './data';

// Add prevent SQL- injection funciton

export const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://sxjctmpcdugncg:6106202fae99ebd5b4d21cc3494574d6c26efb4b394c8ac8b0cc07f596922f56@ec2-107-22-122-106.compute-1.amazonaws.com:5432/d7u0khvh3veull',
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function buildTable(data: Data[]) {
  // Drop table
  const sql1 = `DROP TABLE IF EXISTS pokemons;`;
  await client.query(sql1);
  console.log('SQL: DROP TABLE pokemons');

  // Create table
  const sql = `CREATE TABLE IF NOT EXISTS pokemons (
        id_serial  SERIAL PRIMARY KEY,
        id  VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        img	VARCHAR(255) NOT NULL,
        height  VARCHAR(255) NOT NULL,
        weight	VARCHAR(255) NOT NULL,
        favorite  VARCHAR(255) NOT NULL
    );`;
  await client.query(sql);
  console.log('SQL: CREATE TABLE pokemons');

  // Insert data:
  console.log('SQL: start to insert pokemons');
  insertData(data).then(() => {
    insertDataFor5K(data).then(() => {
      console.log('SQL: finished to insert pokemons');
    });
  });
}

export async function insertDataFor5K(data: Data[]) {
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
      });
      counter++;
    }
  }
  insertData(newDatabase);
}

export async function insertData(data: Data[]) {
  let table = `INSERT INTO pokemons (id, name, img, height, weight, favorite) VALUES `;
  let values = '';
  for (let i = 0; i < data.length; i++) {
    values += `('${data[i].id}','${data[i].name}','${data[i].img}','${data[i].height}','${data[i].weight}','${data[i].favorite}'),`;
  }
  let sql = table + values.slice(0, -1) + ';';
  await client.query(sql);
}

export async function get20Pokemons(from: number = 0) {
  let sql = `SELECT * from pokemons LIMIT $1 OFFSET $2;`;
  const values = [20, from];
  return new Promise<Data[]>((resolve, reject) => {
    client.query(sql, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        // console.log(res.rows);
        resolve(res.rows);
      }
    });
  });
}

export async function getSpecificPoke(inputValue: string | number) {
  let sql = `SELECT * from pokemons where id =$1;`;
  if (typeof inputValue !== 'string') {
    sql = `SELECT * from pokemons where name =$1;`;
  }
  console.log('function getSpecificPoke');
  const values = [inputValue];
  return new Promise<Data[]>((resolve, reject) => {
    client.query(sql, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows[0]);
        resolve(res.rows[0]);
      }
    });
  });
}

export function getArrayPoke(name: string) {
  // get all poke that match the input search...
  // if we have specific match - the message will up with the poke
  // if there is no specific, up all the pokemons with that string
}

export function updateFavorites(id: string) {
  // connect to the data-base and change it. (like the put request yestarday)
}
