import { Checkbox, TextField } from "@mui/material";
import { post } from "api";
import {
  farmhouse,
  flat,
  home,
  hospital,
  industry,
  office,
  others,
  plot,
  retail,
  service,
  stoarge,
  studio,
} from "assets/admin/properties";
import { InputField, RippleLoadingButton } from "components/core";
import CustomDialog from "components/core/CustomDialog";
import Router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
const Property_Type = [
  {
    id: "1",
    title: "Sell",
    subtitle: "What Kind of property do you have?",
    heading: [
      {
        id: 1,
        subtitle: "Residential",
        submenus: [
          {
            id: 11,
            image: flat.src,
            options: "Flat Apartment",
          },
          {
            id: 12,
            image: home.src,
            options: "Independent House/villa",
          },
          {
            id: 13,
            image: home.src,
            options: "Independent /BuilderFloor",
          },
          {
            id: 14,
            image: plot.src,
            options: "Plot/Land",
          },
          {
            id: 15,
            image: studio.src,
            options: "1 RK Studio Apartment/villa",
          },
          {
            id: 16,
            image: service.src,
            options: "Service Apartment",
          },
          {
            id: 12,
            image: farmhouse.src,
            options: "Farmhouse",
          },
          {
            id: 12,
            image: others.src,
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
            image: office.src,
            options: "Office",
          },
          {
            id: 12,
            image: retail.src,
            options: "Retail",
          },
          {
            id: 13,
            image: plot.src,
            options: "Plot/Land",
          },
          {
            id: 14,
            image: stoarge.src,
            options: "Storage",
          },
          {
            id: 15,
            image: industry.src,
            options: "Industry",
          },
          {
            id: 16,
            image: hospital.src,
            options: "Hospitality",
          },

          {
            id: 12,
            image: others.src,
            options: "Others",
          },
        ],
      },
    ],
  },
];
type Props = {
  mutate?: any;
};
const PropertiesBasicDetails = ({ mutate }: Props) => {
  const [checked, setChecked] = useState("Residential");
  const [activeType, setActiveType] = useState("");
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isType, setIsType] = useState("");

  const handleChange = (title: string) => {
    return setChecked(title);
  };
  const [activeButton, setActiveButton] = useState("Sell");
  const handleSubmit = async (values: any) => {
    try {
      setIsStatusLoading(true);

      const response = await post({
        path: `property/create`,
        isAlert: true,
        body: JSON.stringify({
          type: "SELL",
          propertyType: activeType,
          selectedType: checked,
        }),
      });
      if (response.status === 200) {
        Router.push(
          `/panel/admin/properties/add-property/property-form?propertyID=${response?.data?._id}`
        );
        setIsStatusLoading(false);
      }
      if (response?.error) {
        setIsStatusLoading(false);
      }
    } catch (error: any) {
      setIsStatusLoading(false);

      toast.error(error);
    }
  };

  const handleSelect = (data: any) => {
    if (data?.options !== "Others") {
      setActiveType((prv: any) => (prv === data?.options ? "" : data?.options));
      setIsType("");
      return;
    }
    setIsOpenModel(true);
    setIsType("Others");
    setActiveType("");
  };
  const handleClose = () => {
    toast.success("Added successfully");
    setIsOpenModel(false);
  };
  return (
    <div className="">
      <CustomDialog
        maxWidth="sm"
        open={isOpenModel}
        onClose={() => setIsOpenModel(false)}
      >
        <div className="p-5 flex flex-col gap-3">
          <p className="font-semibold text-lg">Other</p>
          <InputField
            title="Add other"
            name="other"
            type="text"
            value={activeType}
            onChange={(e) => setActiveType(e.target.value)}
            fullWidth
          />
          <button className="btn-two" onClick={handleClose}>
            Add
          </button>
        </div>
      </CustomDialog>
      <h1 className="md:text-3xl text-2xl font-bold text-themeDarkGray">
        Welcome Fill Out Basic Details
      </h1>
      <div className="flex w-full flex-col">
        {Property_Type.map((item) => (
          <div key={item?.id}>
            {activeButton === item.title && (
              <div className="w-full">
                <h2 className="text-themeDarkGray text-lg md:text-xl py-4">
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
                <div className="w-full ">
                  {item?.heading?.map((curElm) => (
                    <div className="w-full flex">
                      {checked === curElm.subtitle && (
                        <div className="grid grid-cols-12 gap-4 md:gap-6 py-6 w-full ">
                          {curElm?.submenus?.map((item) => (
                            <div
                              onClick={() => handleSelect(item)}
                              className={`md:col-span-3 col-span-6 common-transition hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] h-44 flex flex-col p-5 w-full  cursor-pointer items-center text-center group bg-gradient-to-b to-themeGray/10 from-white rounded-lg
                              ${
                                activeType === item?.options ||
                                isType === item?.options
                                  ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-theme"
                                  : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
                              }  `}
                            >
                              <div className="w-16 flex items-center justify-center h-16 border  rounded-full">
                                <img
                                  src={item?.image}
                                  alt="image"
                                  className="w-10 object-cover rounded-md "
                                />
                              </div>
                              <div className="py-4">
                                <h1 className="tracking-wider md:text-xs lg:text-sm">
                                  {item?.options}
                                </h1>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* end of all the options */}
              </div>
            )}
            <div className="flex items-center col-span-12 justify-between flex-col gap-2 pt-2">
              {/* <button
                onClick={handleSubmit}
                className="btn-one w-full rounded-md !py-2.5 "
              >
                Save & Next
              </button> */}
              <RippleLoadingButton
                type="submit"
                title="Save & Next"
                className="w-full"
                loading={isStatusLoading}
                handleClick={handleSubmit}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesBasicDetails;
