import { Home } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { StepperLayout, TenantLayout } from "layouts";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { Skeleton, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { CommonHeader } from "components/tenant/applications";
import useSWRAPI from "hooks/useSWRAPI";
import { post } from "api";
import { WithProtectedTenant } from "hooks";

const IncomeVerificationSchema = [
  {
    key: 1,
    name: "yearlyIncome",
    label: "Yearly Income",
    placeHolder: "Enter your income",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 2,
    name: "companyName",
    placeHolder: "Write here...",
    label: "Add any additional details about your income",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 4,
    name: "startDate",
    placeHolder: "Enter your Start Date",
    label: "Start Date",
    initialValue: "",
    type: "date",
    validationSchema: Yup.string().required("Start Date is Required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 5,
    name: "endDate",
    placeHolder: "Enter your End date",
    label: "End Date",
    initialValue: "",
    type: "date",
    validationSchema: Yup.string().required("End Date is Required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 3,
    name: "incomeProof",
    placeHolder: "",
    label: "Proof of Income",
    initialValue: "",
    type: "photo",
    validationSchema: Yup.string().nullable(),
    className: "col-span-12",
  },
];
const initialValues = IncomeVerificationSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  },
  {} as any
);

const validationSchema = IncomeVerificationSchema?.reduce(
  (accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);
const IncomeVerification = () => {
  const router = useRouter();
  const routerID = router?.query?.app;
  const propertyID = router?.query?.selectedId;
  const [isImage, setIsImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { data, error, mutate, isValidating } = useSWRAPI(
    `application/tenant/income-info/get/${propertyID}`
  );
  const IncomeVerificationData = data?.data?.data && data?.data?.data;

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
      link: `/panel/tenant/${propertyID}/application/${routerID}/question`,
    },
    {
      id: 6,
      title: "Screening  Request",
      link: `/panel/tenant/${propertyID}/application/${routerID}/screening-report`,
    },
  ];

  const handleIncome = async (values: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (isImage) {
        formData.append("incomeProof", isImage as any);
      }
      formData.append("yearlyIncome", values?.yearlyIncome);
      formData.append("details", values?.companyName);
      formData.append("startDate", values?.startDate);
      formData.append("endDate", values?.endDate);
      formData.append("propertyId", propertyID as any);
      formData.append("address", values?.address);

      const response = await post({
        path: "application/tenant/income-verification/add",
        isAlert: true,
        isImage: true,
        body: formData,
      });
      setIsLoading(false);
      if (response?.status === 200) {
        router.push(
          `/panel/tenant/${propertyID}/application/${routerID}/question`
        );
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return (
    <TenantLayout
      title="Income Verification | SKYRISE"
      headerText="12345 N Halford Street, Unit A"
    >
      <div className="w-full py-5 md:py-10 px-3 bg-white md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem)]">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col bg-white md:p-6 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full">
            <div className="w-full flex flex-col gap-3 md:gap-5">
              <CommonHeader
                propertyName={IncomeVerificationData?.propertyName}
                propertyAddress={IncomeVerificationData?.propertyAddress}
                propertyCity={IncomeVerificationData?.propertyCity}
                propertyLocality={IncomeVerificationData?.propertyLocality}
                photoUrl={IncomeVerificationData?.photoUrl}
                countryPhone={IncomeVerificationData?.countryPhone}
                phoneNumber={IncomeVerificationData?.phoneNumber}
                firstName={IncomeVerificationData?.firstName}
                lastName={IncomeVerificationData?.lastName}
                isValidating={isValidating}
              />

              {/* income verification */}
              <div className="w-full flex flex-col py-3 md:py-5 gap-1">
                <p className="w-full text-lg md:text-xl tracking-wide">
                  Income Verification
                </p>
                <p className="w-full tracking-wide">
                  Please provide all your income sources and details.
                </p>
              </div>

              {/* work forum */}
              <div className="w-full flex flex-col items-center justify-center">
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationSchema)}
                  onSubmit={handleIncome}
                >
                  {(formik) => (
                    <Form className="w-full grid grid-cols-12 gap-4 md:gap-6">
                      {IncomeVerificationSchema.map((inputItem) => (
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
                                  image={isImage}
                                  onFileChange={(event: any) => {
                                    setIsImage(event?.target?.files[0]);
                                  }}
                                  setIsImage={setIsImage}
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
                          className="btn-one rounded-md !py-2.5 w-full"
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

export default WithProtectedTenant(IncomeVerification);
