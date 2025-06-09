import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PropertyMap from '../components/PropertyMap';
import PropertyCard from '../components/PropertyCard';
import ApperIcon from '../components/ApperIcon';
import { propertyService } from '../services';

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await propertyService.getAll();
        setProperties(result);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
        toast.error('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setShowSidebar(true);
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 bg-surface-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-surface-600">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <ApperIcon name="AlertCircle" className="w-16 h-16 text-semantic-error mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">Failed to load map</h3>
            <p className="text-surface-600 mb-6">{error}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Try Again
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex">
      {/* Map Container */}
      <div className="flex-1 relative">
        <PropertyMap 
          properties={properties}
          selectedProperty={selectedProperty}
          onPropertySelect={handlePropertySelect}
        />
        
        {/* Toggle Sidebar Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSidebar(!showSidebar)}
          className="absolute top-4 right-4 z-30 bg-white shadow-lg rounded-lg p-3 hover:shadow-xl transition-shadow duration-200"
        >
          <ApperIcon 
            name={showSidebar ? "PanelRightClose" : "PanelRightOpen"} 
            className="w-5 h-5 text-surface-600" 
          />
        </motion.button>
      </div>

      {/* Property List Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          width: showSidebar ? 400 : 0,
          opacity: showSidebar ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white border-l border-surface-200 overflow-hidden flex flex-col"
      >
        {showSidebar && (
          <>
            {/* Header */}
            <div className="p-4 border-b border-surface-200 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-primary">
                  Properties ({properties.length})
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSidebar(false)}
                  className="p-1 hover:bg-surface-100 rounded"
                >
                  <ApperIcon name="X" className="w-5 h-5 text-surface-400" />
                </motion.button>
              </div>
            </div>

            {/* Property List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {properties.length === 0 ? (
                <div className="text-center py-8">
                  <ApperIcon name="Home" className="w-12 h-12 text-surface-300 mx-auto mb-3" />
                  <p className="text-surface-500">No properties to display</p>
                </div>
              ) : (
                properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handlePropertySelect(property)}
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                      selectedProperty?.id === property.id
                        ? 'border-accent shadow-md'
                        : 'border-transparent hover:border-surface-200 hover:shadow-sm'
                    }`}
                  >
                    <PropertyCard 
                      property={property} 
                      compact={true}
                      showSaveButton={false}
                    />
                  </motion.div>
                ))
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default MapView;