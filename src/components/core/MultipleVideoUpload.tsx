import { DeleteOutline } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Upload } from "assets/admin";
import { Dispatch, SetStateAction, useRef } from "react";
interface Props {
  setSelectedVideo: Dispatch<SetStateAction<undefined>>;
  selectedVideo: undefined;
  videoPreviews: never[];
  setVideoPreviews: Dispatch<SetStateAction<never[]>>;
}
const MultiplePhotoUpload = ({
  setSelectedVideo,
  selectedVideo,
  videoPreviews,
  setVideoPreviews,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleDelete = (i: number) => {
    const newItems = [...videoPreviews];
    newItems.splice(i, 1);
    setVideoPreviews(newItems);
  };

  const selectVideo = (event: any) => {
    if (videoPreviews.length <= 0) {
      let images: any = [];
      for (let i = 0; i < event.target.files.length; i++) {
        images.push(URL.createObjectURL(event.target.files[i]));
      }
      setSelectedVideo(event.target.files);
      setVideoPreviews(images);
      return;
    }
    let images: any = videoPreviews;
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }
    setVideoPreviews((prv: never[]) => [...prv]);
  };

  return (
    <div className={`w-full flex flex-col gap-5`}>
      {videoPreviews && (
        <div className="w-full grid grid-cols-12 gap-5">
          {videoPreviews.map((img, i) => (
            <div key={i} className="col-span-3 w-full relative">
              <Tooltip title={"Delete"}>
                <div
                  onClick={() => handleDelete(i)}
                  className="w-10 h-10 cursor-pointer flex items-center rounded-lg justify-center absolute bg-gradient-to-br from-white to-themeGray top-3 right-3 "
                >
                  <DeleteOutline className="text-theme  !text-2xl " />
                </div>
              </Tooltip>
              <iframe
                title="hover"
                className="w-full h-64 rounded-lg !object-cover"
                src={img}
                allow="fullscreen"
              ></iframe>
            </div>
          ))}
        </div>
      )}
      <div
        className={` h-64 flex ${
          videoPreviews.length === 0 ? "w-full" : "w-1/4"
        }`}
      >
        <div className="flex-col relative flex items-center gap-5 justify-center w-full p-5">
          <input
            className="opacity-0"
            type="file"
            multiple
            accept="mp4/*"
            onChange={selectVideo}
            ref={inputRef}
          />
          <div className="absolute left-0 top-0 w-full h-full bg-[#f0f9ff] border-dashed  border-2 border-[#a3daff]  rounded-md flex items-center justify-center flex-col gap-2 text-center ">
            <div className="">
              <img src={Upload.src} alt="upload" className="w-16 h-16" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[10px]">
                upload 5 videos of max size 50mb in format mp4
              </p>
            </div>
            <div className="text-sm">OR</div>
            <button
              className="w-fit px-4 border border-primaryBorder rounded-md py-2"
              onClick={() => inputRef.current?.click()}
            >
              Upload Videos Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplePhotoUpload;
