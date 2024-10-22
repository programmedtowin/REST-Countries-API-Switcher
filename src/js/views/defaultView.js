import View from './View.js';

class DefaultView extends View {

  _parentElementSearch = document.querySelector("main")
  _parentElement = document.querySelector(".countries-container")

  
  renderDefaultPageUI(data) {
    this._clear()
    const markupSearch = this._generateSearchMarkup()
    const markup = this._generateMarkup(data)
    this._parentElementSearch.insertAdjacentHTML("afterbegin", markupSearch)
    this._parentElement.insertAdjacentHTML("afterbegin", markup)
    this.addContainerClass("default-page-container", "details-page-container");
  }

  renderRegionPageUI(data) {
    this._clearCountriesOnly()
    const markup = this._generateMarkup(data)
    this._parentElement.insertAdjacentHTML("afterbegin", markup)
  }


addEventCountryClick(handleClick) {
  const countryCards = document.querySelectorAll('.countries-card-container');
  countryCards.forEach(card => {
    card.addEventListener('click', event => {
      const clickedCountry = event.currentTarget.querySelector(".country-title").textContent;
      handleClick(clickedCountry)
    } ); 
  });
}

addChangeEventToDropdown(handleChangeEvent){
  const dropdownMenu = document.getElementById('region-filter');
  dropdownMenu.addEventListener("change", function(event) {
    const selectedRegion = event.target.value
    handleChangeEvent(selectedRegion)
  })
}

addSearchInputEventListener(handler) {
  const searchInput = document.getElementById('search-bar');
  searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    handler(searchTerm);
  });
}

_generateSearchMarkup() {
  return `
    <section class="container search-container" aria-label="Country search and filter">
      <div class="filter-container">        
        <div class="search-bar-container">
          <svg xmlns="http://www.w3.org/2000/svg" class="search-icon" style="width: 24px; height: 24px;" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" />
          </svg>
          <input class="search-bar-padding fs-small br-normal" type="text" name="country-search" id="search-bar" placeholder="Search for a country..." aria-label="Search for country">
        </div>
        <div class="dropdown-list">
          <select class="region-dropdown br-normal box-shadow" name="region-filter" id="region-filter" aria-label="Filter by Region">
            <option value="" disabled selected hidden>Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>        
        </div>  
      </div>
    </section>  
  `;
}

_generateMarkup(data) {
  return data.map((country, index) => `  
    <ul class="countries-card-container" aria-label="List of countries">
      <div class="flag-container">
        <img 
          src="${country.flags.svg}" 
          alt="${country.flags.alt}" 
          fetchpriority="${index === 0 ? 'high' : 'auto'}"
          loading="${index === 0 ? 'eager' : 'lazy'}"
          width="275" 
          height="auto"
        >
      </div>
      <div class="country-details | bg-neutral-100 br-bottom card-info-padding-left">
        <h2 class="country-title | fw-bold">${country.name.common}</h2>
        <ul class="country-info | fs-small">
          <li><strong>Population:</strong> ${country.population}</li>
          <li><strong>Region:</strong> ${country.region}</li>
          <li><strong>Capital:</strong> ${country.capital}</li>
        </ul>
      </div>
    </ul>
  </div>    
  `).join('');
}
}

export default new DefaultView()

