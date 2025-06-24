import {
  Info,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import useSWRAPI from "hooks/useSWRAPI";
import { useRef, useState } from "react";
import Slider from "react-slick";
import PropertyCard from "../common/PropertyCard";
// import { Feature_Property } from "../home/FeaturedSection";

const AdditionalCardSection = () => {
  const { data, error, isValidating } = useSWRAPI("/property");
  const ref = useRef<any>(null);
  const handleNextSlide = () => {
    ref.current.slickNext();
  };
  const handlePrevSlide = () => {
    ref.current.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 400,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 940,
        settings: {
          autoplay: false,
          autoplaySpeed: 3000,
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
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
  return (
    <section className="flex flex-col text-themeDarkGray gap-6">
      <p className="text-xl font-semibold">SkyRise Estimate for 84R Salem St</p>
      <div className="flex flex-col gap-1">
        <p className="text-lg">$574,911</p>
        <p>{`−$14K under list price of $589K`}</p>
        <div className="flex items-center gap-1">
          <p>SkyRise Estimate based on recent home sales.</p>
          <p className="flex items-center gap-1">
            <Info />
            <p>View estimate history.</p>
          </p>
        </div>
      </div>
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
      <section className="testimonial-slick company-slick-slider overflow-hidden">
        <Slider ref={ref} {...settings} className="our-store-dots">
          {/* {Feature_Property?.map((curElm: any) => (
            <PropertyCard
              key={curElm?.id}
              curElm={curElm}
              isValidating={isValidating}
            />
          ))} */}
        </Slider>
      </section>
      <div className="w-full flex flex-col gap-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.0496935617966!2d85.77688741427437!3d20.25677371905984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a740ae304117%3A0x629ce9db127f69ef!2sSearchingYard%20Software%20Private%20Limited!5e0!3m2!1sen!2sin!4v1672819132294!5m2!1sen!2sin"
          width="100%"
          height="450"
          loading="lazy"
          style={{ borderRadius: "6px", overflow: "hidden" }}
        ></iframe>
        <p className="px-5">
          Track this home's value and get nearby sales activity
          <br /> Claim this home
        </p>
      </div>
    </section>
  );
};

export default AdditionalCardSection;
