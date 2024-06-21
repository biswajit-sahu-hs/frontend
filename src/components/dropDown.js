import React from 'react';

const Dropdown = ({ options, label, id, name, value, handleChange, isRequired }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required={isRequired}
            >
                <option value="">Select {label}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
