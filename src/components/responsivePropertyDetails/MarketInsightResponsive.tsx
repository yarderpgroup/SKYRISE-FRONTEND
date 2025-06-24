import { useRef, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ExpandMore } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  linearProgressClasses,
  LinearProgress,
} from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/Reply";
import CodeIcon from "@mui/icons-material/Code";
import CircleIcon from "@mui/icons-material/Circle";
import styled from "@emotion/styled";
import Slider from "react-slick";
import { CentralSquare } from "components/propertyDetails/MarketInsight";

const MarketInsightLink = [
  {
    id: 1,
    name: "SKYRISE",
  },
  {
    id: 2,
    name: "Massachusetts",
  },
  {
    id: 3,
    name: "Woburn",
  },
  {
    id: 4,
    name: "01801",
  },
];

const PublicRecords = [
  {
    id: 1,
    value: (
      <p>
        <CircleIcon className="text-xl" /> Woburn
      </p>
    ),
  },
  {
    id: 2,
    value: "$625,000",
  },
  {
    id: 3,
    value: "+2.5%",
  },
];

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 400,
  cssEase: "linear",
  pauseOnHover: false,
  autoplay: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 760,
      settings: {
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 500,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
  ],
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#D9D9D9",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: `linear-gradient(90deg, #E33324 0%, #999999 60.42%, #0075FF 100%)`,
  },
}));
const MarketInsightResponsive = () => {
  const ref = useRef<any>(null);

  return (
    <div className="flex flex-col text-themeDarkGray w-full py-3 gap-3">
      <h1 className="text-base font-semibold">
        Real Estate Market Insights for 84R Salem St
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          {MarketInsightLink?.map((link) => (
            <div key={link?.id}>
              <div className="flex gap-1 items-center cursor-pointer">
                <p className="text-sm tracking-tight flex items-center text-[#0075FF]">
                  {link?.name}{" "}
                </p>
                {link?.id !== 4 && (
                  <p>
                    <ChevronRightIcon />
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm">Single-Family Home Sales (Last 30 days)</p>
      </div>
      <section className="testimonial-slick company-slick-slider overflow-hidden w-full">
        <Slider ref={ref} {...settings} className="our-store-dots">
          {CentralSquare.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden  !w-full p-2 !flex !items-center !justify-center rounded-md"
            >
              <div className=" w-[99%] rounded-md overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] gap-2">
                <div className="flex flex-col gap-4 px-2 py-2 w-full">
                  <div className="flex gap-4">
                    <p className="text-base text-[#0075FF]">{item.address}</p>
                    <p className="text-base">{item.type}</p>
                  </div>
                  <div className="w-full border-t border-dashed grid gap-4 grid-cols-12 border-primaryBorder pt-4 ">
                    {item.details?.map((item) => (
                      <div
                        key={item?.id}
                        className="flex flex-col gap-1 col-span-4"
                      >
                        <p className="text-base font-semibold">{item?.price}</p>
                        <p className="text-sm">{item?.des}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <div className="flex flex-col gap-4">
        {/* <div className="flex flex-col gap-4">
          <p className="text-sm">
            Based on SKYRISE calculations of home data from MLS and/or public
            records.
          </p>
          <div className="flex gap-4">
            <button className="border border-primaryBorder items-center rounded text-center p-2">
              <ReplyOutlinedIcon className="-mt-5" /> Share
            </button>
            <button className="border border-primaryBorder items-center rounded text-center p-2">
              <CodeIcon className="-mt-0.5" /> Embed
            </button>
          </div>
          <div className="w-full flex flex-col py-2 border-b-2 gap-4">
            <div className="grid grid-cols-12 justify-between rounded w-full bg-[#FFE2DF] py-2 px-2">
              <p className=" col-span-4 text-sm text-themeDarkGray">Location</p>
              <p className=" col-span-4 flex items-center justify-center text-sm text-themeDarkGray">
                Data Nov 2022
              </p>
              <p className=" col-span-4 justify-end items-center flex text-sm">
                Growth % YoY
              </p>
            </div>
            <div className="w-full grid grid-cols-12 justify-between pb-2 px-2 -b ">
              {PublicRecords?.map((item) => (
                <p
                  key={item?.id}
                  className={`col-span-4 text-sm text-themeDarkGray ${
                    item.id === 2
                      ? "flex justify-center"
                      : item.id === 3
                      ? "justify-end flex pr-4"
                      : "justify-start flex"
                  }`}
                >
                  {item.value}
                </p>
              ))}
            </div>
          </div>
        </div> */}
        <div className="flex flex-col text-themeDarkGray">
          <p className="text-base text-themeDarkGray">
            Market Competition in{" "}
            <a className="no-underline text-[#0075FF]">Central Square</a>
          </p>
          <p className="text-sm pt-1">Calculated over the last 3 months</p>
        </div>
        <div className="flex gap-4">
          <h1 className="text-6xl text-theme">67</h1>
          <div className="flex flex-col">
            <p className="text-base tracking-wide">Somewhat Competitive</p>
            <p className="text-sm leading-3 pt-1">
              Redfin Compete Score™ <InfoIcon className="!text-lg -mt-0.5" />
            </p>
          </div>
        </div>

        <div className="w-full flex items-center gap-2">
          <p className="w-fit mt-0.5">0</p>
          <div className="w-full">
            <BorderLinearProgress variant="determinate" value={70} />
          </div>
          <p className="w-fit">100</p>
        </div>
        <div className="flex flex-col gap-3 leading-3">
          <li className="text-base">Some homes get multiple offers.</li>
          <li className="text-sm">
            The average homes sell for about 1% above list price and go pending
            in around 20 days.
          </li>
          <li className="text-sm">
            Hot homes can sell for about 3% above list price and go pending in
            around 13 days.
          </li>
        </div>
      </div>
      <div>
        <Accordion className="bg-[#FFE2DF] p-2">
          <AccordionSummary expandIcon={<ExpandMore />}>
            <h1 className="text-base  font-semibold text-themeDarkGray">
              Compare to nearby Neighborhoods
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col gap-4 text-sm text-themeDarkGray">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default MarketInsightResponsive;
