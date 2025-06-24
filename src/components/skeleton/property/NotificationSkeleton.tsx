import { Skeleton } from "@mui/material";
import React from "react";

const NotificationSkeleton = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full grid grid-cols-12   items-center px-4">
        {[...Array(8)]?.map((item) => (
          <div className="w-full flex col-span-12 gap-3">
            <Skeleton
              variant="text"
              width="50%"
              height={150}
              className="bg-gray-300 rounded-md animate-pulse md:block hidden"
            />
            <div className="flex gap-2 md:gap-4 items-center md:col-span-1 col-span-2">
              <p className="bg-gradient-to-br  cursor-pointer from-twitter to-facebook h-10 w-10 md:h-10 md:w-10 flex items-center justify-center text-white rounded-md">
                <div className="w-4 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              </p>
              <p className="bg-gradient-to-br  cursor-pointer from-theme to-themeDarkGray h-10 w-10 md:h-10 md:w-10 flex items-center justify-center text-white rounded-md">
                <div className="w-4 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSkeleton;
