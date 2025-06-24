import { Home } from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { StepperLayout, TenantLayout } from "layouts";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { TextFieldProps } from "@mui/material";
import { useState } from "react";
import { CommonHeader } from "components/tenant/applications";
import useSWRAPI from "hooks/useSWRAPI";
import { post } from "api";
import { WithProtectedTenant } from "hooks";

const propertyType = [
  {
    id: 1,
    title: "Individual",
  },
  {
    id: 2,
    title: "Property Management",
  },
];
const ApplicationDetails = () => {
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();
  const routerID = router.query.app;

  const [propertyTypeRadio, setPropertyTypeRadio] = useState("Individual");

  const propertyID = router.query.selectedId;

  const { data, error, mutate, isValidating } = useSWRAPI(
    `application/tenant/residence-history/get/${propertyID}`
  );
  const residenceInfoData = data?.data?.data && data?.data?.data;

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
  const ResidenceInfoSchema = [
    {
      key: 1,
      name: "address",
      label: "Address",
      placeHolder: "Street Address *",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Street address is Required"),
      className: "col-span-12",
      multiline: true,
      rows: 2,
    },
    {
      key: 2,
      name: "startTime",
      placeHolder: "",
      label: "Move-in Date",
      initialValue: "",
      type: "date",
      validationSchema: Yup.string().required("Required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 3,
      name: "endTime",
      placeHolder: "",
      label: "Expected Move-out Date",
      initialValue: "",
      type: "date",
      validationSchema: Yup.string().required("Required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 4,
      name: "managementName",
      placeHolder: "Enter Full Name",
      label: (
        <div>
          {propertyTypeRadio === "Property Management"
            ? "Management Name"
            : "Individual Name"}
        </div>
      ),
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 5,
      name: "rentAmount",
      placeHolder: "Enter your monthly amount",
      label: "Monthly Rent Amount",
      initialValue: "",
      type: "number",
      validationSchema: Yup.string().required("Required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 6,
      name: "managementEmail",
      placeHolder: "Enter email",
      label: (
        <div>
          {propertyTypeRadio === "Property Management"
            ? "Management Email"
            : "Individual Email"}
        </div>
      ),
      initialValue: "",
      type: "text",
      validationSchema: Yup.string()
        .email("Invalid Email")
        .required("Required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 7,
      name: "managementPhone",
      placeHolder: "Enter Phone Number",
      label: (
        <div>
          {propertyTypeRadio === "Property Management"
            ? "Management Phone"
            : "Individual Phone"}
        </div>
      ),
      initialValue: "",
      type: "number",
      validationSchema: Yup.string().required("Required"),
      className: "col-span-12 md:col-span-6",
    },
  ];
  const initialValues = ResidenceInfoSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = ResidenceInfoSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );
  const handleResidenceInfo = async (values: any) => {
    setIsLoading(true);
    setShowLoading(true);
    try {
      const response = await post({
        path: "application/tenant/residence-history/add",
        isAlert: true,
        isImage: false,
        body: JSON.stringify({
          address: values?.address,
          moveInDate: values?.startTime,
          moveOutDate: values?.endTime,
          isOwned: checked,
          referenceType: propertyTypeRadio.toUpperCase(),
          displayName: values?.managementName,
          email: values?.managementEmail,
          phoneNumber: values?.managementPhone,
          rentAmount: values?.rentAmount,
          propertyId: propertyID,
        }),
      });
      setIsLoading(false);
      setShowLoading(false);
      if (response?.status === 200) {
        router?.push(
          `/panel/tenant/${propertyID}/application/${routerID}/work-history`
        );
      }
    } catch (error) {
      setIsLoading(false);
      setShowLoading(false);
    }
  };

  return (
    <TenantLayout
      title="Residence History | SKYRISE"
      headerText="12345 N Halford Street, Unit A"
    >
      <div className="w-full py-5 md:py-10 px-3 md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem)]">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col bg-white md:p-6 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full">
            <div className="w-full flex flex-col gap-5">
              <CommonHeader
                propertyName={residenceInfoData?.propertyName}
                propertyAddress={residenceInfoData?.propertyAddress}
                propertyCity={residenceInfoData?.propertyCity}
                propertyLocality={residenceInfoData?.propertyLocality}
                photoUrl={residenceInfoData?.photoUrl}
                countryPhone={residenceInfoData?.countryPhone}
                phoneNumber={residenceInfoData?.phoneNumber}
                firstName={residenceInfoData?.firstName}
                lastName={residenceInfoData?.lastName}
                isValidating={isValidating}
              />
            </div>

            {/* residence history */}
            <div className="w-full flex flex-col py-5 md:gap-1">
              <p className="w-full text-lg md:text-xl tracking-wide">
                Residence History
              </p>
              <p className="w-full text-sm md:text-base tracking-wide">
                Your landlord requests{" "}
                <b>a minimum {residenceInfoData?.timePeriod} years</b> of
                residence history and reference checks from your prior landlords
              </p>
            </div>

            {/* address */}
            <div className="w-full flex flex-col items-center justify-center">
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={handleResidenceInfo}
              >
                {(formik) => (
                  <Form className="w-full grid grid-cols-12 gap-4 md:gap-6">
                    {ResidenceInfoSchema.slice(0, 3).map((inputItem) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: {
                          meta: { touched: any; error: any };
                          field: JSX.IntrinsicAttributes & TextFieldProps;
                        }) => (
                          <div
                            className={`flex flex-col justify-center gap-3 ${inputItem.className}`}
                          >
                            <div className="font-semibold text-themeDarkGray">
                              {inputItem?.label}
                            </div>
                            <div className="col-span-6 w-full">
                              <InputField
                                title={inputItem?.label as any}
                                key={inputItem?.key}
                                name={inputItem?.name}
                                type={inputItem?.type}
                                placeholder={inputItem.placeHolder}
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
                                multiline={inputItem.multiline}
                                rows={inputItem.rows}
                              />
                            </div>
                          </div>
                        )}
                      </Field>
                    ))}
                    <div className="col-span-12 flex flex-col gap-2">
                      <p className="font-semibold">Rental Details</p>
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
                        label={<div>I own(ed) this property</div>}
                      />
                    </div>

                    {/* property type */}
                    <div className="col-span-12">
                      <FormControl>
                        <FormLabel>
                          Is this reference an individual landlord or a property
                          management company?
                        </FormLabel>
                        <RadioGroup row defaultValue="Individual">
                          {propertyType?.map((item) => (
                            <FormControlLabel
                              onChange={() => setPropertyTypeRadio(item.title)}
                              value={item.title}
                              control={
                                <Radio
                                  sx={{
                                    color: "#999999",
                                    "&.Mui-checked": {
                                      color: "#E33324",
                                    },
                                  }}
                                />
                              }
                              label={item?.title}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div className="w-full grid grid-cols-12 gap-2 md:gap-6 col-span-12">
                      {ResidenceInfoSchema.slice(3)?.map((inputItem) => (
                        <Field name={inputItem.name} key={inputItem?.key}>
                          {(props: {
                            meta: { touched: any; error: any };
                            field: JSX.IntrinsicAttributes & TextFieldProps;
                          }) => (
                            <div
                              className={`flex flex-col justify-center gap-3 ${inputItem?.className}`}
                            >
                              <div className="font-semibold text-themeDarkGray">
                                {inputItem?.label}
                              </div>
                              <div className="col-span-6 w-full">
                                <InputField
                                  title={inputItem?.label as any}
                                  key={inputItem?.key}
                                  name={inputItem?.name}
                                  type={inputItem?.type}
                                  placeholder={inputItem.placeHolder}
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
                                  multiline={inputItem.multiline}
                                  rows={inputItem.rows}
                                />
                              </div>
                            </div>
                          )}
                        </Field>
                      ))}
                    </div>
                    <div className="flex items-center col-span-12 justify-end fle-col gap-2 pt-2">
                      <RippleLoadingButton
                        title="Save & Next"
                        type="submit"
                        className="btn-one rounded-md !py-2.5 w-44"
                        loading={isLoading}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </StepperLayout>
      </div>
    </TenantLayout>
  );
};

export default WithProtectedTenant(ApplicationDetails);
