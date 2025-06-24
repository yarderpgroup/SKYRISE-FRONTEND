import { Skeleton } from "@mui/material";
import React from "react";

const LeaseViewSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-6">
      {[...Array(8)]?.map((item) => (
        <div className="w-full col-span-6 gap-6">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={40}
            className="!rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default LeaseViewSkeleton;
