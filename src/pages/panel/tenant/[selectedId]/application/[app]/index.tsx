import { Home, Info } from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  CircularProgress,
  Collapse,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { StepperLayout, TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { applicationArr } from "..";
import * as Yup from "yup";
import { InputField } from "components/core";
import { RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { Skeleton, TextFieldProps } from "@mui/material";
import { CommonHeader } from "components/tenant/applications";
import useSWRAPI from "hooks/useSWRAPI";
import useAuth from "hooks/useAuth";
import { post, put } from "api";
import { WithProtectedTenant } from "hooks";

const userArr = [
  {
    id: 1,
    title: "Full Name",
    value: "Alexa Carter",
  },
  {
    id: 2,
    title: "Email",
    value: "alexacarter@gmail.com",
  },
  {
    id: 3,
    title: "Phone",
    value: "932371236",
  },
  {
    id: 1,
    title: "Date of Birth",
    value: "12 Mar 1995",
  },
];

const BasicDetailsSchema = [
  {
    key: 1,
    name: "yourself",
    label: "Tell the landlord a little bit about yourself",
    placeHolder: "Write here",
    initialValue: "",
    multiline: true,
    rows: 5,
    type: "text",
    validationSchema: Yup.string().required("Required"),
    className: "col-span-12",
  },
  {
    key: 2,
    name: "idProof",
    placeHolder: "",
    label: (
      <div>
        Government Issued ID
        <span className="italic font-normal">
          (Such as driving license, passport, Military ID, etc)
        </span>
      </div>
    ),
    initialValue: "",
    type: "photo",
    validationSchema: Yup.boolean().nullable(),
    className: "col-span-12",
  },
  {
    key: 3,
    name: "applicant",
    label: "Co-Applicants",
    placeHolder:
      "Anyone else living in the property such as a roommate, spouse, partner, etc, should be added as a co-applicants",
    initialValue: "",
    multiline: true,
    rows: 3,
    type: "text",
    validationSchema: Yup.string().required("Co-Applicant is Required"),
    className: "col-span-12",
  },
];
const initialValues = BasicDetailsSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  },
  {} as any
);

const validationSchema = BasicDetailsSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);

