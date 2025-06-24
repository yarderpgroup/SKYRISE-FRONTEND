import {
  Search,
  Apartment,
  CallMade,
  KeyboardDoubleArrowDown,
  ViewInAr,
} from "@mui/icons-material";
import { Collapse, Tooltip } from "@mui/material";
import { BASE_URL } from "api";
import { WAVE } from "assets/backgrounds";
import { Discount, OfferStatic } from "assets/staticImages";
import { EmptyComponents } from "components/core";
import { SavesSearchSkeleton } from "components/skeleton/property";
import { useDebounce } from "hooks";
import useAuth from "hooks/useAuth";
import useAuthFetch from "hooks/useAuthFetch";
import useSWRAPI from "hooks/useSWRAPI";
import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { serialize } from "v8";

const Offers = () => {
  const router = useRouter();
  const { mutate } = useAuthFetch();
  const [pageNo, setPageNo] = useState(1);
  const [isOfferOpen, setIsOfferOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [searchData, setSearchData] = useState<any>();
  const { user } = useAuth();
  const debouncedSearch = useDebounce(query, 700);
  useEffect(() => {
    (async () => {
      const response: any = await mutate({
        path: `leadpage/get-offer/property?perPage=10&pageNo=${pageNo}&searchTitle=${debouncedSearch}`,
        method: "GET",
        isFormData: false,
      });
      if (response?.status === "SUCCESS") {
        if (debouncedSearch?.length === 0) return setSearchData(null);
        setSearchData(response?.data);
      }
    })();
  }, [debouncedSearch, pageNo]);

  const handleSearch = (e: any) => {
    const query = e.target.value;
    setQuery(query);
    debouncedSearch(() => {
      setSearchData([]);
    }, 500);
    router.push("/account/offers/get-an-offer");
  };
  const handelPrevious = () => {
    if (pageNo <= 1) return;
    setPageNo((prev) => prev - 1);
  };
  const handelNext = () => {
    if (searchData?.isLastChunk) return;
    setPageNo((prev) => prev + 1);
  };
  const { data, error, isValidating } = useSWRAPI(
    "leadpage/get-all-offer/user?perPage=20&pageNo=1"
  );
  const offerData = data?.data?.data?.data;

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleVisit = (_id: string) => {
    router.push(`/property/${_id}`);
  };

  return (
    <PublicLayout title="Make a Offer | SKYRISE">
      <div className="w-full bg-themeGray/10 md:py-10 pt-5">
        <AccountLayout>
          <div className="md:bg-white h-full flex w-full flex-col justify-between text-themeDarkGray md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md overflow-hidden md:py-0 py-10">
            <div className="w-full flex items-center justify-end px-10 py-5">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-fit md:px-4 px-2 md:py-2 py-1 gradientButton text-white rounded-md"
              >
                Show offer
              </button>
            </div>
            <div className="w-full flex flex-col gap-4 p-2">
              <Collapse in={isOpen}>
                <div className="flex flex-col w-full gap-4 md:gap-5">
                  <h1 className="text-2xl md:text-3xl font-semibold">
                    All Offers
                  </h1>
                  {offerData?.map((item: any) => (
                    <>
                      {isValidating ? (
                        <SavesSearchSkeleton />
                      ) : (
                        <>
                          {offerData.length === 0 ? (
                            <EmptyComponents />
                          ) : (
                            <div
                              key={item?.id}
                              className="w-full h-16 md:h-20 rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white items-center flex overflow-hidden"
                            >
                              <div className="md:w-24 w-16 flex items-center justify-center  h-full">
                                <img
                                  src={item?.property?.propertyHeroImage}
                                  alt="property"
                                  className="w-10 h-10 md:w-full md:h-full object-cover rounded-l-sm"
                                />
                              </div>
                              <div className="w-full grid grid-cols-12 px-2 md:px-5">
                                <div className="md:flex hidden justify-center flex-col col-span-3">
                                  <p className="md:text-xl text-base font-semibold leading-5 md:leading-6">
                                    {item?.property?.propertyName}
                                  </p>
                                </div>
                                <div className="flex items-center md:col-span-2 col-span-6 justify-start font-semibold">
                                  {item?.property?.city}
                                </div>
                                <div className="flex items-center md:col-span-2 col-span-2 justify-start font-semibold">
                                  {item?.offerAmount}
                                </div>
                                <div className="md:flex hidden items-center col-span-2 justify-start font-semibold">
                                  {item?.buyType}
                                </div>
                                <div className="md:col-span-2 col-span-4 flex items-center justify-end gap-1 md:gap-2">
                                  <Tooltip title="Visit">
                                    <button className="md:w-12 h-8 md:h-12 w-8 bg-themeDarkGray rounded-md text-white">
                                      <ViewInAr
                                        className="!text-lg md:!text-3xl"
                                        onClick={() =>
                                          handleVisit(item?.property?._id)
                                        }
                                      />
                                    </button>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </div>
              </Collapse>
            </div>
            <Collapse in={!isOpen}>
              <div className="w-full h-full flex items-center justify-center flex-col">
                {!isOfferOpen && (
                  <div className="w-full md:gap-5 gap-3 h-[40vh] md:h-full flex items-center flex-col justify-center md:py-0 py-4">
                    <div className="md:h-40 md:w-40 h-20 w-20 rounded-full bg-gradient-to-br from-theme to-themeDarkGray flex items-center justify-center p-5">
                      <img
                        src={OfferStatic.src}
                        alt="image"
                        className="md:w-28 w-14"
                      />
                    </div>
                    <div className="w-full text-center">
                      <p className="md:text-2xl text-xl font-semibold">
                        You don't have any offers, currently.
                      </p>
                      <p className="md:text-sm text-xs">
                        Get started on an offer day or night, seven days a week.
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-center">
                      <button
                        onClick={() => setIsOfferOpen(!isOfferOpen)}
                        className="w-fit md:px-4 px-2 md:py-2 py-1 gradientButton text-white rounded-md"
                      >
                        Start an offer
                      </button>
                    </div>
                  </div>
                )}
                {/* show offer card here */}
                <div className="w-full">
                  <Collapse in={isOfferOpen}>
                    <div className="w-full h-full md:p-5 py-10 flex flex-col items-center justify-center">
                      <div className="md:w-1/2 w-full flex flex-col gap-1 items-center text-center">
                        <div className="w-full items-center justify-center flex flex-col md:gap-2 gap-4 relative">
                          <div className="md:h-32 md:w-32 h-20 w-20 rounded-full bg-gradient-to-br from-theme to-themeDarkGray flex items-center justify-center md:p-3 p-1.5">
                            <img
                              src={Discount.src}
                              alt="image"
                              className="md:w-28 w-10"
                            />
                          </div>
                          <div>
                            <p className="md:text-2xl text-xl font-semibold ">
                              Start an Offer
                            </p>
                            <p className="md:text-base text-sm ">
                              Hi {user?.firstName} {user?.lastName} Find a home
                              to get started.
                            </p>
                          </div>
                          <div className="w-full flex items-center h-10 rounded-md overflow-hidden">
                            <input
                              type="search"
                              className="form-control block w-full md:px-3 px-2 py-2 md:py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-md transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-black-600 focus:outline-none md:focus:shadow-outline-black active:text-gray-800 active:bg-white"
                              placeholder="Enter Keyword"
                              onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                              onClick={handleSearch}
                              className="md:w-24 w-12 bg-theme h-full text-white"
                            >
                              <Search />
                            </button>
                          </div>
                          <Collapse
                            in={searchData?.data && searchData?.data?.length}
                          >
                            <div className="w-full flex flex-col items-start overflow-scroll h-[18rem] rounded-md  gap-4 justify-start absolute right-0 left-0 ">
                              {searchData?.data?.map((curElm: any) => (
                                <div className="w-full">
                                  <Link href={`/account/offers/${curElm?._id}`}>
                                    <div className="w-full flex items-center justify-between shadow-md p-2  hover:bg-slate-200">
                                      <div className="w-1/6 flex items-center justify-center">
                                        <Apartment className="text-3xl" />
                                      </div>
                                      <div className="w-4/5 flex flex-col items-start justify-start">
                                        <p className="md:text-base text-sm">
                                          {curElm?.propertyName}
                                        </p>
                                        <div className="flex items-start justify-start gap-1">
                                          <p className="md:text-sm text-xs">
                                            {curElm?.address}
                                          </p>
                                          {/* <p className="md:text-sm text-xs">
                                            {curElm?.city}
                                          </p> */}
                                          <p className="md:text-sm text-xs">
                                            {curElm?.country}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="w-1/6 flex items-center justify-center">
                                        <CallMade className="text-2xl" />
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                              <div className="flex flex-row sticky justify-between items-center gap-8 pt-2">
                                {searchData?.data?.pageNo > 1 && (
                                  <button
                                    onClick={handelPrevious}
                                    disabled={pageNo <= 1}
                                    className="border-2 rounded-lg px-4 py-2 border-primaryBorder border-dashed w-32 hover:bg-theme hover:text-white"
                                  >
                                    <KeyboardDoubleArrowDown className="text-2xl" />
                                  </button>
                                )}
                                {searchData?.totalCount > 10 && (
                                  <button
                                    onClick={handelNext}
                                    className="rounded-full p-2 border-primaryBorder border-dashed w-10 bg-theme text-white animate-bounce border"
                                  >
                                    <KeyboardDoubleArrowDown className="text-2xl " />
                                  </button>
                                )}
                              </div>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            </Collapse>
            <div className="md:block w-full hidden">
              <img src={WAVE.src} alt="wave" className="w-full" />
            </div>
          </div>
        </AccountLayout>
        <div className="md:hidden w-full flex h-40 pt-5">
          <img src={WAVE.src} alt="wave" className="w-full h-full object-" />
        </div>
      </div>
    </PublicLayout>
  );
};

export default Offers;
