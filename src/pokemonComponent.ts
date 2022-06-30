import { Data } from './data';
export class PokemonComponent {
  data: Data;
  parent: HTMLDivElement;
  constructor(data: Data, parent: HTMLDivElement) {
    this.data = data;
    this.parent = parent;
    // this.render();
  }

  render() {
    // Enter the data into a template - parent and children:
    const main_container = this.parent;
    const pokemonTemplate = document.createElement('div') as HTMLDivElement;
    pokemonTemplate.classList.add('pokemon-template');
    main_container.appendChild(pokemonTemplate);

    const image = document.createElement('img') as HTMLImageElement;
    image.src = this.data.img;
    image.classList.add('img');
    pokemonTemplate.appendChild(image);

    const dataDiv = document.createElement('div') as HTMLDivElement;
    dataDiv.classList.add('data-div');
    pokemonTemplate.appendChild(dataDiv);

    const idNumber = document.createElement('div') as HTMLDivElement;
    idNumber.innerHTML = 'Id number:    ' + this.data.id.toString();
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

    const closeButton = document.createElement('button') as HTMLButtonElement;
    closeButton.innerHTML = 'Close';
    closeButton.id = 'close-button';
    pokemonTemplate.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
      main_container.style.display = 'none';
    });
  }
}
