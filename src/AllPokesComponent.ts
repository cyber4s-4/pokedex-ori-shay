import { firstContainer } from "./app"
import { Data } from "./data"

export class AllPokesComponent {
  data: Data
  parent: HTMLDivElement

  constructor(data: Data, parent: HTMLDivElement) {
    this.data = data
    this.parent = parent
    // this.render();
  }

  render() {
    this.parent = firstContainer
    // Enter the data into a template - parent and children:
    const pokemonTemplate = document.createElement("div") as HTMLDivElement
    pokemonTemplate.classList.add("pokemon-template-first-page")
    this.parent.appendChild(pokemonTemplate)

    // pokemonTemplate.addEventListener("click", () => this.clickjunc(this.data.id))

    const image = document.createElement("img") as HTMLImageElement
    image.src = this.data.img
    image.classList.add("img-first-page")
    pokemonTemplate.appendChild(image)
    // this.insertData('idNumber', this.data.id.toString(), pokemonTemplate);

    const dataDiv = document.createElement("div") as HTMLDivElement
    dataDiv.classList.add("data-div-first-page")
    pokemonTemplate.appendChild(dataDiv)

    const idNumber = document.createElement("div") as HTMLDivElement
    idNumber.innerHTML = "Id number:    " + this.data.id.toString()
    dataDiv.appendChild(idNumber)

    const name = document.createElement("div") as HTMLDivElement
    name.innerHTML = "Name:     " + this.data.name
    dataDiv.appendChild(name)

    const height = document.createElement("div") as HTMLDivElement
    height.innerHTML = "Height:     " + this.data.height
    dataDiv.appendChild(height)

    const weight = document.createElement("div") as HTMLDivElement
    weight.innerHTML = "Weight:       " + this.data.weight
    dataDiv.appendChild(weight)
  }
}
