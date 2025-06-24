import { Home } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { StepperLayout, TenantLayout } from "layouts";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { Skeleton, TextFieldProps } from "@mui/material";
import { CommonHeader } from "components/tenant/applications";
import useSWRAPI from "hooks/useSWRAPI";
import { post } from "api";
import { useState } from "react";
import { WithProtectedTenant } from "hooks";

const WorkHistorySchema = [
  {
    key: 1,
    name: "jobTitle",
    label: "Job Title",
    placeHolder: "Enter Your Job Title",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Job title is Required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 2,
    name: "companyName",
    placeHolder: "Enter your company name",
    label: "Company Name",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Company Name is Required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 3,
    name: "startDate",
    placeHolder: "Enter your start date",
    label: "Start Date",
    initialValue: "",
    type: "date",
    validationSchema: Yup.string().required("Start Date is Required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 4,
    name: "endDate",
    placeHolder: "Enter your end date",
    label: "End Date/Current Date",
    initialValue: "",
    type: "date",
    validationSchema: Yup.string().required("End Date is Required"),
    className: "col-span-12 md:col-span-6",
  },

  {
    key: 5,
    name: "supervisorName",
    placeHolder: "Enter your Supervisor name",
    label: "Supervisor Name",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Supervisor name is required"),
    className: "col-span-12",
  },
  {
    key: 6,
    name: "supervisorEmail",
    placeHolder: "Enter your Supervisor email",
    label: "Supervisor Email",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("Supervisor email is required")
      .email("Invalid Email"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 7,
    name: "supervisorPhone",
    placeHolder: "Enter your Supervisor phone",
    label: "Supervisor Phone",
    initialValue: "",
    type: "number",
    validationSchema: Yup.string().required("Supervisor phone is required"),
    className: "col-span-12 md:col-span-6",
  },
];
const initialValues = WorkHistorySchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = WorkHistorySchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);
const WorkHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const routerID = router?.query?.app;
  const propertyID = router?.query?.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `application/tenant/work-history/get/${propertyID}`
  );
  const WorkHistoryData = data?.data?.data;

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
  const handleGoBack = () => {
    router.push(`/panel/tenant/application/${propertyID}/residence-info`);
  };
  const handleWorkHistory = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await post({
        path: "application/tenant/work-history/add",
        isAlert: true,
        isImage: false,
        body: JSON.stringify({
          jobTitle: values?.jobTitle,
          companyName: values?.companyName,
          startDate: values?.startDate,
          endDate: values?.endDate,
          supervisorName: values?.supervisorName,
          supervisorEmail: values?.supervisorEmail,
          supervisorPhone: values?.supervisorPhone,
          propertyId: propertyID,
        }),
      });
      setIsLoading(false);
      if (response?.status === 200) {
        router?.push(
          `/panel/tenant/${propertyID}/application/${routerID}/income-verification`
        );
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <TenantLayout
      title="Work History | SKYRISE"
      headerText="12345 N Halford Street, Unit A"
    >
      <div className="w-full py-5 md:py-10 px-3 bg-white md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem)]">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col bg-white md:p-6 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full">
            <div className="w-full flex flex-col gap-2 md:gap-5">
              <CommonHeader
                propertyName={WorkHistoryData?.propertyName}
                propertyAddress={WorkHistoryData?.propertyAddress}
                propertyCity={WorkHistoryData?.propertyCity}
                propertyLocality={WorkHistoryData?.propertyLocality}
                photoUrl={WorkHistoryData?.photoUrl}
                countryPhone={WorkHistoryData?.countryPhone}
                phoneNumber={WorkHistoryData?.phoneNumber}
                firstName={WorkHistoryData?.firstName}
                lastName={WorkHistoryData?.lastName}
                isValidating={isValidating}
              />
              {/* work history */}
              <div className="w-full flex flex-col py-5 gap-1">
                <p className="w-full text-lg md:text-xl tracking-wide">
                  Work History
                </p>
                <p className="w-full tracking-wide">
                  Your landlord requests{" "}
                  <b>a minimum {WorkHistoryData?.timePeriod} years</b> of
                  employment history.
                </p>
              </div>

              {/* work forum */}
              <div className="w-full flex flex-col items-center justify-center">
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationSchema)}
                  onSubmit={handleWorkHistory}
                >
                  {(formik) => (
                    <Form className="w-full grid grid-cols-12 gap-4 md:gap-6">
                      {WorkHistorySchema.map((inputItem) => (
                        <Field name={inputItem.name} key={inputItem.key}>
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
                                />
                              </div>
                            </div>
                          )}
                        </Field>
                      ))}
                      <div className="flex items-center col-span-12 justify-end fle-col gap-2 pt-2">
                        <RippleLoadingButton
                          type="submit"
                          title="Save & Next"
                          className="btn-one rounded-md !py-2.5 w-44"
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

export default WithProtectedTenant(WorkHistory);
