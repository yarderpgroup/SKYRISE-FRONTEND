import { Add, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Checkbox, Collapse, FormControlLabel } from "@mui/material";
import { useState } from "react";

const PostedArr = [
  {
    id: 1,
    title: "Owner",
  },
  {
    id: 2,
    title: "Builder",
  },
  {
    id: 3,
    title: "Agent",
  },
  {
    id: 3,
    title: "Default",
  },
];
const ConstructionStatus = ({ setPosted, posted }: any) => {
  const handelClick = (data: string) => {
    setPosted(String(data).toUpperCase());
  };
  return (
    <div className="flex flex-col w-full gap-6 md:gap-0">
      {/* <div className="flex md:px-8 md:py-5  flex-col w-full"> */}
      <div className="w-full justify-between flex cursor-pointer">
        {/* <p className="text-lg font-semibold">Construction Status</p> */}
      </div>
      {/* <div className="w-full flex flex-col py-5">
          {ConstructionArr.map((item) => (
            <div key={item.id} className="">
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
        </div> */}
      {/* </div> */}
      {/* for posted */}
      <div className="flex md:px-8 md:py-5 flex-col w-full">
        <div className="w-full justify-between flex cursor-pointer">
          <p className="text-lg font-semibold">Posted By</p>
        </div>
        <div className="w-full grid grid-cols-12 pt-5 pb-2 gap-3">
          {PostedArr.map((item) => (
            <div className="col-span-6">
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
                      posted?.toLowerCase() === item?.title.toLowerCase()
                    }
                  />
                }
                label={<div>{item.title}</div>}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConstructionStatus;
