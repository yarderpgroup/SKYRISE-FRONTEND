import { Skeleton } from "@mui/material";
import React from "react";
const OtherArr = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
];

const OtherSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <Skeleton animation="wave" variant="text" width="40%" height={60} />
      <div className="grid grid-cols-12 gap-10">
        {OtherArr?.map((item) => (
          <div className="w-full col-span-4 gap-2">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={40}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherSkeleton;
