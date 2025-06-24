import {
  Close,
  Favorite,
  FavoriteBorder,
  Search,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  CircularProgress,
  Collapse,
  Skeleton,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";
import CircularProgressBar from "components/common/CircularProgressBar";
import CustomDialog from "components/core/CustomDialog";
import { User_Data } from "components/propertyDetails/UserQuery";
import { Amenities } from "components/rent";
import FeesPolicies from "components/rent/FeesPolicies";
import {
  NavbarSkeleton,
  PropertyDetailsSkeleton,
} from "components/skeleton/property";
import { PhotoSkeleton } from "components/skeleton/propertyDetails";
import useSWRAPI from "hooks/useSWRAPI";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  AdditionalCardSection,
  BookTour,
  ClimateRisk,
  ImageComponent,
  MarketInsight,
  PropertyCalculator,
  PropertyDetailsCard,
  PropertyHistory,
  RentForm,
  SaleAndTaxHistory,
  SchoolCarts,
  UserQuery,
} from "../../../components";
import PropertyService from "../../../components/propertyDetails/PropertyService";
import {
  CloseProperty,
  SimilarProperty,
} from "../../../components/recommendedProperty";
import {
  AdditionalCardResponsive,
  BookTourResponsive,
  ClimateRiskResponsive,
  MarketInsightResponsive,
  PropertyDetailsCardResponsive,
  PropertyDetailsResponsive,
  ResponsiveCalculator,
  ResponsiveImageSlider,
  SaleHistoryResponsive,
  SchoolCartResponsive,
} from "../../../components/responsivePropertyDetails";
import { useIsMounted } from "../../../hooks";
import PublicLayout from "../../../layouts/publicLayout";
import EmptyData from "components/common/Empty";
import EmptyProperty from "components/propertyDetails/EmptyProperty";
import { post } from "api";
import useAppContext from "contexts/AppContextProvider";
import useAuth from "hooks/useAuth";
import LoginModal from "components/common/LoginModal";

const Details_Type_Arr = [
  {
    id: "1",
    title: "Home",
    link: "#home",
  },
  {
    id: "2",
    title: "Overview",
    link: "#overview",
  },
  {
    id: "3",
    title: "Property Details",
    link: "#propertyDetails",
  },
  // {
  //   id: "4",
  //   title: "Sale & Tax History",
  //   link: "#sale",
  // },
  // {
  //   id: "5",
  //   title: "Schools",
  //   link: "#school",
  // },
];

