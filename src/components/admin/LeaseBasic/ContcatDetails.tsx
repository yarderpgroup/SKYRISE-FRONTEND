import { LoadingButton } from "@mui/lab";
import { Card, Container, TextFieldProps, Typography } from "@mui/material";
import { post } from "api";
import {
  CountrySelector,
  InputField,
  RippleLoadingButton,
} from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import * as Yup from "yup";

const AddTenantsSchema = [
  {
    key: "1",
    name: "name",
    label: "Name *",
    placeholder: "Name",
    styleContact: "rounded-lg",
    className: "col-span-6",
    type: "text",
    validationSchema: Yup.string()
      .required("Name required")
      .min(2, "Name must be at least 2 characters"),
    initialValue: "",

    required: true,
  },
  {
    key: "2",
    name: "email",
    label: "Email *",
    placeholder: "Email",
    styleContact: "rounded-lg",
    type: "email",
    validationSchema: Yup.string()
      .required("Email is required")
      .email("Invalid Email Address"),
    initialValue: "",
    className: "col-span-6",

    required: true,
  },

  {
    key: "3",
    name: "phoneNumber",
    label: "Contact Number *",
    placeholder: "Contact Number",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Contact Number is required"),
    initialValue: "",
    className: "col-span-6",
    required: true,
  },
  {
    key: "5",
    label: "Country",
    type: "countrySelector",
    name: "countrySelector",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: "4",
    name: "companyName",
    label: "Company Name *",
    placeholder: "Company Name ",
    styleContact: "rounded-lg",
    validationSchema: Yup.string().required("Company Name is required"),
    type: "text",
    initialValue: "",
    className: "col-span-6",
    required: true,
  },

  {
    key: "7",
    name: "companyPhone",
    label: "Company Phone*",
    type: "text",
    validationSchema: Yup.string().required("Company Phone is required"),
    styleContact: "rounded-lg",

    initialValue: "",
    placeholder: "Company Phone",
    className: "col-span-6",
    required: true,
  },
  {
    key: "8",
    name: "emergencyNumber",
    label: "Emergency Number *",
    placeholder: "Emergency Number",

    type: "number",
    styleContact: "rounded-lg",
    validationSchema: Yup.string().required("Emergency Number   is required"),
    className: "col-span-6",
    initialValue: "",
    required: true,
  },

  {
    key: "11",
    name: "address",
    type: "text",
    placeholder: "Lessor Address",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Lessor Address *",
    validationSchema: Yup.string().required("Lessor Address  is required"),
    initialValue: "",
    className: "col-span-6",
    required: true,
  },
];

const ContactDetails = () => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [countrySelector, setCountrySelector] = useState<any>(null);

  const router = useRouter();
  const ID = router?.query?.management;
  const tenantId: any = router?.query?.tenant;
  let isArray = Array.isArray(tenantId);

  let tenant = "";
  if (isArray) {
    tenantId?.forEach((item: any, i: number) => {
      if (i === 0) {
        tenant = "?tenant=" + item;
      } else {
        tenant += `&tenant=${item}`;
      }
    });
  } else {
    tenant = "?tenant=" + tenantId;
  }
  const handleSend = async (values: any, props: any) => {
    const formData = new FormData();
    formData.append("displayName", values?.name);
    formData.append("email", values?.email);
    formData.append("phoneNumber", values?.phoneNumber);
    formData.append("companyName", values?.companyName);
    formData.append("companyPhone", values?.companyPhone);
    formData.append("emergencyNumber", values?.emergencyNumber);
    formData.append("address", values?.address);
    formData.append("countryCode", countrySelector?.code);
    formData.append("countryName", countrySelector?.label);
    formData.append("countryPhone", countrySelector?.phone);
    formData.append("propertyId", ID as any);
    if (isArray) {
      tenantId?.map((item: any) => formData?.append("tenantId", item));
    } else {
      formData?.append("tenantId", tenantId);
    }
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `lease/add/lessor-info`,
        isAlert: true,
        body: formData,
        isImage: true,
      });

      setIsStatusLoading(false);
      props.resetForm();
      if (response.status === 200) {
        router.push(
          `/panel/admin/rent/${ID}/lease-details/leasor-info${tenant}`
        );
      }
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };

  const initialValues = AddTenantsSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddTenantsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );
  return (
    <Container maxWidth="xl">
      <div className="py-8">
        <Card className="m-auto w-full  !p-8    dashboard-card-shadow  border-b-theme ">
          <Typography
            align="center"
            // color="text.primary"
            variant="h4"
            className="!mt-2 text-themeDarkGray font-bold"
            sx={{ marginBottom: 3 }}
          >
            Your Contact Information
          </Typography>
          <div className="w-full flex flex-col gap-3">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSend}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-4">
                  {AddTenantsSchema?.map((inputItem: any) => (
                    <Field name={inputItem?.name} key={inputItem?.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <div
                          className={`flex flex-col justify-center gap-3 ${inputItem?.className}`}
                        >
                          <div className="font-semibold">
                            {inputItem?.label}
                          </div>
                          {/* )} */}
                          <div className="col-span-6 w-full">
                            {inputItem?.type === "countrySelector" ? (
                              <CountrySelector
                                setCountryDetails={setCountrySelector}
                                countryDetails={countrySelector}
                              />
                            ) : (
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
                            )}
                            {/* )} */}
                          </div>
                        </div>
                      )}
                    </Field>
                  ))}
                  <div className="flex items-center col-span-12  justify-center flex-col gap-2 py-8">
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
        </Card>
      </div>
    </Container>
  );
};

export default ContactDetails;
