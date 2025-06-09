import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from './ApperIcon';

const PropertyDetailsInfo = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatSquareFeet = (sqft) => {
    return sqft ? sqft.toLocaleString() : 'N/A';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
          {property.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-surface-600 mb-4">
          <div className="flex items-center gap-1">
            <ApperIcon name="MapPin" size={16} />
            <span>
              {property.address?.street && `${property.address.street}, `}
              {property.address?.city}, {property.address?.state} {property.address?.zipCode}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Calendar" size={16} />
            <span>Listed {new Date(property.listingDate).toLocaleDateString()}</span>
          </div>
        </div>
        
        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-surface-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-surface-600 mb-1">
              <ApperIcon name="Bed" size={18} />
              <span className="text-sm">Bedrooms</span>
            </div>
            <div className="text-2xl font-bold text-primary">{property.bedrooms}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-surface-600 mb-1">
              <ApperIcon name="Bath" size={18} />
              <span className="text-sm">Bathrooms</span>
            </div>
            <div className="text-2xl font-bold text-primary">{property.bathrooms}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-surface-600 mb-1">
              <ApperIcon name="Square" size={18} />
              <span className="text-sm">Square Feet</span>
            </div>
            <div className="text-2xl font-bold text-primary">{formatSquareFeet(property.squareFeet)}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-surface-600 mb-1">
              <ApperIcon name="Building" size={18} />
              <span className="text-sm">Type</span>
            </div>
            <div className="text-lg font-semibold text-primary capitalize">
              {property.propertyType?.replace('-', ' ')}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="font-semibold text-xl text-primary">Description</h2>
        <div className="prose prose-surface max-w-none">
          <p className="text-surface-700 leading-relaxed">
            {property.description || 'No description available for this property.'}
          </p>
        </div>
      </motion.div>

      {/* Features */}
      {property.features && property.features.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="font-semibold text-xl text-primary">Features & Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {property.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="flex items-center gap-2 p-3 bg-surface-50 rounded-lg"
              >
                <ApperIcon name="Check" size={16} className="text-semantic-success flex-shrink-0" />
                <span className="text-surface-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Property Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="font-semibold text-xl text-primary">Property Details</h2>
        <div className="bg-white border border-surface-200 rounded-lg overflow-hidden">
          <div className="divide-y divide-surface-200">
            <div className="flex justify-between items-center p-4">
              <span className="font-medium text-surface-700">Property Type</span>
              <span className="text-primary capitalize">{property.propertyType?.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="font-medium text-surface-700">Bedrooms</span>
              <span className="text-primary">{property.bedrooms}</span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="font-medium text-surface-700">Bathrooms</span>
              <span className="text-primary">{property.bathrooms}</span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="font-medium text-surface-700">Square Footage</span>
              <span className="text-primary">{formatSquareFeet(property.squareFeet)} sq ft</span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="font-medium text-surface-700">Listing Date</span>
              <span className="text-primary">{new Date(property.listingDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center p-4">
              <span className="font-medium text-surface-700">Status</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                property.status === 'for-sale' 
                  ? 'bg-semantic-success/10 text-semantic-success'
                  : 'bg-secondary/10 text-secondary'
              }`}>
                {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="font-semibold text-xl text-primary">Location</h2>
        <div className="bg-surface-100 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <ApperIcon name="MapPin" size={20} className="text-accent mt-1 flex-shrink-0" />
            <div>
              <div className="font-medium text-primary mb-1">Address</div>
              <div className="text-surface-700">
                {property.address?.street && (
                  <div>{property.address.street}</div>
                )}
                <div>
                  {property.address?.city}, {property.address?.state} {property.address?.zipCode}
                </div>
              </div>
            </div>
          </div>
          
          {/* Simulated Map Preview */}
          <div className="mt-4 h-48 bg-surface-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ApperIcon name="Map" className="w-12 h-12 text-surface-400 mx-auto mb-2" />
              <p className="text-surface-600">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetailsInfo;