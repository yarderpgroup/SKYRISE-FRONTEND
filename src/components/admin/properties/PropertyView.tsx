import { Add, Delete } from "@mui/icons-material";
import { TextFieldProps, Tooltip } from "@mui/material";
import { put } from "api";
import {
  ac,
  club,
  heating,
  internet,
  parking,
  power,
  security,
  sewer,
  swim,
  water,
} from "assets/admin/properties";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CardAmenitiesReview, CardUtilitiesReview } from ".";
import { PropertyDialog } from "../common";
import { CardAmenities } from "../dashboardGarph";
import CardUtilities from "./CardUtilities";

const viewPropertyArr = [
  {
    id: 1,
    title: "No.of Bedrooms",
    submenu: [
      {
        id: 1,
        option: 1,
      },
      {
        id: 12,
        option: 2,
      },
      {
        id: 13,
        option: 3,
      },
      {
        id: 14,
        option: 4,
      },
    ],
    head: "Add Other",
  },
];
const floorsArr = [
  {
    id: 2,
    title: "No.of Bathrooms",
    submenu: [
      {
        id: 1,
        option: 1,
      },
      {
        id: 12,
        option: 2,
      },
      {
        id: 13,
        option: 3,
      },
      {
        id: 14,
        option: 4,
      },
    ],

    head: "Add Other",
  },
];
const balconiesArr = [
  {
    id: 3,
    title: "Balconies",
    submenu: [
      {
        id: 1,
        option: 1,
      },
      {
        id: 12,
        option: 2,
      },
      {
        id: 13,
        option: 3,
      },
      {
        id: 14,
        option: 4,
      },
    ],
    head: "Add Other",
  },
];
const otherArr = [
  {
    id: 3,
    title: "No.of Floors",
    submenu: [
      {
        id: 1,
        option: 1,
      },
      {
        id: 12,
        option: 2,
      },
      {
        id: 13,
        option: 3,
      },
      {
        id: 14,
        option: 4,
      },
    ],
    head: "Add Other",
  },
];
const furnishingArr = [
  {
    id: 1,
    title: "UnFurnished",
  },
  {
    id: 2,
    title: "SemiFurnished",
  },
  {
    id: 3,
    title: "Furnished",
  },
];
const amenitiesArr = [
  {
    id: 1,
    image: parking.src,
    title: "Parking",
  },
  {
    id: 2,
    image: power.src,
    title: "Power Backup",
  },
  {
    id: 3,
    image: club.src,
    title: "Club house",
  },
  {
    id: 4,
    image: swim.src,
    title: "Swimming Pool",
  },
  {
    id: 5,
    image: security.src,
    title: "Security Personnel",
  },
];
const utilitiesArr = [
  {
    id: 1,
    image: internet.src,
    title: "Internet",
  },
  {
    id: 2,
    image: sewer.src,
    title: "Sewer",
  },
  {
    id: 3,
    image: water.src,
    title: "Water Source",
  },
  {
    id: 4,
    image: ac.src,
    title: "Ac",
  },
  {
    id: 5,
    image: heating.src,
    title: "Heating",
  },
];
const AddDetails = [
  {
    key: "1ii",
    name: "area",
    label: "Area Details",
    placeholder: "Area Details",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Area is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-6",
    required: true,
  },

  {
    key: "1ii",
    name: "square",
    label: "Sq.ft",
    options: [
      {
        label: "sq.ft",
        value: "sq.ft",
      },
      {
        label: "sq.yards",
        value: "sq.yards",
      },
      {
        label: "sq.m",
        value: "sq.m",
      },
      {
        label: "acres",
        value: "acres",
      },
      {
        label: "marla",
        value: "marla",
      },
      {
        label: "cents",
        value: "cents",
      },
    ],
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "select",
    validationSchema: Yup.string().required("Area is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-6",
    required: true,
  },
  {
    key: "1iv",
    name: "crimeScore",
    label: "Crime Score",
    placeholder: "Crime Score",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Crime Score is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-6",
    required: true,
  },
  {
    key: "1vii",
    name: "homePrice",
    label: "Average Home Price",
    placeholder: "Average Home Price",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Average Home Price is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-6",
    required: true,
  },
  {
    key: "1viii",
    name: "rentIncome",
    label: "Predicted Rent Income",
    placeholder: "Predicted Rent Income",
    styleContact: "rounded-xl overflow-hidden bg-white",
    type: "number",
    validationSchema: Yup.string().required(
      "Predicted Rent Income is Required"
    ),
    initialValue: "",
    className: "col-span-12 md:col-span-12",
    multiline: false,
    required: true,
  },
];
const PropertyView = () => {
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const [openJoinTeam, setOpenJoinTeam] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openAmenitiesReview, setOpenAmenitiesReview] = useState(false);
  const [openAmenities, setOpenAmenities] = useState(false);
  const [activeData, setActiveData] = useState("");
  const [openUtilities, setOpenUtilities] = useState(false);
  const [bedroom, setBedroom] = useState<any>();
  const [activeBathroom, setActiveBathroom] = useState<any>();
  const [activeBalconies, setActiveBalconies] = useState<any>();
  const [activeFloors, setActiveFloors] = useState<any>();
  const [activeFurnishing, setActiveFurnishing] = useState("");
  const [activeAmenities, setActiveAmenities] = useState<any>([]);
  const [activeUtilities, setActiveUtilities] = useState<any>([]);
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const initialValues = AddDetails.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  let isAllValidate = false;
  if (
    Boolean(bedroom) &&
    Boolean(activeBathroom) &&
    Boolean(activeBalconies) &&
    Boolean(activeFloors) &&
    Boolean(activeFurnishing) &&
    Boolean(activeAmenities?.length) &&
    Boolean(activeUtilities?.length)
  ) {
    isAllValidate = true;
  }

  const validationSchema = AddDetails?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);
  const handelAmenities = (Data: any) => {
    const index = activeAmenities.indexOf(Data);
    if (index !== -1) {
      const newItems = [...activeAmenities];
      newItems.splice(index, 1);
      setActiveAmenities(newItems);
    } else {
      setActiveAmenities([...activeAmenities, Data]);
    }
  };
  const handleUtilities = (Data: any) => {
    const index = activeUtilities.indexOf(Data);
    if (index !== -1) {
      // If the item exists, remove it from the array
      const newItems = [...activeUtilities];
      newItems.splice(index, 1);
      setActiveUtilities(newItems);
    } else {
      setActiveUtilities([...activeUtilities, Data]);
    }
  };
  const handelSelect = (data: string) => {
    setOpenJoinTeam(true);
    setActiveData(data);
  };
  const handleSubmit = async (values: any) => {
    if (!isAllValidate) return toast.error("Please add data in all fields");
    try {
      setIsStatusLoading(true);
      const response = await put({
        path: `property/${propertyID}`,
        isAlert: true,
        body: JSON.stringify({
          bedrooms: bedroom,
          bathrooms: activeBathroom,
          balconies: activeBalconies,
          totalFloors: activeFloors,
          furnishingStatus: activeFurnishing,
          amenities: activeAmenities,
          utilities: activeUtilities,
          estimatePrice: values.estimetedPrice,
          crimeScore: values.crimeScore,
          averageHomePrice: values.homePrice,
          predictedRentPrice: values.rentIncome,
          totalArea: values?.area,
          measureIn: values.square,
        }),
      });

      if (response.status === 200) {
        Router.push(
          `/panel/admin/properties/add-property/other-details?propertyID=${propertyID}`
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

  const handleBack = () => {
    Router.push(`/panel/admin/properties/add-property/property-form`);
  };
  return (
    <>
      <PropertyDialog
        open={openJoinTeam}
        onClose={() => setOpenJoinTeam(false)}
        setOpenJoinTeam={setOpenJoinTeam}
        activeData={activeData}
        setActiveFloors={setActiveFloors}
        setActiveBalconies={setActiveBalconies}
        setActiveBathroom={setActiveBathroom}
        setBedroom={setBedroom}
      />
      <CardAmenities
        open={openAmenities}
        onClose={() => setOpenAmenities(false)}
        setOpenAmenities={setOpenAmenities}
        setActiveAmenities={setActiveAmenities}
        activeAmenities={activeAmenities}
      />
      <CardUtilitiesReview
        activeUtilities={activeUtilities}
        open={openReview}
        onClose={() => setOpenReview(false)}
        setActiveUtilities={setActiveUtilities}
      />
      <CardAmenitiesReview
        open={openAmenitiesReview}
        onClose={() => setOpenAmenitiesReview(false)}
        activeAmenities={activeAmenities}
        setActiveAmenities={setActiveAmenities}
      />
      <CardUtilities
        open={openUtilities}
        onClose={() => setOpenUtilities(false)}
        setOpenUtilities={setOpenUtilities}
        setActiveUtilities={setActiveUtilities}
        activeUtilities={activeUtilities}
      />
      <div className="!py-5 flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-themeDarkGray">
          Tell us about your property
        </h1>
        <div className="flex flex-col w-full gap-10">
          {/* .....................all room section......................... */}
          <div className="grid grid-cols-2 gap-[4em]">
            {viewPropertyArr.map((item) => (
              <div>
                <div key={item?.id}>
                  <h1 className="text-themeDarkGray font-bold text-base">
                    {item?.title}
                  </h1>
                </div>
                <div className="flex gap-5 py-5">
                  {item?.submenu?.map((innerItem) => (
                    <button
                      onClick={() => setBedroom(innerItem?.option)}
                      className={`h-10 w-10 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] common-transition rounded-full  flex items-center  justify-center border border-white  ${
                        bedroom === innerItem?.option
                          ? "bg-blue-600 text-white"
                          : "bg-white text-themeDarkGray "
                      }`}
                    >
                      {innerItem?.option}
                    </button>
                  ))}
                </div>

                <div
                  onClick={() => handelSelect(item?.title)}
                  className="flex gap-2 cursor-pointer justify-center items-center w-44 tracking-wider font-bold text-base h-10 rounded-full  text-white bg-blue-600 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border py-2"
                >
                  <Add className="" />
                  <button className="">{item?.head}</button>
                </div>
              </div>
            ))}
            {/*bathroom*/}
            {floorsArr.map((item) => (
              <div>
                <div key={item?.id}>
                  <h1 className="text-themeDarkGray font-bold text-base">
                    {item?.title}
                  </h1>
                </div>
                <div className="flex gap-5 py-5">
                  {item?.submenu?.map((innerItem) => (
                    <button
                      onClick={() => setActiveBathroom(innerItem?.option)}
                      className={`h-10 w-10  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] common-transition rounded-full  flex items-center  justify-center border  ${
                        activeBathroom === innerItem?.option
                          ? "bg-blue-600 text-white"
                          : "bg-white text-themeDarkGray "
                      }`}
                    >
                      {innerItem?.option}
                    </button>
                  ))}
                </div>

                <div
                  onClick={() => handelSelect(item?.title)}
                  className="flex gap-2 cursor-pointer justify-center items-center w-44 tracking-wider font-bold text-base h-10 rounded-full  text-white bg-blue-600 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border py-2"
                >
                  <Add className="" />
                  <button className="">{item?.head}</button>
                </div>
              </div>
            ))}
            {/*end bathroom*/}
            {/*balconies*/}
            {balconiesArr.map((item) => (
              <div>
                <div key={item?.id}>
                  <h1 className="text-themeDarkGray font-bold text-base">
                    {item?.title}
                  </h1>
                </div>
                <div className="flex gap-5 py-5">
                  {item?.submenu?.map((innerItem) => (
                    <button
                      onClick={() => setActiveBalconies(innerItem?.option)}
                      className={`h-10 w-10  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] common-transition rounded-full  flex items-center  justify-center border  ${
                        activeBalconies === innerItem?.option
                          ? "bg-blue-600 text-white"
                          : "bg-white text-themeDarkGray "
                      }`}
                    >
                      {innerItem?.option}
                    </button>
                  ))}
                </div>

                <div
                  onClick={() => handelSelect(item?.title)}
                  className="flex gap-2 cursor-pointer justify-center items-center w-44 tracking-wider font-bold text-base h-10 rounded-full  text-white bg-blue-600 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border py-2"
                >
                  <Add className="" />
                  <button className="">{item?.head}</button>
                </div>
              </div>
            ))}
            {/*end balconies*/}
            {/*floors*/}
            {otherArr.map((item) => (
              <div>
                <div key={item?.id}>
                  <h1 className="text-themeDarkGray font-bold text-base">
                    {item?.title}
                  </h1>
                </div>
                <div className="flex gap-5 py-5">
                  {item?.submenu?.map((innerItem) => (
                    <button
                      onClick={() => setActiveFloors(innerItem?.option)}
                      className={`h-10 w-10  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] common-transition rounded-full  flex items-center  justify-center border  ${
                        activeFloors === innerItem?.option
                          ? "bg-blue-600 text-white"
                          : "bg-white text-themeDarkGray "
                      }`}
                    >
                      {innerItem?.option}
                    </button>
                  ))}
                </div>

                <div
                  onClick={() => handelSelect(item?.title)}
                  className="flex gap-2 cursor-pointer justify-center items-center w-44 tracking-wider font-bold text-base h-10 rounded-full  text-white bg-blue-600 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border py-2"
                >
                  <Add className="" />
                  <button className="">{item?.head}</button>
                </div>
              </div>
            ))}
            {/*endfloors*/}
          </div>
          {/* .....................all room section......................... */}

          {/*  ............................room count section.................................. */}
          <div className="w-full flex items-center justify-between p-3 rounded-lg bg-themeGray/20 ">
            <p className="font-semibold flex gap-3 items-center">
              {`No of Bedrooms: ${bedroom || "N/A"}`}
              {bedroom && (
                <Tooltip title="Remove">
                  <p
                    onClick={() => setBedroom(null)}
                    className="h-9 w-9 bg-gradient-to-br from-theme to-themeDarkGray text-white flex items-center justify-center rounded-lg cursor-pointer"
                  >
                    <Delete className="" />
                  </p>
                </Tooltip>
              )}
            </p>
            <p className="font-semibold flex gap-3 items-center">
              {`No of Bathrooms: ${activeBathroom || "N/A"}`}
              {activeBathroom && (
                <Tooltip title="Remove">
                  <p
                    onClick={() => setActiveBathroom(null)}
                    className="h-9 w-9 bg-gradient-to-br from-theme to-themeDarkGray text-white flex items-center justify-center rounded-lg cursor-pointer"
                  >
                    <Delete className="" />
                  </p>
                </Tooltip>
              )}
            </p>

            <p className="font-semibold flex gap-3 items-center">
              {`No of Balconies: ${activeBalconies || "N/A"}`}
              {activeBalconies && (
                <Tooltip title="Remove">
                  <p
                    onClick={() => setActiveBalconies(null)}
                    className="h-9 w-9 bg-gradient-to-br from-theme to-themeDarkGray text-white flex items-center justify-center rounded-lg cursor-pointer"
                  >
                    <Delete className="" />
                  </p>
                </Tooltip>
              )}
            </p>

            <p className="font-semibold flex gap-3 items-center">
              {`No of Floors: ${activeFloors || "N/A"}`}
              {Boolean(activeFloors) && (
                <Tooltip title="Remove">
                  <p
                    onClick={() => setActiveFloors(null)}
                    className="h-9 w-9 bg-gradient-to-br from-theme to-themeDarkGray text-white flex items-center justify-center rounded-lg cursor-pointer"
                  >
                    <Delete className="" />
                  </p>
                </Tooltip>
              )}
            </p>
          </div>
          {/*  ............................end of room count section............................ */}

          {/* .........................furnishing status...............................  */}
          <div>
            <h1 className="text-xl text-themeDarkGray font-bold">
              Furnishing status
            </h1>
            <div className="flex gap-5 py-6">
              {furnishingArr?.map((item) => (
                <div key={item?.id} className="">
                  <button
                    onClick={() =>
                      setActiveFurnishing((prv: string) =>
                        prv === item?.title ? "" : item?.title
                      )
                    }
                    className={`flex gap-2 cursor-pointer justify-center items-center w-56 tracking-wider font-semibold text-base h-10 rounded-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  border-primaryBorder px-5 py-2 hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] common-transition ${
                      activeFurnishing === item?.title
                        ? " text-themeDarkGray shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-primary"
                        : "bg-white text-themeDarkGray "
                    }`}
                  >
                    {item?.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* ........................end of furnishing status..........................  */}

          {/* ..........................amenities section.......................... */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl text-themeDarkGray font-bold">Amenities</h1>
            <button
              onClick={() => setOpenAmenitiesReview(true)}
              className="btn-one"
            >
              Review
            </button>
          </div>
          <div className="grid gap-5 grid-cols-12 w-fit">
            {amenitiesArr?.map((item) => (
              <div
                onClick={() => handelAmenities(item?.title)}
                className={`justify-center md:col-span-3 col-span-6 common-transition   2xl:h-44 h-40 flex flex-col p-5 w-full  cursor-pointer items-center text-center group bg-gradient-to-b to-themeGray/10 from-white rounded-lg ${
                  activeAmenities.includes(item?.title)
                    ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-theme"
                    : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  "
                }`}
              >
                <div>
                  <img
                    src={item?.image}
                    alt="image"
                    className="w-12 h-12 md:h-full object-cover  "
                  />
                </div>
                <div className="py-4">
                  <h1 className="tracking-wider  md:text-xs lg:text-sm">
                    {item?.title}
                  </h1>
                </div>
              </div>
            ))}
            <div
              onClick={() => setOpenAmenities(true)}
              className="h-40 2xl:h-44 flex flex-col p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] 2xl:w-64 w-48 rounded-lg justify-center cursor-pointer items-center text-center "
            >
              <div className="bg-blue-600 rounded-lg w-fit">
                <Add className="w-[3rem] h-[3rem] md:h-full object-cover  text-white " />
              </div>
              <div className="py-4">
                <button>Add Others</button>
              </div>
            </div>
          </div>

          {/* ..........................end of amenities section.......................... */}

          {/* ..........................Utilities section ....................*/}
          <div>
            <div className="flex gap-4 items-center">
              <h1 className="text-xl text-themeDarkGray font-bold">
                Utilities
              </h1>
              <button onClick={() => setOpenReview(true)} className="btn-one">
                Review
              </button>
            </div>
            <div className="grid gap-5 grid-cols-12 w-full py-6">
              {utilitiesArr?.map((item) => (
                <div
                  onClick={() => handleUtilities(item?.title)}
                  className={`justify-center md:col-span-3 col-span-6 common-transition   2xl:h-44 h-40 flex flex-col p-5 w-full   cursor-pointer items-center text-center group bg-gradient-to-b to-themeGray/10 from-white rounded-lg ${
                    activeUtilities.includes(item?.title)
                      ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-theme"
                      : "shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  "
                  }`}
                >
                  <div>
                    <img
                      src={item?.image}
                      alt="image"
                      className="w-12 h-12 md:h-full object-cover  "
                    />
                  </div>
                  <div className="py-4">
                    <h1 className="tracking-wider  md:text-xs lg:text-sm">
                      {item?.title}
                    </h1>
                  </div>
                </div>
              ))}
              <div
                onClick={() => setOpenUtilities(true)}
                className="h-40 2xl:h-44 flex flex-col p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] 2xl:w-64 w-48 rounded-lg justify-center cursor-pointer items-center text-center "
              >
                <div className="bg-blue-600 rounded-lg ">
                  <Add className="w-[3rem] h-[3rem] md:h-full object-cover  text-white " />
                </div>
                <div className="py-4">
                  <button>Add Others</button>
                </div>
              </div>
            </div>
          </div>
          {/* ..........................end of Utilities section ....................*/}

          <div className=" w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-4">
                  {AddDetails.map((inputItem) => (
                    <Field name={inputItem.name} key={inputItem.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <div
                          className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                        >
                          <div className="font-semibold">{inputItem.label}</div>

                          <div className="col-span-6 w-full">
                            <InputField
                              title={inputItem?.label}
                              key={inputItem?.key}
                              name={inputItem?.name}
                              type={inputItem?.type}
                              options={inputItem.options}
                              placeholder={inputItem.placeholder}
                              value={formik?.values[inputItem?.name]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              fullWidth
                              error={Boolean(
                                formik?.touched[inputItem?.name] &&
                                  formik?.errors[inputItem?.name]
                              )}
                              helperText={
                                formik?.touched[inputItem?.name] &&
                                (formik?.errors[inputItem?.name] as any)
                              }
                            />
                          </div>
                        </div>
                      )}
                    </Field>
                  ))}
                  <div className="flex items-center col-span-12 justify-between fle-col gap-2 pt-2">
                    <RippleLoadingButton
                      type="submit"
                      title="Save & Next"
                      className="w-full"
                      loading={isStatusLoading}
                      isDisabled={isAllValidate}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyView;
