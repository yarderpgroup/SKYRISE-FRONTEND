import { StepFive, StepFour } from "../../assets/staticImages";
import PublicLayout from "../../layouts/publicLayout";
import React from "react";

const offer_Arr = [
  {
    id: 1,
    title: "Your Offer Status",
    features: [
      {
        id: 11,
        type: "Status",
        des: "Submitted",
      },
      {
        id: 12,
        type: "Created On",
        des: "Thu, Jan 5, 2023 3:07 PM",
      },
    ],
  },
  {
    id: 2,
    title: "Your Offer",
    features: [
      {
        id: 21,
        type: "MLS Status",
        des: "Active",
      },
      {
        id: 22,
        type: "MLS#",
        des: "73044950",
      },
      {
        id: 23,
        type: "Your Price",
        des: "",
      },
    ],
  },
  {
    id: 3,
    title: "Basic Details",
    features: [
      {
        id: 31,
        type: "Buyer Name",
        des: "Jane Doe",
      },
      {
        id: 32,
        type: "Email",
        des: "smile@gmail.com",
      },
      {
        id: 33,
        type: "Phone",
        des: "(234) 567-8900",
      },
    ],
  },
  {
    id: 4,
    title: "Financing",
    features: [
      {
        id: 41,
        type: "Loan Type",
        des: "",
      },
      {
        id: 32,
        type: "Down Payment",
        des: "",
      },
    ],
  },
];
const CheckOutProperty = () => {
  return (
    <PublicLayout title="Offer Summary | Real Estate">
      <section className="w-full ">
        <div className="bg-[#F3F3F3] flex-col gap-2 md:gap-3 py-5 text-themeDarkGray flex items-center justify-center">
          <p className="text-xl font-semibold">Offer terms received!</p>
          <p>
            A local agent will reach out shortly by phone or <br /> email to
            discuss your offer and how we can help.
          </p>
        </div>
        <div className="md:py-10 py-5 gap-5 md:gap-10 flex flex-col md:flex-row md:justify-between custom-container text-themeDarkGray w-full">
          <div className="md:w-1/2 w-full flex flex-col gap-6 md:gap-8 !order-2 md:!order-1">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">What Happens Next?</p>
              <p>
                If you decide to work with us after speaking to your agent, your
                agent will guide you through the entire offer process from
                helping you prepare your offer to sending it to the seller and
                negotiating on your behalf.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">
                Are you pre-approved for a mortgage?
              </p>
              <p>
                Your offer is stronger when you have a pre-approval in hand.
              </p>
            </div>
            <div>
              <button className="gradientButton py-2 w-40 text-white rounded-md">
                Compare Rates
              </button>
            </div>
            <div className="flex w-full border-y py-3 border-primaryBorder text-[#000BFF]">
              <p className="w-1/2 flex text-center justify-center border-r border-primaryBorder">
                View Offer Status
              </p>
              <p className="flex justify-center w-1/2">(617) 812-5046</p>
            </div>
            <div className="flex items-center justify-center py-10">
              <img src={StepFive.src} alt="" className="w-4/5" />
            </div>
          </div>
          <div className="md:w-1/2 w-full flex justify-end gap-5 !order-1 md:!order-2">
            <div className="md:w-11/12 w-full flex flex-col gap-4 md:gap-3">
              <p className="text-lg font-semibold">Offer Summary</p>
              <div className="flex flex-col gap-3">
                {/* {Feature_Property.slice(0, 1).map((item) => (
                  <div
                    key={item.id}
                    className="w-full justify-between flex flex-col md:flex-row md:items-center gap-5"
                  >
                    <img
                      src={item.image}
                      alt="logo"
                      className="md:w-48 w-full h-48 md:h-28"
                    />
                    <div className="flex gap-3 flex-row md:flex-col justify-between w-full md:w-fit">
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">
                          {item.propertyName}
                        </p>
                        <p className="text-sm">{item.location}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">{item.price}</p>
                        <p>price</p>
                      </div>
                    </div>
                    <div className="flex justify-between w-full md:w-fit gap-5 ">
                      <div className="flex flex-col px-2">
                        <p className="text-lg font-semibold">3</p>
                        <p>Beds</p>
                      </div>
                      <div className="flex flex-col px-2">
                        <p className="text-lg font-semibold">2</p>
                        <p>Baths</p>
                      </div>
                      <div className="px-2 flex flex-col">
                        <p className="text-lg font-semibold">1,851</p>
                        <p>Sq. Ft.</p>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
              <div className="flex w-full pt-5 md:pt-0 flex-col gap-2 border-b md:border-none border-primaryBorder pb-2 ">
                {offer_Arr.map((item) => (
                  <div className="flex flex-col gap-3">
                    <p className="font-semibold">{item.title}</p>
                    <div className="flex flex-col gap-3">
                      {item.features.map((item) => (
                        <div className="flex w-full justify-between">
                          <p>{item.type}</p>
                          <p>{item.des}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default CheckOutProperty;