const BasicInfo = () => {
  const router = useRouter();
  const routerID = useRouter()?.query?.app;
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isImage, setIsImage] = useState();
  const [description, setDescription] = useState("");
  const propertyID = router?.query?.selectedId;
  const { user } = useAuth();

  const { data, error, mutate, isValidating } = useSWRAPI(
    `application/tenant/basic-details/get/${propertyID}`
  );

  const ApplicationData = data?.data && data?.data?.data;
  const activeUserArr = [
    {
      id: 1,
      title: "Basic Information",
      link: `/panel/tenant/${propertyID}/application/${routerID}`,
    },
    {
      id: 2,
      title: "Residence History",
      link: `/panel/tenant/${propertyID}/application/${routerID}/residence-info`,
    },
    {
      id: 3,
      title: "Work History",
      link: `/panel/tenant/${propertyID}/application/${routerID}/work-history`,
    },
    {
      id: 4,
      title: "Income Verification",
      link: `/panel/tenant/${propertyID}/application/${routerID}/income-verification`,
    },
    {
      id: 5,
      title: "Application Question",
      link: `/panel/tenant/${propertyID}/application/${routerID}question`,
    },
    {
      id: 6,
      title: "Screening  Request",
      link: `/panel/tenant/${propertyID}/application/${routerID}screening-report`,
    },
  ];
  const handleSubmitBasicDetails = async (values: any) => {
    const formData = new FormData();
    formData.append("about", values?.yourself);
    if (isImage) {
      formData.append("govtID", isImage as any);
    }
    formData.append("coApplicants", values?.applicant);
    formData.append("propertyId", propertyID as any);
    formData.append("petDescription", description as string);
    formData.append("havePets", checked as any);
    setIsLoading(true);
    try {
      const response = await post({
        path: "application/tenant/basic-details/add",
        isAlert: true,
        isImage: true,
        body: formData,
      });
      setIsLoading(false);
      if (response?.status === 200) {
        router?.push(
          `/panel/tenant/${propertyID}/application/${routerID}/residence-info`
        );
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <TenantLayout
      title="Your Application"
      headerText={ApplicationData?.propertyName}
    >
      <div className="w-full py-5 md:py-10 px-3 bg-white md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem)]">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col bg-white md:p-6 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full">
            <div className="w-full flex flex-col gap-3 md:gap-5">
              <CommonHeader
                propertyName={ApplicationData?.propertyName}
                propertyAddress={ApplicationData?.propertyAddress}
                propertyCity={ApplicationData?.propertyCity}
                propertyLocality={ApplicationData?.propertyLocality}
                photoUrl={ApplicationData?.photoUrl}
                countryPhone={ApplicationData?.countryPhone}
                phoneNumber={ApplicationData?.phoneNumber}
                firstName={ApplicationData?.firstName}
                lastName={ApplicationData?.lastName}
                isValidating={isValidating}
              />
              {/* basic information */}
              <div className="flex w-full flex-col md:gap-1">
                <p className="md:text-xl text-lg tracking-wide">
                  Basic Information
                </p>
                <p className="text-sm md:base">
                  Provide the basic information about yourself and invite ant
                  co-applicants
                </p>
              </div>

              {/* applicant information */}
              <div className="flex flex-col gap-4">
                <p className="md:text-xl text-lg tracking-wide">
                  Applicant Information
                </p>
                <div className="py-2 px-2 md:px-4 rounded-md bg-themeGray/20 flex items-center gap-1 md:gap-2">
                  <p className="text-sm md:text-base">
                    <Info className="mr-2 md:mr-2" />
                    To change your name and email, please visit your{" "}
                    <span className="font-semibold hover:underline cursor-pointer">
                      Account Setting
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-2 w-full gap-4 pt-2">
                  <div className="md:col-span-1 col-span-2">
                    <p className="text-sm md:text-base font-semibold">
                      Full Name
                    </p>
                    <p className="text-sm md:text-base text-themeGray">
                      {user?.firstName} {user?.lastName}
                    </p>
                  </div>
                  <div className="md:col-span-1 col-span-2">
                    <p className="text-sm md:text-base font-semibold">Email</p>
                    <p className="text-sm md:text-base text-themeGray">
                      {user?.email}
                    </p>
                  </div>
                  <div className="md:col-span-1 col-span-2">
                    <p className="text-sm md:text-base font-semibold">
                      Phone Number
                    </p>
                    <p className="text-sm md:text-base text-themeGray">
                      {user?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationSchema)}
                  onSubmit={handleSubmitBasicDetails}
                >
                  {(formik) => (
                    <Form className="w-full grid grid-cols-12 gap-6 md:gap-6">
                      {BasicDetailsSchema.map((inputItem) => (
                        <Field name={inputItem?.name} key={inputItem.key}>
                          {(props: {
                            meta: { touched: any; error: any };
                            field: JSX.IntrinsicAttributes & TextFieldProps;
                          }) => (
                            <div
                              className={`flex flex-col justify-center gap-3 ${inputItem.className}`}
                            >
                              <div className="font-semibold text-themeDarkGray">
                                {inputItem.label}
                              </div>
                              <div className="col-span-6 w-full">
                                <InputField
                                  title={inputItem?.label as any}
                                  key={inputItem?.key}
                                  name={inputItem?.name}
                                  type={inputItem?.type}
                                  placeholder={inputItem?.placeHolder}
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
                                  multiline={inputItem?.multiline}
                                  rows={inputItem?.rows}
                                  image={isImage}
                                  onFileChange={(event: any) => {
                                    setIsImage(event?.target?.files[0]);
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </Field>
                      ))}
                      <div className="col-span-12 flex flex-col gap-2">
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                color: "#999999",
                                "&.Mui-checked": {
                                  color: "#E33324",
                                },
                              }}
                              checked={checked}
                              onChange={() => setChecked(!checked)}
                            />
                          }
                          label={<div>I have pets</div>}
                        />
                        <Collapse in={checked}>
                          <div className="w-full flex flex-col gap-3">
                            <p className="font-semibold">
                              Write a brief explanation about your pets
                            </p>
                            <TextField
                              variant="outlined"
                              fullWidth
                              placeholder="Write here"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </Collapse>
                      </div>
                      <div className="flex items-center col-span-12 justify-center flex-col gap-2 pt-2">
                        <RippleLoadingButton
                          type="submit"
                          title="save & next"
                          className="btn-one  w-full"
                          loading={isLoading}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </StepperLayout>
      </div>
    </TenantLayout>
  );
};

export default WithProtectedTenant(BasicInfo);
