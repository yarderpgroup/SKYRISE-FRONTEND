import dayjs from "dayjs";
import React from "react";
const WorkHistoryDetails = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    companyName: "Google",
    startDate: "12 Jan 2021",
    endDate: "12 Dec 2050",
    supervisorName: "Rakesh Kumar",
    supervisorPhone: "7890656671",
    supervisorEmail: "swain@gmail.com",
  },
];
const WorkHistory = ({ viewDetails }: { viewDetails: any }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Work History</h1>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full h-full bg-white rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-4">
          <div className="flex flex-row gap-4">
            <p className="text-base font-semibold">Job Title: </p>
            <h1 className="text-base text-themeDarkGray">
              {viewDetails?.jobTitle}
            </h1>
          </div>
          <div className="flex flex-row gap-4">
            <p className="text-base font-semibold">Company Name: </p>
            <p className="text-base">{viewDetails?.companyName}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p className="text-base font-semibold">Start Date: </p>
            <p className="text-base">
              {dayjs(viewDetails?.startDate).format("LL")}
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <p className="text-base font-semibold">End Date: </p>
            <p className="text-base">
              {dayjs(viewDetails?.endDate).format("LL")}
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <p className="text-base font-semibold">Supervisor Name: </p>
            <p className="text-base">{viewDetails?.supervisorName}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p className="text-base font-semibold">Supervisor Phone: </p>
            <p className="text-base">{viewDetails?.superVisorPhone}</p>
          </div>
          <div className="flex flex-row gap-4">
            <p className="text-base font-semibold">Supervisor Email: </p>
            <p className="text-base">{viewDetails?.supervisorEmail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkHistory;
