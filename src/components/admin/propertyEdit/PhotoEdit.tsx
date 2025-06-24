import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { post, put, remove } from "api";
import {
  MultiplePhotoUpload,
  RippleLoadingButton,
  ShowEmpty,
} from "components/core";
import CustomDialog from "components/core/CustomDialog";
import UploadImage from "components/core/PhotoUpload";
import {
  PhotoSkeleton,
  UploadPhotoSkeleton,
} from "components/skeleton/propertyDetails";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PhotoEdit = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<any>(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const [activeData, setActiveData] = useState<any>();
  const [isImage, setIsImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const propertyID = router?.query?.propertyID;

  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/my-property/photos/${propertyID}`
  );
  if (isValidating) {
    return (
      <div className="flex flex-col  w-full h-full">
        <PhotoSkeleton />
        <UploadPhotoSkeleton />
      </div>
    );
  }
  const onFileChange = (event: any) => {
    setIsImage(event?.target?.files[0]);
  };
  const handleDialogOpen = (data: any) => {
    setDialogOpen(true);
    setActiveData(data);
  };

  const updateMedia = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      if (isImage) {
        formData.append("propertyPhoto", isImage || activeData?.photo);
      }
      formData.append("photoId", activeData?._id);
      formData.append("propertyId", activeData?.property);

      const response = await put({
        path: `property/photo/update`,
        isAlert: true,
        isImage: true,
        body: formData,
      });
      setIsLoading(false);

      setDialogOpen(false);

      mutate();
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  const handleDeletePhoto = async (row: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        let response: any;
        if (result.isConfirmed) {
          response = await remove({
            path: `property/photo/delete/${row?._id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleSend: any = async () => {
    if (selectedFiles?.length <= 1) {
      setImagePreviews([]);
      toast.error("Please select 2 or more photos");
      return;
    }
    try {
      setIsStatusLoading(true);
      const formData = new FormData();
      for (let x in selectedFiles) {
        formData.append("propertyPhoto", selectedFiles[x] as any);
      }
      const response = await post({
        path: `property/photo/${router?.query?.propertyID}`,
        isImage: true,
        isAlert: true,
        body: formData,
      });
      if (response?.status === 200) {
        setImagePreviews([]);
        mutate();
      }
      setIsStatusLoading(false);
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="p-5">
      <CustomDialog
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
      >
        <div className="p-5 flex flex-col gap-6">
          <UploadImage
            image={isImage}
            onChange={onFileChange}
            // clearImage={() => onFileChange(undefined)}
            setIsImage={setIsImage}
          />
          <RippleLoadingButton
            title="save"
            handleClick={updateMedia}
            loading={isLoading}
            className="w-full"
          />
        </div>
      </CustomDialog>
      <h1 className="text-xl font-bold text-themeDarkGray">Property Photos</h1>
      <div>
        {data?.data?.data?.length === 0 ? (
          <ShowEmpty />
        ) : (
          <div className="grid grid-cols-4 w-full gap-6 pt-4 ">
            {data?.data?.data?.map((item: any) => (
              <div
                key={item?.id}
                className="relative group common-transition h-fit w-full overflow-hidden object-cover"
              >
                <img
                  src={item?.photo}
                  alt=""
                  className="w-full h-40 2xl:h-52 group-hover:brightness-50 common-transition object-cover rounded-lg"
                />
                <div className="group-hover:opacity-100 gap-3 common-transition flex absolute opacity-0 !z-[200]  top-5 right-5">
                  <Tooltip title="Edit">
                    <div
                      className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer bg-gradient-to-br from-white to-themeGray text-theme"
                      onClick={() => handleDialogOpen(item)}
                    >
                      <Edit />
                    </div>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <div
                      onClick={() => handleDeletePhoto(item)}
                      className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer bg-gradient-to-br from-facebook to-slate-600 text-white"
                    >
                      <Delete />
                    </div>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full pt-5 ">
        <h1 className="text-xl font-bold text-themeDarkGray">Add MorePhotos</h1>
        <MultiplePhotoUpload
          setSelectedFiles={setSelectedFiles}
          selectedFiles={selectedFiles}
          imagePreviews={imagePreviews}
          setImagePreviews={setImagePreviews}
        />
      </div>
      <div className="flex w-full gap-2 pt-2">
        <RippleLoadingButton
          type="submit"
          title="Save & Continue"
          className="w-full"
          loading={isStatusLoading}
          handleClick={handleSend}
        />
      </div>
    </div>
  );
};

export default PhotoEdit;
