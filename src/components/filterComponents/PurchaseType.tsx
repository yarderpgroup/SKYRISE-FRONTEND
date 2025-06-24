import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Checkbox, Collapse, FormControlLabel } from "@mui/material";
const PurchaseData = [
  {
    id: 1,
    title: "Resale",
  },
  {
    id: 2,
    title: "New Booking",
  },
];
const PurchaseType = () => {
  return (
    <div className="flex border-primaryBorder flex-col w-full">
      <div className="w-full justify-between flex cursor-pointer">
        <p className="text-xl font-semibold">Purchase Type</p>
      </div>
      <div className="flex flex-wrap gap-2 pt-3">
        {PurchaseData.map((item) => (
          // <div
          //   key={item.id}
          //   className="flex text-sm items-center gap-1 border border-primaryBorder w-fit px-2 py-1.5 cursor-pointer hover:bg-themeGray/20 common-transition rounded-3xl"
          // >
          //   <AddIcon className="!text-lg" /> {item.title}
          // </div>
          <div>
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
              label={item.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseType;
