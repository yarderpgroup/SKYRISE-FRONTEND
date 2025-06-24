import { Skeleton } from "@mui/material";
import React from "react";

const priceArr = [
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
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];

const PriceDetailsSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-3">
      <Skeleton animation="wave" variant="text" width="40%" height={60} />
      <div className="grid grid-cols-12 gap-4">
        {priceArr?.map((item) => (
          <div className="w-full col-span-4 gap-2">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={250}
              height={40}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceDetailsSkeleton;
