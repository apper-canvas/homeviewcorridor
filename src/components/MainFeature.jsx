import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PropertyGrid from './PropertyGrid';
import SearchFilters from './SearchFilters';
import ApperIcon from './ApperIcon';
import { propertyService } from '../services';

const MainFeature = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyTypes: [],
    bedroomsMin: '',
    bathroomsMin: '',
    squareFeetMin: '',
    location: '',
    radius: 10
  });

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await propertyService.getAll();
        setProperties(result);
        applyTabFilter(result, activeTab);
      } catch (err) {
        setError(err.message || 'Failed to load properties');
        toast.error('Failed to load properties');
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, properties, activeTab]);

  const applyTabFilter = (propertiesToFilter, tab) => {
    let filtered = [...propertiesToFilter];
    
    if (tab === 'sale') {
      filtered = filtered.filter(property => property.status === 'for-sale');
    } else if (tab === 'rent') {
      filtered = filtered.filter(property => property.status === 'for-rent');
    }
    
    return filtered;
  };

  const applyFilters = () => {
    let filtered = applyTabFilter(properties, activeTab);

    if (filters.priceMin) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.priceMin));
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.priceMax));
    }
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property => filters.propertyTypes.includes(property.propertyType));
    }
    if (filters.bedroomsMin) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.bedroomsMin));
    }
    if (filters.bathroomsMin) {
      filtered = filtered.filter(property => property.bathrooms >= parseInt(filters.bathroomsMin));
    }
    if (filters.squareFeetMin) {
      filtered = filtered.filter(property => property.squareFeet >= parseInt(filters.squareFeetMin));
    }
    if (filters.location) {
      filtered = filtered.filter(property => 
        property.address.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.address.state.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.address.zipCode.includes(filters.location)
      );
    }

    setFilteredProperties(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      propertyTypes: [],
      bedroomsMin: '',
      bathroomsMin: '',
      squareFeetMin: '',
      location: '',
      radius: 10
    });
  };

  const hasActiveFilters = () => {
    return filters.priceMin || filters.priceMax || filters.propertyTypes.length > 0 ||
           filters.bedroomsMin || filters.bathroomsMin || filters.squareFeetMin || filters.location;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="animate-pulse h-8 bg-surface-200 rounded w-64"></div>
          <div className="animate-pulse h-10 bg-surface-200 rounded w-32"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
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
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
            Find Your Perfect Home
          </h1>
          <p className="text-surface-600">
            {filteredProperties.length} properties available
          </p>
        </div>

        {/* Property Type Tabs */}
        <div className="flex bg-surface-100 rounded-lg p-1">
          {[
            { id: 'all', label: 'All Properties', icon: 'Home' },
            { id: 'sale', label: 'For Sale', icon: 'DollarSign' },
            { id: 'rent', label: 'For Rent', icon: 'Building' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-surface-600 hover:text-primary'
              }`}
            >
              <ApperIcon name={tab.icon} size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200 ${
            showFilters
              ? 'bg-accent text-white border-accent'
              : 'bg-white text-surface-700 border-surface-300 hover:border-accent'
          }`}
        >
          <ApperIcon name="Filter" size={18} />
          Filters
          {hasActiveFilters() && (
            <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </motion.button>

        {hasActiveFilters() && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={clearFilters}
            className="text-semantic-error hover:bg-semantic-error/10 px-3 py-2 rounded-lg transition-colors duration-200"
          >
            Clear Filters
          </motion.button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </motion.div>
      )}

      {/* Results */}
      {filteredProperties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <ApperIcon name="Home" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          </motion.div>
          <h3 className="text-xl font-semibold text-primary mb-2">No properties found</h3>
          <p className="text-surface-600 mb-6">
            Try adjusting your search filters to see more results
          </p>
          {hasActiveFilters() && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Clear Filters
            </motion.button>
          )}
        </motion.div>
      ) : (
        <PropertyGrid properties={filteredProperties} />
      )}
    </div>
  );
};

export default MainFeature;