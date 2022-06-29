export interface Data {
  name: number
  img: string
  height: string
  weight: string
  id: string
}

export class pokemonComponent {
  data: Data
  parent: HTMLDivElement
  constructor(data: Data, parent: HTMLDivElement) {
    this.data = data
    this.parent = parent
    this.render()
  }

  render() {
    // Enter the data into a template - parent and children:
    const main_container = this.parent
    const url_container = document.createElement("a") as HTMLAnchorElement
    main_container.appendChild(url_container)
    const container_items = this.insertData("div", "container", "", url_container)
    this.insertData("h3", "main-container-hover", "Edit item", container_items)
    this.insertData("div", "picture", `<img src=${this.data.img}>`, container_items)
    const specs = this.insertData("div", "cont-specs", "", container_items)
    this.insertData("div", "title", `${this.data.height}`, specs)
    const description = this.insertData("div", "description", "", specs)

    this.specsDetails(description, this.data.id)

    // If the current page is 'admin' add id + link:
    if (window.location.pathname === "/admin.html") {
      container_items.id = `${this.data.id}`
      url_container.href = `./edit.html?id=${this.data.id}`
    }
  }

  specsDetails(description: HTMLElement, text: string): void {
    // Enter the specsDetails into 'description':
    const P1 = document.createElement("p") as HTMLParagraphElement
    P1.innerHTML = `• ${text}`
    description.appendChild(P1)
  }

  insertData(
    type: string,
    classList: string,
    innerHTML: string,
    container: HTMLElement
  ) {
    // Insert the data into elements:
    const element = document.createElement(type) as HTMLElement
    element.innerHTML = innerHTML
    element.classList.add(classList)
    container.appendChild(element)
    return element
  }
}
