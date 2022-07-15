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
  const closeButton = document.createElement('button') as HTMLButtonElement;
  closeButton.innerHTML = 'Close';
  closeButton.id = 'close-button';
  parent.appendChild(closeButton);

  closeButton.addEventListener('click', () => {
    elementToHide.style.display = 'none';
  });
}

/**
 * The function click on the star near a favorite pokemon
 *
 * @param {HTMLSpanElement} star - The element has been selected.
 */
export function makeFavoritePokemon(star: HTMLSpanElement, id: number): void {
  star.addEventListener('click', async (el) => {
    const target = el.currentTarget as HTMLSpanElement;
    if (target.classList.contains('checked') === true) {
      target.classList.remove('checked');
    } else {
      target.classList.add('checked');
    }
    const rawResponse = await fetch('/star', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idNumber: id }),
    });
    const content = await rawResponse.json();
    console.log('pokeId: ' + content);
  });
}
