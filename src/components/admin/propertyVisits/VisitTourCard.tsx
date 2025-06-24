import { AccessTime } from "@mui/icons-material";
import { useState } from "react";
import VisitorView from "./VisitorView";
import VisitPlatform from "./VisitPlatform";
// import TourPropertyCard from "./TourPropertyCard";

interface Props {
  curElm: {
    id: string;
    day: string;
    month: string;
    propertyName: string;
    location: string;
    startTime: string;
    endTime: string;
    status: string;
    time: string;
    mode: string;
  };
}
const TourCard = ({ curElm }: Props) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [openVisit, setOpenVisit] = useState(false);
  const [openView, setOpenView] = useState(false);

  return (
    <div>
      <VisitPlatform open={openVisit} onClose={() => setOpenVisit(false)} />
      <VisitorView open={openView} onClose={() => setOpenView(false)} />

      <section className="w-full flex flex-col">
        <div
          key={curElm.id}
          className="w-full h-[4.5rem] md:h-28   common-transition !shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex justify-between rounded-lg gap-0 md:gap-5"
        >
          <div className="md:w-36 w-24 bg-themeDarkGray common-transition   h-full flex items-center justify-center md:gap-2 flex-col text-white">
            <p className="text-sm md:text-base">{curElm.month}</p>
            <p className="text-2xl md:text-5xl font-semibold leading-6 md:leading-7">
              {curElm.day}
            </p>
            <p className=" text-xs text-white md:text-sm  common-transition">
              {curElm.time}
            </p>
          </div>

          <div className="w-full md:px-5 grid grid-cols-12 h-full px-2">
            <div className="flex flex-col col-span-9 md:col-span-5 justify-center">
              <p className="md:text-2xl text-base font-semibold">
                {curElm.propertyName}
              </p>
              <p className="text-sm">{curElm.location}</p>
            </div>

            <div className="col-span-2 hidden md:flex justify-center items-center gap-1">
              <AccessTime /> {curElm.startTime}
            </div>
            <div className="col-span-2 hidden md:flex justify-center items-center gap-1">
              <AccessTime /> {curElm.endTime}
            </div>
            <div className="col-span-2 hidden md:flex justify-center items-center gap-4">
              {/* <AccessTime /> {curElm.mode} */}
              <button onClick={() => setOpenVisit(true)} className="btn-one">
                {" "}
                {curElm.mode}
              </button>
              <button onClick={() => setOpenView(true)} className="btn-two">
                Visitors
              </button>
            </div>

            {/* <div className="flex items-center col-span-4 justify-end">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className={`w-32 group-hover:bg-theme group-hover:border-theme group-hover:text-white common-transition md:py-2 rounded-md border-themeDarkGray border text-sm md:text-base py-1.5 ${
                isDetailsOpen ? "!border-theme text-white bg-theme" : ""
              }`}
            >
              {isDetailsOpen ? "Close" : "Details"}
            </button>
          </div> */}
          </div>
        </div>
        {/* <TourPropertyCard isDetailsOpen={isDetailsOpen} /> */}
      </section>
    </div>
  );
};

export default TourCard;
