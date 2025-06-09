import { delay } from '../utils/delay';

// Property Service
import propertyMockData from './mockData/property.json';

const createPropertyService = () => {
  let properties = [...propertyMockData];

  return {
    async getAll() {
      await delay(300);
      return [...properties];
    },

    async getById(id) {
      await delay(200);
      const property = properties.find(p => p.id === id);
      return property ? { ...property } : null;
    },

    async create(propertyData) {
      await delay(500);
      const newProperty = {
        ...propertyData,
        id: Date.now().toString(),
        listingDate: new Date().toISOString()
      };
      properties = [...properties, newProperty];
      return { ...newProperty };
    },

    async update(id, propertyData) {
      await delay(400);
      const index = properties.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Property not found');
      
      properties[index] = { ...properties[index], ...propertyData };
      return { ...properties[index] };
    },

    async delete(id) {
      await delay(300);
      const index = properties.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Property not found');
      
      properties = properties.filter(p => p.id !== id);
      return true;
    }
  };
};

// Saved Property Service
import savedPropertyMockData from './mockData/savedProperty.json';

const createSavedPropertyService = () => {
  let savedProperties = [...savedPropertyMockData];

  return {
    async getAll() {
      await delay(200);
      return [...savedProperties];
    },

    async getById(id) {
      await delay(150);
      const saved = savedProperties.find(sp => sp.id === id);
      return saved ? { ...saved } : null;
    },

    async create(savedData) {
      await delay(300);
      const newSaved = {
        ...savedData,
        id: Date.now().toString(),
        savedDate: savedData.savedDate || new Date().toISOString()
      };
      savedProperties = [...savedProperties, newSaved];
      return { ...newSaved };
    },

    async update(id, savedData) {
      await delay(250);
      const index = savedProperties.findIndex(sp => sp.id === id);
      if (index === -1) throw new Error('Saved property not found');
      
      savedProperties[index] = { ...savedProperties[index], ...savedData };
      return { ...savedProperties[index] };
    },

    async delete(id) {
      await delay(200);
      const index = savedProperties.findIndex(sp => sp.id === id);
      if (index === -1) throw new Error('Saved property not found');
      
      savedProperties = savedProperties.filter(sp => sp.id !== id);
      return true;
    }
  };
};

// Search Filters Service
import searchFiltersMockData from './mockData/searchFilters.json';

const createSearchFiltersService = () => {
  let searchFilters = [...searchFiltersMockData];

  return {
    async getAll() {
      await delay(150);
      return [...searchFilters];
    },

    async getById(id) {
      await delay(100);
      const filter = searchFilters.find(f => f.id === id);
      return filter ? { ...filter } : null;
    },

    async create(filterData) {
      await delay(200);
      const newFilter = {
        ...filterData,
        id: Date.now().toString()
      };
      searchFilters = [...searchFilters, newFilter];
      return { ...newFilter };
    },

    async update(id, filterData) {
      await delay(200);
      const index = searchFilters.findIndex(f => f.id === id);
      if (index === -1) throw new Error('Search filter not found');
      
      searchFilters[index] = { ...searchFilters[index], ...filterData };
      return { ...searchFilters[index] };
    },

    async delete(id) {
      await delay(150);
      const index = searchFilters.findIndex(f => f.id === id);
      if (index === -1) throw new Error('Search filter not found');
      
      searchFilters = searchFilters.filter(f => f.id !== id);
      return true;
    }
  };
};

export const propertyService = createPropertyService();
export const savedPropertyService = createSavedPropertyService();
export const searchFiltersService = createSearchFiltersService();