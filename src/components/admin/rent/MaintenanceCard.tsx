import { Avatar } from "@mui/material";
import { TESTIMONIALTWO } from "assets/property";
import dayjs from "dayjs";
import { useState } from "react";
// import TourPropertyCard from "./TourPropertyCard";

interface Props {
  curElm: {
    id: string;
    day: string;
    month: string;
    issueLocation: string;
    locality: string;
    address: string;
    locationType: string;
    propertyName: string;
    createdAt: string;
    status: string;
  };
}
const MaintenanceCard = ({ curElm }: Props) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <section className="w-full flex flex-col">
      <div
        key={curElm.id}
        className=" h-[4.5rem] md:h-28 bg-white common-transition !shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex justify-between gap-4 overflow-hidden rounded-xl "
      >
        <div className="w-32 bg-themeDarkGray common-transition   h-full flex items-center justify-center md:gap-2 flex-col text-white">
          <p className="text-2xl md:text-5xl font-semibold leading-6 md:leading-7">
            {dayjs(curElm?.createdAt).format("DD")}
          </p>
          <p className="text-sm md:text-base">
            {" "}
            {dayjs(curElm?.createdAt).format("MMM")}
          </p>
        </div>
        <div className=" grid grid-cols-12">
          <div className="flex gap-2 col-span-3 items-center justify-start ">
            <div>
              <h1 className="text-themeDarkGray font-bold text-base whitespace-nowrap">
                {curElm?.propertyName}
              </h1>
              <h2 className="text-themeDarkGray font-normal text-sm">
                {curElm.locality}
              </h2>
              <h2 className="text-themeDarkGray font-normal text-sm">
                {curElm?.address}
              </h2>
            </div>
          </div>
          <div className="w-full md:px-5 col-span-9 flex justify-between  items-center h-full px-2">
            <p className="md:text-xl text-base font-semibold">
              {curElm?.issueLocation}
            </p>

            <p className="">{curElm?.locationType}</p>
            <p className="">{curElm?.status}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceCard;
