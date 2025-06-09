import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/molecules/FeatureCard';
import Heading from '@/components/atoms/Heading';
import Text from '@/components/atoms/Text';

const FeaturesSection = ({ features }) => {
    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center mb-12"
                >
                    <Heading level={2} className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                        Why Choose HomeView?
                    </Heading>
                    <Text as="p" className="text-lg text-surface-600 max-w-2xl mx-auto">
                        We make finding your dream home simple with powerful tools and comprehensive listings
                    </Text>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.title}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={0.3 + index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesSection;