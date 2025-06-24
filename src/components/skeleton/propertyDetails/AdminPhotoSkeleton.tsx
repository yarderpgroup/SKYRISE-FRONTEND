import { Skeleton } from "@mui/material";
import React from "react";

const AdminPhotoSkeleton = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-5/6 grid grid-cols-12 gap-6 mt-4  items-center">
        {[...Array(12)]?.map((item) => (
          <div className="w-full col-span-3 gap-6">
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
    </div>
  );
};

export default AdminPhotoSkeleton;
