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
    const pokemonTemplate = document.createElement('div') as HTMLDivElement;
    pokemonTemplate.classList.add('pokemon-template');
    main_container.appendChild(pokemonTemplate);

    pokemonTemplate.addEventListener('click', () =>
      this.clickjunc(this.data.id)
    );

    const image = document.createElement('img') as HTMLImageElement;
    image.src = this.data.img;
    image.classList.add('img');
    pokemonTemplate.appendChild(image);
    // this.insertData('idNumber', this.data.id.toString(), pokemonTemplate);

    const idNumber = document.createElement('div') as HTMLDivElement;
    idNumber.innerHTML = 'Id number:    ' + this.data.id.toString();
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
  }

  // insertData(type: string, data: string, container: HTMLDivElement) {
  //   const divType = document.createElement('div') as HTMLDivElement;
  //   divType.innerHTML = type;

  //   const element = document.createElement('span') as HTMLSpanElement;
  //   element.innerHTML = data;
  //   container.appendChild(element);
  // }

  clickjunc(pokemonId: number) {
    console.log(pokemonId);
  }
}
