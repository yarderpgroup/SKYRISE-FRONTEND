import { Checkbox } from "@mui/material";
import { useState } from "react";

const Property_Type = [
  {
    id: "1",

    subtitle: "What Kind of property do you have?",
    heading: [
      {
        id: 1,
        subtitle: "Residential",
        submenus: [
          {
            id: 11,
            options: "Flat Apartment",
          },
          {
            id: 12,
            options: "Independent House/villa",
          },
          {
            id: 13,
            options: "Independent/BuilderFloor",
          },
          {
            id: 14,
            options: "Plot/Land",
          },
          {
            id: 15,
            options: "1 RK Studio Apartment/villa",
          },
          {
            id: 16,
            options: "Service Apartment",
          },
          {
            id: 12,
            options: "Farmhouse",
          },
          {
            id: 12,
            options: "Others",
          },
        ],
      },
      {
        id: 2,
        subtitle: "Commercial",
        submenus: [
          {
            id: 11,
            options: "Office",
          },
          {
            id: 12,
            options: "Retail",
          },
          {
            id: 13,
            options: "Plot/Land",
          },
          {
            id: 14,
            options: "Storage",
          },
          {
            id: 15,
            options: "Industry",
          },
          {
            id: 16,
            options: "Hospitality",
          },

          {
            id: 12,
            options: "Others",
          },
        ],
      },
    ],
  },
  //   {
  //     id: "2",

  //     subtitle: "What Kind of property do you have?",
  //     heading: [
  //       {
  //         id: 1,
  //         subtitle: "Residential",
  //         submenus: [
  //           {
  //             id: 11,
  //             options: "Flat Apartment",
  //           },
  //           {
  //             id: 12,
  //             options: "Independent House/villa",
  //           },
  //           {
  //             id: 13,
  //             options: "Independent/BuilderFloor",
  //           },
  //           {
  //             id: 14,
  //             options: "Plot/Land",
  //           },
  //           {
  //             id: 15,
  //             options: "1 RK Studio Apartment/villa",
  //           },
  //           {
  //             id: 16,
  //             options: "Service Apartment",
  //           },
  //           {
  //             id: 12,
  //             options: "Farmhouse",
  //           },
  //           {
  //             id: 12,
  //             options: "Others",
  //           },
  //         ],
  //       },
  //       {
  //         id: 2,
  //         subtitle: "Commercial",
  //         submenus: [
  //           {
  //             id: 11,
  //             options: "Office",
  //           },
  //           {
  //             id: 12,
  //             options: "Retail",
  //           },
  //           {
  //             id: 13,
  //             options: "Plot/Land",
  //           },
  //           {
  //             id: 14,
  //             options: "Storage",
  //           },
  //           {
  //             id: 15,
  //             options: "Industry",
  //           },
  //           {
  //             id: 16,
  //             options: "Hospitality",
  //           },

  //           {
  //             id: 12,
  //             options: "Others",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // {
  //   id: "3",
  //   title: "PG",
  //   subtitle: "What Kind of property do you have?",
  //   heading: [
  //     {
  //       id: 1,
  //       subtitle: "Residential",
  //       submenus: [
  //         {
  //           id: 11,
  //           options: "Flat Apartment",
  //         },
  //         {
  //           id: 12,
  //           options: "Independent House/villa",
  //         },
  //         {
  //           id: 13,
  //           options: "Independent/BuilderFloor",
  //         },
  //         {
  //           id: 14,
  //           options: "Plot/Land",
  //         },
  //         {
  //           id: 15,
  //           options: "1 RK Studio Apartment/villa",
  //         },
  //         {
  //           id: 16,
  //           options: "Service Apartment",
  //         },
  //         {
  //           id: 12,
  //           options: "Farmhouse",
  //         },
  //         {
  //           id: 12,
  //           options: "Others",
  //         },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       subtitle: "Commercial",
  //       submenus: [
  //         {
  //           id: 11,
  //           options: "Office",
  //         },
  //         {
  //           id: 12,
  //           options: "Retail",
  //         },
  //         {
  //           id: 13,
  //           options: "Plot/Land",
  //         },
  //         {
  //           id: 14,
  //           options: "Storage",
  //         },
  //         {
  //           id: 15,
  //           options: "Industry",
  //         },
  //         {
  //           id: 16,
  //           options: "Hospitality",
  //         },

  //         {
  //           id: 12,
  //           options: "Others",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
const ManagePropertyDetails = () => {
  const [checked, setChecked] = useState("");
  const handleChange = (title: string) => {
    setChecked(title);
  };
  const [activeButton, setActiveButton] = useState("Sell");
  return (
    <div className="pt-7">
      <h1 className="text-3xl font-bold text-themeDarkGray">
        Welcome Fill Out Basic Details
      </h1>
      <div className="">
        {/* for buy sell and rent option */}
        <div className="w-full  flex  gap-3 md:gap-5 items-start justify-start py-4">
          {/* {Property_Type.map((item) => (
            <div
         
              className={`${
                item.title === activeButton
                  ? "bg-themeDarkGray text-white"
                  : "bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] font-bold  text-themeDarkGray"
              } flex cursor-pointer relative w-32 py-2  common-transition justify-center rounded-3xl items-center`}
              key={item?.id}
            >
              <p className="text-">{item?.title}</p>
            </div>
          ))} */}
        </div>
        {/*end of for buy sell and rent option */}

        <div className="flex w-full flex-col">
          {Property_Type.map((item) => (
            <div key={item?.id}>
              {/* {activeButton === item.title && ( */}
              <div>
                <h2 className="text-themeDarkGray text-xl font-bold py-4">
                  {item?.subtitle}
                </h2>

                {/* for residential and Commercial */}
                <div className="flex gap-2">
                  {item?.heading?.map((innerItem) => (
                    <div
                      onClick={() => handleChange(innerItem.subtitle)}
                      className="flex items-center"
                    >
                      <div>
                        <Checkbox
                          sx={{
                            color: "#999999",
                            "&.Mui-checked": {
                              color: "#E33324",
                            },
                          }}
                          value={innerItem.subtitle}
                          checked={innerItem.subtitle === checked}
                          onChange={() => handleChange(innerItem.subtitle)}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </div>
                      <p className="md:text-lg text-xs cursor-pointer">
                        {innerItem.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
                {/* end of residential and Commercial */}

                {/* all the options */}
                <div>
                  {item.heading.map((curElm) => (
                    <div className="w-full flex">
                      {checked === curElm.subtitle && (
                        <div className="grid grid-cols-3 justify-center items-center gap-6 py-6">
                          {curElm?.submenus?.map((item) => (
                            <div className="">
                              <button className=" w-[50%] lg:w-full tracking-wider font-bold text-base h-12 rounded-full  text-themeDarkGray  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border border-primaryBorder px-5 hover:bg-themeDarkGray hover:text-white cursor-pointer">
                                {item?.options}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* end of all the options */}
              </div>
              {/* )} */}
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePropertyDetails;
