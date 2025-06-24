import {
  Add,
  Agriculture,
  AltRoute,
  Apartment,
  CorporateFare,
  Factory,
  HomeWork,
  House,
  LocalHospital,
  LocationCity,
  MapsHomeWork,
  Nature,
  Storage,
} from "@mui/icons-material";
import { useState } from "react";

const PropertyTypeArr = [
  {
    id: 1,
    title: "Plot/Land",
    value: "Plot/Land",
    icon: <Nature className="!text-2xl md:!text-3xl" />,
  },
  {
    id: 2,
    title: "Flat Apartment",
    value: "Flat Apartment",
    icon: <Apartment className="!text-2xl md:!text-3xl" />,
  },
  {
    id: 3,
    title: "1 RK Studio Apartment/villa",
    value: "1 Rk Apartment",
    icon: <House className="!text-2xl md:!text-3xl" />,
  },
  {
    id: 4,
    title: "Farmhouse",
    icon: <Agriculture className="!text-2xl md:!text-3xl" />,
    value: "Farmhouse",
  },
  {
    id: 5,
    title: "Builder Floor",
    icon: <CorporateFare className="!text-2xl md:!text-3xl" />,
    value: "Builder Floor",
  },
  {
    id: 6,
    title: "Office",
    icon: <MapsHomeWork className="!text-2xl md:!text-3xl" />,
    value: "Office",
  },
  {
    id: 7,
    title: "Retail",
    icon: <CorporateFare className="!text-2xl md:!text-3xl" />,
    value: "Retail",
  },

  {
    id: 11,
    title: "Storage",
    icon: <Storage className="!text-2xl md:!text-3xl" />,
    value: "Storage",
  },
  {
    id: 12,
    title: "Industry",
    value: "Industry",
    icon: <Factory className="!text-2xl md:!text-3xl" />,
  },
  {
    id: 13,
    title: "Hospitality",
    icon: <LocalHospital className="!text-2xl md:!text-3xl" />,
    value: "Hospitality",
  },
  {
    id: 14,
    title: "Others",
    icon: <AltRoute className="!text-2xl md:!text-3xl" />,
    value: "others",
  },
];
const PropertyType = ({ setPropertyType, propertyType }: any) => {
  const handleChose = (Data: any) => {
    if (Data === "Others") return setPropertyType("");
    setPropertyType(String(Data).toLowerCase());
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col">
        <p className="text-xl font-semibold">Property Type</p>
        <div className="w-full grid grid-cols-12 pt-5 gap-3">
          {PropertyTypeArr.map((item) => (
            <div
              onClick={() => handleChose(item?.title)}
              key={item.id}
              className={`md:col-span-3 col-span-4`}
            >
              <div
                className={`flex text-sm md:text-base text-center items-center gap-1 border border-primaryBorder/60 h-20 cursor-pointer hover:bg-themeGray/20 common-transition justify-center rounded-md flex-col w-full ${
                  propertyType === item?.title?.toLowerCase()
                    ? "bg-themeGray/20"
                    : ""
                }`}
              >
                <p>{item.icon}</p>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyType;
