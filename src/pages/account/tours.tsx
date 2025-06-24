import { WAVE } from "assets/backgrounds";
import TourCard from "components/account/TourCard";
import { EmptyComponents } from "components/core";
import { HomeTourSkeleton } from "components/skeleton/property";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedAccount from "hooks/withProtectedAccount";
import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";
import { useState } from "react";

const Tours = () => {
  const [pageNo, setPageNo] = useState(1);
  const { data, error, mutate, isValidating } = useSWRAPI(
    `schedule/home-tour?perPage=10&pageNo=${pageNo}`
  );

  const handelPrevious = () => {
    if (pageNo <= 1) return;
    setPageNo((prev) => prev - 1);
  };
  const handelNext = () => {
    setPageNo((prev) => prev + 1);
  };
  const tourArr = data?.data?.data?.data;
  return (
    <PublicLayout title="Tours | SKYRISE">
      <div className="w-full bg-gradient-to-b from-themeGray/10 to-white pt-5 md:pt-10 md:py-10 text-themeDarkGray">
        <AccountLayout>
          <div className="md:bg-white rounded-t-3xl md:rounded-md h-full w-full md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] justify-between flex flex-col">
            <div className="w-full p-3 pt-5 md:p-6 h-full flex flex-col gap-5">
              <h1 className="md:text-2xl text-lg font-semibold">
                Upcoming Tours
              </h1>
              {isValidating ? (
                <HomeTourSkeleton />
              ) : (
                <>
                  {tourArr?.length === 0 ? (
                    <EmptyComponents />
                  ) : (
                    <div className="flex flex-col w-full gap-4 md:gap-5">
                      {tourArr?.map((item: any) => (
                        <TourCard curElm={item} />
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
                    disabled={data?.data?.data?.isLastChunk}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
            <div className="w-full md:flex hidden ">
              <img src={WAVE.src} alt="wave" className="w-full" />
            </div>
          </div>
        </AccountLayout>
        <div className="flex object-cover md:hidden h-20 w-full">
          <img src={WAVE.src} alt="image" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default withProtectedAccount(Tours);
