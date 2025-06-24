import { Skeleton } from "@mui/material";
import React from "react";

const CardSkeleton = () => {
  return (
    <>
      <div className="md:grid md:grid-cols-12 hidden grid-cols-1 gap-6 w-full items-center justify-center p-2 md:py-0">
        {[...Array(3)]?.map((item) => (
          <div className="w-full md:col-span-4 col-span-1 gap-6">
            <div className="w-full gap-6">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={200}
                className="!rounded-lg"
              />
            </div>
            <div className="w-full gap-6">
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                height={40}
                className="!rounded-lg"
              />
            </div>
            <div className="w-full gap-6">
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                height={40}
                className="!rounded-lg"
              />
            </div>
            <div className="w-full  gap-6">
              <Skeleton
                animation="wave"
                variant="text"
                width="100%"
                height={40}
                className="!rounded-lg"
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="md:hidden md:grid-cols-12 grid grid-cols-1 gap-6 w-full items-center justify-center p-2 md:py-0">
          {[...Array(1)]?.map((item) => (
            <div className="w-full md:col-span-4 col-span-1 gap-6">
              <div className="w-full gap-6">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={200}
                  className="!rounded-lg"
                />
              </div>
              <div className="w-full gap-6">
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={40}
                  className="!rounded-lg"
                />
              </div>
              <div className="w-full gap-6">
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={40}
                  className="!rounded-lg"
                />
              </div>
              <div className="w-full  gap-6">
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="100%"
                  height={40}
                  className="!rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardSkeleton;
