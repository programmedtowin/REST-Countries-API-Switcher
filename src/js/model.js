export let allCountries;
export let africanCountries;
export let americanCountries;
export let asianCountries;
export let europeanCountries;
export let oceaniaCountries;

const addCommasToNumbers = function(number) {
  return number.toLocaleString();
  };

const convertBorderCodesToNames = function(country, countryCodeToName) {
    if (!country.borders) return [];
    return country.borders.map(borderCode => countryCodeToName[borderCode] || borderCode);
  }

export const fetchDefaultUIDataFromAPI = async function () {
  const defaultCountryCodes = ["DE", "US", "BR", "IS", "AF", "AX", "AL", "DZ"];
  
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${defaultCountryCodes.join(',')}&fields=name,population,region,capital,flags`);
    
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json();
    return data.map(country => ({
      ...country, 
      population: addCommasToNumbers(country.population)
    }))

  } catch(error) {
    console.error("Failed to fetch Default country data:", error)
    throw Error
  }
}


export const fetchAllCountriesDataFromAPI = async function() {
  try{
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,population,region,subregion,capital,tld,currencies,languages,borders,flags');
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const rawData = await response.json()

    // Create lookup table
    const countryCodeToName = rawData.reduce((acc, country) => {
      acc[country.cca3] = country.name.common;
      return acc;
    }, {});

    allCountries = rawData.map(country => ({
      ...country,
      population: addCommasToNumbers(country.population),
      borders: convertBorderCodesToNames(country, countryCodeToName)
    }));

    africanCountries = rawData
    .filter(country => country.region.includes('Africa'))
    .map(country => ({
      ...country,
      population: addCommasToNumbers(country.population),
      borders: convertBorderCodesToNames(country, countryCodeToName)
    }));

    asianCountries = rawData
    .filter(country => country.region.includes('Asia'))
    .map(country => ({
      ...country,
      population: addCommasToNumbers(country.population),
      borders: convertBorderCodesToNames(country, countryCodeToName)
    }));
    
    europeanCountries = rawData
    .filter(country => country.region.includes('Europe'))
    .map(country => ({
      ...country,
      population: addCommasToNumbers(country.population),
      borders: convertBorderCodesToNames(country, countryCodeToName)
    }));

  
    americanCountries = rawData
    .filter(country => country.region.includes('Americas'))
    .map(country => ({
      ...country,
      population: addCommasToNumbers(country.population),
      borders: convertBorderCodesToNames(country, countryCodeToName)
    }));
    
    oceaniaCountries = rawData
    .filter(country => country.region.includes('Oceania'))
    .map(country => ({
      ...country,
      population: addCommasToNumbers(country.population),
      borders: convertBorderCodesToNames(country, countryCodeToName)
    }));

  } catch(error) {
    console.error("Failed to fetch all countries  data:", error)
  }
};

export const searchCountries = function(searchTerm) {
  return allCountries.filter(country => 
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const getSpecificCountry = function(countryName) {
  const country = allCountries.find(country => country.name.common === countryName);
  if(!country) throw new Error(`Coutnry not found: ${countryName}`)
  return [country]
};



