import { Skeleton } from "@mui/material";
import React from "react";

const UploadPhotoSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton variant="text" width="30%" height={40} />
      <div className="w-full flex items-center justify-center gap-4">
        <Skeleton variant="rectangular" width="100%" height={280} />
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        <Skeleton variant="text" width="100%" height={60} />
      </div>
    </div>
  );
};

export default UploadPhotoSkeleton;
