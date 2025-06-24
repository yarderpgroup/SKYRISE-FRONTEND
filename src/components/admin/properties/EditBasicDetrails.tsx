import React from "react";
import { Checkbox, IconButton, TextFieldProps } from "@mui/material";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

const BasicPropertySchema = [
  {
    key: 1,
    name: "propertyName",
    label: "Property Name",
    placeHolder: "Property Name",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 2,
    name: "propertyType",
    label: "Property Type",
    placeHolder: "Property Type",
    initialValue: "",
    type: "select",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 3,
    name: "selectedType",
    label: "Selected Type",
    placeHolder: "Selected Type",
    initialValue: "",
    type: "select",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 4,
    name: "address",
    label: "Address",
    placeHolder: "Enter Address",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 5,
    name: "propertyName",
    label: "Property Name",
    placeHolder: "Property Name",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 6,
    name: "balconies",
    label: "Balconies",
    placeHolder: "Balconies",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 7,
    name: "bathrooms",
    label: "Bathrooms",
    placeHolder: "Bathrooms",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 8,
    name: "bedrooms",
    label: "Bedrooms",
    placeHolder: "Bedrooms",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 9,
    name: "totalArea",
    label: "Total Area",
    placeHolder: "Total Area",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 10,
    name: "totalFloors",
    label: "Total Floors",
    placeHolder: "Total Floors",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 11,
    name: "crimeScore",
    label: "Crime Score",
    placeHolder: "Crime Score",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 12,
    name: "estimatePrice",
    label: "EstimatePrice",
    placeHolder: "EstimatePrice",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 13,
    name: "furnishingStatus",
    label: "Furnishing Status",
    placeHolder: "Furnishing Status",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 14,
    name: "predictedPrice",
    label: "Predicted Price",
    placeHolder: "Predicted Price",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 15,
    name: "averageHomePrice",
    label: "AverageHome Price",
    placeHolder: "AverageHome Price",
    initialValue: "",
    type: "text",
    className: "col-span-12 md:col-span-6",
  },
];

const initialValues = BasicPropertySchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  },
  {} as any
);

const EditBasicDetrails = () => {
  const handleEditBasicDetails = (values: any) => {};
  return (
    <div className="md:w-4/5 w-full flex flex-col items-center justify-center">
      <Formik initialValues={initialValues} onSubmit={handleEditBasicDetails}>
        {(formik) => (
          <Form className="w-full grid grid-cols-12 gap-4">
            {BasicPropertySchema.map((inputItem: any) => (
              <Field name={inputItem.name} key={inputItem.key}>
                {(props: {
                  meta: { touched: any; error: any };
                  field: JSX.IntrinsicAttributes & TextFieldProps;
                }) => (
                  <div
                    className={`flex flex-col justify-center gap-3 ${inputItem.className}`}
                  >
                    <div className="font-semibold">{inputItem.label}</div>
                    <div className="col-span-6 w-full">
                      <InputField
                        key={inputItem?.key}
                        name={inputItem?.name}
                        placeholder={inputItem.placeHolder}
                        value={formik.values[inputItem?.name]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        error={Boolean(
                          formik?.touched[inputItem.name] &&
                            formik?.errors[inputItem.name]
                        )}
                        helperText={
                          formik?.touched[inputItem.name] &&
                          (formik?.errors[inputItem.name] as any)
                        }
                      />
                    </div>
                  </div>
                )}
              </Field>
            ))}
            <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-4">
              <RippleLoadingButton title="Edit" className="w-44" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditBasicDetrails;
