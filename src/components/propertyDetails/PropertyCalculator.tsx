import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { Info, MoreHoriz } from "@mui/icons-material";
import CalculatorCard from "./CalculatorCard";

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
  },
  {
    id: "2",
    title: "Home Price",
    amount: "$589,000",
  },
  {
    id: "3",
    title: "Loan Details",
    amount: "30 yr, 6.495%",
    interest: "6.495%",
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
  {
    id: "4",
    title: "Advanced Options",
    amount: "30 yr, 6.495%",
    total: "$30",
    year: "30 yr",
    interest: "3.30%",
    icon: <MoreHoriz className="text-themeDarkGray !text-2xl" />,
  },
];
const PropertyCalculator = () => {
  const [activePlan, setActivePlan] = useState<any>(null);
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-5 w-full border border-[#999999] rounded-lg p-5">
        <h2 className="text-xl tracking-wide text-themeDarkGray font-bold">
          Payment Calculator
        </h2>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row w-1/2 flex-wrap gap-8">
            <h2 className="text-lg text-themeDarkGray items-center flex gap-2 font-semibold">
              $3,489 per month <InfoIcon className="text-themeDarkGray" />
            </h2>
            <button className="text-theme">Reset</button>
          </div>
          <div className="flex flex-col">
            <button className="border h-12 w-48 rounded-md border-primaryBorder bg-primaryBorder/30 text-center px-2 py-2 hover:bg-white common-transition text-themeDarkGray">
              Find a lender
            </button>
          </div>
        </div>
        <div className="flex rounded-lg h-2.5 !overflow-hidden">
          <div className="w-9/12 h-2.5 bg-theme"></div>
          <div className="w-2/12 h-2.5 bg-[#FF7979]"></div>
          <div className="w-1/12  h-2.5 bg-[#FFCCC8]"></div>
        </div>
        <div className="flex flex-col pt-6 w-full">
          <div className="flex flex-wrap justify-between gap-5">
            {paymentCalculator.map((item) => (
              <div className="flex items-center w-2/5 h-fit gap-2">
                <div
                  className="w-2 h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="flex justify-between w-11/12 ">
                  <h2 className="underline text-themeDarkGray text-base tracking-wide">
                    {item.title}
                  </h2>
                  <p className="text-themeDarkGray">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`${activePlan !== null ? "h-[30rem] flex w-full" : ""} `}>
        <div className="grid grid-cols-11 gap-5 w-full border border-primaryBorder h-24 rounded-md items-center p-5">
          {Calculator_Arr.map((item) => (
            <div
              key={item.id}
              className={`${
                item.id !== "4"
                  ? "col-span-3 border-primaryBorder  border-r "
                  : "col-span-2"
              } cursor-pointer flex items-center flex-col relative z-10`}
            >
              {item.id === "4" ? (
                <div
                  className="w-full flex items-center justify-center"
                  onClick={() => setActivePlan(item)}
                >
                  {item.icon}
                </div>
              ) : (
                <div onClick={() => setActivePlan(item)} className="">
                  <p className="text-base text-themeDarkGray">{item.title}</p>
                  <p className="text-xl font-semibold text-themeDarkGray">
                    {item.amount}
                  </p>
                </div>
              )}
              {activePlan?.id === item?.id && (
                <div
                  className={`${
                    item.id === "4" ? "right-0" : "left-0"
                  } animate-[popup_400ms_ease-in-out] w-80 absolute common-transition top-20 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-md overflow-hidden`}
                >
                  <div className="w-full">
                    <CalculatorCard
                      curElm={item}
                      setActivePlan={setActivePlan}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex flex-col p-5 gap-2 bg-[#FFE2DF] rounded-lg">
          <div className="flex gap-1 text-themeDarkGray">
            <p className="text-lg font-semibold tracking-wide">
              Down payment assistance
            </p>
            <Info className="!text-2xl mt-0.5" />
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

export default PropertyCalculator;
