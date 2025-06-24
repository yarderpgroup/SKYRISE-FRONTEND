import { Straight } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRef, useState } from "react";
import Slider from "react-slick";
import { TESTIMONIALSBg } from "../../assets/backgrounds";
import {
  TESTIMONIALFOUR,
  TESTIMONIALONE,
  TESTIMONIALTHREE,
  TESTIMONIALTWO,
} from "../../assets/property";
import TestimonialCard from "../common/TestimonialCard";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 400,
  cssEase: "linear",
  pauseOnHover: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 940,
      settings: {
        autoplay: true,
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
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
  ],
};
const Review_Arr = [
  {
    id: "1",
    displayImage: TESTIMONIALONE.src,
    authorName: "Jenny Willliamson",
    role: "UI/UX Designer",
    rating: 4,
    description:
      "“Lorem Ipsum is simply dummy text of printing and type setting industry. Lorem Ipsum been industry standard dummy text ever since, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: "2",
    displayImage: TESTIMONIALTWO.src,
    authorName: "Chris Evans",
    rating: 4,
    role: "NodeJs Developer",
    description:
      "Lorem Ipsum is simply dummy text of printing and type setting industry. Lorem Ipsum been industry standard dummy text ever since, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: "3",
    displayImage: TESTIMONIALTHREE.src,
    authorName: "John Will",
    rating: 5,
    role: "Frontend Developer",
    description:
      "Lorem Ipsum is simply dummy text of printing and type setting industry. Lorem Ipsum been industry standard dummy text ever since, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: "4",
    displayImage: TESTIMONIALFOUR.src,
    authorName: "Mark Henry",
    rating: 5,
    role: "Full Stack Developer",
    description:
      "Lorem Ipsum is simply dummy text of printing and type setting industry. Lorem Ipsum been industry standard dummy text ever since, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];
const Testimonials = () => {
  const testimonialRef = useRef<any>(null);
  const [activeId, setActiveId] = useState("0");
  const handleNextSlide = async (ID: string) => {
    setActiveId(ID);
    testimonialRef.current.slickNext();
  };
  const handlePrevSlide = () => {
    testimonialRef.current.slickPrev();
  };
  return (
    <section className="w-full bg-[#EDEDED] md:my-10 py-10 md:py-0 z-0">
      <div className="custom-container">
        <div className="md:grid grid-cols-12 gap-6 flex flex-col md:gap-6 h-full">
          <div className="col-span-4 h-full md:pt-16 flex md:gap-24 flex-col justify-between">
            <div className="w-full gap-3 md:gap-6 flex flex-col">
              <p className="flex gap-2 title-styling font-semibold text-themeDarkGray">
                <span className="relative after:absolute after:-bottom-1 md:after:-bottom-2 after:left-0 after:w-1/2 after:h-[3px] after:bg-theme ">
                  Testimonial
                </span>
              </p>
              <p className="leading-6 md:leading-7 text-base md:text-lg relative w-full text-themeDarkGray">
                Handpicked projects for you. Local SkyRise Agents price your
                home right and make it shine online. Get started with a free
                consultation.
              </p>
            </div>
            <div className="hidden md:flex">
              <img src={TESTIMONIALSBg.src} alt="" />
            </div>
          </div>
          <div className="col-span-7 flex items-center justify-center">
            <div className="w-full h-fit testimonial-slick rounded-md company-slick-slider  overflow-hidden">
              <Slider
                ref={testimonialRef}
                {...settings}
                className="our-store-dots"
              >
                {Review_Arr?.map((curElm: any) => (
                  <TestimonialCard key={curElm.id} curElm={curElm} />
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-span-1 md:flex hidden items-start md:pt-16 justify-end">
            <div className="flex md:flex-col gap-4 relative">
              {Review_Arr.map((item) => (
                <div key={item.id} className="flex items-center justify-center">
                  {item.id !== activeId && (
                    <Avatar
                      src={item.displayImage}
                      sx={{ width: "4rem", height: "4rem" }}
                    ></Avatar>
                  )}
                  <div className="absolute top-full hidden md:flex flex-col items-center justify-center gap-4">
                    <p
                      onClick={handlePrevSlide}
                      className="hover:text-theme common-transition cursor-pointer"
                    >
                      <Straight />
                    </p>
                    <div
                      className="text-lg rotate-90"
                      // onClick={() => handleNextSlide(item.id)}
                    >
                      <p>NEXT</p>
                    </div>
                    <p
                      onClick={() => handleNextSlide(item.id)}
                      className="rotate-180 cursor-pointer hover:text-theme common-transition"
                    >
                      <Straight />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
