import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import Slider from "react-slick";
import { HouseIcon } from "../../assets/static";
import Link from "next/link";
import { EmptyComponents } from "components/core";

interface Props {
  activeData?: any;
  photos?: any;
  propertyID: any;
}
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
const ImageView = ({ activeData, photos, propertyID }: Props) => {
  const [activeImage, setActiveImage] = useState("");
  const imageRef = useRef<any>(null);
  const handleNextSlide = () => {
    imageRef.current.slickNext();
  };
  const handlePrevSlide = () => {
    imageRef.current.slickPrev();
  };
  return (
    <div className="w-full h-[75vh]">
      {photos?.length > 0 ? (
        <div className="flex items-center flex-col md:flex-row gap-10 md:gap-0 h-full justify-between">
          <div className="flex w-full md:w-[30%] items-center scrollBarNone h-full !order-2 md:!order-1 overflow-scroll py-5 md:py-0 md:px-5 gap-20 flex-col">
            <div className="md:grid flex flex-col md:grid-cols-12 gap-4">
              {photos?.map((item: any) => (
                <div key={item?.id} className="col-span-6 object-cover">
                  <img
                    onClick={() => setActiveImage(item.url)}
                    src={item?.photo}
                    alt="logo"
                    className="w-full h-60 md:h-40 md:rounded-xl cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center flex-col">
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-themeGray/30">
                <img
                  src={HouseIcon.src}
                  alt="house"
                  className="w-20 rotate-[20deg]"
                />
              </div>
              <p className="text-xl font-semibold pt-2 tracking-wide text-themeDarkGray">
                Tour it soon before it's gone!
              </p>
              <p>See it in person or via video chat</p>
            </div>
          </div>
          <div className="md:w-[70%] w-full h-fit md:h-[75vh] hidden items-center !order-1 md:!order-2 flex-col justify-center md:flex">
            <div className="w-full flex items-center justify-center">
              <div className="w-1/6 h-full hidden md:flex items-center justify-center">
                <div
                  onClick={handlePrevSlide}
                  className="w-12 h-12 rounded-full hover:bg-themeGray/20 common-transition border-2 border-themeDarkGray cursor-pointer flex items-center justify-center"
                >
                  <KeyboardDoubleArrowLeft className="!text-2xl text-themeDarkGray" />
                </div>
              </div>
              <div className="md:w-4/6 w-full h-full testimonial-slick company-slick-slider overflow-hidden">
                <Slider ref={imageRef} {...settings} className="w-full h-full">
                  {photos?.map((curElm: any) => (
                    <div
                      key={curElm?.id}
                      className="w-full flex h-[25rem] overflow-hidden !object-cover rounded-lg justify-center md:p-5"
                    >
                      <img
                        src={activeImage || curElm?.photo}
                        alt="images"
                        className="!object-cover bg-center h-40 md:h-full w-full rounded-lg overflow-hidden"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="w-1/6 h-full hidden md:flex items-center justify-center">
                <div
                  onClick={handleNextSlide}
                  className="w-12 h-12 rounded-full hover:bg-themeGray/20 common-transition border-2 border-themeDarkGray cursor-pointer flex items-center justify-center"
                >
                  <KeyboardDoubleArrowRight className="!text-2xl text-themeDarkGray" />
                </div>
              </div>
            </div>
            <div className="md:flex hidden w-full items-center justify-center">
              <div className="flex flex-col px-5 py-2 gradientButton rounded-xl hover:bg-theme/90 common-transition cursor-pointer">
                <Link href={`/property/${propertyID}/schedule`}>
                  <p className="text-xl text-white font-semibold text-center">
                    Schedule Tour
                  </p>
                  <p className="text-sm text-white text-center">
                    See it in person or via video chat
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <EmptyComponents />
      )}
    </div>
  );
};

export default ImageView;
