import React from "react";

interface Props {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}
const CustomInput = ({ placeholder, defaultValue, className }: Props) => {
  return (
    <div className="w-full">
      <input
        type="search"
        className={`form-control block w-full px-3 py-1.5 text-base font-normal text-themeDarkGray bg-white bg-clip-padding transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-black-600 focus:outline-none focus:shadow-outline-black active:text-gray-800 active:bg-white ${className}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default CustomInput;
