import { Cancel, CloudUpload } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import { ChangeEventHandler } from "react";

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  image?: any;
  clearImage: () => void;
  className?: string;
};

const UploadImage = ({ onChange, image, clearImage, className }: Props) => {
  return (
    <div
      className={`${className} overflow-hidden w-full min-h-[12rem]  bg-gradient-to-br from-facebook to-twitter/60 text-white relative grid place-content-center rounded-md cursor-pointer`}
    >
      {Boolean(image) ? (
        <div className="relative h-full w-full object-cover">
          <iframe
            src={image ? URL?.createObjectURL(image) : ""}
            className="w-full object-cover h-full"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
          <CloudUpload className="text-5xl" />
          <small>Upload Video</small>
        </div>
      )}

      {image && (
        <span className="absolute top-0 z-50 cursor-pointer right-0">
          <Tooltip title="Clear">
            <IconButton onClick={clearImage}>
              <Cancel className="text-white" />
            </IconButton>
          </Tooltip>
        </span>
      )}

      <input
        type="file"
        className="absolute top-0 left-0 w-full h-full z-10 opacity-0 "
        onChange={onChange}
      />
    </div>
  );
};

export default UploadImage;
