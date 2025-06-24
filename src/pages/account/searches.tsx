import { Book, Delete, ViewInAr } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { WAVE } from "assets/backgrounds";
import useSWRAPI from "hooks/useSWRAPI";
import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";
import dayjs from "dayjs";
import { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { remove } from "api";
import { SavesSearchSkeleton } from "components/skeleton/property";
import { EmptyComponents } from "components/core";
import withProtectedAccount from "hooks/withProtectedAccount";

interface ISearches {
  _id: string;
  type: string;
  device: string;
  property: {
    id: string;
    type: string;
    address: string;
    city: string;
    country: string;
    locality: string;
    propertyName: string;
  };
  createdAt: string;
}

const Searches = () => {
  const [pageNo, setPageNo] = useState(1);
  const router = useRouter();
  const { data, error, mutate, isValidating } = useSWRAPI(
    `leadpage/search-save/get-all`
  );
  const savedSearchData = data?.data?.data?.data;
  console.log(data);

  const handelPrevious = () => {
    if (pageNo <= 1) return;
    setPageNo((prev) => prev - 1);
  };
  const handelNext = () => {
    setPageNo((prev) => prev + 1);
  };

  const handleDelete = (_id: string) => {
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
        if (result.isConfirmed) {
          const response = await remove({
            path: `leadpage/search-save/delete/${_id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  // const savedSearchArr = [
  //   {
  //     id: "1",
  //     address: "Chicago",
  //     type: "For Sale",
  //     notify: "never",
  //     device: "android",
  //     time: "9:10 pm",
  //   },
  //   {
  //     id: "2",
  //     address: "LA",
  //     type: "For Rent",
  //     notify: "never",
  //     device: "ios",
  //     time: "12:10 pm",
  //   },
  //   {
  //     id: "3",
  //     address: "Chicago",
  //     type: "For Buy",
  //     notify: "never",
  //     device: "web",
  //     time: "8:59 am",
  //   },
  // ];
  return (
    <PublicLayout title="Profile Overview | SKYRISE">
      <div className="w-full bg-gradient-to-b from-themeGray/10 to-white pt-6 md:py-10 text-themeDarkGray">
        <AccountLayout>
          <div className="md:bg-white w-full rounded-md overflow-hidden md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col justify-between h-full">
            <div className="md:bg-white p-1 md:p-6 flex flex-col gap-3 md:gap-5">
              <p className="text-lg md:text-2xl font-semibold">
                Saved Searches
              </p>

              {isValidating ? (
                <SavesSearchSkeleton />
              ) : (
                <>
                  {savedSearchData?.length === 0 ? (
                    <EmptyComponents />
                  ) : (
                    <div className="flex flex-col w-full gap-4 md:gap-5">
                      {savedSearchData?.map((item: ISearches) => (
                        <div className="w-full h-16 md:h-20 rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white items-center flex overflow-hidden">
                          <div className="md:w-24 w-16 flex items-center justify-center bg-gradient-to-br from-theme to-themeDarkGray h-full">
                            <Book className="md:!text-5xl text-3xl text-white" />
                          </div>
                          <div className="w-full grid grid-cols-12 px-2 md:px-5">
                            <div className="md:flex hidden justify-center flex-col col-span-4">
                              <p className="md:text-xl text-base font-semibold leading-5 md:leading-6">
                                {item?.property?.address}
                              </p>
                              <p className="text-xs md:text-base">
                                {item?.property?.type}
                              </p>
                            </div>
                            <div className="md:hidden flex items-center col-span-6 justify-start font-semibold">
                              {item?.property?.city}
                            </div>

                            <div className="md:flex hidden items-center col-span-2 justify-start font-semibold">
                              {item?.device}
                            </div>
                            {/* <div className="md:flex hidden text-base font-normal items-center col-span-2 justify-start md:font-semibold"></div> */}
                            <div className="md:flex hidden text-base items-center col-span-3 md:col-span-2 justify-start md:font-semibold font-normal">
                              {dayjs(item?.createdAt).format("DD MMM YYYY")}
                            </div>
                            <div className="flex  text-sm items-center md:col-span-1 col-span-3 justify-start md:font-semibold font-normal">
                              {dayjs(new Date(item?.createdAt)).format(
                                "hh:mm a"
                              )}
                            </div>
                            <div className="md:col-span-2 col-span-3 flex items-center justify-end gap-1 md:gap-2">
                              <Tooltip title="Delete">
                                <button
                                  className="md:w-12 h-8 md:h-12 w-8 bg-theme rounded-md text-white"
                                  onClick={() => handleDelete(item?._id)}
                                >
                                  <Delete className="!text-lg md:!text-3xl" />
                                </button>
                              </Tooltip>
                              <Tooltip title="Visit">
                                <button className="md:w-12 h-8 md:h-12 w-8 bg-themeDarkGray rounded-md text-white">
                                  <ViewInAr className="!text-lg md:!text-3xl" />
                                </button>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              {data?.data?.data?.totalCount > 10 && (
                <div className="flex flex-row sticky justify-between items-center gap-8">
                  <button
                    onClick={handelPrevious}
                    disabled={pageNo <= 1}
                    className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32"
                  >
                    Previous
                  </button>

                  <button
                    onClick={handelNext}
                    className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32"
                    disabled={data?.data?.data?.data?.isLastChunk}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            <div className="hidden md:flex w-full">
              <img src={WAVE.src} alt="wave" className="w-full" />
            </div>
          </div>
        </AccountLayout>
        <div className="flex md:hidden h-20 w-full">
          <img src={WAVE.src} alt="wave" className="w-full" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default withProtectedAccount(Searches);
