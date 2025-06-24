import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Checkbox, Collapse, FormControlLabel } from "@mui/material";

const FurnishingData = [
  {
    id: 1,
    title: "Semi-Furnished",
    value: "semiFurnished",
  },
  {
    id: 2,
    title: "Unfurnished",
    value: "unfurnished",
  },
  {
    id: 3,
    title: "Furnished",
    value: "Furnished",
  },
];

const FurnishingType = ({ setFurnishingStatus, furnishingStatus }: any) => {
  const handelClick = (data: string) => {
    if (furnishingStatus?.toUpperCase() === data?.toUpperCase())
      return setFurnishingStatus("");
    setFurnishingStatus(String(data).toLowerCase());
  };
  return (
    <div className="flex flex-col w-full">
      <div className="w-full justify-between flex cursor-pointer">
        <p className="text-lg font-semibold">Furnishing Type</p>
      </div>
      <div className="grid grid-cols-12 pt-3 w-full gap-2">
        {FurnishingData.map((item) => (
          <div className="col-span-6 md:col-span-4" key={item.id}>
            <FormControlLabel
              onChange={() => handelClick(item?.title)}
              control={
                <Checkbox
                  sx={{
                    color: "#999999",
                    "&.Mui-checked": {
                      color: "#E33324",
                    },
                  }}
                  checked={
                    furnishingStatus?.toLowerCase() ===
                    item?.title.toLowerCase()
                  }
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

export default FurnishingType;
