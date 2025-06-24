import PublicLayout from "layouts/publicLayout";
import { useState } from "react";
import { AddToPhotos, Delete, Remove, Schedule } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AccountLayout } from "layouts";
import { WAVE } from "assets/backgrounds";
import useSWRAPI from "hooks/useSWRAPI";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";
import { post, remove } from "api";
import {
  FavoriteSkeleton,
  PropertyTypeSkeleton,
} from "components/skeleton/property";
import { EmptyComponents } from "components/core";
import withProtectedAccount from "hooks/withProtectedAccount";

const FavoriteProperty = () => {
  const [activeButton, setActiveButton] = useState<any>("");
  const router = useRouter();
  const { data, error, mutate, isValidating } = useSWRAPI(
    `leadpage/favorite/get-all`
  );
  const FavoriteData = data?.data?.data;

  const handleRemove = (_id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove it!",
      }).then(async (result) => {
        const response = await post({
          path: `leadpage/favorite/add-remove`,
          isAlert: true,
          body: JSON.stringify({
            propertyId: _id,
            isFavorite: false,
          }),
        });
        mutate();
      });
    } catch (error) {}
  };
  // const handleProperty = (id: any) => {
  //   router.push(`/property/${id}`);
  // };
  const handleClick = (_id: string) => {
    router.push(`/property/${_id}`);
  };
  return (
    <PublicLayout title="Favorite Property">
      <div className="w-full bg-themeGray/10 pt-5 md:py-10 text-themeDarkGray relative h-full">
        <AccountLayout>
          <div className="md:bg-white justify-center text-themeDarkGray md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md overflow-hidden">
            <div className="flex flex-col items-center gap-4 md:gap-6 md:p-6">
              <h1 className="text-2xl font-semibold text-start w-full">
                Your Favorite
              </h1>
              {isValidating ? (
                <FavoriteSkeleton />
              ) : (
                <>
                  {FavoriteData?.length === 0 ? (
                    <EmptyComponents />
                  ) : (
                    <div className="grid grid-cols-12 w-full pb-3 md:pb-0 md:px-0 gap-7">
                      {FavoriteData?.map((item: any) => (
                        <div
                          className="flex md:flex-row flex-col h-fit md:h-52 common-transition col-span-12 bg-white md:gap-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg overflow-hidden"
                          key={item?._id}
                        >
                          <div className="flex flex-col h-40 md:h-full w-full object-cover overflow-hidden rounded-md-l">
                            <img
                              src={item?.propertyHeroImage}
                              alt="image"
                              className="w-full !h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col h-1/2 md:h-full gap-3 w-full rounded justify-between">
                            <div className="w-full flex flex-col  p-3 md:px-4">
                              <div className="flex gap-2 w-full">
                                <div className="w-full flex justify-between">
                                  <div className="w-full flex flex-col md:gap-2">
                                    <p className="md:text-xl text-base leading-5 font-semibold">
                                      {item?.propertyName}
                                    </p>
                                    <p className="text-sm md:text-base">
                                      {item?.propertyType}
                                    </p>
                                  </div>
                                  <div className="w-full !gap-2 flex items-center justify-end">
                                    <Tooltip title="Visit">
                                      <button
                                        className="btn-two flex items-center justify-center md:h-10 h-8 md:w-10 w-8"
                                        onClick={() => handleClick(item?._id)}
                                      >
                                        <AddToPhotos className="md:!text-2xl !text-lg" />
                                      </button>
                                    </Tooltip>
                                    <Tooltip title="Remove">
                                      <button
                                        className="btn-one md:!h-10 h-8 md:!w-10 w-8 !flex !items-center !justify-center"
                                        onClick={() => handleRemove(item?._id)}
                                      >
                                        <Delete className="md:!text-2xl !text-lg" />
                                      </button>
                                    </Tooltip>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col md:pt-1">
                                <div className="md:text-lg text-sm flex flex-col gap-2">
                                  {item?.type === "SELL" && (
                                    <p> price: ${item?.propertyPrice}</p>
                                  )}
                                  <p> location: {item?.locality}</p>
                                </div>
                                {/* <div className="flex w-full justify-between pt-3">
                            <p className="md:text-lg text-base">Sq.ft</p>
                            <p className="md:text-lg text-base">Bedroom</p>
                            <p className="md:text-lg text-base">Bathroom</p>
                          </div> */}
                                <div className="md:flex hidden w-full text-sm md:text-lg font-semibold justify-between">
                                  <p>
                                    {item?.totalArea}/{item?.measureIn}
                                  </p>
                                  <p>{item?.bedrooms} BHK</p>
                                  <p>{item?.bathrooms} BATH</p>
                                  <p>{item?.balconies} BALCONY</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="md:block w-full hidden">
              <img src={WAVE.src} alt="wave" className="w-full" />
            </div>
          </div>
        </AccountLayout>
        <div className="md:hidden mt-5 w-full flex">
          <img src={WAVE.src} alt="wave" className="w-full" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default withProtectedAccount(FavoriteProperty);
