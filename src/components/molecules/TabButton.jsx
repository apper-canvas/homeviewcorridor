import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const TabButton = ({ id, label, icon, isActive, onClick }) => {
    return (
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
                onClick={() => onClick(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActive
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-surface-600 hover:text-primary'
                }`}
            >
                <ApperIcon name={icon} size={16} />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.split(' ')[0]}</span>
            </Button>
        </motion.div>
    );
};

export default TabButton;