import { Data } from '../server/data';
import { closeButtonFunc, makeFavoritePokemon } from './buttons';

export class PokemonComponent {
  data: Data;
  parent: HTMLDivElement;
  constructor(data: Data, parent: HTMLDivElement) {
    this.data = data;
    this.parent = parent;
  }

  render(): void {
    // Enter the data into a template - parent and children:
    const main_container = this.parent;
    const pokemonTemplate = document.createElement('div') as HTMLDivElement;
    pokemonTemplate.classList.add('pokemon-template');
    main_container.appendChild(pokemonTemplate);

    const star = document.createElement('span') as HTMLSpanElement;
    star.classList.add('fa', 'fa-star');
    if (this.data.favorite === 'true') star.classList.add('checked');
    if (this.data.favorite === true) star.classList.add('checked');

    const image = document.createElement('img') as HTMLImageElement;
    image.src = this.data.img;
    image.classList.add('img');
    pokemonTemplate.appendChild(image);

    const dataDiv = document.createElement('div') as HTMLDivElement;
    dataDiv.classList.add('data-div');
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
    closeButtonFunc(pokemonTemplate, main_container);
  }
}
