import React from "react";
import Radio from "@mui/material/Radio";
import { ElectricIcon, WaterIcon } from "assets/tenant";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const QuickPay = [
  {
    id: 1,
    title: "debit card",
    desc: "Where your payment provider offers multiple type",
  },
  {
    id: 2,
    title: "Paypall",
    desc: "Where your payment provider offers multiple type",
  },
];

const PaymentDetails = [
  {
    id: 1,
    amount: "$ 1,000/mo",
    title: "Electricity",
    desc: "Where your payment provider offers multiple type",
    icon: ElectricIcon.src,
  },
  // {
  //   id: 2,
  //   amount: "$ 1,000/mo",
  //   title: "Water bill",
  //   desc: "Where your payment provider offers multiple type",
  //   icon: WaterIcon.src,
  // },
];

const paymentInclude = [
  {
    id: 1,
    title: "sale for fine",
  },
  {
    id: 2,
    title: "more efficient use of electricity",
  },
  {
    id: 3,
    title: "subsides category 900vh,IDR 1,352/kwh",
  },
  {
    id: 4,
    title: "More Practical and Efficient use",
  },
];

const PaymentOverview = () => {
  return (
    <div className="w-full flex flex-col text-themeDarkGray gap-4 ">
      <h1 className="text-2xl font-semibold">Quick Payment</h1>
      <div className="w-full flex  gap-4">
        {QuickPay.map((item) => (
          <div className="w-full flex  gap-1 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-4 rounded-md">
            <div className="w-full flex flex-row gap-4">
              <div className="w-1/12">
                <Radio color="default" inputProps={{ "aria-label": "E" }} />
              </div>
              <div className="w-11/12 flex flex-col">
                <h1 className="text-lg font-semibold">{item.title}</h1>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Details</h1>
        <div className="w-full flex flex-col gap-4 px-5">
          {PaymentDetails.map((item) => (
            <div className="w-full flex flex-col gap-4">
              <p className="text-lg font-semibold">{item.amount}</p>
              <div className="w-full flex gap-2">
                <div className="flex w-fit items-center h-full flex-col justify-center">
                  <div className="h-fit w-fit p-2 hidden md:block rounded-2xl bg-gradient-to-br from-gray-100 to-themeGray text-white">
                    <img src={item.icon} alt="icon" className="w-6 h-6" />
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <p className="text-sm">{item.title}</p>
                  <p className="text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-4 px-5">
          <h1 className="text-lg font-semibold">Payment Include</h1>
          <div className="w-full flex flex-col gap-2">
            {paymentInclude.map((item) => (
              <div className="w-full flex gap-1 items-center">
                <CheckBoxIcon className="text-sm"/>
                <p className="text-sm font-semibold">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="w-1/3 flex justify-between gap-4">
            <p className="text-sm font-semibold">Total: </p>
            <p className="text-sm font-semibold"> $1,000,000</p>
          </div>
          <div className="flex flex-col gap-4 items-center w-11/12 pt-2 ">
            <button className="gradientButton rounded-md text-white py-2 w-44">
              Continue for Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOverview;
