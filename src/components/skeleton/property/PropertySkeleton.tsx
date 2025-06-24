import { Skeleton } from "@mui/material";
import React from "react";

const PropertySkeleton = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-4 p-4">
      {[...Array(6)]?.map((item) => (
        <div className="w-full col-span-4 gap-2">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={200}
            className="!rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height={40}
              className="!rounded-lg"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height={40}
              className="!rounded-lg"
            />
            <Skeleton
              animation="wave"
              variant="text"
              width="100%"
              height={40}
              className="!rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertySkeleton;
