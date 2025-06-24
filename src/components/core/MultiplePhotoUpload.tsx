import { DeleteOutline } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Upload } from "assets/admin";
import { Dispatch, SetStateAction, useRef, useState } from "react";
interface Props {
  setSelectedFiles: Dispatch<SetStateAction<undefined>>;
  selectedFiles: undefined;
  imagePreviews: never[];
  setImagePreviews: Dispatch<SetStateAction<never[]>>;
}
const MultiplePhotoUpload = ({
  setSelectedFiles,
  selectedFiles,
  imagePreviews,
  setImagePreviews,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDelete = (i: number) => {
    const newItems = [...imagePreviews];
    newItems.splice(i, 1);
    setImagePreviews(newItems);
  };
  const selectFiles = (event: any) => {
    if (imagePreviews.length <= 0) {
      let images: any = [];
      for (let i = 0; i < event.target.files.length; i++) {
        images.push(URL.createObjectURL(event.target.files[i]));
      }
      setSelectedFiles(event.target.files);
      setImagePreviews(images);
      return;
    }
    let images: any = imagePreviews;
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }
    setImagePreviews((prv: never[]) => [...prv]);
  };
  return (
    <div className={`w-full flex flex-col gap-5`}>
      {imagePreviews && (
        <div className="w-full grid grid-cols-12 gap-5">
          {imagePreviews.map((img, i) => (
            <div key={i} className="col-span-3 w-full relative">
              <Tooltip title={"Delete"}>
                <div
                  onClick={() => handleDelete(i)}
                  className="w-10 h-10 flex items-center cursor-pointer rounded-lg justify-center absolute bg-gradient-to-br from-white to-themeGray top-3 right-3 "
                >
                  <DeleteOutline className="text-theme !text-2xl " />
                </div>
              </Tooltip>
              <img
                className="w-full h-64 object-cover    border-2 border-[#a3daff] rounded-lg"
                src={img}
                alt={"image-" + i}
                key={i}
              />
            </div>
          ))}
        </div>
      )}
      <div
        className={` h-64 flex ${
          imagePreviews.length === 0 ? "w-full" : "w-1/4"
        }`}
      >
        <div className="flex-col relative flex items-center gap-5 justify-center w-full p-5">
          <input
            className="opacity-0"
            type="file"
            multiple
            accept="image/*"
            onChange={selectFiles}
            ref={inputRef}
          />
          <div className="absolute left-0 top-0 w-full h-full bg-[#f0f9ff] border-dashed  border-2 border-[#a3daff]  rounded-md flex items-center justify-center flex-col gap-2 text-center ">
            <div className="">
              <img src={Upload.src} alt="upload" className="w-16 h-16" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px]">
                upload 50 photos of max size 10mb in format png, jpg, jpeg
              </p>
            </div>
            <div className="text-sm">OR</div>
            <button
              className="w-fit px-4 border border-primaryBorder rounded-md py-2"
              onClick={() => inputRef.current?.click()}
            >
              Upload Photos Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplePhotoUpload;
