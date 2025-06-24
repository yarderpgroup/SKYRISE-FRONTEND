import { Close } from "@mui/icons-material";
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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const filterType = [
  {
    id: "1",
    type: "For sale",
    value: "buy",
  },
  {
    id: "2",
    type: "For rent",
    value: "rent",
  },
];
interface Props {
  setIsFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  propertyMutate?: any;
  setPriceRange?: any;
  priceRange?: any;
  setPropertyType?: any;
  setBedRooms?: any;
  setBathRoom?: any;
  setSquareFeet?: any;
  squareFeet?: any;
  propertyType?: any;
  bedrooms?: any;
  bathRoom?: any;
  setAreaDetails?: any;
  areaDetails?: any;
  setPosted?: any;
  posted?: any;
  setAmenities?: any;
  amenities?: any;
  setFurnishingStatus?: any;
  furnishingStatus?: any;
}
const FilterOptions = ({
  setIsFilterOpen,
  propertyMutate,
  setPriceRange,
  priceRange,
  setPropertyType,
  setBedRooms,
  squareFeet,
  setBathRoom,
  setSquareFeet,
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
}: Props) => {
  const [activeFilterType, setActiveFilterType] = useState<any>("post");
  const router = useRouter();
  const handelSelectPropertyType = (Data: string) => {
    router.push(`/property-type/${Data}`);
    setIsFilterOpen(false);
  };
  const activePropertyType = router?.query?.type;

  return (
    <div className="w-full flex">
      <div className="flex w-full relative h-full flex-col bg-white rounded-lg text-themeDarkGray">
        <div className="w-full bg-white justify-end items-end flex  sticky top-0 z-[200] p-5">
          <Close
            onClick={() => setIsFilterOpen(false)}
            className="cursor-pointer text-themeDarkGray"
          />
        </div>
        <div className="flex  items-center justify-center gap-3 flex-col border-b border-themeDarkGray/20 pb-8">
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
        <div className="w-full p-8 flex-col border-b border-primaryBorder/50">
          <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />
        </div>
        <div className="p-8 w-full border-b border-primaryBorder/50">
          <PropertyType
            setPropertyType={setPropertyType}
            propertyType={propertyType}
          />
        </div>
        <div className="p-8 w-full border-b border-primaryBorder/50">
          <RoomCount
            setBedRooms={setBedRooms}
            setBathRoom={setBathRoom}
            bedrooms={bedrooms}
            bathRoom={bathRoom}
          />
        </div>
        <div className="w-full border-b border-primaryBorder/50">
          <ConstructionStatus setPosted={setPosted} posted={posted} />
        </div>
        <div className="w-full p-8 border-b border-primaryBorder/50">
          <AreaFilter
            setSquareFeet={setSquareFeet}
            squareFeet={squareFeet}
            setAreaDetails={setAreaDetails}
            areaDetails={areaDetails}
          />
        </div>

        <div className="w-full p-8 border-b border-primaryBorder">
          <Amenities setAmenities={setAmenities} amenities={amenities} />
        </div>
        <div className="w-full p-8">
          <Furnishing
            setFurnishingStatus={setFurnishingStatus}
            furnishingStatus={furnishingStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
