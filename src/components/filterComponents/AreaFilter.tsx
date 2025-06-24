import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CustomRangeSlider } from "components/core";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setSquareFeet: Dispatch<SetStateAction<number[]>>;
  squareFeet: number[];
  setAreaDetails: any;
  areaDetails: any;
}

const areaTypeArr = [
  {
    id: 1,
    title: "sq.ft",
    value: "sqft",
  },
  {
    id: 2,
    title: "sq.yards",

    value: "sqyr",
  },
  {
    id: 3,
    title: "sq.m",
    value: "sqmt",
  },
  {
    id: 4,
    title: "acres",
    value: "acr",
  },
  {
    id: 5,
    title: "marla",
    value: "mr",
  },
  {
    id: 6,
    title: "cents",
    value: "ce",
  },
];
const AreaFilter = ({
  setSquareFeet,
  squareFeet,
  setAreaDetails,
  areaDetails,
}: Props) => {
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const handelPriceChange = (price: number[]) => {
    setSquareFeet(price);
  };
  const handleSort = (e: string) => {
    setAreaDetails(e);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="w-full justify-between flex cursor-pointer">
        <p className="text-xl font-semibold">Area</p>
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-5 pt-5">
        <div className=" w-full">
          <FormControl margin="none" size="small" className="w-40">
            <InputLabel>Area</InputLabel>
            <Select value={areaDetails} label="Area">
              {areaTypeArr.map((item) => (
                <MenuItem
                  onClick={() => handleSort(item?.value)}
                  key={item.id}
                  value={item.value}
                >
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="md:w-3/5 w-4/5">
          <CustomRangeSlider
            value={squareFeet}
            setValue={(squareFeet: number[]) => handelPriceChange(squareFeet)}
            bothValue={true}
            maxValue={4000}
            defaultField={areaDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default AreaFilter;
