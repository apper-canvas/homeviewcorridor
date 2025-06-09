import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PropertyGallery from '../components/PropertyGallery';
import PropertyDetailsInfo from '../components/PropertyDetailsInfo';
import ApperIcon from '../components/ApperIcon';
import { propertyService, savedPropertyService } from '../services';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await propertyService.getById(id);
        if (!result) {
          setError('Property not found');
          return;
        }
        setProperty(result);

        // Check if property is saved
        const savedProperties = await savedPropertyService.getAll();
        const isPropertySaved = savedProperties.some(sp => sp.propertyId === id);
        setIsSaved(isPropertySaved);
      } catch (err) {
        setError(err.message || 'Failed to load property');
        toast.error('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id]);

  const handleSaveProperty = async () => {
    setSaving(true);
    try {
      if (isSaved) {
        const savedProperties = await savedPropertyService.getAll();
        const savedProperty = savedProperties.find(sp => sp.propertyId === id);
        if (savedProperty) {
          await savedPropertyService.delete(savedProperty.id);
          setIsSaved(false);
          toast.success('Property removed from saved list');
        }
      } else {
        await savedPropertyService.create({
          propertyId: id,
          savedDate: new Date().toISOString(),
          notes: ''
        });
        setIsSaved(true);
        toast.success('Property saved to your list');
      }
    } catch (err) {
      toast.error('Failed to save property');
    } finally {
      setSaving(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-6xl p-6">
          <div className="animate-pulse">
            {/* Back button skeleton */}
            <div className="h-10 w-24 bg-surface-200 rounded mb-6"></div>
            
            {/* Gallery skeleton */}
            <div className="h-96 bg-surface-200 rounded-lg mb-8"></div>
            
            {/* Content skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-surface-200 rounded w-3/4"></div>
                <div className="h-6 bg-surface-200 rounded w-1/2"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-surface-200 rounded"></div>
                  <div className="h-4 bg-surface-200 rounded"></div>
                  <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-surface-200 rounded-lg"></div>
                <div className="h-12 bg-surface-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex-1 overflow-y-auto p-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <ApperIcon name="AlertCircle" className="w-16 h-16 text-semantic-error mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">Property not found</h3>
            <p className="text-surface-600 mb-6">{error || 'The property you are looking for does not exist.'}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/buy')}
              className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Browse Properties
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto max-w-6xl p-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-surface-600 hover:text-primary transition-colors duration-200"
          >
            <ApperIcon name="ArrowLeft" size={20} />
            Back to listings
          </motion.button>
        </motion.div>

        {/* Property Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <PropertyGallery images={property.images} title={property.title} />
        </motion.div>

        {/* Property Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <PropertyDetailsInfo property={property} />
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Price Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="font-display text-3xl font-bold text-primary mb-2">
                  {formatPrice(property.price)}
                  {property.status === 'for-rent' && <span className="text-lg text-surface-600">/month</span>}
                </div>
                <div className="text-surface-600 capitalize">
                  {property.status.replace('-', ' ')}
                </div>
              </div>

              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSaveProperty}
                  disabled={saving}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    isSaved
                      ? 'bg-semantic-error hover:bg-semantic-error/90 text-white'
                      : 'bg-accent hover:bg-accent/90 text-white'
                  }`}
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <ApperIcon 
                      name={isSaved ? "HeartOff" : "Heart"} 
                      size={20}
                      className={isSaved ? "fill-current" : ""}
                    />
                  )}
                  {saving ? 'Saving...' : (isSaved ? 'Remove from Saved' : 'Save Property')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Contact Agent
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white hover:bg-surface-50 text-primary border border-surface-200 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Schedule Tour
                </motion.button>
              </div>
            </div>

            {/* Quick Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg text-primary mb-4">Quick Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-surface-600">Property Type</span>
                  <span className="font-medium capitalize">{property.propertyType.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Bedrooms</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Bathrooms</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Square Feet</span>
                  <span className="font-medium">{property.squareFeet?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Listed</span>
                  <span className="font-medium">
                    {new Date(property.listingDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;