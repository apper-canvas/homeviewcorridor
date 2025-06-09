import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PropertyGrid from '../components/PropertyGrid';
import ApperIcon from '../components/ApperIcon';
import { savedPropertyService, propertyService } from '../services';

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSavedProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const [savedItems, allProperties] = await Promise.all([
          savedPropertyService.getAll(),
          propertyService.getAll()
        ]);

        const savedPropertyDetails = savedItems
          .map(saved => {
            const property = allProperties.find(p => p.id === saved.propertyId);
            return property ? { ...property, savedDate: saved.savedDate, notes: saved.notes } : null;
          })
          .filter(Boolean)
          .sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate));

        setSavedProperties(savedItems);
        setProperties(savedPropertyDetails);
      } catch (err) {
        setError(err.message || 'Failed to load saved properties');
        toast.error('Failed to load saved properties');
      } finally {
        setLoading(false);
      }
    };
    loadSavedProperties();
  }, []);

  const handleRemoveProperty = async (propertyId) => {
    try {
      const savedProperty = savedProperties.find(sp => sp.propertyId === propertyId);
      if (savedProperty) {
        await savedPropertyService.delete(savedProperty.id);
        setSavedProperties(prev => prev.filter(sp => sp.propertyId !== propertyId));
        setProperties(prev => prev.filter(p => p.id !== propertyId));
        toast.success('Property removed from saved list');
      }
    } catch (err) {
      toast.error('Failed to remove property');
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6">
            <div className="animate-pulse h-8 bg-surface-200 rounded w-48 mb-4"></div>
            <div className="animate-pulse h-4 bg-surface-200 rounded w-64"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="animate-pulse">
                  <div className="h-48 bg-surface-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-surface-200 rounded w-3/4"></div>
                    <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                    <div className="h-4 bg-surface-200 rounded w-2/3"></div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h3 className="text-xl font-semibold text-primary mb-2">Something went wrong</h3>
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
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto max-w-7xl p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
            Saved Properties
          </h1>
          <p className="text-surface-600">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </motion.div>

        {/* Results */}
        {properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <ApperIcon name="Heart" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-primary mb-2">No saved properties</h3>
            <p className="text-surface-600 mb-6">
              Start browsing properties and save your favorites to see them here
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/buy'}
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Browse Properties
            </motion.button>
          </motion.div>
        ) : (
          <PropertyGrid 
            properties={properties} 
            onRemoveProperty={handleRemoveProperty}
            showRemoveButton={true}
          />
        )}
      </div>
    </div>
  );
};

export default SavedProperties;