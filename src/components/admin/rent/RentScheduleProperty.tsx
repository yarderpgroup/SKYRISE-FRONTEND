import { Skeleton } from "@mui/material";
import { ShowEmpty } from "components/core";
import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";
import { useState } from "react";

const RentScheduleProperty = ({ propertyID }: { propertyID: string }) => {
  const [pageNo, setPageNo] = useState(1);
  const { data, mutate, isValidating } = useSWRAPI(
    `schedule/get-all/${propertyID}?perPage=25&pageNo=${pageNo}`
  );
  const handelPrevious = () => {
    if (pageNo <= 1) return;
    setPageNo((prev) => prev - 1);
  };
  const handelNext = () => {
    if (data?.data?.data?.isLastChunk) return;
    setPageNo((prev) => prev + 1);
  };
  return (
    <div className="w-full flex flex-col">
      {isValidating ? (
        <div className="min-h-[30rem]">
          <div className="grid grid-cols-12 w-full gap-x-5">
            {[...Array(12)].map((item) => (
              <div className="col-span-6 md:col-span-2 2xl:col-span-2 !h-36">
                <Skeleton
                  animation="wave"
                  width="100%"
                  className="!rounded-lg !p-0 !m-0 !h-48"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {data?.data?.data?.data?.length === 0 ? (
            <ShowEmpty />
          ) : (
            <div className="grid w-full grid-cols-12 gap-3 md:gap-4 ">
              {data?.data?.data?.data?.map((curElm: any) => (
                <div className="col-span-6 md:col-span-2 2xl:col-span-2 bg-gradient-to-b from-themeGray/10 to-themeDarkGray/5 rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] px-3 py-5 common-transition   h-fit flex items-center justify-center md:gap-2 flex-col text-themeDarkGray">
                  <p className="text-sm md:text-2xl font-bold">
                    {dayjs(curElm.month).format("DD")}
                    {"  "}
                    {dayjs(curElm.month).format("MMM")}
                  </p>
                  <p className=" text-xs font-bold text-themeDarkGray ">
                    {dayjs(curElm?.startTime).format("hh mm A")} -
                    {dayjs(curElm?.endTime).format("hh mm A")}
                  </p>
                  <p className="text-base font-semibold ">
                    {curElm?.duration >= 60 ? (
                      <div>
                        {Math.floor(curElm?.duration / 60)} {"  "} Hours {"  "}
                        {curElm?.duration % 60} Minutes
                      </div>
                    ) : (
                      <div>{curElm?.duration % 60} Minutes</div>
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="flex flex-row justify-center items-center gap-8">
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
          disabled={data?.data?.data?.isLastChunk}
          onClick={handelNext}
          className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RentScheduleProperty;
