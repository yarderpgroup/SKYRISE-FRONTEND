import { AccessTime, Approval } from "@mui/icons-material";
import dayjs from "dayjs";
import { useState } from "react";
import TourPropertyCard from "./TourPropertyCard";

interface Props {
  curElm: {
    id: string;
    bookedDate: string;
    duration: number;
    endTime: string;
    mode: string;
    property: {
      id: string;
      address: string;
      balconies: number;
      bathrooms: number;
      bedrooms: number;
      city: string;
      country: string;
      locality: string;
      measureIn: string;
      propertyDescription: string;
      propertyHeroImage: string;
      propertyName: string;
      totalArea: number;
    };
    startTime: string;
    status: string;
    isValidating: boolean;
    mutate: any;
  };
}
const TourCard = ({ curElm }: Props) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <section className="w-full flex flex-col">
      <div
        key={curElm?.id}
        className={`w-full h-[4.5rem] md:h-28 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white rounded-md overflow-hidden group common-transition md:hover:shadow-2xl shadow-blue-500/20 flex justify-between gap-0 md:gap-5 ${
          isDetailsOpen ? "!shadow-2xl shadow-blue-500/20" : ""
        }`}
      >
        <div
          className={`md:w-36 w-24 bg-themeGray/10 common-transition group-hover:bg-themeDarkGray  h-full flex items-center justify-center md:gap-2 flex-col group-hover:text-white ${
            isDetailsOpen ? "bg-themeDarkGray text-white" : ""
          }`}
        >
          <p className="text-xl  md:text-base font-semibold leading-6 md:leading-7">
            {" "}
            {dayjs(curElm?.bookedDate).format("ddd")}
          </p>
          <p className="text-xl md:text-5xl font-semibold leading-6 md:leading-7">
            {dayjs(curElm?.bookedDate).format("DD")}
          </p>
          <p className="text-xl md:text-base font-semibold leading-6 md:leading-7">
            {dayjs(curElm?.bookedDate).format("MMM")}
          </p>
          {/* <p
            className={`group-hover:!opacity-100 text-xs group-hover:text-white md:text-sm opacity-0 common-transition ${
              isDetailsOpen ? "opacity-100" : ""
            }`}
          >
            {dayjs(
              new Date(Number(new Date(curElm?.startTime).setMinutes(0)))
            ).format("hh mm A")}
          </p> */}
        </div>
        <div className="w-full md:px-5 grid grid-cols-12 h-full px-2">
          <div className="flex flex-col col-span-9 md:col-span-5 justify-center">
            <p className="md:text-2xl text-base font-semibold">
              {curElm?.property?.propertyName}
            </p>
            <p className="text-sm">{curElm?.property?.address}</p>
          </div>
          <div className="col-span-2 hidden md:flex justify-center items-center gap-1">
            <AccessTime />{" "}
            {dayjs(
              new Date(Number(new Date(curElm?.startTime).setMinutes(0)))
            ).format("hh mm A")}
          </div>
          <p className="col-span-2 hidden md:flex justify-center items-center gap-1">
            <Approval className="" /> {curElm.status}
          </p>
          <div className="flex items-center col-span-3 justify-end">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className={`w-32 group-hover:bg-theme group-hover:border-theme group-hover:text-white common-transition md:py-2 rounded-md border-themeDarkGray border text-sm md:text-base py-1.5 ${
                isDetailsOpen ? "!border-theme text-white bg-theme" : ""
              }`}
            >
              {isDetailsOpen ? "Close" : "Details"}
            </button>
          </div>
        </div>
      </div>
      <TourPropertyCard isDetailsOpen={isDetailsOpen} curElm={curElm} />
      {/* add pagination */}
    </section>
  );
};

export default TourCard;
