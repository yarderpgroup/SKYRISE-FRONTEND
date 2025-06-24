import { CircularProgress } from "@mui/material";
import { post } from "api";
import {
  MultiplePhotoUpload,
  MultipleVideoUpload,
  RippleLoadingButton,
} from "components/core";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const AddPropertiesPhoto = () => {
  const router = useRouter();
  const propertyID = router?.query?.propertyID;

  const [selectedFiles, setSelectedFiles] = useState<any>(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(undefined);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [isPhotoBuffer, setIsPhotoBuffer] = useState(false);
  const { data, error, isValidating, mutate } = useSWRAPI(
    `photofees/get-photo-fee`
  );
  const { data: photoFee, mutate: photoFeeMutate } = useSWRAPI(
    `photofees/get-status/${propertyID}`
  );

  const formData = new FormData();
  const formVideo = new FormData();
  if (selectedFiles?.length) {
    for (let x in selectedFiles) {
      formData.append("propertyPhoto", selectedFiles[x] as any);
    }
  }

  for (let x in selectedVideo) {
    formVideo.append("propertyVideo", selectedVideo[x] as any);
  }
  const handleSend: any = async () => {
    try {
      if (selectedVideo?.length <= 1) {
        setVideoPreviews([]);
        toast.error("Please select at Least 2 video");
        return;
      }
      setIsPhotoBuffer(true);
      const response = await post({
        path: `property/video/${router?.query?.propertyID}`,
        isImage: true,
        isAlert: true,
        body: formVideo,
      });
      setIsPhotoBuffer(false);
      setVideoPreviews([]);
    } catch (error: any) {
      setIsStatusLoading(false);
      toast.error(error);
      setVideoPreviews([]);
    }
  };

  const handlePhotoSend: any = async () => {
    try {
      if (imagePreviews?.length <= 1) {
        setImagePreviews([]);
        toast.error("Please select at Least 2 photos");
        return;
      }
      setIsStatusLoading(true);
      const response = await post({
        path: `property/photo/${router?.query?.propertyID}`,
        isImage: true,
        isAlert: true,
        body: formData,
      });

      setIsStatusLoading(false);
      if (response.status === 200) {
        setImagePreviews([]);
      }
    } catch (error: any) {
      toast.error(error);
      setImagePreviews([]);
    }
  };
  const handelRedeem = async () => {
    try {
      setIsPhotoLoading(true);
      const response = await post({
        path: `photofees/request`,
        isAlert: true,
        body: JSON.stringify({
          propertyId: propertyID,
          isRequest: !photoFee?.data?.data?.isRequest,
          photoId: data?.data?.data?._id,
        }),
      });
      photoFeeMutate();
      setIsPhotoLoading(false);
    } catch (error: any) {
      setIsPhotoLoading(false);
      toast.error(error);
    }
  };

  const handelChanges: any = async () => {
    router.push(
      `/panel/admin/properties/add-property/schedule?propertyID=${router?.query?.propertyID}`
    );
  };

  const [toggle, setToggle] = useState(true);
  const toggleButton = " transform translate-x-5";

  return (
    <div>
      <div className="text-themeDarkGray flex flex-col gap-4 md:gap-8">
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-xl md:text-3xl font-bold">
            Add photos of your property
          </h1>

          <div
            className={`w-full py-8 bg-[#f0f9ff] border-dashed  border-2 border-[#a3daff]  rounded-md flex items-center justify-center flex-col gap-2 text-center`}
          >
            <div className="">
              {/* <img src={Upload.src} alt="upload" className="w-16 h-16" /> */}
            </div>
            <div className="flex flex-row gap-1">
              <p className="text-base font-bold">
                Get Professional Photos From SkyRise for
              </p>
              <div>
                {/* {data?.data?.data?.map((item: any) => ( */}
                <p className="text-xl font-bold">${data?.data?.data?.amount}</p>
                {/* ))} */}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                disabled={isPhotoLoading}
                className={`${
                  photoFee?.data?.data?.isRequest ? "btn-one" : "btn-two"
                } w-40 flex items-center justify-center`}
                onClick={handelRedeem}
              >
                {isPhotoLoading ? (
                  <CircularProgress className="!text-white" size={20} />
                ) : photoFee?.data?.data?.isRequest ? (
                  "Cancel"
                ) : (
                  "Redeem"
                )}
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col ">
            <div className="flex w-full items-center gap-4">
              <div className="flex flex-col w-1/2 gap-2">
                <p className="text-lg font-semibold">
                  Upload photos from desktop
                </p>
              </div>
              <div className="flex w-1/2 justify-end gap-2 pt-2">
                <RippleLoadingButton
                  type="submit"
                  title="Upload Photo"
                  className="w-44"
                  loading={isStatusLoading}
                  handleClick={handlePhotoSend}
                />
              </div>
            </div>
            <MultiplePhotoUpload
              setSelectedFiles={setSelectedFiles}
              selectedFiles={selectedFiles}
              imagePreviews={imagePreviews}
              setImagePreviews={setImagePreviews}
            />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div>
            <div className="flex w-full items-center gap-4">
              <div className="flex w-full items-center gap-4">
                <div className="flex flex-col w-1/2 gap-2">
                  <p className="text-lg font-semibold">
                    Upload videos from desktop
                  </p>
                </div>
                <div className="flex w-1/2 justify-end gap-2 pt-2">
                  <RippleLoadingButton
                    type="submit"
                    title="Upload Video"
                    className="w-44"
                    loading={isPhotoBuffer}
                    handleClick={handleSend}
                  />
                </div>
              </div>
            </div>
            <MultipleVideoUpload
              setSelectedVideo={setSelectedVideo}
              selectedVideo={selectedVideo}
              videoPreviews={videoPreviews}
              setVideoPreviews={setVideoPreviews}
            />
          </div>
        </div>
        <button onClick={() => handelChanges()} className="btn-one w-full">
          Save & Next
        </button>
        {/* 
        <div className="flex w-full gap-2 pt-2">
          <RippleLoadingButton
            type="submit"
            title="Save & Continue"
            className="w-full"
            loading={isPhotoBuffer}
            handleClick={handleNext}
          />
        </div> */}
      </div>
    </div>
  );
};

export default AddPropertiesPhoto;
