import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="animate-pulse h-8 bg-surface-200 rounded w-64"></div>
                <div className="animate-pulse h-10 bg-surface-200 rounded w-32"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <div className="animate-pulse">
                            <div className="h-48 bg-surface-200"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-6 bg-surface-200 rounded w-3/4"></div>
                                <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                                <div className="h-4 bg-surface-200 rounded w-2/3"></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;