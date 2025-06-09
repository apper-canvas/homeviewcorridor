import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Text from '@/components/atoms/Text';

const CallToActionSection = ({ onBrowseClick, onRentClick }) => {
    return (
        <div className="py-16 bg-surface-100">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <Heading level={2} className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                        Ready to Find Your Home?
                    </Heading>
                    <Text as="p" className="text-lg text-surface-600 mb-8 max-w-2xl mx-auto">
                        Browse thousands of properties or start with our interactive map to explore neighborhoods
                    </Text>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={onBrowseClick}
                                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
                            >
                                Browse Properties
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={onRentClick}
                                className="bg-white hover:bg-surface-50 text-primary px-8 py-4 rounded-lg font-semibold text-lg border border-surface-200 transition-colors duration-200"
                            >
                                View Rentals
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CallToActionSection;