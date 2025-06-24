import { put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import UploadImage from "components/core/PhotoUpload";
import { Field, Form, Formik } from "formik";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Dialog, TextFieldProps } from "@mui/material";
import * as Yup from "yup";

const AddStoreSchema = [
  {
    key: "1",
    name: "country",
    label: "Country *",
    placeholder: "Country",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Country is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-6",
    required: true,
  },
  {
    key: "2",
    name: "city",
    label: "City *",
    placeholder: "City",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required(" City is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-6",
    required: true,
  },
  {
    key: "2",
    name: "apartment",
    label: "Apartment Name *",
    placeholder: "Apartment Name ",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required(" Apartment is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-6",
    required: true,
  },
  {
    key: "2",
    name: "locality",
    label: "Locality  *",
    placeholder: "Locality ",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required(" Locality Name is Required"),
    initialValue: "",
    multiline: false,
    required: true,
    className: "col-span-12 md:col-span-6",
  },

  {
    key: "4",
    name: "latitude",
    type: "text",
    placeholder: "Latitude",
    styleContact: "rounded-lg",
    label: "Latitude*",
    validationSchema: Yup.string().required("Latitude is required"),
    initialValue: "",
    className: "col-span-12 md:col-span-6",
    required: true,
  },
  {
    key: "5",
    name: "longitude",
    type: "text",
    placeholder: "Longitude",
    styleContact: "rounded-lg",
    label: "Longitude*",
    className: "col-span-12 md:col-span-6",

    validationSchema: Yup.string().required("Longitude is required"),
    initialValue: "",
    required: true,
  },
  // {
  //   key: "6",
  //   name: "mapLocation",
  //   type: "text",
  //   placeholder: "Map Location",
  //   styleContact: "rounded-lg",
  //   label: "Map Location*",
  //   validationSchema: Yup.string().required("Map Location is required"),
  //   initialValue: "",
  //   className: "col-span-12 md:col-span-6",
  //   required: true,
  // },
  {
    key: "3",
    name: "address",
    label: "Address*",
    placeholder: "Address",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Address is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-12",
    rows: 2,
  },
  {
    key: 4,
    name: "description",
    label: "Property Description",
    styleContact: "rounded-lg",
    placeholder: "Description...",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Description is Required"),
    multiline: true,
    className: "col-span-12 md:col-span-12",
    rows: 3,
  },
];

const AddPropertyForm = () => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isImage, setIsImage] = useState(null);
  const onFileChange = (event: any) => {
    setIsImage(event?.target?.files[0]);
  };
  const [logoImage, setLogoImage] = useState(null);
  const onHandelChange = (event: any) => {
    setLogoImage(event?.target?.files[0]);
  };
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const initialValues = AddStoreSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddStoreSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {
    if (isImage === null) return toast.error("Image field cannot be empty!");
    try {
      const formData = new FormData();
      if (isImage) {
        formData.append("propertyHeroImage", isImage);
      }
      if (logoImage) {
        formData.append("companyLogo", logoImage);
      }
      formData.append("country", values?.country);
      formData.append("city", values?.city);
      formData.append("propertyName", values?.apartment);
      formData.append("locality", values?.locality);
      formData.append("address", values?.address);
      formData.append("propertyDescription", values?.description);
      formData.append("longitude", values?.longitude);
      formData.append("latitude", values?.latitude);
      formData.append("mapLocation", values?.mapLocation);

      setIsStatusLoading(true);
      const response = await put({
        path: `property/${propertyID}`,
        isAlert: true,
        isImage: true,
        body: formData,
      });
      setIsStatusLoading(false);
      if (response.status === 200) {
        Router.push(
          `/panel/admin/properties/add-property/property-profile?propertyID=${propertyID}`
        );
      }
    } catch (error: any) {
      setIsStatusLoading(false);
      toast.error(error);
    }
  };
  return (
    <div className="w-full flex items-center text-themeDarkGray ">
      <div className="w-full flex flex-col gap-3">
        <div className="md:text-2xl text-lg tracking-wide font-bold">
          <p>Where Is Your Property Located?</p>
          <p className="text-sm text-[#8993A4] font-normal pt-3">
            An accurate location helps you connect with the right buyers
          </p>
        </div>
        <Formik
          onSubmit={handleSend}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
        >
          {(formik) => (
            <Form>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <h1 className="text-xl font-bold text-themeDarkGray">
                    Property Image
                  </h1>
                  <div className="py-5">
                    <UploadImage
                      className="!h-72"
                      image={isImage}
                      onChange={onFileChange}
                      setIsImage={setIsImage}
                    />
                  </div>
                </div>
                <div className="col-span-6">
                  <h1 className="text-xl font-bold text-themeDarkGray">
                    Company Logo
                  </h1>
                  <div className="py-5">
                    <UploadImage
                      className="!h-72"
                      image={logoImage}
                      onChange={onHandelChange}
                      setIsImage={setLogoImage}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {AddStoreSchema.map((inputItem: any) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div
                        className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                      >
                        <div className="font-semibold text-themeDarkGray">
                          {inputItem.label}
                        </div>
                        <div className="col-span-6 w-full">
                          <InputField
                            title={inputItem?.label}
                            key={inputItem?.key}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            multiline={inputItem?.multiline}
                            rows={inputItem?.rows}
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
              </div>
              <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-5">
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

export default AddPropertyForm;
