import { Skeleton } from "@mui/material";
import React from "react";

const PropertyBasicSkeleton = () => {
  return (
    <div className="w-full flex flex-col p-2">
      <div className="w-full flex gap-2">
        <Skeleton
          variant="rectangular"
          width="50%"
          className="!rounded-t-lg"
          height={300}
        />
        <div className="w-1/2 flex flex-col gap-2">
          <Skeleton
            variant="text"
            width="50%"
            className="!rounded-lg"
            height={40}
          />
          <Skeleton
            variant="text"
            width="100%"
            className="!rounded-lg"
            height={40}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full grid grid-cols-12 gap-3">
          {[...Array(18)]?.map((item) => (
            <div className="w-full col-span-2">
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                height={60}
                className="!rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyBasicSkeleton;
