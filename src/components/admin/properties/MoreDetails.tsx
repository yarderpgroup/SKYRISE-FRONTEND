import { Drawer } from "@mui/material";

import { useState } from "react";
const listingInformation = [
  {
    id: 1,
    title: "Listing Information",
    info: [
      {
        id: 11,
        name: "Disclosure: Y",
      },
      {
        id: 12,
        name: "Disclosures: Seller has never lived in the property.",
      },
      {
        id: 13,
        name: "StandardStatus: Active",
      },
      {
        id: 14,
        name: "BuyerAgencyCompensation: 2.5",
      },
      {
        id: 15,
        name: "TransactionBrokerCompensation: 1",
      },
      {
        id: 16,
        name: "SubAgencyCompensation: 0",
      },
    ],
  },
];
const UtilitiesInformation = [
  {
    id: 1,
    title: "Utility Information",
    info: [
      {
        id: 11,
        name: "Internet: High speed available",
      },
      {
        id: 12,
        name: "Utilities: for Gas Range",
      },
      {
        id: 13,
        name: "Sewer: Public Sewer",
      },
      {
        id: 14,
        name: "Water Source: Public",
      },
    ],
  },
  {
    id: 2,
    title: "Heating & Cooling",
    info: [
      {
        id: 21,
        name: "Has Heating",
      },
      {
        id: 22,
        name: "Has Cooling",
      },
      {
        id: 23,
        name: "Heating: Steam, Natural Gas, Ductless",
      },
      {
        id: 24,
        name: "Cooling: Ductless",
      },
    ],
  },
];
type Props = {
  open?: any;
  handleClose: () => void;
};

const Identification = ({ open, handleClose }: Props) => {
  const [image, setImage] = useState<any>();
  return (
    <Drawer open={Boolean(open)} anchor="right" onClose={handleClose}>
      <>
        <div className="py-5">
          <h1 className="text-2xl font-bold text-themeDarkGray text-center">
            More Information Property
          </h1>
          <div className="p-5">
            <h1 className="font-semibold text-xl">Other</h1>
            <div className="gap-4 flex flex-col">
              {listingInformation.map((item) => (
                <div key={item.id} className="flex flex-col ">
                  <div className="flex flex-col gap-4">
                    <ul className="text-lg">{item.title}</ul>
                    {item.info.map((info) => (
                      <li
                        className="leading-6 text-base tracking-wide pl-2"
                        key={item.id}
                      >
                        {info?.name}
                      </li>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5">
            <h1 className="font-semibold text-xl">Utilities</h1>
            <div className="gap-4 grid grid-cols-1">
              {UtilitiesInformation.map((item) => (
                <div key={item.id} className="flex flex-col ">
                  <div className="flex flex-col gap-4">
                    <ul className="text-lg">{item.title}</ul>
                    {item.info.map((info) => (
                      <li
                        className="leading-6 text-base tracking-wide pl-2"
                        key={item.id}
                      >
                        {info?.name}
                      </li>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    </Drawer>
  );
};

export default Identification;
