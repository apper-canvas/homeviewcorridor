import React from 'react';

const Input = ({ className, type = 'text', ...props }) => {
    return (
        <input type={type} className={`w-full p-3 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-400 ${className}`} {...props} />
    );
};

export default Input;