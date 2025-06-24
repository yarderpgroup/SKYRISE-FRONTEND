import Slider from "react-slick";
import {
  FeatureFive,
  FeatureOne,
  FeatureThree,
  FeatureTwo,
  ROOM1,
  ROOM2,
  ROOM3,
  ROOM4,
  ROOM5,
} from "../../assets/property";
import PropertyCard from "../common/PropertyCard";
import { useRef, useState } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { CardSkeleton } from "components/skeleton/property";
import LoginModal from "components/common/LoginModal";

//     id: 1,
//     image: FeatureOne.src,
//     propertyName: "Eaton Garth Penthouse",
//     propertyType: "Modern House",
//     price: "750.00",
//     typeOfProperty: "Rent",
//     location: "New York, NY",
//     type: "Featured",
//     images: [
//       {
//         id: 11,
//         url: ROOM1.src,
//       },
//       {
//         id: 12,
//         url: ROOM2.src,
//       },
//       {
//         id: 13,
//         url: ROOM3.src,
//       },
//       {
//         id: 14,
//         url: ROOM4.src,
//       },
//       {
//         id: 15,
//         url: ROOM5.src,
//       },
//     ],
//     features: [
//       {
//         id: 11,
//         featureOne: "2110 Sqft",
//       },
//       {
//         id: 120,
//         featureOne: "1 Beds",
//       },
//       {
//         id: 11,
//         featureOne: "1 Baths",
//       },
//     ],
//   },
//   {
//     id: 2,
//     image: FeatureTwo.src,
//     propertyName: "Eaton Garth Penthouse",
//     propertyType: "Modern House",
//     price: "750.00",
//     typeOfProperty: "Sell",
//     location: "New York, NY",
//     type: "Featured",
//     features: [
//       {
//         id: 21,
//         featureOne: "2110 Sqft",
//       },
//       {
//         id: 21,
//         featureOne: "1 Beds",
//       },
//       {
//         id: 23,
//         featureOne: "1 Baths",
//       },
//     ],
//   },
//   {
//     id: 3,
//     image: FeatureThree.src,
//     propertyName: "Eaton Garth Penthouse",
//     propertyType: "Modern House",
//     typeOfProperty: "Rent",
//     price: "750.00",
//     location: "New York, NY",
//     type: "Featured",
//     features: [
//       {
//         id: 31,
//         featureOne: "2110 Sqft",
//       },
//       {
//         id: 32,
//         featureOne: "1 Beds",
//       },
//       {
//         id: 33,
//         featureOne: "1 Baths",
//       },
//     ],
//   },
//   {
//     id: 4,
//     image: FeatureFive.src,
//     propertyName: "Eaton Garth Penthouse",
//     propertyType: "Modern House",
//     typeOfProperty: "Buy",
//     price: "750.00",
//     location: "New York, NY",
//     type: "Featured",
//     features: [
//       {
//         id: 41,
//         featureOne: "2110 Sqft",
//       },
//       {
//         id: 42,
//         featureOne: "1 Beds",
//       },
//       {
//         id: 43,
//         featureOne: "1 Baths",
//       },
//     ],
//   },
// ];
const FeaturedSection = ({ featureData, isValidating, mutate }: any) => {
  const ref = useRef<any>(null);
  const [count, setCount] = useState(0);

  const handleNextSlide = () => {
    ref.current.slickNext();
    if (count === 0) setCount(featureData?.data?.data?.length);
    setCount((prev) => prev - 1);
  };
  const handlePrevSlide = () => {
    ref.current.slickPrev();
    if (count === featureData?.data?.data?.length) setCount(0);
    setCount((prev) => prev + 1);
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
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
    <section className="w-full bg-white custom-container md:pt-16 pt-8">
      <div className="flex flex-col gap-4 md:gap-6">
        <p className="flex gap-2 title-styling font-semibold text-themeDarkGray">
          <span className="relative after:absolute after:-bottom-1.5 md:after:-bottom-2 after:left-0 after:w-full after:h-[3px] after:bg-theme ">
            Featured
          </span>
          <span className="">Property</span>
        </p>
        <p
          className="md:leading-7 leading-6 md:text-lg text-base
         relative w-full text-themeDarkGray"
        >
          Handpicked projects for you. Local SkyRise Agents price your home
          right and make it shine online. <br className="md:flex hidden" /> Get
          started with a free consultation.
          <div className="md:absolute hidden md:right-20 right-2 pt-3 md:pt-0 md:flex gap-3">
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
              className={`gradientButton flex items-center border-theme justify-center cursor-pointer w-10 border-2 rounded-full h-10`}
            >
              <IconButton>
                <KeyboardArrowRight className={`text-white `} />
              </IconButton>
            </div>
          </div>
        </p>
        <div className="w-full relative pt-6 pb-10 md:pb-0 md:pt-10">
          {isValidating ? (
            <div className="w-full md:flex  gap-2">
              <CardSkeleton />
            </div>
          ) : (
            <section className="testimonial-slick company-slick-slider overflow-hidden">
              <Slider ref={ref} {...settings} className="our-store-dots">
                {featureData?.data?.data?.map((curElm: any) => (
                  <PropertyCard
                    key={curElm?.id}
                    curElm={curElm}
                    mutate={mutate}
                    isValidating={isValidating}
                  />
                ))}
              </Slider>
            </section>
          )}
        </div>
        <LoginModal />
      </div>
    </section>
  );
};

export default FeaturedSection;
