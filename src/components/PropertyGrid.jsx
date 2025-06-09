import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';

const PropertyGrid = ({ properties, onRemoveProperty, showRemoveButton = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ y: -4 }}
          className="h-full"
        >
          <PropertyCard 
            property={property} 
            onRemove={onRemoveProperty}
            showRemoveButton={showRemoveButton}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default PropertyGrid;