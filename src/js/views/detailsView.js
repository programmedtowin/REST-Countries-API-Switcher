import View from './View.js';

class DetailsView extends View {


renderDetailsPageUI(data) {
  this._clear()
  const markup = this._generateMarkup(data)
  this._parentElement.insertAdjacentHTML("afterbegin", markup)
  this.addContainerClass("details-page-container", "default-page-container");
}


_generateMarkup(data) {
  return data.map(country => `  
      <div class="countries-details-container" role="region" aria-label="Country Details">
      <div class="back-btn-container">
        <button class="back-btn btn | br-normal bg-neutral-100 box-shadow margin-top__2rem margin-bottom-600" aria-label="Go back to country list">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="24" height="24" class="size-5" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" />
          </svg>
          Back
        </button>
      </div>
      <div class="details-flag">
        <img src="${country.flags.svg}" alt="${country.flags.alt}">  
      </div>
      <div class="details-info | flow margin-bottom-600" style="--flow-spacer: 0.5rem">
        <h2 class="">${country.name.common}</h2>
        <p><strong>Native Name:</strong> ${Object.values(country.name.nativeName || {})[0]?.official || 'N/A'}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Sub-region:</strong> ${country.subregion || 'N/A'}</p>
        <p><strong>Capital:</strong> ${country.capital?.[0] || 'N/A'}</p>
      </div>
      <div class="details-info__supplementary | flow margin-bottom-600" style="--flow-spacer: 0.5rem">
        <p><strong>Top Level Domain:</strong> ${country.tld?.join(', ') || 'N/A'}</p>
        <p><strong>Currencies:</strong> ${Object.values(country.currencies || {}).map(c => c.name).join(', ') || 'N/A'}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ') || 'N/A'}</p>
      </div>          
      <div class="border-btns-container">
        <h3 class="border-country-heading">Border Countries:</h3>
        <div class="border-countries-container" aria-labelledby="border-countries">
        ${country.borders ? country.borders.map(border => `
          <a href="" lang="en" class="border-country-btn | br-normal btn-box-shadow bg-neutral-100" data-country="${border}">${border}</a>
        `).join('') : 'No bordering countries'}        
        </div>
      </div>
    </div>
  </div>    
  `).join('');
}


addBorderCountryListeners(handleCountryClick) {
  const borderCountries = document.querySelector('.border-countries-container');
  borderCountries.addEventListener('click', event => {
    event.preventDefault();
    const borderCountry = event.target.closest(".border-country-btn");
    if (!borderCountry) return;
    const clickedCountry = borderCountry.dataset.country;
    handleCountryClick(clickedCountry);
  });
}

addBackBtnListener(handleBackBtnClick) {
  const backButton = document.querySelector(".back-btn")
  backButton.addEventListener("click", event => {
    handleBackBtnClick()
  })
}

addDetailsContainerClass() {
  this.container = document.querySelector('.countries-container');
  if (this.container.classList.contains("default-page-container")) {
    this.container.classList.remove("default-page-container");
  }
  this.container.classList.add("details-page-container");
}

}


export default new DetailsView()