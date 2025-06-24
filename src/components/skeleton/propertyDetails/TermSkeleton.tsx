import { Skeleton } from "@mui/material";
import React from "react";

const TermSkeleton = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="text"
        width="100%"
        height={40}
        className="col-span-12"
      />
      <div className="w-full grid grid-cols-12 items-center justify-center gap-4">
        {[...Array(8)]?.map((item) => (
          <Skeleton
            animation="wave"
            variant="text"
            width="100%"
            height={80}
            className="col-span-6"
          />
        ))}
      </div>
      <Skeleton
        animation="wave"
        variant="text"
        width="100%"
        height={80}
        className="col-span-12"
      />
    </>
  );
};

export default TermSkeleton;
