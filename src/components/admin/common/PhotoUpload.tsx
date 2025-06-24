import { CloudUpload } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRef } from "react";
// import Swal from "sweetalert2";
type Props = {
  isImage?: any;
  variant?: "square" | "rounded" | "circular";
  onChange?: React.ChangeEventHandler<HTMLInputElement> | any;
  height?: number;
  width?: number;
  dimensions?: number;
  className?: string;
  txtName?: string;
  setIsImage?: any;
};
const PhotoUpload = ({
  isImage,
  onChange,
  variant,
  height,
  width,
  dimensions,
  className,
  setIsImage,
  txtName,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = async (e: any) => {
    try {
      const file = e?.target?.files?.[0];
      if (!file) return;
      if (!dimensions) return onChange(e);
      setIsImage(file);

      // Swal.fire(
      //   "Invalid Dimensions",
      //   `Please use ${dimensions.width}x${dimensions.height} images`,
      //   "warning"
      // );
    } catch (error) {}
  };
  return (
    <>
      <Avatar
        variant={variant || "square"}
        src={isImage}
        className={className}
        sx={{
          height: height || 120,
          width: width || 120,
          cursor: "pointer",
        }}
        onClick={() => inputRef.current?.click()}
      >
        {!isImage && (
          <div className="h-full w-full  flex flex-col gap-4 items-center justify-center">
            <CloudUpload className="text-5xl" />
            {/* <h1 className="text-base text-white font-normal">Download pdf</h1> */}
            <button className="flex gap-2 cursor-pointer justify-center items-center w-56 tracking-wider font-bold text-base h-10 rounded-full  text-white  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border py-2 ">
              {txtName}
            </button>
          </div>
        )}
      </Avatar>
      <input
        ref={inputRef}
        hidden
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
    </>
  );
};

export default PhotoUpload;
