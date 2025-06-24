import { CircularProgress, Skeleton, TextFieldProps } from "@mui/material";
import { put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import UploadImage from "components/core/PhotoUpload";
import { PropertyImage } from "components/skeleton/property";
import { Field, Form, Formik } from "formik";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const BasicDetailsEdit = ({
  propertyDetails,
  mutate,
  isValidating,
}: {
  propertyDetails: any;
  mutate: any;
  isValidating: boolean;
}) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const propertyID = useRouter()?.query?.propertyID;
  const [isImage, setIsImage] = useState(null);
  const onFileChange = (event: any) => {
    setIsImage(event?.target?.files[0]);
  };
  const [logoImage, setLogoImage] = useState(null);
  console.log(logoImage);
  const onHandelChange = (event: any) => {
    setLogoImage(event?.target?.files[0]);
  };
  if (isValidating)
    return (
      <div className="w-full flex">
        <PropertyImage />
      </div>
    );
  const AddBankSchema = [
    {
      key: "1",
      name: "apartment",
      label: "Apartment Name",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Apartment Name is Required"),
      initialValue: propertyDetails?.propertyName,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "2",

      name: "propertyType",
      label: "Property Type",
      placeholder: "Property Type",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Property Type is Required"),
      initialValue: propertyDetails?.propertyType,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "3",

      name: "selectedType",
      label: "Selected Type",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      validationSchema: Yup.string().required("Selected Type is Required"),
      initialValue: propertyDetails?.selectedType,
      options: [
        {
          label: "Residential",
          value: "Residential",
        },
        {
          label: "Commercial",
          value: "Commercial",
        },
      ],
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "4",

      name: "address",
      label: "Address",
      placeholder: "Address",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Address is Required"),
      initialValue: propertyDetails?.address,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "5",

      name: "balconies",
      label: "Balconies",
      placeholder: "Balconies",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("balconies is Required"),
      initialValue: propertyDetails?.balconies,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "6",

      name: "bathrooms",
      label: "Bathrooms",
      placeholder: "Bathrooms",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Bathrooms is Required"),
      initialValue: propertyDetails?.bathrooms,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "7",

      name: "bedrooms",
      label: "Bedrooms",
      placeholder: "Bedrooms",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Bedrooms is Required"),
      initialValue: propertyDetails?.bedrooms,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "8",

      name: "totalArea",
      label: "TotalArea",
      placeholder: "TotalArea",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("TotalArea is Required"),
      initialValue: propertyDetails?.totalArea,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "10",

      name: "furnishingStatus",
      label: "Furnishing Status",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      options: [
        {
          label: "UnFurnished",
          value: "UnFurnished",
        },
        {
          label: "Furnished",
          value: "Furnished",
        },
      ],
      validationSchema: Yup.string().required("Furnishing Status is Required"),
      initialValue: propertyDetails?.furnishingStatus,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "11",

      name: "totalFloors",
      label: "Total Floors",
      placeholder: "Total Floors",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Total Floors  is Required"),
      initialValue: propertyDetails?.totalFloors,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "12",

      name: "measureIn",
      label: "Measure In",
      placeholder: "measureIns",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("measureIn is Required"),
      initialValue: propertyDetails?.measureIn,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "14",
      // placeholder: 'Enter your name',
      name: "country",
      label: "Country *",
      placeholder: "Country",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Country is Required"),
      initialValue: propertyDetails?.country,
      multiline: false,
      className: "col-span-12 md:col-span-6",

      required: true,
    },
    {
      key: "15",
      name: "city",
      label: "City",
      placeholder: "City",
      styleContact: "rounded-lg",
      type: "text",
      validationSchema: Yup.string().required(" City is Required"),
      initialValue: propertyDetails?.city,

      multiline: false,
      className: "col-span-12 md:col-span-6",

      required: true,
    },

    {
      key: "17",
      name: "locality",
      label: "Locality  *",
      placeholder: "Locality ",
      styleContact: "rounded-lg",
      type: "text",
      validationSchema: Yup.string().required(" Locality Name is Required"),
      initialValue: propertyDetails?.locality,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "18",
      name: "latitude",
      type: "text",
      placeholder: "Latitude",
      styleContact: "rounded-lg",
      label: "Latitude*",
      validationSchema: Yup.string().required("Latitude is required"),
      initialValue: propertyDetails?.latitude,

      className: "col-span-12 md:col-span-6",

      required: true,
    },
    {
      key: "19",
      name: "longitude",
      type: "text",
      placeholder: "Longitude",
      styleContact: "rounded-lg",
      label: "Longitude*",
      className: "col-span-12 md:col-span-6",

      validationSchema: Yup.string().required("Longitude is required"),
      initialValue: propertyDetails?.longitude,
      required: true,
    },

    {
      key: "21",

      name: "propertyDescription",
      label: "Property Description",
      placeholder: "Property Description",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required(
        "propertyDescription is Required"
      ),
      initialValue: propertyDetails?.propertyDescription,
      multiline: true,
      required: true,
      rows: 4,
      className: "col-span-12 md:col-span-12",
    },
  ];

  const initialValues = AddBankSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = AddBankSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);

      const formData = new FormData();

      formData.append("propertyType", values?.propertyType);
      formData.append("propertyName", values?.apartment);

      formData.append("selectedType", values?.selectedType);
      if (isImage) {
        formData.append(
          "propertyHeroImage",
          isImage || (propertyDetails?.propertyHeroImage as any)
        );
      }
      if (logoImage) {
        formData.append(
          "companyLogo",
          logoImage || (propertyDetails?.companyImage as any)
        );
      }
      formData.append("balconies", values?.balconies);
      formData.append("bathrooms", values?.bathrooms);
      formData.append("bedrooms", values?.bedrooms);
      formData.append("totalArea", values?.totalArea);
      formData.append("furnishingStatus", values?.furnishingStatus);
      formData.append("totalFloors", values?.totalFloors);
      formData.append("country", values?.country);
      formData.append("city", values?.city);
      formData.append("locality", values?.locality);
      formData.append("address", values?.address);
      formData.append("longitude", values?.longitude);
      formData.append("latitude", values?.latitude);
      formData.append("propertyDescription", values?.propertyDescription);
      formData.append("mapLocation", values?.mapLocation);
      const response = await put({
        path: `property/${propertyID}`,
        isAlert: true,
        isImage: true,
        body: formData,
      });
      setIsStatusLoading(false);
      mutate();
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    } finally {
      mutate();
    }
  };
  return (
    <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
      {/* <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
        Edit Basic Details
      </p> */}
      <div className="">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSend}
        >
          {(formik) => (
            <Form>
              <div className="pt-2 flex flex-col gap-4">
                <h1 className="text-xl font-bold text-themeDarkGray">
                  Property Image
                </h1>
                <div className="w-full grid grid-cols-12 overflow-hidden h-60 gap-4">
                  <div className="col-span-6 object-contain h-60 rounded-lg overflow-hidden">
                    <img
                      src={propertyDetails?.propertyHeroImage}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="col-span-6">
                    <UploadImage
                      className="!h-72"
                      image={isImage}
                      onChange={onFileChange}
                      setIsImage={setIsImage}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-5 flex flex-col gap-4">
                <h1 className="text-xl font-bold text-themeDarkGray">
                  Company Logo
                </h1>
                <div className="w-full grid grid-cols-12 overflow-hidden h-60 gap-4">
                  <div className="col-span-6 object-contain h-60 rounded-lg overflow-hidden">
                    <img
                      src={propertyDetails?.companyImage}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="col-span-6">
                    <UploadImage
                      className="!h-72"
                      image={logoImage}
                      onChange={onHandelChange}
                      setIsImage={setLogoImage}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full grid grid-cols-12 gap-2 md:gap-4 py-5">
                {AddBankSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div
                        className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                      >
                        <div className="font-bold text-themeDarkGray">
                          {inputItem.label}
                        </div>
                        <div className="col-span-6 w-full">
                          <InputField
                            title={inputItem?.label}
                            key={inputItem?.key}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            placeholder={inputItem.placeholder}
                            value={formik?.values[inputItem?.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            initialValue={initialValues}
                            rows={inputItem?.rows}
                            multiline={inputItem?.multiline}
                            options={inputItem.options}
                            fullWidth
                            error={Boolean(
                              formik?.touched[inputItem?.name] &&
                                formik?.errors[inputItem?.name]
                            )}
                            helperText={
                              formik?.touched[inputItem?.name] &&
                              (formik?.errors[inputItem?.name] as any)
                            }
                            {...(props.field as any)}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                ))}
              </div>

              <div className="flex items-center col-span-12  justify-center flex-col gap-2 py-4">
                <RippleLoadingButton
                  type="submit"
                  title="Save & Continue"
                  className="w-full"
                  loading={isStatusLoading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BasicDetailsEdit;
