import {
  PriceRange,
  PropertyType,
  RoomCount,
  ConstructionStatus,
  AreaFilter,
  Localities,
  PurchaseType,
  Amenities,
  Furnishing,
} from "components/filterComponents";
import { useState } from "react";
import { FilterIcon } from "assets/static";
import { CustomDrawer } from "components/core";
import { filterType } from "./FilterOptions";
import { useRouter } from "next/router";

const ResponsiveFilterOption = ({
  setSort,
  propertyMutate,
  setPriceRange,
  setSquareFeet,
  priceRange,
  setPropertyType,
  setBathRoom,
  setBedRooms,
  squareFeet,
  propertyType,
  bedrooms,
  bathRoom,
  setAreaDetails,
  areaDetails,
  setPosted,
  posted,
  setAmenities,
  amenities,
  setFurnishingStatus,
  furnishingStatus,
}: any) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  let queryType: string = "";
  if (Boolean(router?.query?.type))
    queryType =
      String(router?.query?.type).toUpperCase() === "BUY" ? "SELL" : "RENT";
  const handelSelectPropertyType = (Data: string) => {
    router.push(`/property-type/${Data}`);
  };
  const activePropertyType = router?.query?.type;

  return (
    <section className="w-full !text-themeDarkGray  bg-white">
      <div
        onClick={() => setDrawerOpen(true)}
        className="w-full flex  items-center h-12 justify-center gap-2 text-center"
      >
        <div className="w-5">
          <img src={FilterIcon.src} alt="logo" className="w-full" />
        </div>
        Filters
      </div>
      <CustomDrawer
        anchor="bottom"
        height="80vh"
        onClose={() => setDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <div className="w-full flex flex-col h-full overflow-hidden">
          <div className="w-full h-full flex flex-col !text-themeDarkGray gap-2 relative py-2">
            <div className="flex items-center justify-center">
              <div
                onClick={() => setDrawerOpen(false)}
                className="h-1 w-20 bg-themeGray/60 rounded-full"
              ></div>
            </div>
            <div className="flex w-full justify-between items-center border-b border-primaryBorder  p-5">
              <div className="text-xl font-semibold tracking-wide">Filters</div>
              <div className="text-blue-600 text-sm">Clear all</div>
            </div>

            {/* filter options */}

            <div className="flex w-full bg-white flex-col overflow-x-hidden p-5">
              <div className="w-full items-center justify-center flex pb-7 pt-2">
                <div className="w-fit flex border overflow-hidden border-primaryBorder rounded-md">
                  {filterType.map((item) => (
                    <div
                      onClick={() => handelSelectPropertyType(item.value)}
                      className={`${
                        item.value === activePropertyType
                          ? "bg-themeDarkGray text-white"
                          : ""
                      } w-fit px-6 py-1.5  cursor-pointer `}
                    >
                      <p className="w-full h-full"> {item.type}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full pb-3 flex-col">
                <PriceRange
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />
              </div>
              <div className="w-full">
                <PropertyType
                  setPropertyType={setPropertyType}
                  propertyType={propertyType}
                />
              </div>
              <div className="pt-5 w-full">
                <RoomCount
                  setBedRooms={setBedRooms}
                  setBathRoom={setBathRoom}
                  bedrooms={bedrooms}
                  bathRoom={bathRoom}
                />
              </div>
              <div className="w-full pt-7 md:pt-0">
                <ConstructionStatus setPosted={setPosted} posted={posted} />
              </div>
              <div className="w-full py-5 !z-0">
                <AreaFilter
                  setSquareFeet={setSquareFeet}
                  squareFeet={squareFeet}
                  setAreaDetails={setAreaDetails}
                  areaDetails={areaDetails}
                />
              </div>
              {/* <div className="w-full py-5">
                <Localities />
              </div> */}
              {/* <div className="w-full py-5">
                <PurchaseType />
              </div> */}
              <div className="w-full py-5">
                <Amenities setAmenities={setAmenities} amenities={amenities} />
              </div>
              <div className="w-full py-5">
                <Furnishing
                  setFurnishingStatus={setFurnishingStatus}
                  furnishingStatus={furnishingStatus}
                />
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 w-full">
            <div className="w-full flex items-center h-12 !z-[200]">
              <button className="w-1/2 h-full bg-white !z-[200] text-themeDarkGray">
                Cancel
              </button>
              <button className="w-1/2 h-full gradientButton text-white ">
                See 10 homes
              </button>
            </div>
          </div>
        </div>
      </CustomDrawer>
    </section>
  );
};

export default ResponsiveFilterOption;
