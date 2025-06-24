import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import React, { useEffect } from "react";

export default function RangeSlider({
  value,
  setValue,
  bothValue,
}: {
  value: number[];
  setValue: (priceRange: number[]) => void;
  bothValue?: true | false;
}) {
  const [valueState, setValueState] = React.useState<number[]>(value);
  const rangeChangeTimeout = React.useRef<any>();
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
    <div className="w-full flex flex-col gap-4">
      {bothValue ? (
        <div className="w-full flex py-1.5 border mb-4 border-themeDarkGray rounded-lg">
          <div className="w-2/3 text-themeDarkGray flex items-center border-r border-themeDarkGray justify-center">
            {value[1]}
          </div>
          <div className="w-1/3 text-themeDarkGray flex items-center justify-center">
            {value[0]}
          </div>
        </div>
      ) : (
        <div className="w-full py-1.5 border rounded-lg border-themeDarkGray flex items-center justify-center text-themeDarkGray">
          {value[1]}
        </div>
      )}
      <Slider
        value={valueState}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={25000}
        className="!text-theme"
      />
    </div>
  );
}
