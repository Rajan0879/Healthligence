import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const TabButton = ({ active, label, onClick, isMain }) => (
    <button
        onClick={onClick}
        className={`
      px-8 py-3 text-sm font-medium transition-colors relative
      ${isMain
                ? (active ? 'text-gray-900 font-bold' : 'text-gray-500')
                : (active ? 'bg-white text-gray-900 shadow-sm rounded-md' : 'text-gray-500 hover:text-gray-700')
            }
      ${isMain && active ? 'border-b-2 border-purple-600' : ''}
    `}
    >
        {isMain && active && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600"></span>
        )}
        {label}
    </button>
);

export const InputField = ({
    label,
    placeholder,
    value,
    onChange,
    error,
    name,
    type = "text",
    className = "",
    required = false,
    disabled = false,
    onBlur,
    onKeyDown,
    inputMode,
    maxLength
}) => (
    <div className={`flex flex-col ${className}`}>
        {label && (
            <label className="mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        )}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            inputMode={inputMode}
            maxLength={maxLength}
            disabled={disabled}
            placeholder={placeholder}
            className={`
        w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all
        ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}
        ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
      `}
        />
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
);

export const SelectField = ({ label, value, onChange, options, name, className = "" }) => (
    <div className={`flex flex-col ${className}`}>
        {label && <label className="mb-1 text-xs font-semibold text-gray-500">{label}</label>}
        <div className="relative">
            <select
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
                <option value="" disabled>Select {label}</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
    </div>
);

export const ToggleSwitch = ({ checked, onChange }) => (
    <div
        onClick={() => onChange(!checked)}
        className={`
      w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300
      ${checked ? 'bg-blue-600' : 'bg-gray-300'}
    `}
    >
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-6' : ''}`}></div>
    </div>
);

export const FloatingLabelInput = ({
    name,
    label,
    value,
    onChange,
    className = "",
    error,
    type = "text",
    onKeyDown,
    inputMode,
    maxLength
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value !== undefined && value !== null && value !== '';
    const active = isFocused || hasValue;

    return (
        <div className={`relative ${className} w-[48px]`}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={onKeyDown}
                inputMode={inputMode}
                maxLength={maxLength}
                className={`
          w-[48px]  px-2 py-2 border rounded-md text-center text-sm outline-none transition-all bg-transparent
          ${error ? 'border-red-500' : (active ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-300')}
        `}
            />
            <label
                className={`
          absolute left-1/2 transform -translate-x-1/2 transition-all duration-200 pointer-events-none bg-white px-1 whitespace-nowrap
          ${active
                        ? '-top-2.5 text-xs text-blue-600 font-medium'
                        : 'top-2 text-sm text-gray-400'}
          ${error ? 'text-red-500' : ''}
        `}
            >
                {label}
            </label>
        </div>
    );
};
