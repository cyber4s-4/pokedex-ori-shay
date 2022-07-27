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
    const pokemonTemplate = document.createElement('div') as HTMLDivElement;
    pokemonTemplate.classList.add('pokemon-template-first-page');
    this.parent.appendChild(pokemonTemplate);

    const star = document.createElement('span') as HTMLSpanElement;
    star.classList.add('fa', 'fa-star');
    if (this.data.favorite === 'true') star.classList.add('checked');
    if (this.data.favorite === true) star.classList.add('checked');

    const image = document.createElement('img') as HTMLImageElement;
    image.src = `${this.data.img}`;
    image.classList.add('img-first-page');
    pokemonTemplate.appendChild(image);

    const idNumber = document.createElement('div') as HTMLDivElement;
    idNumber.innerHTML = 'ID Number:    ' + this.data.id;
    pokemonTemplate.appendChild(idNumber);

    const name = document.createElement('div') as HTMLDivElement;
    name.innerHTML = 'Name:     ' + this.data.name;
    pokemonTemplate.appendChild(name);

    const height = document.createElement('div') as HTMLDivElement;
    height.innerHTML = 'Height:     ' + this.data.height;
    pokemonTemplate.appendChild(height);

    const weight = document.createElement('div') as HTMLDivElement;
    weight.innerHTML = 'Weight:       ' + this.data.weight;
    pokemonTemplate.appendChild(weight);

    const types = document.createElement('div') as HTMLDivElement;
    types.classList.add('types');
    pokemonTemplate.appendChild(types);

    const type1 = document.createElement('span') as HTMLDivElement;
    type1.innerHTML = this.data.type1;
    type1.classList.add(`${this.data.type1}`);
    types.appendChild(type1);

    if (this.data.type2 !== '- - -') {
      const type2 = document.createElement('span') as HTMLDivElement;
      type2.innerHTML = `${this.data.type2}`;
      type2.classList.add(`${this.data.type2}`);
      types.appendChild(type2);
    }

    pokemonTemplate.appendChild(star);
    makeFavoritePokemon(star, this.data.name);
  }
}
