import { ElectricIcon } from "assets/tenant";
import React from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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
const PaymentsDetails = [
  {
    id: 1,
    amount: "$ 1,000",
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

const PaymentDetails = () => {
  return (
    <div className="w-full flex flex-col gap-3 md:gap-4 text-themeDarkGray md:p-4">
      <h1 className="text-xl font-semibold">Payment Details</h1>
      <div className="w-full flex flex-col gap-2 md:gap-4 md:px-5">
        {PaymentsDetails.map((item) => (
          <div className="w-full flex flex-col gap-4">
            <p className="text-lg font-semibold">{item.amount}/mo</p>
            <div className="w-full flex gap-2">
              <div className="flex w-fit items-center h-full flex-col justify-center">
                <div className="h-fit w-fit p-2 hidden md:block rounded-2xl bg-gradient-to-br from-gray-100 to-themeGray text-white">
                  <img src={item.icon} alt="icon" className="w-6 h-6" />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-2 md:gap-3 md:px-5">
        <h1 className="text-lg font-semibold">Payment Include:</h1>
        <div className="w-full flex flex-col gap-2">
          {paymentInclude.map((item) => (
            <div className="w-full flex gap-1 items-center">
              <CheckBoxIcon className="text-sm" />
              <p className="text-sm ">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="w-11/12 flex justify-between gap-4">
          <p className="text-xl font-semibold">Total: </p>
          <p className="text-xl font-semibold"> $1,000</p>
        </div>
        <div className="flex gap-4 items-center justify-end w-full p-2 ">
          <button className="btn-one">Continue for Payment</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
