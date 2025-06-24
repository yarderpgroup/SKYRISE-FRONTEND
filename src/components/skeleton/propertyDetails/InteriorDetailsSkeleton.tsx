import { Skeleton } from "@mui/material";
import React from "react";

const InteriorDetailsSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton variant="text" width="30%" height={40} />
      <div className="w-full grid grid-cols-12 gap-6">
        {[...Array(12)].map((item, i) => (
          <div className="w-full col-span-4 gap-4" key={i}>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={100}
              className="!rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteriorDetailsSkeleton;
