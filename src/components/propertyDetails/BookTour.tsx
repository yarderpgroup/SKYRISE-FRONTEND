import {
  AddHomeOutlined,
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  AssignmentOutlined,
  Home,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import LoginModal from "components/common/LoginModal";
import useAppContext from "contexts/AppContextProvider";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import Slider from "react-slick";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const dates: any = [];
const today = new Date();
for (let i = 0; i < 7; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() + i);
  dates.push({
    day: daysOfWeek[date.getDay()],
    currentDate: date.toISOString(),
  });
}

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 2,
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
const BookTour = () => {
  const router = useRouter().query;
  const { setShowLoginModal } = useAppContext();
  const { user } = useAuth();
  const route = useRouter();
  const id = router.propertyDetails;
  const dateRef = useRef<any>(null);
  const handleNextSlide = () => {
    dateRef.current.slickNext();
  };
  const handlePrevSlide = () => {
    dateRef.current.slickPrev();
  };
  const handlePush = () => {
    if (!user?._id) return setShowLoginModal(true);
    route.push(`/property/${id}/schedule`);
  };
  return (
    <section className="w-full py-6 border border-themeDarkGray rounded-lg shadow-[0_1px_30px_rgb(0,0,0,0.1)]">
      <div className="flex flex-col w-full gap-5">
        <p className="text-xl font-semibold text-themeDarkGray text-center w-full">
          Get a Guided Tour
        </p>
        <div className="w-full p-5 relative">
          <div className="testimonial-slick company-slick-slider overflow-hidden w-full">
            <Slider ref={dateRef} {...settings} className="our-store-dots">
              {dates?.map((curElm: any) => (
                <div
                  className="w-full !flex !items-center !justify-center"
                  key={curElm.id}
                >
                  <div className="w-4/5  flex flex-col rounded-md h-36 gap-1 items-center justify-center border border-primaryBorder">
                    <p className="text-themeDarkGray text-sm">{curElm.day}</p>
                    <p className="text-4xl  font-semibold text-themeDarkGray">
                      {new Date(curElm.currentDate).getDate()}
                    </p>
                    <p className="text-themeDarkGray text-sm">
                      {" "}
                      {dayjs(curElm.currentDate).format("MMMM")}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="absolute top-0 left-0 right-0 p-1 justify-between w-full h-full flex items-center">
            <ArrowBackIosNewOutlined
              onClick={handlePrevSlide}
              className="!text-xl text-themeDarkGray font-bold cursor-pointer"
            />
            <ArrowForwardIosOutlined
              onClick={handleNextSlide}
              className="!text-xl text-themeDarkGray font-bold cursor-pointer"
            />
          </div>{" "}
        </div>
        <div className="w-full justify-center flex items-center gap-4">
          <div
            onClick={handlePush}
            className="flex gap-1 items-center text-themeDarkGray cursor-pointer border border-themeDarkGray px-3 py-2 rounded-md text-sm"
          >
            <AddHomeOutlined className="!text-xl -mt-1" />
            <p>Tour in Person</p>
          </div>

          <div
            onClick={handlePush}
            className="flex gap-1 items-center text-themeDarkGray cursor-pointer border border-themeDarkGray px-3 py-2 rounded-md text-sm"
          >
            <AssignmentOutlined className="!text-xl -mt1" />
            <p>Tour via video chat</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 items-center justify-center">
          <div
            onClick={handlePush}
            className="gradientButton text-white w-fit px-6 py-2 cursor-pointer rounded-lg"
          >
            Schedule a Tour
          </div>

          <p className="text-sm text-themeDarkGray">
            Free, no obligation - Cancel whenever you want
          </p>
        </div>
      </div>
      <LoginModal />
    </section>
  );
};

export default BookTour;
