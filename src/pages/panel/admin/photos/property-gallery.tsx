import React, { useState } from "react";
import { TenantLayout } from "layouts";
import { Verified } from "@mui/icons-material";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { post } from "api";
import { EmptyComponents, RippleLoadingButton } from "components/core";
import { AdminPhotoSkeleton } from "components/skeleton/propertyDetails";

const PropertyGallery = () => {
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = React.useState<any>([]);
  const router = useRouter();
  const { propertyID } = router.query;
  const { data, mutate, error, isValidating } = useSWRAPI(
    `photofees/request/my-request/photo/${propertyID}?perPage=20&pageNo=${pageNo}`
  );
  const TotalPhotos = data?.data?.data?.data;
  console.log(data);

  const handleSelect = (Data: string) => {
    const index = selected.indexOf(Data);
    if (index !== -1) {
      const newItems = [...selected];
      newItems.splice(index, 1);
      setSelected(newItems);
    } else {
      setSelected([...selected, Data]);
    }
  };

  const handelPrevious = () => {
    if (pageNo <= 1) return;
    setPageNo((prev) => prev - 1);
  };
  const handelNext = () => {
    if (data?.data?.data?.isLastChunk) return;
    setPageNo((prev) => prev + 1);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (selected.length > 1) {
        selected.map((item: any) => {
          formData.append("photoIDS", item);
        });
      }
      const response = await post({
        path: "photofees/request/my-request/photo/add",
        isImage: true,
        isAlert: true,
        body: formData,
      });
      setIsLoading(false);
      mutate();
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <TenantLayout
      title="Property Name"
      headerText={TotalPhotos && TotalPhotos[0]?.property?.propertyName}
    >
      <>
        {isValidating ? (
          <AdminPhotoSkeleton />
        ) : (
          <div className="flex flex-col w-full  items-center min-h-[calc(100vh-4rem)]">
            <h1 className="text-2xl font-semibold text-center mt-2 text-gray-700">
              Uploaded Photos
            </h1>
            <div className="w-full flex justify-center">
              <div className="w-5/6 grid grid-cols-12 gap-6 mt-4  items-center">
                {TotalPhotos?.map((item: any) => (
                  <div className="w-full col-span-3" key={item?.id}>
                    <div
                      className="flex w-full col-span-3"
                      onClick={() => handleSelect(item?._id)}
                    >
                      <img
                        src={item?.photo}
                        alt="property"
                        className={`h-60 w-80 object-cover rounded-md cursor-pointer common-transition ${
                          selected.find((ids: string) => ids === item?._id)
                            ? "opacity-80 scale-105 border border-blue-500 "
                            : ""
                        }`}
                      />
                    </div>
                    {item?.isUploaded && (
                      <div
                        className={`flex h-10 absolute top-0 w-full right-0 gap-2 `}
                      >
                        <Verified className="bg-green-600 rounded-full text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* pagination */}
            {TotalPhotos?.length > 10 && (
              <div className="flex flex-row sticky justify-center items-center gap-8">
                <button
                  onClick={handelPrevious}
                  disabled={pageNo <= 1}
                  className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32"
                >
                  Previous
                </button>
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-theme to-themeDarkGray text-white font-semibold flex items-center justify-center shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
                  {pageNo}
                </div>
                <button
                  onClick={handelNext}
                  className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32"
                  disabled={data?.data?.data?.isLastChunk}
                >
                  Next
                </button>
              </div>
            )}
            <div className=" w-full sticky flex justify-center gap-2 p-4">
              <RippleLoadingButton
                className="w-48 btn-one"
                handleClick={handleUpload}
                loading={isLoading}
                title={`Upload photo ${
                  Boolean(selected?.length) ? selected?.length : ""
                }`}
              />
            </div>
          </div>
        )}
      </>
    </TenantLayout>
  );
};

export default PropertyGallery;
