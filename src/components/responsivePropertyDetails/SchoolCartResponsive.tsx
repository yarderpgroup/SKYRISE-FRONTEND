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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
} from "@mui/material";
import { Place, Transit } from "../../assets/staticImages";
import {
  publicFacts,
  schoolCards,
  SchoolDropDown,
  TransportationsInfo,
} from "../propertyDetails/SchoolCarts";

const SchoolCartResponsive = () => {
  const [isSchool, setIsSchool] = useState(false);
  const [isAround, setIsAround] = useState(false);
  const [isZoning, setIsZoning] = useState(false);
  const [activeId, setActiveId] = useState("");
  const handleActive = (ID: string) => {
    if (activeId.includes(ID)) {
      setActiveId("");
      return;
    }
    setActiveId(ID);
  };
  return (
    <section className="w-full flex flex-col">
      {/* school part */}
      <div className="w-full text-themeDarkGray  border-b border-primaryBorder">
        <div
          className="flex justify-between w-full py-4"
          onClick={() => setIsSchool(!isSchool)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Schools</p>
            <p className="text-sm">Near by school</p>
          </div>
          <div className="flex items-center common-transition">
            {!isSchool ? (
              <KeyboardArrowDown className="!text-4xl" />
            ) : (
              <KeyboardArrowUp className="!text-4xl" />
            )}
          </div>
        </div>
        <Collapse in={isSchool} timeout="auto" unmountOnExit>
          <div className="flex w-full flex-col text-themeDarkGray gap-5 py-5">
            <div className="flex flex-col gap-4">
              <h2 className="">
                <b>Showing nearby schools.</b> Please check the school district
                website to see all schools serving this home.
              </h2>
              <div className="flex flex-col gap-2 w-full">
                {schoolCards.map((info) => (
                  <div
                    className="flex justify-between h-fit py-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-l px-2"
                    key={info.id}
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        className="h-20 w-20 rounded-sm"
                        src={info.image}
                        alt="School"
                      />
                      <div className="flex flex-col">
                        <h2 className="text-sm font-semibold">{info.name}</h2>
                        <p className="text-sm flex items-center gap-1">
                          {info.location}
                          <span className="">{info.distacne}</span>
                        </p>
                        <div>
                          {[...Array(5)]?.map((_, index) => (
                            <Fragment key={index}>
                              {info.ratings >= index + 1 ? (
                                <Star className="text-yellow-600 !text-xl" />
                              ) : (
                                <Star className="!text-xl !text-[#C7C7C7]" />
                              )}
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-5 tracking-normal">
                School data is provided by GreatSchools, a nonprofit
                organization. Redfin recommends buyers and renters use
                GreatSchools information and ratings as a first step, and
                conduct their own investigation to determine their desired
                schools or school districts, including by contacting and
                visiting the schools themselves. <br />
                <br />
                Redfin does not endorse or guarantee this information. School
                service boundaries are intended to be used as a reference only;
                they may change and are not guaranteed to be accurate. To verify
                school enrollment eligibility, contact the school district
                directly.
              </p>
            </div>
          </div>
        </Collapse>
      </div>
      {/* around this home */}
      <div className="flex text-themeDarkGray flex-col  border-b border-primaryBorder">
        <div
          className="flex justify-between w-full py-4"
          onClick={() => setIsAround(!isAround)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Around This Home</p>
            <p className="text-sm">Near by school</p>
          </div>
          <div className="flex items-center common-transition">
            {!isAround ? (
              <KeyboardArrowDown className="!text-4xl" />
            ) : (
              <KeyboardArrowUp className="!text-4xl" />
            )}
          </div>
        </div>
        <Collapse in={isAround} timeout="auto" unmountOnExit>
          <div className="flex flex-col gap-2 w-full py-5">
            <div className="flex w-full flex-col gap-5">
              {TransportationsInfo.map((info) => (
                <div className="flex w-full justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{info.logo}</p>
                    <p className="font-semibold">{info.speed}</p>
                  </div>
                  <div className="flex items-center justify-end">
                    <p className="items-center text-right text-sm">
                      {info.travelBy}
                    </p>
                  </div>
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
                      // height: "10px !important",
                    }}
                  >
                    <AccordionSummary>
                      <div
                        onClick={() => handleActive(item?.id)}
                        className={`${
                          activeId === item?.id
                            ? " border-l-8 border-primaryBorder shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                            : "bg-white border text-themeDarkGray border-primaryBorder"
                        }  flex w-full h-20 rounded-md cursor-pointer items-center justify-between px-5 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] common-transition shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}
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
                        obcaecati dolore et, animi repellendus quia laudantium
                        dolor ad delectus eveniet odio similique eaque.
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
      {/* facts and zoning */}
      <div className="w-full text-themeDarkGray border-b border-primaryBorder">
        <div
          className="flex justify-between w-full py-4"
          onClick={() => setIsZoning(!isZoning)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Public Facts and Zoning</p>
            <p className="text-sm">
              Home Details and zoning from local records
            </p>
          </div>
          <div className="flex items-center common-transition">
            {!isZoning ? (
              <KeyboardArrowDown className="!text-4xl" />
            ) : (
              <KeyboardArrowUp className="!text-4xl" />
            )}
          </div>
        </div>
        <Collapse in={isZoning} timeout="auto" unmountOnExit>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="w-full flex gap-6 flex-col">
                {publicFacts.map((info) => (
                  <div className="w-full flex justify-between" key={info.id}>
                    <div className="flex flex-col gap-3">{info.item1}</div>

                    <div className="flex items-center justify-end gap-3 ">
                      {info.item3}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm py-3">
              Home facts updated by county records on Feb 25, 2021.
            </p>
          </div>
        </Collapse>
      </div>
    </section>
  );
};

export default SchoolCartResponsive;
