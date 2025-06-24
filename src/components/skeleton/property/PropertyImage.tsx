import { Skeleton } from "@mui/material";
import React from "react";

const PropertyImage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <div className="w-full flex">
        <Skeleton variant="text" width="30%" height={50} />
      </div>
      <div className="w-full h-1/2 flex gap-4">
        <div className="w-full h-1/2 flex">
          <Skeleton
            variant="rectangular"
            className="!rounded-lg"
            width="100%"
            height={280}
          />
        </div>
        <div className="w-full h-1/2 flex">
          <Skeleton
            variant="rectangular"
            className="!rounded-lg"
            width="100%"
            height={280}
          />
        </div>
      </div>
      <div className="w-full grid-cols-12 gap-4">
        {[...Array(6)]?.map((_, index) => (
          <div className="w-full gap-5 col-span-2 flex">
            <Skeleton variant="text" width="100%" height={70} />
            <Skeleton variant="text" width="100%" height={70} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyImage;
