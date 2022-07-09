/**
 * The function create a close button on element, and hide all the relevant elements after clicking
 * the button.
 *
 * @param {HTMLDivElement} parent - An html element
 * @param {HTMLDivElement} elementToHide - The element we hiding after clicking on "close"
 */
export function closeButtonFunc(
  parent: HTMLDivElement,
  elementToHide: HTMLDivElement
) {
  const closeButton = document.createElement("button") as HTMLButtonElement
  closeButton.innerHTML = "Close"
  closeButton.id = "close-button"
  parent.appendChild(closeButton)

  closeButton.addEventListener("click", () => {
    elementToHide.style.display = "none"
  })
}

/**
 * The function click on the star near a favorite pokemon
 *
 * @param {HTMLSpanElement} star - The element has been selected.
 */
export function makeFavoritePokemon(star: HTMLSpanElement): void {
  star.addEventListener("click", (element) => {
    const star = element.currentTarget as HTMLSpanElement
    if (star.classList.contains("checked") === true) {
      star.classList.remove("checked")
    } else {
      star.classList.add("checked")
      window.location.href = `http://localhost:3000/${star.id}`
    }
  })
}
