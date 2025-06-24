import React, { useState } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const localitiesData = [
  {
    id: 1,
    name: "Camden",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Hackney",
    rating: 4.4,
  },
  {
    id: 3,
    name: "Islington",
    rating: 4.3,
  },
  {
    id: 4,
    name: "Kensington",
    rating: 4.2,
  },
  {
    id: 5,
    name: "Chelsea",
    rating: 4.1,
  },
];

const Localities = () => {
  const [locality, setLocality] = useState<any>([]);
  const handleSelectedLocality = (Data: any) => {
    if (locality.length <= 0) {
      setLocality((prv: any) => [...prv, Data]);
      return;
    }
    const exist = locality.find((item: any) => item === Data);
    if (exist) return;
    setLocality((prv: any) => [...prv, Data]);
  };
  return (
    <div className="flex flex-col text-themeDarkGray">
      <div className="flex w-full justify-between cursor-pointer">
        <h1 className="text-xl font-semibold">Localities</h1>
      </div>
      <div className="grid grid-cols-12 pt-3 gap-2">
        {localitiesData.map((item) => (
          <div className="flex items-center gap-1 col-span-6">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "#999999",
                    "&.Mui-checked": {
                      color: "#E33324",
                    },
                  }}
                />
              }
              label={item.name}
              value={locality}
            />

            <div className="flex text-sm items-center  text-white bg-theme px-1 py-[1px] rounded-sm -ml-3">
              <StarRateIcon className="!text-xs" />
              {item.rating}
            </div>
          </div>
        ))}
        <div>
          {/* <p className="text-base font-semibold text-themeDarkGray">
            <SearchIcon /> More Localities
          </p> */}
        </div>
      </div>
    </div>
  );
};
export default Localities;
