import { post } from "api";
import {
  MultiplePhotoUpload,
  MultipleVideoUpload,
  RippleLoadingButton,
} from "components/core";
import useSWRAPI from "hooks/useSWRAPI";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const AddRentPhoto = () => {
  const router = useRouter();
  const propertyID = router?.query?.propertyID;

  const [selectedFiles, setSelectedFiles] = useState<any>(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState<any>(undefined);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const { data, error, isValidating, mutate } = useSWRAPI(
    `photofees/get-photo-fee`
  );
  const { data: photoFee, mutate: photoFeeMutate } = useSWRAPI(
    `photofees/get-status/${propertyID}`
  );
  console.log(photoFee);
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
    if (selectedFiles?.length <= 1) {
      setImagePreviews([]);
      toast.error("Please select 2 or more photos");
      return;
    }
    try {
      setIsStatusLoading(true);

      const response = await post({
        path: `property/photo/${router?.query?.propertyID}`,
        isImage: true,
        isAlert: true,
        body: formData,
      });

      if (response.status === 200) {
        setImagePreviews([]);

        setIsStatusLoading(false);
      }
    } catch (error: any) {
      setIsStatusLoading(false);

      toast.error(error);
    }
  };
  const handelVideo: any = async () => {
    if (selectedVideo?.length <= 1) {
      setVideoPreviews([]);
      toast.error("Please select 2 or more video");
      return;
    }
    try {
      setIsLoading(true);
      const response = await post({
        path: `property/video/${router?.query?.propertyID}`,
        isImage: true,
        isAlert: true,
        body: formVideo,
      });
      if (response.status === 200) {
        setVideoPreviews([]);

        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);

      toast.error(error);
    }
  };
  const handelChanges: any = async () => {
    router.push(
      `/panel/admin/rent/add-property/property-information?propertyID=${propertyID}`
    );
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
      setIsPhotoLoading(false);
      photoFeeMutate();
    } catch (error: any) {
      setIsPhotoLoading(false);

      toast.error(error);
    }
  };

  return (
    <div>
      <div className="text-themeDarkGray flex flex-col gap-4 md:gap-8">
        <div className="w-full flex flex-col gap-4">
          <h1 className="text-xl md:text-3xl font-bold">
            Add photos of your property
          </h1>

          <div
            className={`w-full h-[25vh] bg-[#f0f9ff] border-dashed  border-2 border-[#a3daff]  rounded-md flex items-center justify-center flex-col gap-2 text-center ${
              Boolean(data?.data?.data?.amount) ? "flex" : "hidden"
            }`}
          >
            <div className=""></div>
            <div className="flex flex-row gap-1">
              <p className="text-base font-bold">
                Get Professional Photos From SkyRise for
              </p>
              <div>
                <p className="text-base font-bold">
                  {data?.data?.data?.amount}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className={`${
                  photoFee?.data?.data?.isRequest ? "btn-one" : "btn-two"
                }`}
                onClick={handelRedeem}
              >
                {photoFee?.data?.data?.isRequest ? "Cancel" : "Redeem"}
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col ">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">
                Upload photos from desktop
              </p>
              <div className="flex w-44 gap-2 pt-2">
                <RippleLoadingButton
                  type="submit"
                  title="Upload Photos"
                  className="w-full"
                  loading={isStatusLoading}
                  handleClick={handleSend}
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
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Upload videos from desktop</p>
            <div className="flex w-44 gap-2 pt-2">
              <RippleLoadingButton
                type="submit"
                title="Upload Videos"
                className="w-full"
                loading={isLoading}
                handleClick={handelVideo}
              />
            </div>
          </div>
          <MultipleVideoUpload
            setSelectedVideo={setSelectedVideo}
            selectedVideo={selectedVideo}
            videoPreviews={videoPreviews}
            setVideoPreviews={setVideoPreviews}
          />
        </div>

        <button onClick={() => handelChanges()} className="btn-one w-full">
          Save & Next
        </button>
      </div>
    </div>
  );
};

export default AddRentPhoto;
