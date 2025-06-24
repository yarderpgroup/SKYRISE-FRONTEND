import { Avatar, Skeleton } from "@mui/material";
import useSWRAPI from "hooks/useSWRAPI";
import React from "react";

const skeletonArr = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 6,
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
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 6,
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
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 6,
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
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 6,
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
];

const BasicInfoSkeleton = () => {
  return (
    <div className="w-full  flex  justify-between flex-col gap-4">
      {/* profile */}
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="20%"
        height={80}
      />
      {/* description */}
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={60}
      />
      {/* property details */}
      <div className="w-full grid grid-cols-12 gap-8">
        {skeletonArr?.map((item) => (
          <div className="w-full flex  justify-center col-span-2 gap-10">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={150}
              height={30}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicInfoSkeleton;