const PropertyDetails = () => {
  const [activeNav, setActiveNav] = useState("");
  const [askQuestion, setAskQuestion] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const [activeData, setActiveData] = useState<any>();
  const isMounted = useIsMounted();
  const [isAskQuestion, setIsAskQuestion] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const propertyID = router?.query?.propertyDetails;
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteReal, setIsFavoriteReal] = useState(false);

  const { setShowLoginModal } = useAppContext();
  const { user } = useAuth();
  const handlePush = () => {
    if (!user?._id) return setShowLoginModal(true);
    router.push(`/account/offers/${propertyID}`);
  };
  let url = `leadpage/property-info/${propertyID}`;
  if (Boolean(user?._id)) url += `?userId=${user?._id}`;
  const { data, error, mutate, isValidating } = useSWRAPI(url);
  const [isFavorite, setIsFavorite] = useState<any>(
    data?.data?.data?.isFavorite
  );
  const propertyDetailsData = data?.data?.data;
  console.log("propertyDetailsData", propertyDetailsData);
  const handleFavorite = async () => {
    if (!user?._id) {
      setShowLoginModal(true);
      return;
    }
    setIsLoading(true);
    try {
      const response = await post({
        isAlert: true,
        path: "leadpage/favorite/add-remove",
        body: JSON.stringify({
          propertyId: propertyID,
          isFavorite: isFavorite ? false : true,
        }),
      });
      setIsLoading(false);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAskOpen = () => setIsAskQuestion(true);
  const Edit_Icons = [
    {
      id: "1",
      title: <Close />,
      path: "",
    },
    // {
    //   id: "3",
    //   title: <Share />,
    //   path: "",
    // },
    // {
    //   id: "4",
    //   title: <Close />,
    //   path: "/",
    // },
  ];
  return (
    <PublicLayout title="property Details">
      <>
        {isValidating ? (
          <div className="w-full h-full flex flex-col gap-2">
            <NavbarSkeleton />
            <PropertyDetailsSkeleton />
          </div>
        ) : (
          <>
            {!Boolean(propertyDetailsData) ? (
              <EmptyProperty />
            ) : (
              <section className="w-full bg-white md:py-10 h-full custom-container">
                <CustomDialog
                  open={isAskQuestion}
                  onClose={() => setIsAskQuestion(false)}
                  maxWidth="sm"
                >
                  <div className="w-full flex flex-col px-5 py-8 gap-5">
                    <div className="w-full flex items-center justify-between">
                      <p className="text-lg font-semibold text-themeDarkGray">
                        Ask SKYRISE {propertyDetailsData?.owner?.role}{" "}
                        {propertyDetailsData?.owner?.firstName} a Question
                      </p>
                      <div
                        className="cursor-pointer"
                        onClick={() => setIsAskQuestion(false)}
                      >
                        <Close />
                      </div>
                    </div>

                    <div className="w-full flex flex-col gap-2 text-center">
                      {/* {propertyDetailsData?.map((item: any) => ( */}
                      <div className="flex gap-3 flex-col items-center">
                        <Avatar
                          sx={{ width: "5rem", height: "5rem" }}
                          src={propertyDetailsData?.owner?.photoUrl}
                        >
                          {propertyDetailsData?.owner?.firstName &&
                            propertyDetailsData?.owner?.firstName[0]}
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-xl font-semibold text-themeDarkGray"></p>
                          <div className="text-sm text-themeDarkGray flex flex-col">
                            <p>{propertyDetailsData?.owner?.role}</p>
                          </div>
                        </div>
                      </div>
                      {/* ))} */}
                    </div>
                    <div>
                      <TextField
                        placeholder="message..."
                        variant="outlined"
                        fullWidth
                        rows={3}
                        onChange={(e) => setAskQuestion(e.target.value)}
                        multiline={true}
                        margin="none"
                      />
                      {isVisible && (
                        <p className="text-sm text-theme">
                          {askQuestion.length <= 0 ? "required" : ""}
                        </p>
                      )}
                    </div>
                    <div className="flex w-full">
                      <button
                        disabled={askQuestion.length <= 0}
                        onClick={() => setIsVisible(true)}
                        className="gradientButton w-44 py-2 text-white rounded-md"
                      >
                        Ask a question
                      </button>
                    </div>
                  </div>
                </CustomDialog>
                <div className="flex flex-col gap-4 md:gap-8 relative w-full">
                  <div className="w-full h-fit fixed flex justify-between md:hidden z-[900] bg-white border-t border-primaryBorder bottom-0 left-0 items-center px-4 py-3">
                    <div className="flex flex-col text-themeDarkGray">
                      <p className="text-sm">Next available Tour:</p>
                      <p className="text-xs">Today at 11:00 AM</p>
                    </div>
                    <div>
                      <Link href={`/property/schedule`}>
                        <button className="gradientButton rounded-md py-2 px-4 !text-white">
                          Schedule Tour
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="title-styling md:flex hidden w-fit text-themeDarkGray">
                      {activeData?.type} Property
                    </p>

                    <div className="w-[26rem] md:block hidden">
                      <Collapse in={isSearchOpen} timeout="auto" unmountOnExit>
                        <div className="flex items-center w-full justify-center">
                          <input
                            type="search"
                            className="w-full px-4 py-1.5 text-base font-normal text-gray-700 bg-white border border-primaryBorder rounded transition ease-in-out focus:outline-none focus:shadow-outline-black active:text-gray-800"
                            placeholder="search..."
                          />
                        </div>
                      </Collapse>
                    </div>
                  </div>
                  <div className="md:flex hidden gap-3 justify-between items-center w-full">
                    <div className="flex gap-3 items-center">
                      {Details_Type_Arr?.map((item) => (
                        <a href={item?.link} key={item?.id}>
                          <div
                            onClick={() => setActiveNav(item.link)}
                            className={`${
                              item.link === activeNav
                                ? "bg-theme text-white"
                                : "bg-theme/10 text-themeDarkGray"
                            } w-fit border  px-3 py-1.5 cursor-pointer rounded-md border-themeDarkGray text-sm`}
                          >
                            {item?.title}
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="flex gap-4 md:w-1/3 relative justify-end">
                      {Edit_Icons?.map((item) => (
                        <div
                          // onClick={() => handleOpen(item?.id)}
                          key={item?.id}
                          className="flex w-8 h-8 border border-themeDarkGray items-center justify-center text-themeDarkGray cursor-pointer rounded-md bg-theme/10"
                        >
                          {/* {item.title} */}
                          {item?.id === "4" ? (
                            <Link href={item?.path}>{item?.title}</Link>
                          ) : (
                            item?.title
                          )}
                          {/* open a custom dialog if item.id === "3" */}
                        </div>
                      ))}

                      <div className="flex w-8 h-8 border border-themeDarkGray items-center justify-center text-themeDarkGray cursor-pointer rounded-md bg-theme/10">
                        {isLoading ? (
                          <div className="p-2">
                            <CircularProgress
                              size={20}
                              className="text-theme"
                            />
                          </div>
                        ) : (
                          <Checkbox
                            onClick={handleFavorite}
                            icon={
                              <FavoriteBorder className="!text-xl md:!text-2xl" />
                            }
                            checkedIcon={
                              <Favorite className="!text-xl md:!text-2xl" />
                            }
                            sx={{
                              color: "",
                              "&.Mui-checked": {
                                color: red[600],
                              },
                              bgcolor: "transparent",
                            }}
                            checked={Boolean(isFavorite) && isFavorite}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* for all type of property */}
                  <div className="w-full hidden md:flex">
                    <ImageComponent
                      propertyID={propertyID}
                      activeData={activeData}
                      photos={propertyDetailsData?.photos}
                      videos={propertyDetailsData?.videos}
                      heroImage={propertyDetailsData?.propertyHeroImage}
                      latitude={propertyDetailsData?.latitude}
                      longitude={propertyDetailsData?.longitude}
                    />
                  </div>
                  <div className="flex md:hidden w-full">
                    <ResponsiveImageSlider
                      activeData={activeData}
                      photos={propertyDetailsData?.photos}
                      videos={propertyDetailsData?.videos}
                    />
                  </div>
                  {/*end of all type of property */}

                  <div className="w-full flex items-center justify-center">
                    <div className="flex w-full flex-col md:flex-row md:w-11/12 relative md:gap-5">
                      <div className="md:w-[65%] w-full flex flex-col md:gap-6">
                        {/* for all type of property */}
                        <div className="md:flex w-full hidden">
                          {isValidating ? (
                            <Skeleton />
                          ) : (
                            <PropertyDetailsCard
                              propertyName={propertyDetailsData?.propertyName}
                              propertyDescription={
                                propertyDetailsData?.propertyDescription
                              }
                              pricingDetails={
                                propertyDetailsData?.pricingDetails
                              }
                              estimatePrice={propertyDetailsData?.estimatePrice}
                              address={propertyDetailsData?.address}
                              totalFloors={propertyDetailsData?.totalFloors}
                              totalRooms={propertyDetailsData?.totalRooms}
                              totalArea={propertyDetailsData?.totalArea}
                              propertyPrice={propertyDetailsData?.propertyPrice}
                              owner={propertyDetailsData?.owner}
                              createdAt={propertyDetailsData?.createdAt}
                              updatedAt={propertyDetailsData?.updatedAt}
                              homeAndPriceFacts={
                                propertyDetailsData?.homeAndPriceFacts
                              }
                              averageHomePrice={
                                propertyDetailsData?.averageHomePrice
                              }
                              mapLocation={propertyDetailsData?.mapLocation}
                              latitude={propertyDetailsData?.latitude}
                              longitude={propertyDetailsData?.longitude}
                            />
                          )}
                        </div>
                        <div className="md:hidden w-full flex">
                          <PropertyDetailsCardResponsive
                            propertyName={propertyDetailsData?.propertyName}
                            propertyDescription={
                              propertyDetailsData?.propertyDescription
                            }
                            pricingDetails={propertyDetailsData?.pricingDetails}
                            estimatePrice={propertyDetailsData?.estimatePrice}
                            address={propertyDetailsData?.address}
                            totalFloors={propertyDetailsData?.totalFloors}
                            totalRooms={propertyDetailsData?.totalRooms}
                            totalArea={propertyDetailsData?.totalArea}
                            propertyPrice={propertyDetailsData?.propertyPrice}
                            owner={propertyDetailsData?.owner}
                            createdAt={propertyDetailsData?.createdAt}
                            updatedAt={propertyDetailsData?.updatedAt}
                            homeAndPriceFacts={
                              propertyDetailsData?.homeAndPriceFacts
                            }
                            averageHomePrice={
                              propertyDetailsData?.averageHomePrice
                            }
                            mapLocation={propertyDetailsData?.mapLocation}
                          />
                        </div>
                        {/*end of all type of property */}

                        {(propertyDetailsData?.type === "BUY" ||
                          propertyDetailsData?.type === "SELL") && (
                          <>
                            {/* for only BUY type of property */}
                            <div className="w-full md:flex hidden">
                              {/* <PropertyCalculator /> */}
                            </div>
                            <div className="w-full md:hidden flex">
                              {/* <ResponsiveCalculator /> */}
                            </div>
                            {/*end of only BUY type of property */}
                          </>
                        )}

                        {/* for all type of property */}

                        {(propertyDetailsData?.type === "BUY" ||
                          propertyDetailsData?.type === "SELL") && (
                          <div className="block md:hidden">
                            <BookTourResponsive />
                          </div>
                        )}

                        {/* for rent type of property */}
                        {propertyDetailsData?.type === "Rent" && (
                          <div className="flex w-full h-fit overflow-scroll flex-col gap-8">
                            <RentForm propertyId={propertyDetailsData?._id} />
                          </div>
                        )}

                        {(propertyDetailsData?.type === "BUY" ||
                          propertyDetailsData?.type === "SELL") && (
                          <>
                            {/* for only BUY type of property */}
                            <div className="w-full hidden md:flex">
                              {isValidating ? (
                                <Skeleton />
                              ) : (
                                <PropertyService
                                  parking={propertyDetailsData?.parking}
                                  additionalDetails={
                                    propertyDetailsData?.additionalDetails
                                  }
                                  utilities={propertyDetailsData?.utilities}
                                  address={propertyDetailsData?.address}
                                  city={propertyDetailsData?.city}
                                  country={propertyDetailsData?.country}
                                />
                              )}
                            </div>
                            <div className="flex md:hidden w-full">
                              <PropertyDetailsResponsive
                                parking={propertyDetailsData?.parking}
                                additionalDetails={
                                  propertyDetailsData?.additionalDetails
                                }
                                utilities={propertyDetailsData?.utilities}
                                address={propertyDetailsData?.address}
                                city={propertyDetailsData?.city}
                                country={propertyDetailsData?.country}
                              />
                            </div>
                            {/* <div className="md:flex hidden w-full">
                      <SaleAndTaxHistory activeData={activeData} />
                    </div> */}
                            <div className="w-full flex md:hidden">
                              {/* <SaleHistoryResponsive activeData={activeData} /> */}
                            </div>
                            {/*end of for only BUY type of property   */}
                          </>
                        )}

                        {propertyDetailsData?.type === "Rent" && (
                          <div className="w-full flex flex-col gap-0 md:gap-5">
                            <FeesPolicies />
                            <Amenities />
                          </div>
                        )}
                        {/* for all type of property */}
                        {/* <div className="w-full md:flex hidden">
                  <SchoolCarts />
                </div> */}
                        {/* <div className="w-full md:hidden flex">
                  <SchoolCartResponsive />
                </div> */}
                        {/*end of for all type of property */}

                        {/* only BUY type of property */}
                        {(propertyDetailsData?.type === "BUY" ||
                          propertyDetailsData?.type === "SELL") && (
                          <>
                            {/* only BUY type property */}
                            {/* <div className="md:flex hidden w-full">
                      <ClimateRisk />
                    </div> */}
                            <div className="w-full md:hidden flex">
                              {/* <ClimateRiskResponsive /> */}
                            </div>
                            {/* end of BUY type of property */}
                            <div className="w-full hidden">
                              {/* <AdditionalCardSection /> */}
                            </div>
                            <div className="w-full md:hidden">
                              {/* <AdditionalCardResponsive /> */}
                            </div>
                            {/* <div className="hidden md:block w-full">
                      <PropertyHistory />
                    </div> */}
                            {/* <div className="hidden md:flex w-full">
                      <MarketInsight />
                    </div> */}
                            <div className="flex md:hidden w-full">
                              {/* <MarketInsightResponsive /> */}
                            </div>
                          </>
                        )}

                        {/* end of only BUY type property */}
                      </div>

                      {/* for all type of property */}
                      <div className="md:w-[35%] !order-1 md:order-2 w-full !z-0 sticky h-[100vh] top-6 pb-8 scrollBarNone overflow-scroll md:block hidden">
                        {propertyDetailsData?.type === "BUY" ||
                        propertyDetailsData?.type === "SELL" ? (
                          <div className="flex w-full h-fit overflow-scroll flex-col gap-8">
                            <BookTour />
                            <div className="flex flex-col gap-8">
                              <div className="flex items-center justify-center pt- gap-2">
                                <div className="w-1/3 bg-themeGray h-[2px]"></div>
                                <div className="w-fit text-xl font-semibold text-themeDarkGray">
                                  OR
                                </div>
                                <div className="w-1/3 bg-themeGray h-[2px]"></div>
                              </div>

                              <div
                                onClick={handlePush}
                                className="py-2 w-full text-center cursor-pointer text-themeDarkGray rounded-lg border border-themeGray bg-primaryBorder/30"
                              >
                                Start an Offer
                              </div>
                              <LoginModal />
                            </div>
                            {isValidating ? (
                              <Skeleton />
                            ) : (
                              <UserQuery
                                firstName={
                                  propertyDetailsData?.owner?.firstName
                                }
                                lastName={propertyDetailsData?.owner?.lastName}
                                email={propertyDetailsData?.owner?.email}
                                phoneNumber={
                                  propertyDetailsData?.owner?.phoneNumber
                                }
                                photoUrl={propertyDetailsData?.owner?.photoUrl}
                                role={propertyDetailsData?.owner?.role}
                                city={propertyDetailsData?.city}
                                countryPhone={
                                  propertyDetailsData?.owner?.countryPhone
                                }
                              />
                            )}
                          </div>
                        ) : (
                          <div className="flex w-full h-fit overflow-scroll flex-col gap-8">
                            <RentForm propertyId={propertyDetailsData?._id} />
                          </div>
                        )}
                      </div>
                      {/* end of all type of property */}
                    </div>
                  </div>

                  {/* for all type of property */}
                  <div className="flex flex-col w-full">
                    <CloseProperty
                      propertyId={propertyDetailsData?._id}
                      type={propertyDetailsData?.type}
                    />
                    <SimilarProperty
                      propertyId={propertyDetailsData?._id}
                      type={propertyDetailsData?.type}
                    />
                  </div>
                  {/* end of all type of property */}
                </div>
              </section>
            )}
          </>
        )}
      </>
    </PublicLayout>
  );
};

export default PropertyDetails;
