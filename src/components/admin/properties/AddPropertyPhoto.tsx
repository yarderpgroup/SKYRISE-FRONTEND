import { MultiplePhotoUpload } from "components/core";
import { useState } from "react";
import { AddVideo, PhotoUpload } from "../common";

const AddPropertyPhoto = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [toggle, setToggle] = useState(true);
  const toggleButton = " transform translate-x-5";
  return (
    <div className="py-9  text-themeDarkGray flex flex-col gap-8">
      <div className="py-4 w-full flex flex-col gap-5">
        <div
          className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer"
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <div
            className={
              "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform" +
              (toggle ? null : toggleButton)
            }
          ></div>
        </div>
        <h1 className="text-2xl font-bold">Add photos of your property</h1>
        <div className="w-full flex flex-col gap-2">
          <div>
            <p className="text-lg font-semibold">Upload photos from desktop</p>
          </div>
          <MultiplePhotoUpload
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div>
          <p className="text-lg font-semibold">Upload videos from desktop</p>
        </div>
        <AddVideo />
      </div>
    </div>
  );
};

export default AddPropertyPhoto;

{
  /* <div className="w-full flex justify-center text-center pt-7">
<PhotoUpload
  txtName="Upload Image"
  variant={"square"}
  className={
    "!bg-[#f0f9ff]  border-dashed border-2 border-[#a3daff] !w-full !rounded-lg"
  }
  height={250}
/>
</div> */
}
