import express from "express"
import { Request, Response } from "express"
import { json } from "body-parser"
import { Data, insertToDataJson, updateDataFavorite } from "./data"

export const fs = require("fs")
const path = require("path")

const app = express()
app.use(json())
app.use(express.static("./dist"))

export const pathDataJson: string = path.join(__dirname, "../data.json")
const readFileData: string = fs.readFileSync(pathDataJson, "utf8")

/**
 * The function Init the server on port 3000, and get data from /get-data.
 *
 */
async function initServer() {
  await insertToDataJson(readFileData)
  console.log('The "data.json" file is ready. Starting to run the server: ')

  await continueInit()
  function continueInit() {
    app.get("/", (req: Request, res: Response) => {
      console.log("Processing request: ", req.url)
      res.sendFile(req.path || "index.html", {
        root: "./dist",
      })
    })

    app.get("/get-data", (_req: Request, res: Response) => {
      res.sendFile("data.json", { root: "./dist" })
    })

    app.post("/star", async (req: Request, res: Response) => {
      console.log(req.body.idNumber)
      res.json(await updateDataFavorite(req.body.idNumber))
    })

    app.listen(process.env.PORT || 3000, () => console.log("listening to port 3000"))
  }
}

initServer()

// const newDatabase: Data[] = []

// function transferDataToDB() {

//   readJsonData?.forEach((el) => {
//     newDatabase.push(el)
//   })
// }

const readJsonData: Data[] | undefined = JSON.parse(
  fs.readFileSync(pathDataJson, "utf8")
)

// Insert Documents
async function transferDataToDB(client: any) {
  const result = await client
    .db("pokemon_db")
    .collection("pokemons")
    .insertMany(readJsonData)
}

const newDatabase: Data[] = []

function doublePokemons() {
  let counter: number = readJsonData.length
  for (let i = 0; i < readJsonData.length; i++) {
    for (let j = 0; j <= 100; j++) {
      const firstPokemon = readJsonData[i]
      const secondPokemon = readJsonData[j]
      if (firstPokemon.name === secondPokemon.name) break
      newDatabase.push({
        name: secondPokemon.name,
        img: secondPokemon.img,
        height: firstPokemon.height,
        weight: firstPokemon.weight,
        id: counter++,
        favorite: false,
      })
      counter++
    }
  }
}
