import React from "react";
import Radio from "@mui/material/Radio";
const QuickPay = [
    {
      id: 1,
      title: "Debit card",
      desc: "Where your payment provider offers multiple type",
    },
    {
      id: 2,
      title: "Paypall",
      desc: "Where your payment provider offers multiple type",
    },
  ];

const QuickPayment = () => {
  return (
    <div className="w-full flex flex-col text-themeDarkGray gap-4 p-4">
      <h1 className="text-2xl font-semibold">Quick Payment</h1>
      <div className="w-full flex  gap-4">
        {QuickPay.map((item) => (
          <div className="w-1/2 flex items-center  gap-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-2 rounded-md">
              <div className="w-1/12">
                <Radio color="default" inputProps={{ "aria-label": "E" }} />
              </div>
              <div className="w-11/12 flex flex-col p-2">
                <h1 className="text-lg font-semibold">{item.title}</h1>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default QuickPayment;
