import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Text from '@/components/atoms/Text';

const HeroSection = ({ onSearchClick, onMapClick }) => {
    return (
        <div className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-4xl mx-auto"
                >
                    <Heading level={1} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Find Your Perfect Home
                    </Heading>
                    <Text as="p" className="text-xl md:text-2xl mb-8 text-white/90">
                        Discover amazing properties with HomeView's comprehensive search tools
                    </Text>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={onSearchClick}
                                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
                            >
                                Start Searching
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                onClick={onMapClick}
                                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg border border-white/20 transition-colors duration-200"
                            >
                                View Map
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;