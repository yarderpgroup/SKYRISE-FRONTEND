import { MultiplePhotoUpload } from "components/core";
import { Form, Formik } from "formik";
import { useState } from "react";
import { InputField } from "components/core";
import * as Yup from "yup";
import { CustomInput } from "../dashboard";
import Coupon from "./Coupon";

const AddStoreSchema = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "country",
    label: "Country *",
    placeholder: "Country",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Country is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
  {
    key: "2",
    // placeholder: 'Enter your email',
    name: "city",
    label: "City *",
    placeholder: "City",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required(" City is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
  {
    key: "3",
    // placeholder: 'Enter your email',
    name: "apartment",
    label: "Apartment Name *",
    placeholder: "Apartment Name ",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required(" Apartment is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
  {
    key: "4",
    // placeholder: 'Enter your email',
    name: "locality",
    label: "Locality  *",
    placeholder: "Locality ",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required(" Locality Name is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },

  {
    key: "5",
    // placeholder: 'Enter your phone number',
    name: "bedRoom",
    label: "Bedroom*",
    placeholder: "Bedroom",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Bedroom is Required"),
    initialValue: "",
  },
  {
    key: "6",
    // placeholder: 'Enter your phone number',
    name: "bathRoom",
    label: "Bathroom*",
    placeholder: "Bathroom",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Bathroom is Required"),
    initialValue: "",
  },
  {
    key: "7",
    // placeholder: 'Enter your phone number',
    name: "area",
    label: "AreaDetails*",
    placeholder: "AreaDetails",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("AreaDetails is Required"),
    initialValue: "",
  },
  {
    key: "8",
    // placeholder: 'Enter your phone number',
    name: "parking",
    label: "Parking*",
    placeholder: "Parking",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Parking is Required"),
    initialValue: "",
  },
  {
    key: "9",
    // placeholder: 'Enter your phone number',
    name: "amenities",
    label: "Amenities*",
    placeholder: "Amenities",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Amenities is Required"),
    initialValue: "",
  },
  {
    key: "9",
    // placeholder: 'Enter your phone number',
    name: "utilities",
    label: "Utilities*",
    placeholder: "Utilities",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Utilities is Required"),
    initialValue: "",
  },
  {
    key: "10",
    // placeholder: 'Enter your phone number',
    name: "utilities",
    label: "Utilities*",
    placeholder: "Utilities",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Utilities is Required"),
    initialValue: "",
  },
  {
    key: "10",
    // placeholder: 'Enter your phone number',
    name: "description",
    label: "Description*",
    placeholder: "Description",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Description is Required"),
    initialValue: "",
  },
  {
    key: "11",
    // placeholder: 'Enter your phone number',
    name: "rentPrice",
    label: "RentPrice*",
    placeholder: "RentPrice",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("RentPrice is Required"),
    initialValue: "",
  },
  {
    key: "12",
    // placeholder: 'Enter your phone number',
    name: "dateAvailable *",
    label: "Date Available*",
    placeholder: "Date Available",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Date Available is Required"),
    initialValue: "",
  },
  {
    key: "13",
    // placeholder: 'Enter your phone number',
    name: "leaseDuration*",
    label: "Lease Duration*",
    placeholder: "Lease Duration*",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Lease Duration* is Required"),
    initialValue: "",
  },
  {
    key: "14",
    // placeholder: 'Enter your phone number',
    name: "Fee* *",
    label: "Move in Fee*",
    placeholder: "Move in Fee*",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Fee is Required"),
    initialValue: "",
  },
  {
    key: "15",
    // placeholder: 'Enter your phone number',
    name: "name",
    label: "Name*",
    placeholder: "Name*",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Name is Required"),
    initialValue: "",
  },
  {
    key: "16",
    // placeholder: 'Enter your phone number',
    name: "number",
    label: "Contact Number*",
    placeholder: "Contact Number*",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Number is Required"),
    initialValue: "",
  },
  {
    key: "17",
    // placeholder: 'Enter your phone number',
    name: "startTime",
    label: "Start Time*",
    placeholder: "Start Time*",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("time is Required"),
    initialValue: "",
  },
  {
    key: "17",
    // placeholder: 'Enter your phone number',
    name: "endTime",
    label: "End Time*",
    placeholder: "End Time*",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("time is Required"),
    initialValue: "",
  },
];

const ReviewDetails = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
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

  const handleSend = async (values: any) => {};

  return (
    <div className="">
      <div className="flex  !justify-between ">
        <h1 className="text-2xl font-bold text-themeDarkGray text-center">
          Review All Details
        </h1>
        <button className="btn-two">Edit</button>
      </div>

      <div className="w-full  flex items-center text-themeDarkGray ">
        <div className="w-full flex flex-col gap-3">
          <Formik
            onSubmit={handleSend}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
          >
            {(formik) => (
              <Form>
                <div className="grid grid-cols-1  lg:grid-cols-2 md:gap-5  w-full justify-center items-center py-4 ">
                  {AddStoreSchema?.map((inputItem) => (
                    <>
                      <div
                        className={
                          inputItem?.multiline
                            ? " lg:col-span-2 w-full"
                            : "w-full"
                        }
                      >
                        <CustomInput
                          size="medium"
                          key={inputItem.key}
                          label={inputItem.label}
                          name={inputItem?.name}
                          multiline={inputItem?.multiline}
                          placeholder={inputItem?.placeholder}
                          type={inputItem?.type}
                          fieldClass={
                            inputItem.name === "message" ? "" : "filedSet"
                          }
                        />
                      </div>
                    </>
                  ))}
                </div>
                <MultiplePhotoUpload
                  setSelectedFiles={setSelectedFiles}
                  selectedFiles={selectedFiles}
                  imagePreviews={imagePreviews}
                  setImagePreviews={setImagePreviews}
                />
                <div className="w-full pt-8">
                  <Coupon />
                </div>
                {/* <div>
                <div className=" pt-3 flex flex-row justify-center items-center ">
                  <LoadingButton
                    className="btn-background rounded-xl w-full p-3 text-base !bg-[#ff4800] cursor-pointer"
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={formik.isSubmitting || !formik.isValid}
                    loading={formik.isSubmitting}
                    loadingPosition="start"
                    startIcon={<Done />}
                  >
                 
                    Submit Now
                  </LoadingButton>
                </div>
              </div> */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
