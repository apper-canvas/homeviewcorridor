import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const PropertyMap = ({ properties, selectedProperty, onPropertySelect }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [zoom, setZoom] = useState(12);

  // Simulated map component since we can't use real mapping libraries
  const MapMarker = ({ property, isSelected, onClick }) => {
    const formatPrice = (price) => {
      if (price >= 1000000) {
        return `$${(price / 1000000).toFixed(1)}M`;
      } else if (price >= 1000) {
        return `$${(price / 1000).toFixed(0)}K`;
      }
      return `$${price.toLocaleString()}`;
    };

    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-full ${
          isSelected ? 'z-20' : 'z-10'
        }`}
        style={{
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`
        }}
      >
        {/* Price Label */}
        <div className={`bg-white rounded-lg shadow-lg border-2 px-3 py-2 mb-2 transition-all duration-200 ${
          isSelected 
            ? 'border-secondary bg-secondary text-white shadow-xl' 
            : 'border-surface-200 hover:border-accent'
        }`}>
          <div className="font-semibold text-sm whitespace-nowrap">
            {formatPrice(property.price)}
          </div>
        </div>
        
        {/* Map Pin */}
        <div className={`w-3 h-3 rounded-full mx-auto transition-colors duration-200 ${
          isSelected ? 'bg-secondary' : 'bg-accent'
        }`}></div>
      </motion.div>
    );
  };

  const handleMarkerClick = (property) => {
    onPropertySelect(property);
  };

  return (
    <div className="relative w-full h-full bg-surface-100 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0">
        {/* Simulated map tiles/grid */}
        <div className="w-full h-full opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Simulated streets */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-1 bg-surface-300"></div>
          <div className="absolute top-2/4 left-0 right-0 h-1 bg-surface-300"></div>
          <div className="absolute top-3/4 left-0 right-0 h-1 bg-surface-300"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-surface-300"></div>
          <div className="absolute left-2/4 top-0 bottom-0 w-1 bg-surface-300"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-surface-300"></div>
        </div>
      </div>

      {/* Property Markers */}
      {properties.map((property) => (
        <MapMarker
          key={property.id}
          property={property}
          isSelected={selectedProperty?.id === property.id}
          onClick={() => handleMarkerClick(property)}
        />
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setZoom(prev => Math.min(prev + 1, 18))}
          className="block w-10 h-10 flex items-center justify-center border-b border-surface-200 hover:bg-surface-50 transition-colors duration-200"
        >
          <ApperIcon name="Plus" size={16} className="text-surface-600" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setZoom(prev => Math.max(prev - 1, 8))}
          className="block w-10 h-10 flex items-center justify-center hover:bg-surface-50 transition-colors duration-200"
        >
          <ApperIcon name="Minus" size={16} className="text-surface-600" />
        </motion.button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <div className="text-sm font-semibold text-primary mb-2">Property Types</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-semantic-success rounded-full"></div>
            <span className="text-xs text-surface-600">For Sale</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="text-xs text-surface-600">For Rent</span>
          </div>
        </div>
      </div>

      {/* Search This Area Button */}
      <div className="absolute top-4 right-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-colors duration-200"
        >
          Search This Area
        </motion.button>
      </div>

      {/* Center on Location Button */}
      <div className="absolute bottom-4 right-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white hover:bg-surface-50 text-surface-600 p-3 rounded-lg shadow-lg transition-colors duration-200"
        >
          <ApperIcon name="MapPin" size={20} />
        </motion.button>
      </div>

      {/* Selected Property Info */}
      {selectedProperty && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 max-w-sm w-full mx-4"
        >
          <div className="flex items-start gap-3">
            {selectedProperty.images && selectedProperty.images[0] && (
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-primary text-sm mb-1 truncate">
                {selectedProperty.title}
              </div>
              <div className="font-display font-bold text-lg text-primary">
                ${selectedProperty.price.toLocaleString()}
                {selectedProperty.status === 'for-rent' && (
                  <span className="text-sm text-surface-600 font-normal">/month</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-surface-600 mt-1">
                <span>{selectedProperty.bedrooms} bd</span>
                <span>{selectedProperty.bathrooms} ba</span>
                {selectedProperty.squareFeet && (
                  <span>{selectedProperty.squareFeet.toLocaleString()} sq ft</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Loading State */}
      {properties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-3"></div>
            <p className="text-surface-600">Loading properties...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;