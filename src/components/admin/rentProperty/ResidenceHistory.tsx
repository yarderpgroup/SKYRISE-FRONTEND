import dayjs from "dayjs";
import React from "react";
const ResidenceHistoryDetails = [
  {
    id: 1,
    address:
      "B-101, 3rd Floor, Shreeji Apartment, Sector 12, Dwarka, New Delhi",
    moveInDate: "12 Jan 2021",
    moveOutDate: "12 Feb 2021",
    referenceType: "Individual",
    individualName: "Rakesh Kumar Swain",
    monthlyRent: "10000",
    individualPhone: "7890656671",
    individualEmail: "swain@gmail.com",
  },
];
const ResidenceHistory = ({ viewDetails }: { viewDetails: any }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Residence History</h1>
      <div className="w-full flex flex-col gap-4">
        <div className="col-span-12 md:col-span-4">
          <div className="w-full h-full bg-white rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-4">
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold">Address: </p>
              <h1 className="text-base text-themeDarkGray">
                {viewDetails?.address}
              </h1>
            </div>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold">Move-in: </p>
              <p className="text-base">
                {dayjs(viewDetails?.moveInDate).format("LL")}
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold">Move-out: </p>
              <p className="text-base">
                {" "}
                {dayjs(viewDetails?.moveOutDate).format("LL")}
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold">Reference Type: </p>
              <p className="text-base"> {viewDetails?.referenceType}</p>
            </div>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold">Name: </p>
              <p className="text-base">{viewDetails?.displayName}</p>
            </div>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold">Monthly Rent: </p>
              <p className="text-base">{viewDetails?.rentAmount}</p>
            </div>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold">Phone: </p>
              <p className="text-base">{viewDetails?.phoneNumber}</p>
            </div>
            <div className="flex flex-row gap-4">
              <p className="text-base font-semibold">Email: </p>
              <p className="text-base">{viewDetails?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidenceHistory;
