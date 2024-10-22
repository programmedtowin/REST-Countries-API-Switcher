import * as Controller from './controller.js';
import * as Model from './model.js';
import DefaultView from './views/defaultView.js';
import DetailsView from './views/detailsView.js';

async function initializeApplication() {
  Controller.init({
    model: Model,
    defaultView: DefaultView,
    detailsView: DetailsView
  })


  await Controller.controlDefaultPage()
  Model.fetchAllCountriesDataFromAPI()
}

initializeApplication()