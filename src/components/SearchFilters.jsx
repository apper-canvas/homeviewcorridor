import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const SearchFilters = ({ filters, onFiltersChange }) => {
  const propertyTypes = [
    'single-family',
    'condo',
    'townhouse',
    'multi-family',
    'land',
    'commercial'
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePropertyTypeToggle = (type) => {
    const currentTypes = filters.propertyTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    handleFilterChange('propertyTypes', newTypes);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-surface-200 p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Price Range */}
        <div className="space-y-3">
          <h3 className="font-semibold text-primary flex items-center gap-2">
            <ApperIcon name="DollarSign" size={18} />
            Price Range
          </h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="space-y-3">
          <h3 className="font-semibold text-primary flex items-center gap-2">
            <ApperIcon name="Home" size={18} />
            Bedrooms & Bathrooms
          </h3>
          <div className="space-y-2">
            <select
              value={filters.bedroomsMin}
              onChange={(e) => handleFilterChange('bedroomsMin', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Min Bedrooms</option>
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}+ Bedrooms</option>
              ))}
            </select>
            <select
              value={filters.bathroomsMin}
              onChange={(e) => handleFilterChange('bathroomsMin', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">Min Bathrooms</option>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(num => (
                <option key={num} value={num}>{num}+ Bathrooms</option>
              ))}
            </select>
          </div>
        </div>

        {/* Square Footage & Location */}
        <div className="space-y-3">
          <h3 className="font-semibold text-primary flex items-center gap-2">
            <ApperIcon name="Square" size={18} />
            Size & Location
          </h3>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min Square Feet"
              value={filters.squareFeetMin}
              onChange={(e) => handleFilterChange('squareFeetMin', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <input
              type="text"
              placeholder="City, State, or ZIP"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>
        </div>

        {/* Property Types */}
        <div className="space-y-3">
          <h3 className="font-semibold text-primary flex items-center gap-2">
            <ApperIcon name="Building" size={18} />
            Property Type
          </h3>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map(type => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePropertyTypeToggle(type)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  (filters.propertyTypes || []).includes(type)
                    ? 'bg-accent text-white'
                    : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                }`}
              >
                {type.replace('-', ' ').split(' ').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchFilters;