import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import { savedPropertyService } from '../services';

const PropertyCard = ({ property, compact = false, onRemove, showRemoveButton = false, showSaveButton = true }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSaveProperty = async (e) => {
    e.stopPropagation();
    setSaving(true);
    try {
      if (isSaved) {
        // Remove from saved (this would need to be implemented properly)
        setIsSaved(false);
        toast.success('Property removed from saved list');
      } else {
        await savedPropertyService.create({
          propertyId: property.id,
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

  const handleRemoveProperty = async (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(property.id);
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === (property.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? (property.images?.length || 1) - 1 : prev - 1
    );
  };

  const cardClass = compact 
    ? "bg-white rounded-lg shadow-sm border border-surface-200 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
    : "bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg";

  return (
    <motion.div
      whileHover={{ scale: compact ? 1.01 : 1.02 }}
      className={cardClass}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className={`relative ${compact ? 'h-32' : 'h-48'} overflow-hidden`}>
        {property.images && property.images.length > 0 ? (
          <>
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
            
            {/* Image Navigation - only show if more than 1 image */}
            {property.images.length > 1 && !compact && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors duration-200"
                >
                  <ApperIcon name="ChevronLeft" size={16} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors duration-200"
                >
                  <ApperIcon name="ChevronRight" size={16} />
                </button>
                
                {/* Image Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {property.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-surface-200 flex items-center justify-center">
            <ApperIcon name="Image" className="w-8 h-8 text-surface-400" />
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            property.status === 'for-sale' 
              ? 'bg-semantic-success text-white' 
              : 'bg-secondary text-white'
          }`}>
            {property.status === 'for-sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2">
          {showRemoveButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemoveProperty}
              className="bg-semantic-error hover:bg-semantic-error/90 text-white p-2 rounded-full shadow-lg transition-colors duration-200"
            >
              <ApperIcon name="Trash2" size={14} />
            </motion.button>
          )}
          
          {showSaveButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSaveProperty}
              disabled={saving}
              className={`p-2 rounded-full shadow-lg transition-colors duration-200 ${
                isSaved
                  ? 'bg-semantic-error text-white hover:bg-semantic-error/90'
                  : 'bg-white/90 text-surface-600 hover:bg-white hover:text-semantic-error'
              }`}
            >
              {saving ? (
                <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ApperIcon 
                  name="Heart" 
                  size={14}
                  className={isSaved ? "fill-current" : ""}
                />
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={compact ? 'p-3' : 'p-4'}>
        {/* Price */}
        <div className="mb-2">
          <div className={`font-display font-bold text-primary ${compact ? 'text-lg' : 'text-xl'}`}>
            {formatPrice(property.price)}
            {property.status === 'for-rent' && (
              <span className={`text-surface-600 font-normal ${compact ? 'text-sm' : 'text-base'}`}>
                /month
              </span>
            )}
          </div>
        </div>

        {/* Property Details */}
        <div className={`flex items-center gap-4 text-surface-600 ${compact ? 'text-sm mb-2' : 'text-base mb-3'}`}>
          <div className="flex items-center gap-1">
            <ApperIcon name="Bed" size={compact ? 14 : 16} />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Bath" size={compact ? 14 : 16} />
            <span>{property.bathrooms}</span>
          </div>
          {property.squareFeet && (
            <div className="flex items-center gap-1">
              <ApperIcon name="Square" size={compact ? 14 : 16} />
              <span>{property.squareFeet.toLocaleString()} sq ft</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-semibold text-primary mb-2 line-clamp-2 ${compact ? 'text-sm' : 'text-base'}`}>
          {property.title}
        </h3>

        {/* Address */}
        <p className={`text-surface-600 ${compact ? 'text-xs' : 'text-sm'}`}>
          {property.address?.street && `${property.address.street}, `}
          {property.address?.city}, {property.address?.state} {property.address?.zipCode}
        </p>

        {/* Property Type */}
        {!compact && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-surface-500 bg-surface-100 px-2 py-1 rounded-full capitalize">
              {property.propertyType?.replace('-', ' ')}
            </span>
            <span className="text-xs text-surface-500">
              Listed {new Date(property.listingDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyCard;