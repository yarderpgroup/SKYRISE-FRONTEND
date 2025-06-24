import { Star, StarBorder } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { Fragment } from "react";
import { Testimonial_Cards } from "../../types";

interface Props {
  curElm?: Testimonial_Cards;
}
const TestimonialCard = ({ curElm }: Props) => {
  const count: any = curElm?.rating;
  return (
    <div className="w-full h-full flex items-center justify-center md:py-8">
      <div className="md:w-5/6 h-64 w-full bg-white flex py-2">
        <div className="w-1/5 2xl:w-[15%] relative md:flex hidden">
          <div className="absolute -top-8 -left-8">
            <Avatar
              sx={{ width: "7rem", height: "7rem" }}
              src={curElm?.displayImage}
            ></Avatar>
          </div>
        </div>
        <div className="md:w-4/5 w-full 2xl:w-[85%] flex flex-col gap-3 md:gap-6 py-5 pr-5 pl-5 md:pl-0 md:pr-7">
          <div className="flex w-full flex-col md:flex-row  justify-between">
            <div className="flex gap-4 items-center">
              <div className="md:hidden flex items-center">
                <Avatar
                  sx={{ width: "4rem", height: "4rem" }}
                  src={curElm?.displayImage}
                ></Avatar>
              </div>
              <div className="flex flex-col gap-1">
                <p className=" text-xl font-semibold leading-7 text-themeDarkGray">
                  {curElm?.authorName}
                </p>
                <p className="text-sm text-themeDarkGray">{curElm?.role}</p>
              </div>
            </div>
            <div className="flex md:justify-center pt-2 md:pt-0 gap-1 text-xl text-[#E2B823] pb-2">
              {[...Array(5)]?.map((_, index) => (
                <Fragment key={index}>
                  {count >= index + 1 ? (
                    <Star fontSize="inherit" color="inherit" />
                  ) : (
                    <StarBorder fontSize="inherit" color="inherit" />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <div className="text-base text-themeDarkGray leading-7">
            {curElm?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
