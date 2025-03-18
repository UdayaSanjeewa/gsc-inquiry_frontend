import React from "react";

const NewComboBox = ({ title, onBlur, onChange, value, options }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <select
        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        name={title.toLowerCase()}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled>
          Select {title}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewComboBox;
