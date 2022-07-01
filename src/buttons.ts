export function closeButtonFunc(
  parent: HTMLDivElement,
  parentToHide: HTMLDivElement
) {
  const closeButton = document.createElement("button") as HTMLButtonElement
  closeButton.innerHTML = "Close"
  closeButton.id = "close-button"
  parent.appendChild(closeButton)

  closeButton.addEventListener("click", () => {
    parentToHide.style.display = "none"
  })
}
