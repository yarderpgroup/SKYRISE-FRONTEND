import {
  Info,
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Collapse, IconButton } from "@mui/material";
import useSWRAPI from "hooks/useSWRAPI";
import { useRef, useState } from "react";
import Slider from "react-slick";
import PropertyCard from "../common/PropertyCard";
// import { Feature_Property } from "../home/FeaturedSection";

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
const AdditionalCardResponsive = () => {
  const { data, error, isValidating } = useSWRAPI("/property");
  const [isReal, setIsReal] = useState(false);
  const ref = useRef<any>(null);
  const handleNextSlide = () => {
    ref.current.slickNext();
  };
  const handlePrevSlide = () => {
    ref.current.slickPrev();
  };

  return (
    <div className="w-full border-b border-primaryBorder py-4">
      <section className="flex flex-col text-themeDarkGray gap-2">
        <div
          className="flex justify-between w-full"
          onClick={() => setIsReal(!isReal)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">SKYRISE Estimate</p>
            <p className="text-sm">$574,911/mo</p>
          </div>
          <div className="flex items-center common-transition">
            {!isReal ? (
              <KeyboardArrowDown className="!text-4xl" />
            ) : (
              <KeyboardArrowUp className="!text-4xl" />
            )}
          </div>
        </div>

        <Collapse in={isReal} timeout="auto" unmountOnExit>
          <div className="flex flex-col pb-2">
            <p className="text-base">Rental estimate based on recent rentals</p>
            <p className="text-sm">{`−$14K under list price of $589K`}</p>
          </div>
          <section className="testimonial-slick company-slick-slider overflow-hidden">
            <Slider ref={ref} {...settings} className="our-store-dots">
              {/* {Feature_Property?.map((curElm: any) => (
                <PropertyCard
                  key={curElm.id}
                  curElm={curElm}
                  isValidating={isValidating}
                />
              ))} */}
            </Slider>
          </section>
        </Collapse>
      </section>
    </div>
  );
};

export default AdditionalCardResponsive;
