export interface Data {
  name: string;
  img: string;
  height: string;
  weight: string;
  id: number;
}

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
    console.log('render');
    const pokemonTemplate = document.createElement('div') as HTMLElement;
    pokemonTemplate.classList.add('pokemon-template');
    main_container.appendChild(pokemonTemplate);

    pokemonTemplate.addEventListener('click', () =>
      this.clickjunc(this.data.id)
    );

    const image = document.createElement('img') as HTMLImageElement;
    image.src = this.data.img;
    image.classList.add('img');
    pokemonTemplate.appendChild(image);

    const idNumber = document.createElement('div') as HTMLDivElement;
    idNumber.classList.add('idNumber');
    idNumber.innerHTML = this.data.id.toString();
    pokemonTemplate.appendChild(idNumber);

    const name = document.createElement('div') as HTMLDivElement;
    name.classList.add('name');
    name.innerHTML = this.data.name;
    pokemonTemplate.appendChild(name);
  }

  clickjunc(pokemonId: number) {
    console.log(pokemonId);
  }
}
