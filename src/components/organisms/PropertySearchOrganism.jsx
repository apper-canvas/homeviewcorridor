import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import PropertyGrid from '@/components/PropertyGrid'; // Existing component
import SearchFilters from '@/components/SearchFilters'; // Existing component
import { propertyService } from '@/services'; // Existing service
import TabButton from '@/components/molecules/TabButton';
import EmptyState from '@/components/molecules/EmptyState';
import LoadingSkeleton from '@/components/molecules/LoadingSkeleton';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Text from '@/components/atoms/Text';

const PropertySearchOrganism = () => {
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
        applyTabFilter(result, activeTab); // Ensure initial filter applies with activeTab
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
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        icon="AlertCircle"
        title="Something went wrong"
        message={error}
        buttonText="Try Again"
        onButtonClick={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Heading level={1} className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
            Find Your Perfect Home
          </Heading>
          <Text as="p" className="text-surface-600">
            {filteredProperties.length} properties available
          </Text>
        </div>

        {/* Property Type Tabs */}
        <div className="flex bg-surface-100 rounded-lg p-1">
          {[
            { id: 'all', label: 'All Properties', icon: 'Home' },
            { id: 'sale', label: 'For Sale', icon: 'DollarSign' },
            { id: 'rent', label: 'For Rent', icon: 'Building' }
          ].map((tab) => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={handleTabChange}
            />
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
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
            </Button>
        </motion.div>


        {hasActiveFilters() && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={clearFilters}
              className="text-semantic-error hover:bg-semantic-error/10 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </Button>
          </motion.div>
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
        <EmptyState
          icon="Home"
          title="No properties found"
          message="Try adjusting your search filters to see more results"
          buttonText={hasActiveFilters() ? "Clear Filters" : null}
          onButtonClick={hasActiveFilters() ? clearFilters : null}
          animateIcon={true}
        />
      ) : (
        <PropertyGrid properties={filteredProperties} />
      )}
    </div>
  );
};

export default PropertySearchOrganism;