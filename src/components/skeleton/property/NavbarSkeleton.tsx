import { Skeleton } from "@mui/material";
import React from "react";

const NavbarSkeleton = () => {
  return (
    <div className=" custom-container w-full flex  gap-20  p-4">
      <>
        <div className="w-1/2 md:flex hidden gap-2">
          {[...Array(5)]?.map((item) => (
            <div className="w-full flex justify-start gap-2">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={150}
                height={40}
                className="!rounded-lg"
              />
            </div>
          ))}
        </div>
        <div className="w-1/2 md:hidden flex   gap-2">
          {[...Array(5)]?.map((item) => (
            <div className="w-full flex justify-start gap-2">
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={65}
                height={40}
                className="!rounded-lg"
              />
            </div>
          ))}
        </div>
      </>
      <div className="w-1/2 md:flex hidden  gap-2">
        {[...Array(4)]?.map((item) => (
          <div className="w-full flex justify-end">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={150}
              height={40}
              className="!rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarSkeleton;
