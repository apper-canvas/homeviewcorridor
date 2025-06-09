import Home from '../pages/Home';
import Buy from '../pages/Buy';
import Rent from '../pages/Rent';
import MapView from '../pages/MapView';
import SavedProperties from '../pages/SavedProperties';
import PropertyDetail from '../pages/PropertyDetail';
import NotFound from '../pages/NotFound';

export const routes = {
  buy: {
    id: 'buy',
    label: 'Buy',
    path: '/buy',
    icon: 'Home',
    component: Buy
  },
  rent: {
    id: 'rent',
    label: 'Rent',
    path: '/rent',
    icon: 'Building',
    component: Rent
  },
  mapView: {
    id: 'mapView',
    label: 'Map View',
    path: '/map',
    icon: 'Map',
    component: MapView
  },
  savedProperties: {
    id: 'savedProperties',
    label: 'Saved',
    path: '/saved',
    icon: 'Heart',
    component: SavedProperties
  },
  propertyDetail: {
    id: 'propertyDetail',
    label: 'Property',
    path: '/property/:id',
    icon: 'Home',
    component: PropertyDetail,
    hidden: true
  },
  notFound: {
    id: 'notFound',
    label: 'Not Found',
    path: '*',
    icon: 'AlertCircle',
    component: NotFound,
    hidden: true
  }
};

export const routeArray = Object.values(routes);