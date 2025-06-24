import { Skeleton } from "@mui/material";
import React from "react";

const PropertyDetailsSkeleton = () => {
  return (
    <div className="custom-container w-full flex flex-col gap-4">
      <>
        <div className="w-full md:grid hidden grid-cols-12 gap-6">
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
        <div className="w-full md:hidden grid grid-cols-12 gap-6">
          {[...Array(3)]?.map((item) => (
            <div className="w-full col-span-4 gap-6">
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
      </>
      <div className="w-full flex gap-4">
        <>
          <div className="w-full md:flex hidden flex-col gap-4">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={250}
              className="!rounded-lg"
            />
            {/* <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={250}
              className="!rounded-lg"
            /> */}
          </div>
          <div className="w-full md:hidden flex flex-col gap-4">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={150}
              className="!rounded-lg"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              height={150}
              className="!rounded-lg"
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default PropertyDetailsSkeleton;
