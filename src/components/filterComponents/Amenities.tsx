import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Checkbox, Collapse, FormControlLabel } from "@mui/material";

const AmenitiesType = [
  {
    id: 1,
    title: "Parking",
  },
  {
    id: 2,
    title: "Power Backup",
  },
  {
    id: 3,
    title: "Park",
  },
  {
    id: 4,
    title: "Security Personnel",
  },
  {
    id: 5,
    title: "Club house",
  },
  {
    id: 6,
    title: "Gymnasium",
  },
  {
    id: 7,
    title: "Swimming Pool",
  },
  {
    id: 8,
    title: "Gas Pipeline",
  },
  {
    id: 9,
    title: "Lift",
  },
];

const Amenities = ({ setAmenities, amenities }: any) => {
  const handelAmenities = (Data: any) => {
    const index = amenities.indexOf(Data);
    if (index !== -1) {
      const newItems = [...amenities];
      newItems.splice(index, 1);
      setAmenities(newItems);
    } else {
      setAmenities([...amenities, Data]);
    }
  };
  return (
    <div className="flex flex-col text-themeDarkGray">
      <div className="flex w-full justify-between cursor-pointer">
        <h1 className="text-xl font-semibold">Amenities</h1>
      </div>
      <div className="grid grid-cols-12 w-full pt-3 gap-2">
        {AmenitiesType.map((item) => (
          <div className="col-span-6">
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => handelAmenities(item?.title)}
                  sx={{
                    color: "#999999",
                    "&.Mui-checked": {
                      color: "#E33324",
                    },
                  }}
                />
              }
              label={<div>{item.title}</div>}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
