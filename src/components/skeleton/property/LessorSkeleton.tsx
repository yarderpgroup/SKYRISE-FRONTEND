import { Skeleton } from "@mui/material";
import React from "react";

const LessorSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-12 gap-6">
      {[...Array(1)]?.map((item) => (
        <div className="w-full col-span-12 gap-6">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={300}
            className="!rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default LessorSkeleton;
