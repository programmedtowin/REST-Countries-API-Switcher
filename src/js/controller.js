import 'core-js/stable';

let Model, DefaultView, DetailsView;

export function init({model: m, defaultView: dv, detailsView: dtv}) {
  Model = m;
  DefaultView = dv;
  DetailsView = dtv;
}

const regionVariableNames = {
  America: 'americanCountries',
  Europe: 'europeanCountries',
  Asia: 'asianCountries',
  Oceania: "oceaniaCountries",
  Africa: "africanCountries"
}


export const controlDefaultPage = async function () {
  try {
    
    // Fetch data
    const countries = await Model.fetchDefaultUIDataFromAPI();

    // Render countries
    DefaultView.renderDefaultPageUI(countries);

    // Add event listeners
    applyCountryClickEventListeners();  
    applySearchEventListener();
    applyDefaultPageChangeEventToDropdown()

  } catch(error) {
    console.error("Error in controlDefaultPage:", error);
  }
}

const controlDetailsPage = function(country) {
  DetailsView.renderDetailsPageUI(country)
  DetailsView.addBorderCountryListeners(handleCountryClick)
  DetailsView.addBackBtnListener(handleBackBtnClick)
};

const controlRegionsPage = function(region) {
  DefaultView.renderRegionPageUI(region)
  applyCountryClickEventListeners();
};

const controlSearchInputPage = function(searchTerm) { 
  const filteredCountries = Model.searchCountries(searchTerm);
  DefaultView.renderRegionPageUI(filteredCountries);
  applyCountryClickEventListeners()
};

const applyCountryClickEventListeners = function() {
  DefaultView.addEventCountryClick(handleCountryClick)
};

const applyDefaultPageChangeEventToDropdown = function() {
  DefaultView.addChangeEventToDropdown(handleChangeEvent)
};

const applySearchEventListener = function() {
  DefaultView.addSearchInputEventListener(controlSearchInputPage);
};


const handleCountryClick = function(countryName) {
  const countryData = Model.getSpecificCountry(countryName)
  controlDetailsPage(countryData)
}  


const handleBackBtnClick = function() {
  controlDefaultPage()
};

const handleChangeEvent = function(regionName) {
  if(!regionName || !regionVariableNames[regionName]) {
    console.error(`Invalid region: ${regionName}`);
    return
  }
  const region = regionVariableNames[regionName]
  const regionCountries = Model[region]
  controlRegionsPage(regionCountries)
};
