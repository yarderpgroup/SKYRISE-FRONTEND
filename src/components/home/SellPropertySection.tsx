import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { IconButton, Skeleton } from "@mui/material";
import { CardSkeleton } from "components/skeleton/property";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import { useRef, useState } from "react";
import Slider from "react-slick";
import {
  FeatureFive,
  FeatureSeven,
  FeatureSix,
  FeatureThree,
} from "../../assets/property";
import PropertyCard from "../common/PropertyCard";

// const Sell_Property = [
//   {
//     id: 1,
//     image: FeatureFive.src,
//     propertyName: "Eaton Garth Penthouse",
//     propertyType: "Modern House",
//     price: "750.00",
//     location: "New York, NY",
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
//     image: FeatureSix.src,
//     propertyName: "Eaton Garth Penthouse",
//     propertyType: "Modern House",
//     price: "750.00",
//     location: "New York, NY",
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
//     image: FeatureSeven.src,
//     propertyName: "Eaton Garth Penthouse",
//     propertyType: "Modern House",
//     price: "750.00",
//     location: "New York, NY",
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
//     image: FeatureThree.src,
//     propertyName: "Eaton Garth Penthouse",
//     propertyType: "Modern House",
//     price: "750.00",
//     location: "New York, NY",
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

const SellPropertySection = ({ featureData, isValidating, mutate }: any) => {
  const ref = useRef<any>(null);
  const { user } = useAuth();
  // let url = `leadpage/home/property?type=SELL&perPage=10&pageNo=1`;

  // if (Boolean(user?._id)) {
  //   url += `&userId=${user._id}`;
  // }
  const [count, setCount] = useState(0);

  const handleNextSlide = () => {
    ref?.current?.slickNext();
    if (count === 0) setCount(featureData?.data?.data?.length);
    setCount((prev) => prev - 1);
  };
  const handlePrevSlide = () => {
    ref?.current?.slickPrev();
    if (count === featureData?.data?.data?.length) setCount(0);
    setCount((prev) => prev + 1);
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
          autoplaySpeed: 3000,
          dots: true,
          speed: 400,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="bg-[#EDEDED] w-full">
      <div className="pt-8 md:pt-16 custom-container">
        <div className="flex flex-col gap-4 md:gap-6">
          <p className="flex gap-2 title-styling font-semibold text-themeDarkGray">
            <span className="relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[3px] after:bg-theme ">
              Sale
            </span>
            <span className="">Properties</span>
          </p>
          <p className="md:leading-7 leading-6 text-base md:text-lg relative text-themeDarkGray">
            Handpicked projects for you. Local SkyRise Agents price your home
            right and make it shine online.
            <br className="md:flex hidden" /> Get started with a free
            consultation.
            <div className="md:absolute hidden right-20 md:flex gap-3">
              <div
                onClick={handlePrevSlide}
                className={`bg-white flex items-center border-theme cursor-pointer justify-center w-10 border-2 rounded-full h-10`}
              >
                <IconButton>
                  <KeyboardArrowLeft className={`text-theme`} />
                </IconButton>
              </div>
              <div
                onClick={handleNextSlide}
                className={`gradientButton flex border-theme cursor-pointer items-center justify-center w-10 border-2 rounded-full h-10`}
              >
                <IconButton>
                  <KeyboardArrowRight className={`text-white `} />
                </IconButton>
              </div>
            </div>
          </p>
          <div className="w-full relative pt-3 pb-10 md:pb-0 md:pt-10">
            {isValidating ? (
              <div className="w-full md:flex  gap-2">
                <CardSkeleton />
              </div>
            ) : (
              <section className="testimonial-slick company-slick-slider store-slider overflow-hidden">
                <Slider ref={ref} {...settings} className="our-store-dots">
                  {featureData?.data?.data?.map((sellItem: any) => (
                    <PropertyCard
                      key={sellItem.id}
                      curElm={sellItem}
                      mutate={mutate}
                      isValidating={isValidating}
                    />
                  ))}
                </Slider>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellPropertySection;
