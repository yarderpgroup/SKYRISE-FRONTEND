import { Skeleton } from "@mui/material";
import React from "react";

const LeaseInfoSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="md:grid md:grid-cols-12 hidden grid-cols-1 gap-6 w-full items-center justify-center p-2 md:py-0">
        {[...Array(2)]?.map((item) => (
          <div className="w-full md:col-span-6 col-span-1 gap-2">
            <div className="w-full gap-6">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={120}
                className="!rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="w-full gap-6">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={320}
          className="!rounded-lg"
        />
      </div>
    </div>
  );
};

export default LeaseInfoSkeleton;
