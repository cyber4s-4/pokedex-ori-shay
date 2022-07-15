import { makeFavoritePokemon } from './buttons';
import { Data } from '../server/data';

export class AllPokesComponent {
  data: Data;
  parent: HTMLDivElement;

  constructor(data: Data, parent: HTMLDivElement) {
    this.data = data;
    this.parent = parent;
  }

  render(): void {
    // Enter the data into a template - parent and children:
    // console.log(this.data);
    if (this.data === undefined) return;
    const pokemonTemplate = document.createElement('div') as HTMLDivElement;
    pokemonTemplate.classList.add('pokemon-template-first-page');
    this.parent.appendChild(pokemonTemplate);

    const image = document.createElement('img') as HTMLImageElement;
    image.src = this.data.img;
    image.classList.add('img-first-page');
    pokemonTemplate.appendChild(image);

    const dataDiv = document.createElement('div') as HTMLDivElement;
    dataDiv.classList.add('data-div-first-page');
    pokemonTemplate.appendChild(dataDiv);

    const idNumber = document.createElement('div') as HTMLDivElement;
    idNumber.innerHTML = 'ID Number:    ' + this.data.id.toString();
    dataDiv.appendChild(idNumber);

    const name = document.createElement('div') as HTMLDivElement;
    name.innerHTML = 'Name:     ' + this.data.name;
    dataDiv.appendChild(name);

    const height = document.createElement('div') as HTMLDivElement;
    height.innerHTML = 'Height:     ' + this.data.height;
    dataDiv.appendChild(height);

    const weight = document.createElement('div') as HTMLDivElement;
    weight.innerHTML = 'Weight:       ' + this.data.weight;
    dataDiv.appendChild(weight);

    const star = document.createElement('span') as HTMLSpanElement;
    star.classList.add('fa', 'fa-star');
    star.id = 'star';
    dataDiv.appendChild(star);
    makeFavoritePokemon(star, this.data.id);
  }
}
