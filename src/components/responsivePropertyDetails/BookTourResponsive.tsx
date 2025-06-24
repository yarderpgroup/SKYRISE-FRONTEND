import {
  AddHomeOutlined,
  AssignmentOutlined,
  Close,
} from "@mui/icons-material";
import { Avatar, TextField } from "@mui/material";
import CustomDialog from "components/core/CustomDialog";
// import { Feature_Property } from "components/home/FeaturedSection";
import { User_Data } from "components/propertyDetails/UserQuery";
import { useIsMounted } from "hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const Book_Arr = [
  {
    id: 1,
    date: "3",
    day: "Tuesday",
    month: "January",
  },
  {
    id: 2,
    date: "4",
    day: "Wednesday",
    month: "January",
  },
  {
    id: 3,
    date: "5",
    day: "Thursday",
    month: "January",
  },
  {
    id: 4,
    date: "6",
    day: "Friday",
    month: "January",
  },
  {
    id: 5,
    date: "7",
    day: "Saturday",
    month: "January",
  },
  {
    id: 4,
    date: "8",
    day: "Sunday",
    month: "January",
  },
];
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
        slidesToShow: 4,
        slidesToScroll: 2,
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
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
        arrows: false,
      },
    },
  ],
};
const BookTourResponsive = () => {
  const [isAskQuestion, setIsAskQuestion] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeData, setActiveData] = useState<any>();
  const [askQuestion, setAskQuestion] = useState("");

  const dateRef = useRef<any>(null);
  const router = useRouter().query;
  const id = router.propertyDetails;
  const isMounted = useIsMounted();
  // useEffect(() => {
  //   if (!id) return;
  //   const propertyData = Feature_Property?.find((item) => item?.id === +id);
  //   setActiveData(propertyData);
  // }, [id, isMounted]);

  return (
    <div>
      <section className="w-full py-4 flex flex-col gap-5">
        <div className="flex flex-col w-full gap-3">
          <p className="text-xl font-semibold text-themeDarkGray text-left w-full">
            Get a Guided Tour
          </p>
          <div className="w-full relative">
            <div className="testimonial-slick company-slick-slider overflow-hidden w-full pr-5">
              <Slider ref={dateRef} {...settings} className="our-store-dots">
                {Book_Arr?.map((curElm) => (
                  <div
                    className="w-full !flex !items-center !justify-start"
                    key={curElm.id}
                  >
                    <div className="w-11/12  flex flex-col rounded-sm h-20 items-center justify-center border border-primaryBorder">
                      <p className="text-themeDarkGray text-xs">{curElm.day}</p>
                      <p className="text-xl  font-semibold text-themeDarkGray">
                        {curElm.date}
                      </p>
                      <p className="text-themeDarkGray text-xs">
                        {curElm.month}
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="w-full justify-center flex items-center gap-2">
            <div className="flex gap-1 items-center text-themeDarkGray cursor-pointer border border-themeDarkGray px-3 py-2 rounded-md text-sm w-fit">
              <AddHomeOutlined className="!text-xl -mt-1" />
              <p>Tour in Person</p>
            </div>
            <div className="flex gap-1 items-center text-themeDarkGray cursor-pointer border border-themeDarkGray px-3 py-2 rounded-md text-sm w-fit">
              <AssignmentOutlined className="!text-xl -mt1" />
              <p>Tour via video chat</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 items-center justify-center">
            <Link href={`/property/${id}/schedule`}>
              <div className="gradientButton text-white text-center w-full px-6 py-2 cursor-pointer rounded-lg">
                Schedule a Tour
              </div>
            </Link>

            <p className="text-sm text-themeDarkGray">
              Free, no obligation - Cancel whenever you want
            </p>
          </div>
        </div>
        {activeData?.typeOfProperty !== "Rent" && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center pt- gap-2">
              <div className="w-1/3 bg-themeGray h-[2px]"></div>
              <div className="w-fit text-xl font-semibold text-themeDarkGray">
                OR
              </div>
              <div className="w-1/3 bg-themeGray h-[2px]"></div>
            </div>
            <Link href={`/account/offers/${id}`}>
              <div className="py-2 w-full text-center text-themeDarkGray rounded-lg border border-themeGray bg-primaryBorder/30">
                Start an Offer
              </div>
            </Link>
            <div className="flex w-full items-center py-2 border-t border-b text-[#0075FF] border-primaryBorder">
              <p
                onClick={() => setIsAskQuestion(!isAskQuestion)}
                className="w-1/2 border-r border-primaryBorder cursor-pointer flex items-center justify-center text-center"
              >
                Ask a question
              </p>
              <p className="w-1/2 cursor-pointer flex items-center justify-center text-center">
                (617)752-8086
              </p>
            </div>
          </div>
        )}
      </section>
      <CustomDialog
        open={isAskQuestion}
        onClose={() => setIsAskQuestion(false)}
        maxWidth="sm"
      >
        <div className="w-full flex flex-col px-5 py-5 gap-5">
          <div className="w-full flex items-center justify-between">
            <p className="text-sm font-semibold text-themeDarkGray">
              Ask SKYRISE agent Selena a Question
            </p>
            <div
              className="cursor-pointer"
              onClick={() => setIsAskQuestion(false)}
            >
              <Close className="!text-xl -mt-0.5" />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 text-center">
            {User_Data?.map((item) => (
              <div key={item.id} className="flex gap-3 flex-col items-center">
                <Avatar sx={{ width: "5rem", height: "5rem" }}>S</Avatar>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-themeDarkGray">
                    {item.displayName}
                  </p>
                  <div className="text-xs text-themeDarkGray flex flex-col">
                    <p>{item.agency}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <TextField
              placeholder="message..."
              variant="outlined"
              fullWidth
              rows={3}
              onChange={(e) => setAskQuestion(e.target.value)}
              multiline={true}
              margin="none"
            />
            {isVisible && (
              <p className="text-sm text-theme">
                {askQuestion.length <= 0 ? "required" : ""}
              </p>
            )}
          </div>
          <div className="flex w-full">
            <button
              disabled={askQuestion.length <= 0}
              onClick={() => setIsVisible(true)}
              className="gradientButton w-fit px-4 py-2 text-white rounded-md"
            >
              Ask a question
            </button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
};

export default BookTourResponsive;
