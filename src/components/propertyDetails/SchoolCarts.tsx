import { Fragment, useState } from "react";
import { SCHOOL1, SCHOOL2, SCHOOL3 } from "../../assets/property";
import {
  DirectionsRun,
  DirectionsBus,
  DirectionsBike,
  Remove,
  Star,
  StarBorder,
  KeyboardArrowUp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Place, Transit } from "../../assets/staticImages";

export const schoolCards = [
  {
    id: 11,
    image: SCHOOL1.src,
    name: "Malcolm White Elementary School",
    location: "Public, K-5 • Serves this home",
    ratings: 5,
    studentsCount: 322,
    distacne: "0.3mi",
  },
  {
    id: 12,
    image: SCHOOL2.src,
    name: "Malcolm White Elementary School",
    location: "Public, K-5 • Serves this home",
    ratings: 4,
    studentsCount: 322,
    distacne: "0.3mi",
  },
  {
    id: 13,
    image: SCHOOL3.src,
    name: "Malcolm White Elementary School",
    location: "Public, K-5 • Serves this home",
    ratings: 5,
    studentsCount: 322,
    distacne: "0.3mi",
  },
];

export const TransportationsInfo = [
  {
    id: 21,
    logo: <DirectionsRun className="text-2xl md:!text-4xl" />,
    speed: "75/100",
    travelBy: (
      <p>
        Very Walkable <br /> Walk Score®
      </p>
    ),
  },
  {
    id: 22,
    logo: <DirectionsBus className="text-2xl md:!text-4xl" />,
    speed: "75/100",
    travelBy: (
      <p>
        Some Transit <br /> Transit Score®
      </p>
    ),
  },
  {
    id: 23,
    logo: <DirectionsBike className="text-2xl md:!text-4xl" />,
    speed: "75/100",
    travelBy: (
      <p>
        Very Bikeable <br /> Bike Score®
      </p>
    ),
  },
];

export const publicFacts = [
  {
    id: 11,
    item1: "Beds",
    item2: "Lot Size",
    item3: <Remove />,
  },
  {
    id: 12,
    item1: "Baths",
    item2: "Style",
    item3: "Single Family Residential",
  },
  {
    id: 13,
    item1: "Finished Sq. Ft.",
    item2: "Year Built",
    item3: <Remove />,
  },
  {
    id: 14,
    item1: "Unfinished Sq. Ft.",
    item2: "Year Renovated",
    item3: <Remove />,
  },
  {
    id: 15,
    item1: "Total Sq. Ft.",
    item2: "County",
    item3: <Remove />,
  },
  {
    id: 16,
    item1: "Stories",
    item2: "APN",
    item3: "M:43 B:08 L:19 U:00",
  },
];
export const SchoolDropDown = [
  {
    id: "1",
    heading: "Places",
    des: "4 groceries, 42 restaurants, 2 parks",
    icon: Place.src,
  },
  {
    id: "2",
    heading: "Transit",
    des: "134, 350, 354",
    icon: Transit.src,
  },
];

const SchoolCarts = () => {
  const [activeId, setActiveId] = useState("");
  const handleActive = (ID: string) => {
    if (activeId.includes(ID)) {
      setActiveId("");
      return;
    }
    setActiveId(ID);
  };

  return (
    <div className="flex w-full flex-col text-themeDarkGray gap-4" id="school">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Schools</h1>
        <div className="flex flex-col gap-8 border border-primaryBorder p-4 ">
          <h2 className="underline">Great Schools Summary Rating</h2>
          <div className="flex flex-col gap-6">
            {schoolCards.map((info) => (
              <div className="flex justify-between" key={info.id}>
                <div className="flex gap-6">
                  <img
                    className="h-24 w-24 rounded-sm"
                    src={info.image}
                    alt="School"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">{info.name}</h2>
                    <p className="text-base">{info.location}</p>
                    <div>
                      {[...Array(5)]?.map((_, index) => (
                        <Fragment key={index}>
                          {info.ratings >= index + 1 ? (
                            <Star className="text-yellow-600 !text-3xl" />
                          ) : (
                            <Star className="!text-3xl !text-[#C7C7C7]" />
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="text-lg items-center text-center">
                  {info.studentsCount} <br></br>Students
                </h3>
                <h3 className="text-lg items-center text-center">
                  {info.distacne}
                  <br></br> Distance
                </h3>
              </div>
            ))}
          </div>
          <p className="text-base leading-6 tracking-normal">
            School data is provided by GreatSchools, a nonprofit organization.
            Redfin recommends buyers and renters use GreatSchools information
            and ratings as a first step, and conduct their own investigation to
            determine their desired schools or school districts, including by
            contacting and visiting the schools themselves.Redfin does not
            endorse or guarantee this information. School service boundaries are
            intended to be used as a reference only; they may change and are not
            guaranteed to be accurate. To verify school enrollment eligibility,
            contact the school district directly.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-2/3">
        <h1 className="text-xl font-semibold">Around This Home</h1>
        <h4 className="text-base">Transportation in 01801</h4>
        <div className="flex w-full justify-between">
          {TransportationsInfo.map((info) => (
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{info.logo}</p>
              <p className="font-semibold">{info.speed}</p>
              <p className="items-center text-base">{info.travelBy}</p>
            </div>
          ))}
        </div>
        <div>
          {SchoolDropDown?.map((item) => (
            <div key={item?.id} className="flex flex-col">
              <Accordion
                sx={{
                  boxShadow: "none !important",
                  background: "",
                  padding: "0px !important",
                }}
              >
                <AccordionSummary>
                  <div
                    onClick={() => handleActive(item?.id)}
                    className={`${
                      activeId === item?.id
                        ? " border-l-8 border-primaryBorder shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                        : "bg-white border text-themeDarkGray border-primaryBorder"
                    }  flex w-full h-24 rounded-md cursor-pointer items-center justify-between px-5 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] common-transition shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}
                  >
                    <div className="flex gap-4 items-center">
                      <img src={item.icon} alt="icon" className="w-8 h-8" />
                      <div>
                        <p className="text-lg font-semibold ">
                          {item?.heading}
                        </p>
                        <p className="text-sm">{item?.des}</p>
                      </div>
                    </div>
                    {activeId === item.id ? (
                      <p>
                        <KeyboardArrowUp className="!text-2xl text-themeDarkGray" />
                      </p>
                    ) : (
                      <p>
                        <KeyboardArrowDown className="!text-2xl text-themeDarkGray" />
                      </p>
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="mt-3 p-5 rounded-[12px] w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur tenetur unde vero sint nesciunt eos quaerat
                    obcaecati dolore et, animi repellendus quia laudantium dolor
                    ad delectus eveniet odio similique eaque.
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">
          Public Facts and Zoning for 84R Salem St
        </h1>
        <div className="flex border flex-col border-primaryBorder p-4 gap-4">
          <div className="w-full flex gap-6 flex-col">
            {publicFacts.map((info) => (
              <div className="w-full grid grid-cols-12 gap-4" key={info.id}>
                <div className="col-span-4 flex flex-col gap-3">
                  {info.item1}
                </div>
                <p className="col-span-4 flex justify-center gap-3">
                  <p className="w-3/5">
                    <Remove /> {info.item2}
                  </p>
                </p>
                <div className="col-span-4 flex items-center justify-end gap-3 ">
                  {info.item3}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm">
          Home facts updated by county records on Feb 25, 2021.
        </p>
      </div>
    </div>
  );
};

export default SchoolCarts;
