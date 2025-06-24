import { Skeleton } from "@mui/material";
import React from "react";

const PhotoSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-6">
      <Skeleton
        animation="wave"
        variant="text"
        width="30%"
        height={40}
        className="col-span-12"
      />
      {[...Array(6)]?.map((item) => (
        <div className="w-full col-span-4 gap-6">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={200}
            className="!rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoSkeleton;
