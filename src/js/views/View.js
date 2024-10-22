export default class View {

  _parentElement = document.querySelector(".countries-container")

renderPage(data) {

  const markup = this._generateMarkup(data)
  this._parentElement.insertAdjacentHTML("afterbegin", markup)
}


_clear() {
  this._parentElement.innerHTML = '';
  const searchContainer = document.querySelector(".search-container");
  if (searchContainer) {
    searchContainer.remove();
}
} 

_clearCountriesOnly() {
  this._parentElement.innerHTML = "";
}

addContainerClass(addClass, removeClass = null) {
  this.container = document.querySelector('.countries-container');
  if (removeClass && this.container.classList.contains(removeClass)) {
    this.container.classList.remove(removeClass);
  }
  this.container.classList.add(addClass);
}
}




