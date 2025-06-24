import React, { useRef } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useState } from "react";
import { Tune } from "@mui/icons-material";
import { FilterOption } from ".";
import { CustomDrawer } from "components/core";
import useSWRAPI from "hooks/useSWRAPI";

const sortBy = [
  {
    id: 2,
    name: "Newest First",
    value: "newestFirst",
  },
  {
    id: 3,
    name: "Price (Low to high)",
    value: "priceLowToHigh",
  },
  {
    id: 4,
    name: "Price (High to low)",
    value: "priceHighToLow",
  },

  {
    id: 6,
    name: "Price/Sq.ft",
    value: "pricePerSqFt",
  },
  // {
  //   id: 7,
  //   name: "Owner",
  //   value: "OWNER",
  // },
  {
    id: 87,
    name: "WithPhotos",
    value: "withPhotos",
  },
];

const SortOptions = ({
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
  filterData,
  result,
}: any) => {
  const sortRef = useRef<any>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSort = (e: string) => {
    setSort(e);
  };
  return (
    <div className="flex shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex-col text-themeDarkGray bg-white gap-6 p-5 rounded-lg">
      <div className="w-full justify-between items-center flex">
        {/* <p className="text-lg font-semibold text-slate-700"> 3043 results</p> */}
      </div>
      <div className="flex w-full justify-between items-center gap-6">
        <div className="flex w-3/4 gap-3">
          <div className="w-full flex gap-2 items-center">
            <p className="text-lg font-semibold text-slate-700">
              {" "}
              {/* 3043  */}
              {result} results
            </p>
            <div className="w-44">
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select ref={sortRef} label="Sort By">
                  {sortBy.map((item) => (
                    <MenuItem
                      value={item.value}
                      key={item.id}
                      onClick={() => handleSort(item.value)}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="w-fit flex items-center gap-3">
          <div className="w-fit">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-40 text-center gradientButton text-white px-3 py-1.5 rounded-md"
            >
              <Tune className="!text-xl" /> All filters
            </button>
          </div>
        </div>
      </div>

      <CustomDrawer
        anchor="right"
        width="45vw"
        onClose={() => setIsFilterOpen(false)}
        open={isFilterOpen}
      >
        <div className="w-full">
          <FilterOption
            setIsFilterOpen={setIsFilterOpen}
            propertyMutate={propertyMutate}
            setPriceRange={setPriceRange}
            priceRange={priceRange}
            setPropertyType={setPropertyType}
            setBedRooms={setBedRooms}
            setBathRoom={setBathRoom}
            setSquareFeet={setSquareFeet}
            squareFeet={squareFeet}
            propertyType={propertyType}
            bedrooms={bedrooms}
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
      </CustomDrawer>
    </div>
  );
};

export default SortOptions;
