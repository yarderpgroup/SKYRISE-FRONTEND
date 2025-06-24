import { Skeleton } from "@mui/material";
import React from "react";

const PropertySkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton
        variant="rectangular"
        width="100%"
        className="!rounded-t-lg"
        height={200}
      />
      <Skeleton
        variant="text"
        width="100%"
        className="!rounded-lg"
        height={40}
      />
      <Skeleton
        variant="text"
        width="100%"
        className="!rounded-lg"
        height={40}
      />
      <Skeleton
        variant="text"
        width="100%"
        className="!rounded-lg"
        height={40}
      />
      <Skeleton
        variant="text"
        width="100%"
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
  );
};

export default PropertySkeleton;
