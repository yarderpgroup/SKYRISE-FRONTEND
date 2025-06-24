import { Fragment, useState } from "react";
import { Info, Star, StarBorder } from "@mui/icons-material";
import CustomDialog from "components/core/CustomDialog";
import { Collapse, Rating } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TextFieldProps } from "@mui/material";
import { propertyDetails } from "components/propertyTypes/PropertyTypeCard";
import Link from "next/link";

interface Props {
  curElm: {
    id: string;
    day: string;
    month: string;
    propertyName: string;
    location: string;
    status: string;
    price: string;
    count: number;
  };
}
const contactUsSchema = [
  {
    key: 4,
    name: "comment",
    placeHolder: "Enter Comment",
    label: "Comment",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("Message is required.")
      .min(3, "Message must be at least 3 characters long."),
    className: "col-span-12 md:col-span-12",
    multiline: true,
    rows: 3,
  },
];

const initialValues = contactUsSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = contactUsSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);

const ReviewCard = ({ curElm }: Props) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const handleSubmit = () => {};
  return (
    <div className="">
      <div
        key={curElm.id}
        className={`w-full h-[4.5rem] md:h-28 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white rounded-md overflow-hidden group common-transition md:hover:shadow-2xl shadow-blue-500/20 flex justify-between gap-0 md:gap-5 ${
          isDetailsOpen ? "!shadow-2xl shadow-blue-500/20" : ""
        }`}
      >
        <div
          className={`md:w-36 w-24 bg-themeGray/10 common-transition group-hover:bg-themeDarkGray  h-full flex items-start justify-center md:gap-2 pentagon-1 p-2 flex-col group-hover:text-white ${
            isDetailsOpen ? "bg-themeDarkGray text-white" : ""
          }`}
        >
          <p className="text-sm md:text-base pl-2">{curElm.month}</p>
          <p className="text-2xl md:text-5xl font-semibold leading-6 md:leading-7">
            {curElm.day}
          </p>
          <p></p>
        </div>
        <div className="w-full grid grid-cols-12 h-full px-2 md:pr-5 ">
          <div className="flex flex-col col-span-7 md:col-span-4 justify-center">
            <p className="md:text-2xl text-base font-semibold">
              {curElm.propertyName}
            </p>
            <p className="md:text-sm text-xs">{curElm.location}</p>
          </div>
          <div className="col-span-2 font-semibold text-lg hidden md:flex justify-center items-center gap-1">
            ${curElm.price}
          </div>

          <div className="col-span-3 hidden md:flex justify-center items-center gap-1">
            {[...Array(5)]?.map((_, index) => (
              <Fragment key={index}>
                {curElm.count >= index + 1 ? (
                  <Star className="!text-2xl text-theme " />
                ) : (
                  <StarBorder className="!text-2xl" color="inherit" />
                )}
              </Fragment>
            ))}
          </div>

          <div className="flex items-center col-span-5 md:col-span-3 gap-2 md:gap-4 justify-end">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className={`w-10 py-2 items-center justify-center md:hidden flex common-transition rounded-md border-themeDarkGray border text-sm ${
                isDetailsOpen ? "!border-theme text-white bg-theme" : ""
              }`}
            >
              {curElm.count <= 0 ? "Rate" : "Edit"}
            </button>
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className={`w-fit bg-gradient-to-br from-theme to-themeDarkGray text-white common-transition p-2 rounded-md border-themeDarkGray border text-sm md:text-base `}
            >
              <Info />
            </button>
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className={`w-32 md:flex text-center items-center justify-center hidden group-hover:bg-theme group-hover:border-theme group-hover:text-white common-transition md:py-2 rounded-md border-themeDarkGray border text-sm md:text-base py-1.5 ${
                isDetailsOpen ? "!border-theme text-white bg-theme" : ""
              }`}
            >
              {curElm.count <= 0 ? "Rate & Review" : "Edit Review"}
            </button>
          </div>
        </div>
        <CustomDialog
          onClose={() => setIsDetailsOpen(false)}
          open={isDetailsOpen}
          maxWidth="sm"
        >
          <div className="w-full flex flex-col px-5 py-4 md:p-8 gap-4 md:gap-5 text-themeDarkGray">
            <p className="font-semibold text-xl">Review</p>
            <div className="w-full flex flex-col gap-2 font-semibold pt-2 md:pt-5">
              <p>Rate this house</p>
              <Rating size="large" defaultValue={2.5} precision={0.5} />
            </div>
            <div className="w-full">
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <Form className="!w-full flex flex-col gap-5">
                    {contactUsSchema.map((inputItem) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: {
                          meta: { touched: any; error: any };
                          field: JSX.IntrinsicAttributes & TextFieldProps;
                        }) => (
                          <div
                            className={`flex w-full justify-center gap-3 ${inputItem.className}`}
                          >
                            <div className="flex flex-col w-full justify-center gap-3">
                              <div className="font-semibold">
                                {inputItem.label}
                              </div>
                              <InputField
                                fullWidth
                                variant="outlined"
                                title={inputItem?.label}
                                key={inputItem?.key}
                                name={inputItem?.name}
                                type={inputItem?.type}
                                multiline={inputItem?.multiline}
                                rows={inputItem?.rows}
                                // InputProps={{
                                //   startAdornment: (
                                //     <InputAdornment position="start">
                                //       {inputItem.icon}
                                //     </InputAdornment>
                                //   ),
                                //   endAdornment: (
                                //     <InputAdornment position="end"></InputAdornment>
                                //   ),
                                // }}
                                {...(props.field as any)}
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
                    <div className="w-full flex">
                      <button
                        type="submit"
                        className="gradientButton rounded-md text-white py-2 w-fit px-4"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </CustomDialog>
      </div>
      <Collapse in={isPanelOpen}>
        <div className="py-5">
          {propertyDetails.map((innerItem) => (
            <div
              key={innerItem.id}
              className="w-full bg-white md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg cursor-pointer flex flex-col md:gap-4 gap-2 !text-themeDarkGray"
            >
              <div className="flex md:gap-3 rounded-lg h-fit md:h-64 flex-col md:flex-row w-full">
                <div className="md:w-2/5 w-full object-cover h-full relative ">
                  <Link href={"/property/1"}>
                    <img
                      src={innerItem.image}
                      alt="image"
                      className="w-full h-48 md:h-full object-cover rounded-md brightness-90"
                    />
                  </Link>
                </div>
                <div className="md:w-3/5 w-full p-3 md:p-5">
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex justify-between items-start w-full">
                      <p className="md:text-xl leading-5 md:leading-7 text-lg font-semibold text-slate-700 tracking-wider">
                        {innerItem.propertyName}
                        <p className="md:text-base font-normal text-sm md:tracking-wide">
                          {`4 bedrooms in Central Square`}
                        </p>
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-full flex">
                        {[...Array(5)]?.map((_, index) => (
                          <Fragment key={index}>
                            {curElm.count >= index + 1 ? (
                              <Star className="!text-3xl text-theme " />
                            ) : (
                              <StarBorder
                                className="!text-3xl"
                                color="inherit"
                              />
                            )}
                          </Fragment>
                        ))}
                      </div>
                      <p className="md:text-lg text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Veniam ullam, autem possimus maiores quibusdam
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default ReviewCard;
