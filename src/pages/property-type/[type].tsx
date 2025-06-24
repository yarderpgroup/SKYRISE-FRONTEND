import { Check, Construction } from "@mui/icons-material";
import { Checkbox, Collapse } from "@mui/material";
import { CheckRight } from "assets/property";
import { InputField, PaginationButton } from "components/core";
import {
  GoogleMap,
  PropertiesComponents,
  ResponsiveFilterOption,
  ResponsiveSortOption,
  SortOptions,
} from "components/propertyTypes";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedRoute from "hooks/withProtectedRoute";
import PublicLayout from "layouts/publicLayout";
import { useRouter } from "next/router";
import { isValidElement, useState } from "react";

const PropertyType = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sort, setSort] = useState("Recommended");
  const [priceRange, setPriceRange] = useState<number[]>([0, 250000000000]);
  const [squareFeet, setSquareFeet] = useState<number[]>([0, 250000]);
  const [propertyType, setPropertyType] = useState<any>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bedrooms, setBedRooms] = useState("any");
  const [bathRoom, setBathRoom] = useState("any");
  const [areaDetails, setAreaDetails] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [furnishingStatus, setFurnishingStatus] = useState("");
  const [posted, setPosted] = useState("");

  const router = useRouter();
  const { user } = useAuth();
  let queryType: string = "";
  if (Boolean(router?.query?.type))
    queryType =
      String(router?.query?.type).toUpperCase() === "BUY" ? "SELL" : "RENT";
  const handleSavedSearch = () => {};

  let url = `leadpage/property/get-all?perPage=15&pageNo=${currentPage}&type=${queryType}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&minTotalArea=${squareFeet[0]}&maxTotalArea=${squareFeet[1]}&sort=${sort}`;
  if (Boolean(user?._id)) {
    url += `&userId=${user._id}`;
  }
  if (Boolean(propertyType)) url += `&propertyType=${propertyType}`;
  if (Boolean(bedrooms)) url += `&bedrooms=${bedrooms}`;
  if (Boolean(bathRoom)) url += `&bathRooms=${bathRoom}`;
  if (Boolean(areaDetails)) url += `&measureIn=${areaDetails}`;
  if (Boolean(posted)) url += `&postedBy=${posted}`;
  if (Boolean(amenities)) url += `&amenities=${amenities}`;
  if (Boolean(furnishingStatus)) url += `&furnishingStatus=${furnishingStatus}`;

  const {
    data,
    mutate: propertyMutate,
    isValidating: propertyValidating,
  } = useSWRAPI(url);
  const filterData = data?.data?.data?.data;

  return (
    <PublicLayout title="SKYRISE | Property Details" description="">
      <section className="w-full bg-white h-full relative py-5 md:py-8">
        <div className="flex flex-col relative w-full">
          <div className="md:flex w-full gap-5 custom-container relative">
            <div className="md:w-1/2 h-full hidden md:block bg-white sticky top-10 ">
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.0496935617966!2d85.77688741427437!3d20.25677371905984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a740ae304117%3A0x629ce9db127f69ef!2sSearchingYard%20Software%20Private%20Limited!5e0!3m2!1sen!2sin!4v1672819132294!5m2!1sen!2sin"
                width="100%"
                height="100%"
                loading="lazy"
                style={{ borderRadius: "6px", overflow: "hidden" }}
              ></iframe> */}

              {/*  map gose here */}

              <div className="w-full h-full">
                <GoogleMap
                  filterData={filterData}
                  isValidating={propertyValidating}
                />
              </div>

              {/*end of google  map here */}
            </div>
            <div className="flex w-full md:w-[55%] flex-col gap-5">
              <div className="w-full hidden md:block">
                <SortOptions
                  result={data?.data?.data?.totalCount}
                  filterData={filterData}
                  setSort={setSort}
                  propertyMutate={propertyMutate}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  setPropertyType={setPropertyType}
                  setBedRooms={setBedRooms}
                  bedrooms={bedrooms}
                  setBathRoom={setBathRoom}
                  setSquareFeet={setSquareFeet}
                  squareFeet={squareFeet}
                  propertyType={propertyType}
                  bathRoom={bathRoom}
                  setAreaDetails={setAreaDetails}
                  areaDetails={areaDetails}
                  setPosted={setPosted}
                  posted={posted}
                  setAmenities={setAmenities}
                  amenities={amenities}
                  setFurnishingStatus={setFurnishingStatus}
                  furnishingStatus={furnishingStatus}
                />
              </div>
              <div className="w-full">
                <PropertiesComponents
                  filterData={filterData}
                  propertyMutate={propertyMutate}
                  propertyValidating={propertyValidating}
                />
              </div>

              <div>
                {data?.data?.data?.totalCount >= 10 && (
                  <PaginationButton
                    setCurrentPage={setCurrentPage}
                    previousDisable={data?.data?.data?.pageNo === 1}
                    isLastChunk={data?.data?.data?.isLastChunk}
                    currentPage={currentPage}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="md:hidden flex w-full justify-between mt-6 bg-white sticky h-full bottom-0">
            <div className="w-1/2  flex items-center">
              <ResponsiveFilterOption
                propertyMutate={propertyMutate}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                setPropertyType={setPropertyType}
                setBedRooms={setBedRooms}
                bedrooms={bedrooms}
                setBathRoom={setBathRoom}
                setSquareFeet={setSquareFeet}
                squareFeet={squareFeet}
                propertyType={propertyType}
                bathRoom={bathRoom}
                setAreaDetails={setAreaDetails}
                areaDetails={areaDetails}
                setPosted={setPosted}
                posted={posted}
                setAmenities={setAmenities}
                amenities={amenities}
                setFurnishingStatus={setFurnishingStatus}
                furnishingStatus={furnishingStatus}
              />
            </div>
            <div className="w-1/2 flex items-center">
              <ResponsiveSortOption sort={sort} setSort={setSort} />
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default withProtectedRoute(PropertyType);
