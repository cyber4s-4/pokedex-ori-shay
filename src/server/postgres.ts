import { Client } from 'pg';
import { Data } from './data';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

// Connecting to database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function clientConnect() {
  await client.connect();
}

/**
 * The function init the pokemon's table in postgreSQL while getting the data
 * from the JSON file.
 *
 * @param {Data[]} data - The element has been selected.
 */
export async function buildData(data: Data[]) {
  console.log('SQL: Start buildDataTable function ');

  // Drop table
  const buildTable = 'DROP TABLE IF EXISTS pokemons;';
  await client.query(buildTable);
  console.log('SQL: DROP TABLE pokemons');

  // Create table
  const sql = `CREATE TABLE IF NOT EXISTS pokemons (
        id_serial  SERIAL PRIMARY KEY,
        id Numeric NOT NULL,
        name VARCHAR(255) NOT NULL,
        img	VARCHAR(255) NOT NULL,
        height  VARCHAR(255) NOT NULL,
        weight	VARCHAR(255) NOT NULL,
        favorite  VARCHAR(255) NOT NULL,
        type1  VARCHAR(255) NOT NULL,
        type2  VARCHAR(255) NOT NULL
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
  console.log('Finish buildTable function ');
  if (false) buildUsersTable();
}

/**
 * The function INSERT data for 5K pokemon's, the function getting the data
 * from the JSON file, and manipulates to double the number of pokemon's
 *
 * @param {Data[]} data - The element has been selected.
 */
async function insertDataFor5K(data: Data[]) {
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
  insertData(newDatabase);
}

/**
 * The function INSERT data for regular amount of pokemon's, the function getting the data
 * from the JSON file
 *
 * @param {Data[]} data - The element has been selected.
 */
async function insertData(data: Data[]) {
  const table =
    'INSERT INTO pokemons (id, name, img, height, weight, favorite, type1, type2) VALUES ';
  let values = '';
  for (let i = 0; i < data.length; i++) {
    values += `('${data[i].id}','${data[i].name}','${data[i].img}','${data[i].height}','${data[i].weight}','${data[i].favorite}','${data[i].type1}','${data[i].type2}'),`;
  }
  const sql = table + values.slice(0, -1) + ';';
  await client.query(sql);
}

/**
 * The function getting 20 pokemon's from database
 *
 * @param {number} from - Counter to get an index of a specific Pokemon to start counting from
 */
export async function get20Pokemons(from = 0) {
  const sql = 'SELECT * from pokemons ORDER BY id LIMIT $1 OFFSET $2;';
  const values = [20, from];
  return new Promise<Data[]>((resolve, reject) => {
    client.query(sql, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        resolve(res.rows);
      }
    });
  });
}

/**
 * The function gets input from the user and searches for him the specific pokemon he looking for
 *
 * @param {string | number} inputValue - A number or string that received from the user
 * to get the specific Pokemon
 */
export async function getSpecificPoke(inputValue: string | number) {
  let sql = 'SELECT * from pokemons where name =$1;';
  if (inputValue == Number(inputValue)) {
    sql = 'SELECT * from pokemons where id =$1;';
  }
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

/**
 * The function update the favorite value of a specific pokemon in the database.
 *
 * @param {string} pokemonName - The pokemon's name
 * @param {boolean} favorite - true / false according to the pokemon favorite value
 */
export async function updateFavorites(pokemonName: string, favorite: boolean) {
  const sql = `UPDATE pokemons SET favorite= $1 WHERE name = $2 RETURNING *;`;
  const values = [favorite, pokemonName];
  return await new Promise<Data[]>((resolve, reject) => {
    client.query(sql, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows);
        resolve(res.rows);
      }
    });
  });
}

// Valdation:
export function CheckIfUserExist(
  username: string,
  password: string
): Promise<string | undefined> {
  let selectUser = 'SELECT * from users where username =$1 and password=$2;';
  const values = [username, password];
  return new Promise<string | undefined>((resolve, reject) => {
    client.query(selectUser, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        if (res.rows[0]) resolve(res.rows[0].token);
        else resolve(undefined);
      }
    });
  });
}

export async function CheckUserByToken(token: string) {
  let selectUser = 'SELECT * from users where token =$1;';
  return new Promise<string | undefined>((resolve, reject) => {
    client.query(selectUser, [token], (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        if (res.rows[0]) resolve(res.rows[0]);
        else resolve(undefined);
      }
    });
  });
}

export async function CreateNewUser(
  username: string,
  password: string,
  token: string
) {
  const insertUser = `INSERT INTO users (username,password,token) VALUES ('${username}', '${password}','${token}') RETURNING *;`;
  client.query(insertUser, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows);
    }
  });
}

export async function buildUsersTable() {
  console.log('SQL: Start build-Users-Table function ');

  // Drop table
  const buildTable = 'DROP TABLE IF EXISTS users;';
  await client.query(buildTable);
  console.log('SQL: DROP TABLE users');

  // Create table
  const createTable = `CREATE TABLE IF NOT EXISTS users (
        id_serial  SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password	VARCHAR(255) NOT NULL,
        token  VARCHAR(255) NOT NULL
    );`;
  await client.query(createTable);
  console.log('SQL: CREATE TABLE users');
  console.log('Finish build-Users-Table function ');
}
