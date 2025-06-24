import { useRef, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  ExpandMore,
} from "@mui/icons-material";
import {
  IconButton,
  LinearProgress,
  linearProgressClasses,
  Table,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ReplyOutlinedIcon from "@mui/icons-material/Reply";
import CodeIcon from "@mui/icons-material/Code";
import CircleIcon from "@mui/icons-material/Circle";
import styled from "@emotion/styled";
import Slider from "react-slick";
import Link from "next/link";

const MarketInsightLink = [
  {
    id: 1,
    name: "SkyRise",
    Link: "",
  },
  {
    id: 2,
    name: "Massachusetts",
    Link: "",
  },
  {
    id: 3,
    name: "Woburn",
    Link: "",
  },
  {
    id: 4,
    name: "01801",
    Link: "",
  },
];

export const CentralSquare = [
  {
    id: 1,
    address: "Central Square",
    type: "Neighborhood",
    mapSource:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23233.957377254!2d-76.1603295356585!3d43.288197564655434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d9c1930f599f3f%3A0xee8d833f00258cdf!2sCentral%20Square%20Plaza!5e0!3m2!1sen!2sin!4v1673416534600!5m2!1sen!2sin",
    details: [
      {
        id: 11,
        price: "$629K",
        des: "Median List Price",
      },

      {
        id: 12,
        price: "49",
        des: "Median Days on Mkt.",
      },
      {
        id: 13,
        price: "8",
        des: "Listed Homes",
      },
      {
        id: 14,
        price: "$360",
        des: "Median $ / Sq. Ft.",
      },
      {
        id: 15,
        price: "99.1%",
        des: "Median Sale-to-List",
      },
      {
        id: 16,
        price: "8",
        des: "# Sold Homes",
      },
    ],
  },
  {
    id: 2,
    address: "Central Square Plaza",
    type: "Neighborhood",
    mapSource:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23233.957377254!2d-76.1603295356585!3d43.288197564655434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d9c1a67830fc39%3A0xf8411e5c5d602b62!2sCentral%20Square%20Library!5e0!3m2!1sen!2sin!4v1673416619924!5m2!1sen!2sin",
    details: [
      {
        id: 11,
        price: "$629K",
        des: "Median List Price",
      },

      {
        id: 12,
        price: "49",
        des: "Median Days on Mkt.",
      },
      {
        id: 13,
        price: "8",
        des: "Listed Homes",
      },
      {
        id: 14,
        price: "$360",
        des: "Median $ / Sq. Ft.",
      },
      {
        id: 15,
        price: "99.1%",
        des: "Median Sale-to-List",
      },
      {
        id: 16,
        price: "8",
        des: "# Sold Homes",
      },
    ],
  },
];

const PublicRecords = [
  {
    id: 1,
    value: (
      <p>
        <CircleIcon className="!text-sm"/> Woburn
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
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        infinite: true,
      },
    },
    {
      breakpoint: 940,
      settings: {
        autoplay: false,
        autoplaySpeed: 3000,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
    {
      breakpoint: 760,
      settings: {
        autoplay: false,
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
const MarketInsight = () => {
  const ref = useRef<any>(null);
  const handleNextSlide = () => {
    ref.current.slickNext();
  };
  const handlePrevSlide = () => {
    ref.current.slickPrev();
  };

  return (
    <div className="flex flex-col text-themeDarkGray gap-4 w-full">
      <h1 className="text-xl font-semibold">
        Real Estate Market Insights for 84R Salem St
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          {MarketInsightLink?.map((link) => (
            <div key={link?.id} className="flex items-center">
              <div className="text-base flex gap-1 items-center cursor-pointer text-[#0075FF]">
                <Link href={link?.Link}>
                  <p className="flex items-center">{link?.name} </p>
                </Link>
                {link?.id !== 4 && (
                  <p>
                    <ChevronRightIcon />
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <p>Single-Family Home Sales (Last 30 days)</p>
      </div>
      <div className="flex gap-2">
        <div className="flex gap-3 w-full justify-end px-8">
          <div
            onClick={handleNextSlide}
            className={`text-white flex border-theme items-center justify-center w-10 border-2 cursor-pointer rounded-full h-10`}
          >
            <IconButton>
              <KeyboardArrowLeft className={`text-theme`} />
            </IconButton>
          </div>
          <div
            onClick={handlePrevSlide}
            className={`bg-theme flex items-center border-theme justify-center cursor-pointer w-10 border-2 rounded-full h-10`}
          >
            <IconButton>
              <KeyboardArrowRight className={`text-white `} />
            </IconButton>
          </div>
        </div>
      </div>
      <section className="testimonial-slick company-slick-slider overflow-hidden w-full">
        <Slider ref={ref} {...settings} className="our-store-dots">
          {CentralSquare.map((item) => (
            <div
              key={item.id}
              className=" border w-full border-primaryBorder rounded-md overflow-hidden"
            >
              <div className=" w-full grid grid-cols-12 rounded-md overflow-hidden gap-2">
                <div className="flex flex-col gap-4 px-3 py-4 col-span-7">
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
                        <p className="text-lg font-semibold">{item?.price}</p>
                        <p className="text-sm">{item?.des}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* map image */}
                <div className="flex col-span-5">
                  <iframe
                    src={item.mapSource}
                    width="550"
                    height="100%"
                    loading="lazy"
                    style={{ borderRadius: "0px", overflow: "hidden" }}
                  ></iframe>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            Based on SkyRise calculations of home data from MLS and/or public
            records.
          </p>
          {/* <div className="flex gap-4">
            <button className="border border-primaryBorder items-center rounded text-center p-2">
              <ReplyOutlinedIcon className=" h-8 w-8" /> Share
            </button>
            <button className="border border-primaryBorder items-center rounded text-center p-2">
              <CodeIcon className="h-8 w-8" /> Embed
            </button>
          </div> */}
          <div className="w-full flex flex-col py-2 border-b-2 gap-4">
            <div className="grid grid-cols-12 justify-between rounded w-full bg-[#FFE2DF] py-2 px-2">
              <p className=" col-span-4">Location</p>
              <p className=" col-span-4 flex items-center justify-center">
                Data Nov 2022
              </p>
              <p className=" col-span-4 justify-end items-center flex">
                Growth % YoY
              </p>
            </div>
            <div className="w-full grid grid-cols-12 justify-between pb-2 px-2 -b ">
              {PublicRecords?.map((item) => (
                <p
                  key={item?.id}
                  className={`col-span-4 ${
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
        </div>
        <div className="flex flex-col">
          <Link href="/central-square">
            <p className="text-base font-semibold">
              Market Competition in{" "}
              <a className="no-underline text-[#0075FF]">Central Square</a>
            </p>
          </Link>
          <p className="text-sm pt-1">Calculated over the last 3 months</p>
        </div>
        <div className="flex gap-4">
          <h1 className="text-6xl text-theme">67</h1>
          <div className="flex flex-col">
            <p className="text-lg tracking-wide">Somewhat Competitive</p>
            <p className="text-sm leading-3">
              Redfin Compete Score™ <InfoIcon className="h-5 w-5" />
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
            <h1 className="text-base  font-semibold">
              Compare to nearby Neighborhoods
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col gap-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default MarketInsight;
