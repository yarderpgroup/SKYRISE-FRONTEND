import { CatIcon, DogIcon, ParkIcon, LeaseTermsIcon } from "assets/static";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
} from "@mui/material";
import {
  ExpandMore,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useState } from "react";
const FeesPoliciesDetails = [
  {
    id: 1,
    image: CatIcon.src,
    title: "Cats Welcome",
    description:
      "Acceptable animals include domestic cats and dogs. Dogs that are purebreds or mixes of the following breeds are prohibited: Akita, Alaskan Malamute, Chow-Chow, Doberman, German Shepherd, Great Dane, Pit Bull (American Staffordshire Terrier, American Pit Bull Terrier, Staffordshire Bull Terrier), Rottweiler, Saint Bernard, Shar Pei, and Siberian Husky. All other animals including exotic pets are prohibited. All animals must be authorized by management.",
    getData: [
      {
        id: 11,
        name: "Pet Rent",
        value: "$85/mo",
      },
      {
        id: 12,
        name: "Limit",
        value: "2 Pets Max",
      },
    ],
  },
  {
    id: 2,
    image: DogIcon.src,
    title: "Cats Welcome",
    description:
      "Acceptable animals include domestic cats and dogs. Dogs that are purebreds or mixes of the following breeds are prohibited: Akita, Alaskan Malamute, Chow-Chow, Doberman, German Shepherd, Great Dane, Pit Bull (American Staffordshire Terrier, American Pit Bull Terrier, Staffordshire Bull Terrier), Rottweiler, Saint Bernard, Shar Pei, and Siberian Husky. All other animals including exotic pets are prohibited. All animals must be authorized by management.",
    getData: [
      {
        id: 21,
        name: "Pet Rent",
        value: "$85/mo",
      },
      {
        id: 22,
        name: "Limit",
        value: "2 Pets Max",
      },
    ],
  },

  {
    id: 3,
    image: ParkIcon.src,
    title: "Parking",
    description: "",
    getData: [
      {
        id: 31,
        name: "Type",
        value: "Surface Lot",
      },
      {
        id: 32,
        name: "Parking Fee",
        value: "$25/mo",
      },
      {
        id: 33,
        name: "Assigned",
        value: "No",
      },
      {
        id: 34,
        name: "Type",
        value: "other",
      },
      {
        id: 35,
        name: "Parking Fee",
        value: "$225/mo",
      },
      {
        id: 36,
        name: "Assigned",
        value: "No",
      },
    ],
  },
  {
    id: 4,
    image: LeaseTermsIcon.src,
    title: "Lease Terms",
    description: "",
    getData: [
      {
        id: 41,
        name: "Term Type",
        value: "2, 3, 6, 7, 9, 12 month",
      },
      {
        id: 42,
        name: "Deposit",
        value: "$550",
      },
    ],
  },
];

const FeesPolicies = () => {
  const [isFeesOpen, setIsFeesOpen] = useState(false);
  return (
    // <div className="w-full">
    //   <div className="w-full md:hidden flex-col border-b border-primaryBorder">
    //     <Accordion
    //       sx={{
    //         boxShadow: "none !important",
    //         background: "",
    //         padding: "0px !important",
    //       }}
    //     >
    //       <AccordionSummary
    //         aria-controls="panel1a-content"
    //         expandIcon={<ExpandMore className="!text-4xl" />}
    //       >
    //         <div className="flex flex-col">
    //           <h1 className="text-xl text-themeDarkGray font-semibold">
    //             Fees & Policies
    //           </h1>
    //           <p className="text-sm text-themeDarkGray">
    //             pay fees & read Policies{" "}
    //           </p>
    //         </div>
    //       </AccordionSummary>

    //     </Accordion>
    //   </div>
    //   <div className="hidden md:flex flex-col w-full">
    //     <div className="flex flex-col border border-primaryBorder  text-themeDarkGray gap-4 p-5">
    //       <h1 className="text-xl text-themeDarkGray font-semibold">
    //         Fees & Policies
    //       </h1>

    //     </div>
    //   </div>
    // </div>
    <div className="w-full !text-themeDarkGray">
      <div className="flex md:hidden flex-col border-b border-primaryBorder  text-themeDarkGray w-full overflow-hidden">
        <div
          className="flex justify-between  w-full py-4"
          onClick={() => setIsFeesOpen(!isFeesOpen)}
        >
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold"> Fees & Policies</p>
            <p className="text-sm">Pay fees & read Policies</p>
          </div>
          <div className="flex items-center common-transition">
            {!isFeesOpen ? (
              <KeyboardArrowDown className="!text-4xl" />
            ) : (
              <KeyboardArrowUp className="!text-4xl" />
            )}
          </div>
        </div>
        <Collapse in={isFeesOpen} timeout="auto" unmountOnExit>
          <div className="flex flex-col md:border md:border-primaryBorder  text-themeDarkGray ">
            <div className="flex flex-col gap-4">
              {FeesPoliciesDetails?.map((item) => (
                <div className="w-full flex-col flex gap-3">
                  <div key={item.id} className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt="icon" className="w-6 h-6" />
                      <h3 className="text-lg font-semibold ml-2">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex flex-col w-full gap-3">
                      {item.getData?.map((data) => (
                        <div className="flex items-center  md:w-1/3 w-2/3 justify-between flex-wrap gap-4">
                          <h3 className="text-sm  text-themeDarkGray">
                            {data.name}:
                          </h3>
                          <p className="text-sm text-themeDarkGray">
                            {data.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm leading-5 tracking-wide">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
      <div className="md:flex hidden flex-col gap-6 border border-primaryBorder  p-5">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold"> Fees & Policies</p>
        </div>
        <div className=" grid grid-cols-12 gap-5">
          {FeesPoliciesDetails?.map((item) => (
            <div
              className={`${
                item.id === 3 || item.id === 4
                  ? "col-span-5 gap-5"
                  : "col-span-12"
              } flex gap-4`}
            >
              <div key={item.id} className="flex flex-col gap-4 w-full">
                <div className="flex items-center gap-2">
                  <img src={item.image} alt="icon" className="w-6 h-6" />
                  <h3 className="text-lg font-semibold ml-2">{item.title}</h3>
                </div>
                <div className="flex flex-col w-full gap-4">
                  {item.getData?.map((data) => (
                    <div
                      className={`${
                        item.id === 3 || item.id === 4
                          ? "justify-between"
                          : "gap-10"
                      } flex items-center gap-5 flex-wrap`}
                    >
                      <h3 className="text-sm  text-themeDarkGray">
                        {data.name}:
                      </h3>
                      <p className="text-sm text-themeDarkGray">{data.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-5 tracking-wider">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FeesPolicies;
