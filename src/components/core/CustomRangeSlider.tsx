import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React, { useEffect, useRef, useState } from "react";

export default function CustomRangeSlider({
  value,
  setValue,
  bothValue,
  maxValue,
  defaultField,
  isMinPrice,
}: {
  value: number[];
  setValue: (priceRange: number[]) => void;
  bothValue?: true | false;
  maxValue: number;
  defaultField?: string;
  isMinPrice?: any;
}) {
  const [valueState, setValueState] = useState<any>(value);
  const rangeChangeTimeout = useRef<any>();
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValueState(newValue as number[]);
    clearTimeout(rangeChangeTimeout.current);
    rangeChangeTimeout.current = setTimeout(() => {
      setValue(newValue as number[]);
    }, 500);
  };
  useEffect(() => {
    setValueState(value);
  }, [value]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex w-full justify-between">
        <div className="px-2 py-1 rounded-md w-fit text-xs bg-slate-700 text-white flex items-center justify-center text-center">
          {value[0] || "0"} {defaultField}
        </div>
        <div className="px-2 py-1 rounded-md w-fit text-xs bg-slate-700 text-white flex items-center justify-center text-center">
          {value[1] || "2500000"} {defaultField}
        </div>
      </div>
      <Slider
        value={valueState}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={maxValue}
        className="!text-theme"
      />
      <div className="w-full hidden md:flex pt-5">
        {/* <div className="w-1/2 text-themeDarkGray flex items-center border-r border-themeDarkGray justify-center">
          {value[0]}
        </div>
        <div className="w-1/2 text-themeDarkGray flex items-center justify-center">
          {value[1]}
        </div> */}
        {/* <div className="w-full flex gap-3 items-center justify-center">
          <input
            onChange={(e: any) => setValueState(e.target.value)}
            className="form-control w-1/2 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-black-600 focus:outline-none focus:shadow-outline-black active:text-gray-800 active:bg-white"
            placeholder="Enter Min"
          />
        </div> */}
      </div>
    </div>
  );
}
