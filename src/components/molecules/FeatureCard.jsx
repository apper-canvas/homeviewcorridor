import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Text from '@/components/atoms/Text';

const FeatureCard = ({ icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: delay }}
            className="text-center p-6 rounded-lg bg-surface-50 hover:bg-surface-100 transition-colors duration-200"
        >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4">
                <ApperIcon name={icon} className="w-8 h-8 text-accent" />
            </div>
            <Heading level={3} className="font-semibold text-xl text-primary mb-2">
                {title}
            </Heading>
            <Text className="text-surface-600">
                {description}
            </Text>
        </motion.div>
    );
};

export default FeatureCard;