import React from "react";
import { AdharCard, DL, Passport, IncomeProof } from "assets/admin";
const TenantBasicInformation = [
  {
    id: 1,
    name: "Natasha Dalal",
    email: "natashadalal@gmail.com",
    phone: "7890656671",
    about: "I am a student",
    govIssuedId: DL.src,
    coApplicant: "Partner",
    petCount: 1,
    petDetails: "Labrador",
  },
];

const BasicInformation = ({
  viewDetails,
  tenant,
}: {
  viewDetails: any;
  tenant: any;
}) => {
  return (
    <div className="w-full flex gap-4 flex-col">
      <h1 className="text-xl font-semibold ">Basic Information</h1>
      <div className="w-full h-52 overflow-hidden   flex bg-white rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
        <div className="w-1/2 ">
          <img
            src={viewDetails?.govtID}
            alt="govIssuedId"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col p-4">
          <div className="flex gap-2">
            <p className="text-base text-themeDarkGray font-semibold">
              Tenant Name:{" "}
            </p>
            <h1 className="text-base text-themeDarkGray">
              {tenant?.firstName}
              {tenant?.lastName}
            </h1>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-themeDarkGray font-semibold">
              Email:{" "}
            </p>
            <p className="text-base text-themeDarkGray">{tenant?.email}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-themeDarkGray font-semibold">
              Phone:{" "}
            </p>
            <p className="text-base text-themeDarkGray">
              {tenant?.phoneNumber}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-themeDarkGray font-semibold">
              About:{" "}
            </p>
            <p className="text-base text-themeDarkGray">{viewDetails?.about}</p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-themeDarkGray font-semibold">
              Co-Applicant:{" "}
            </p>
            <p className="text-base text-themeDarkGray">
              {viewDetails?.coApplicants}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-themeDarkGray">
              {viewDetails?.petCount}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="text-base text-themeDarkGray font-semibold">
              Pet Details:{" "}
            </p>

            <p className="text-base text-themeDarkGray ">
              {viewDetails?.petDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
