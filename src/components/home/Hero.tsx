import { useCallback, useEffect, useState } from "react";
import { HOMEBG } from "../../assets/backgrounds";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  CircularProgress,
  Collapse,
  FormControl,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import HeroAnimatedText from "../common/HeroAnimatedText";
import {
  AddLocation,
  Apartment,
  Delete,
  FilterList,
  House,
  SavedSearch,
} from "@mui/icons-material";
import {
  EmptyComponents,
  EmptyHomeSearchComponent,
  RippleLoadingButton,
} from "components/core";
import { useDebounce } from "hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { BASE_URL, post, remove } from "api";
import useAuth from "hooks/useAuth";
import Swal from "sweetalert2";
import { mutate } from "swr";
import LoginModal from "components/common/LoginModal";
import useAppContext from "contexts/AppContextProvider";

const Hero = () => {
  const [activeButton, setActiveButton] = useState("");
  const { setShowLoginModal } = useAppContext();
  const [isPinned, setIsPinned] = useState(false);
  const { user } = useAuth();
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any>([]);
  const [search, setSearch] = useState<any>(null);
  const debounceSearch = useDebounce(search, 500);
  const router = useRouter();

  const Property_Type = [
    {
      id: "1",
      title: "Buy",
      value: "BUY",
    },
    {
      id: "2",
      title: "Rent",
      value: "RENT",
    },
    {
      id: "3",
      title: "Sell",
      value: "SELL",
    },
    {
      id: "4",
      title: "Student",
      value: "STUDENT",
    },
  ];
  let actualType = "";
  activeButton === "BUY"
    ? (actualType = "SELL")
    : activeButton === "SELL"
    ? (actualType = "SELL")
    : activeButton === "RENT"
    ? (actualType = "RENT")
    : activeButton === "STUDENT"
    ? (actualType = "RENT")
    : (actualType = "");

  let URL = `${BASE_URL}/leadpage/home-page/get?perPage=10&pageNo=${pageNo}`;
  if (Boolean(actualType)) URL += `&type=${actualType}`;
  if (Boolean(search)) URL += `&searchTitle=${debounceSearch}`;
  if (Boolean(user?._id)) URL += `&userId=${user?._id}`;
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setSuggestions([]);
      const data = await fetch(URL).then((res) => res.json());
      setSuggestions(data?.data);
      setLoading(false);
    }
    if (Boolean(activeButton) || debounceSearch) {
      fetchData();
    }
  }, [debounceSearch, isPinned, actualType, activeButton, setActiveButton]);
  const handleSaveSearch = async (id: string) => {
    if (!user?._id) {
      setShowLoginModal(true);
      return;
    }
    setLoading(true);
    try {
      const response = await post({
        path: `leadpage/search-save/${id}`,
        body: JSON.stringify({}),
        isAlert: true,
      });
      setIsPinned(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleRemoveSearch = async (searchId: string) => {
    if (!user?._id) {
      setShowLoginModal(true);
      return;
    }
    try {
      const response = await remove({
        path: `leadpage/search-save/delete/${searchId}`,
        isAlert: true,
      });
      setIsPinned(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handelNext = () => {
    setPageNo((prev) => prev + 1);
  };

  const handleClose = () => {
    setActiveButton("");
    setSearch("");
  };
  const handleClick = (item: any) => {
    router.push(`/property/${item?._id}`);
  };

  return (
    <section className="w-full flex">
      <div
        className="flex items-center justify-center w-full md:py-16 md:pt-0 md:pb-0 h-[45vh] pt-10 pb-16 md:min-h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${HOMEBG.src})`,
        }}
      >
        <div className="w-full flex-col flex custom-container items-center justify-center gap-8 md:gap-10">
          <div className="w-full text-center">
            <div className="md:text-5xl text-3xl hidden md:flex  leading-6 w-full md:leading-[58px] items-center justify-center flex-col font-bold text-white tracking-tight md:tracking-normal !z-10">
              <p className="flex items-center">
                Homes for <HeroAnimatedText /> and
              </p>

              <p className="top-full">Commercial Properties</p>
            </div>
            <div className="w-full text-3xl text-start font-semibold md:hidden text-white">
              {activeButton === "BUY" && (
                <p>
                  Find homes first. <br /> Tour homes fast.
                </p>
              )}{" "}
              {activeButton === "RENT" && (
                <p>
                  Local rentals
                  <br /> at your fingertips.
                </p>
              )}{" "}
              {activeButton === "SELL" && (
                <p>
                  Sale your home
                  <br /> without any hassle.
                </p>
              )}
              {activeButton === "STUDENT" && (
                <p>
                  Home for students
                  <br /> without any hassle.
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 items-center justify-center">
            <div className="w-full flex gap-2 md:gap-5 items-center md:justify-center">
              {Property_Type?.map((item) => (
                <div
                  onClick={() => setActiveButton(item?.value)}
                  className={`${
                    item?.value === activeButton
                      ? "gradientButton text-white"
                      : "bg-white text-theme"
                  } flex cursor-pointer relative w-20 text-sm md:text-base md:w-24 py-1.5 md:py-2 common-transition justify-center rounded-3xl items-center`}
                  key={item?.id}
                >
                  <div
                    className={`${
                      item?.value === activeButton
                        ? "absolute top-full md:border-l-[8px] border-l-[6px] border-l-transparent md:border-r-[8px] border-r-[6px] border-r-transparent border-t-[10px] md:border-t-[12px] border-t-theme overflow-hidden"
                        : ""
                    }`}
                  ></div>
                  <p className="text-">{item?.title}</p>
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="lg:w-2/3 w-full 2xl:w-[55%] relative ">
                <div className="w-full rounded-md md:rounded-xl flex md:flex-col md:grid items-center grid-cols-12 md:bg-white h-fit md:h-16 md:gap-3 gap-0 px-0 md:py-0 md:px-3 ">
                  <div
                    className="w-4/5 md:w-full md:col-span-7"
                    // onClick={() => setSuggestions(!suggestions)}
                  >
                    <input
                      value={search}
                      type="search"
                      className="form-control block w-full px-3 py-2 md:py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l md:rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-black-600 focus:outline-none md:focus:shadow-outline-black active:text-gray-800 active:bg-white"
                      placeholder="Enter Keyword"
                      autoComplete="off"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* <TextField
                    onChange={(e) => setSearch(e.target.value)}
                    value={search as any}
                  /> */}
                  </div>
                  <div className="w-1/5 hidden md:block md:w-full md:col-span-3 overflow-hidden ">
                    <Link
                      href={`/property-type/type=${
                        actualType.toLowerCase() || "BUY"
                      }`}
                    >
                      <RippleLoadingButton
                        title="More Filter"
                        icon={<FilterList />}
                        className="!w-full"
                        handleClick={() => setSuggestions(!suggestions)}
                        // loading={loading}
                      />
                    </Link>
                    {/* <div className="gradientButton !rounded-md cursor-pointer w-full flex items-center gap-1 justify-center px-3 py-2 text-white">
                    <FilterList />
                    More Filter
                  </div> */}
                  </div>
                  <div className="md:col-span-2 md:w-full w-1/5">
                    <div
                      className="gradientButton md:w-full px-3 flex gap-1 text-white w-full h-10 md:h-fit py-2 items-center justify-center rounded-r-md md:rounded-md cursor-pointer"
                      onClick={handleClose}
                      // onClick={() => setSuggestions(!suggestions)}
                    >
                      <SearchIcon />
                      <p className="hidden md:block">Search</p>
                    </div>
                  </div>
                </div>
                <Collapse in={search?.length > 0 || Boolean(actualType)}>
                  <div
                    className={` w-full max-h-96 flex flex-col items-start shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]  gap-4 justify-start absolute right-0  md:top-20 top-12  bg-white !z-[888] rounded-lg ${
                      suggestions ? " overflow-scroll" : " "
                    }`}
                  >
                    {loading ? (
                      <div className="w-full h-96 flex items-center justify-center py-4">
                        <CircularProgress
                          size={40}
                          className="!text-themeDarkGray"
                        />
                      </div>
                    ) : (
                      <>
                        {suggestions?.data?.length === 0 ? (
                          <EmptyHomeSearchComponent />
                        ) : (
                          <div className="flex flex-col w-full">
                            {suggestions?.data?.map((item: any) => (
                              <div className="w-full  gap-2">
                                <div
                                  className="w-full flex items-center justify-between px-4 py-5 rounded-md common-transition hover:bg-gray-200 cursor-pointer shadow-sm "
                                  key={item?.id}
                                  // onClick={() => handleClick(item)}
                                >
                                  <div className="w-full flex justify-between items-center">
                                    <div
                                      onClick={() => handleClick(item)}
                                      className="flex gap-3 items-center w-4/5"
                                    >
                                      <div>
                                        <Avatar
                                          className="h-[4.5rem] w-[4.5rem] "
                                          src=""
                                          variant="rounded"
                                        >
                                          {item?.propertyName &&
                                            item?.propertyName[0]}
                                        </Avatar>
                                      </div>
                                      <p className="text-lg font-semibold text-gray-500 flex flex-col leading-[1.40rem]">
                                        {item?.propertyName}
                                        <small className="!font-normal">
                                          {item?.locality} {item?.address}{" "}
                                          {item?.country}
                                        </small>
                                      </p>
                                    </div>
                                    <div className="flex items-center justify-end gap-2 w-1/5">
                                      <p className="text-lg">
                                        {!item?.isSaveSearch ? (
                                          <Tooltip
                                            title="Save Search"
                                            placement="top"
                                          >
                                            <div className="text-white !h-8 !w-8 flex items-center justify-center bg-gradient-to-br from-twitter to-instagram rounded-lg">
                                              <AddLocation
                                                className="!text-2xl"
                                                onClick={() =>
                                                  handleSaveSearch(item?._id)
                                                }
                                              />
                                            </div>
                                          </Tooltip>
                                        ) : (
                                          <Tooltip
                                            title="Remove Search"
                                            placement="top"
                                          >
                                            <div className="text-white !h-8 !w-8 flex items-center justify-center bg-gradient-to-br from-facebook to-youtube rounded-lg">
                                              <Delete
                                                className="!text-2xl "
                                                onClick={() =>
                                                  handleRemoveSearch(
                                                    item?.searchId
                                                  )
                                                }
                                              />
                                            </div>
                                          </Tooltip>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {suggestions?.data?.length > 10 && (
                              <div className="w-full flex justify-end items-end  px-4 py-5 font-semibold text-theme">
                                <button
                                  onClick={handelNext}
                                  className="rounded-lg px-4 py-2  w-32"
                                  disabled={suggestions?.data?.isLastChunk}
                                >
                                  + More
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginModal />
    </section>
  );
};

export default Hero;
