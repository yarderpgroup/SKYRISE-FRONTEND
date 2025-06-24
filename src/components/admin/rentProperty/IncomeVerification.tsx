import React from "react";
import { AdharCard, DL, Passport, IncomeProof } from "assets/admin";
import dayjs from "dayjs";
const IncomeVerificationDetails = [
  {
    id: 1,
    incomeType: "Employment",
    yearlyIncome: "100000",
    additionalDetails: "I am working in Google",
    startDate: "1 Jan 2021",
    endDate: "12 Dec 2050",
    IncomeProof: IncomeProof.src,
  },
];
const IncomeVerification = ({ viewDetails }: { viewDetails: any }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Income Verification</h1>
      <div className="w-full flex gap-4">
        <div className="w-full  overflow-hidden  h-52 flex bg-white rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
          <div className="w-1/2">
            <img
              src={viewDetails?.incomeProof}
              alt="govIssuedId"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col p-4">
            <div className="flex gap-2">
              <p className="text-base text-themeDarkGray font-semibold">
                Income Type:{" "}
              </p>
              <h1 className="text-base text-themeDarkGray">
                {viewDetails?.type}
              </h1>
            </div>
            <div className="flex gap-2">
              <p className="text-base text-themeDarkGray font-semibold">
                Yearly Income:{" "}
              </p>
              <p className="text-base">{viewDetails?.package}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-base text-themeDarkGray font-semibold">
                Details:{" "}
              </p>
              <p className="text-base">{viewDetails?.details}</p>
            </div>
            <div className="flex gap-2">
              <p className="text-base text-themeDarkGray font-semibold">
                Start Date:{" "}
              </p>
              <p className="text-base">
                {" "}
                {dayjs(viewDetails?.startDate).format("LL")}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="text-base text-themeDarkGray font-semibold">
                End Date:{" "}
              </p>
              <p className="text-base">
                {" "}
                {dayjs(viewDetails?.endDate).format("LL")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeVerification;
