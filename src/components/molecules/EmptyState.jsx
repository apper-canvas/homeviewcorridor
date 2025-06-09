import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';

const EmptyState = ({ icon, title, message, buttonText, onButtonClick, animateIcon = false, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center py-12 ${className}`}
        >
            {animateIcon ? (
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    <ApperIcon name={icon} className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                </motion.div>
            ) : (
                <ApperIcon name={icon} className="w-16 h-16 text-semantic-error mx-auto mb-4" />
            )}
            <Heading level={3} className="text-xl font-semibold text-primary mb-2">
                {title}
            </Heading>
            <Text className="text-surface-600 mb-6">
                {message}
            </Text>
            {buttonText && onButtonClick && (
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        onClick={onButtonClick}
                        className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                    >
                        {buttonText}
                    </Button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default EmptyState;