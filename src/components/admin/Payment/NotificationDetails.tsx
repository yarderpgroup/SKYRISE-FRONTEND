import { Avatar } from "@mui/material";
import { TESTIMONIALTWO } from "assets/property";
import { useState } from "react";
// import TourPropertyCard from "./TourPropertyCard";

interface Props {
  curElm: {
    id: string;
    day: string;
    month: string;
    maintance: string;
    mail: string;
    address: string;
    tenants: string;
  };
}
const NotificationDetails = ({ curElm }: Props) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <section className="w-full flex flex-col">
      <div
        key={curElm.id}
        className="w-full h-[4.5rem] md:h-28   common-transition !shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex justify-between rounded-xl"
      >
        <div className="md:w-36 w-24 bg-themeDarkGray common-transition   h-full flex items-center justify-center md:gap-2 flex-col text-white">
          <p className="text-2xl md:text-5xl font-semibold leading-6 md:leading-7">
            {curElm.day}
          </p>
          <p className="text-sm md:text-base">{curElm.month}</p>
        </div>

        <div className="w-full flex justify-between h-full px-2">
          <div className="hidden md:flex  gap-1">
            <div className="flex gap-2 justify-center items-center">
              <div className="">
                <Avatar
                  sx={{
                    height: "3.5rem",
                    width: "3.5rem",
                    cursor: "pointer",
                  }}
                  src={TESTIMONIALTWO.src}
                ></Avatar>
              </div>
              <div>
                <h1 className="text-themeDarkGray font-bold text-base whitespace-nowrap">
                  {curElm.tenants}
                </h1>
                <h2 className="text-themeDarkGray font-normal text-sm">
                  {curElm.mail}
                </h2>
                <h2 className="text-themeDarkGray font-normal text-sm">
                  {curElm.address}
                </h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="md:text-xl text-base font-semibold items-center">
              {curElm.maintance}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationDetails;
