//using tailwind css and make it responsive
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { Info, MoreHoriz } from "@mui/icons-material";
import CalculatorCard from "../propertyDetails/CalculatorCard";

const paymentCalculator = [
  {
    id: 1,
    title: "Principal and interest",
    price: "$2,977",
    color: "#E33324",
  },
  {
    id: 2,
    title: "Property Taxes",
    price: "$326",
    color: "#FFCCC8",
  },
  {
    id: 3,
    title: "Homeowner’s Insurance",
    price: "$1789",
    color: "#FF7979",
  },
];
const Calculator_Arr = [
  {
    id: "1",
    title: "Down Payment",
    amount: "20% ($117,800)",
    interest: "20%",
    total: "$117,800",
    className: "col-span-12",
  },
  {
    id: "2",
    title: "Home Price",
    amount: "$589,000",
    className: "col-span-6",
  },
  {
    id: "3",
    title: "Loan Details",
    amount: "30 yr, 6.495%",
    interest: "6.495%",
    className: "col-span-6",
    year: "30 yr",
    loanType: [
      {
        id: "31",
        title: "10 yr",
      },
      {
        id: "32",
        title: "30 yr",
      },
      {
        id: "33",
        title: "20 yr",
      },
    ],
  },
];

const ResponsiveCalculator = () => {
  const [activePlan, setActivePlan] = useState<any>(null);

  return (
    <div className="w-full flex flex-col gap border-t py-5 border-primaryBorder/20 gap-4">
      <div className="flex justify-between">
        <h2 className="text-lg text-themeDarkGray items-center flex gap-2 font-semibold">
          $3,489 per month <InfoIcon className="text-themeDarkGray" />
        </h2>
        <button className="text-theme">Reset</button>
      </div>
      <div className="flex rounded-lg h-2.5 !overflow-hidden">
        <div className="w-9/12 h-2.5 bg-theme"></div>
        <div className="w-2/12 h-2.5 bg-[#FF7979]"></div>
        <div className="w-1/12  h-2.5 bg-[#FFCCC8]"></div>
      </div>
      <div className="flex flex-col py-3 gap-5">
        {paymentCalculator.map((item) => (
          <div className="flex items-center w-full gap-1">
            <div
              className="w-2 h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="flex justify-between w-11/12 ">
              <h2 className="text-themeDarkGray text-base tracking-wide">
                {item.title}
              </h2>
              <p className="text-themeDarkGray">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 w-full gap-4 relative">
        {Calculator_Arr.map((item) => (
          <div
            className={`${item.className} ${
              item.id === activePlan?.id && item.id === "2"
                ? "!h-48"
                : item?.id === activePlan?.id
                ? "h-80"
                : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex items-center justify-center border border-primaryBorder/20 py-3 rounded-md h-fit"
            }`}
            key={item.id}
          >
            <div onClick={() => setActivePlan(item)} className="">
              <p className="text-sm text-center text-themeDarkGray">
                {item.title}
              </p>
              <p className="text-lg text-center font-semibold text-themeDarkGray">
                {item.amount}
              </p>
            </div>
            {activePlan?.id === item?.id && (
              <div
                className={`${
                  item.id === "4" ? "right-0" : "left-0"
                } animate-[popup_400ms_ease-in-out] w-full absolute common-transition left-0 top-0 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-md overflow-hidden`}
              >
                <div className="w-full">
                  <CalculatorCard curElm={item} setActivePlan={setActivePlan} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 w-full items-center justify-center">
        <p className="text-lg font-semibold text-themeDarkGray">
          Advanced Options
        </p>
        <div className="w-full text-center">
          <button className="border h-12 w-full rounded-md border-primaryBorder bg-primaryBorder/30 text-center px-2 py-2 hover:bg-white common-transition text-themeDarkGray">
            Find a lender
          </button>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col p-3 gap-1 bg-[#FFE2DF] rounded-lg">
          <div className="flex gap-1 text-themeDarkGray">
            <p className="text-lg font-semibold tracking-wide">
              Down payment assistance
            </p>
            <Info className="!text-xl mt-1" />
          </div>
          <p className="text-themeDarkGray">
            This home has 6 programs available with up to $50,000 in assistance.
            See available programs
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCalculator;
