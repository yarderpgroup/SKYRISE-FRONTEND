import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox, IconButton, Skeleton, TextFieldProps } from "@mui/material";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
const LoginSchema = [
  {
    key: 1,
    name: "firstName",
    label: "First Name",
    placeHolder: "Enter Your FirstName",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("First Name is required.")
      .min(3, "First Name must be at least 3 characters long."),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 2,
    name: "lastName",
    placeHolder: "Enter Your LastName",
    label: "Last Name",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters long."),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 3,
    name: "email",
    placeHolder: "Enter Your email",
    label: "Email",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .email("Invalid Email")
      .required("E-mail is required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 4,
    name: "phoneNumber",
    placeHolder: "Enter Your phone",
    label: "Phone",
    initialValue: "",
    type: "number",
    validationSchema: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8)
      .required("A phone number is required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 5,
    name: "password",
    placeHolder: "Enter password",
    label: "Password",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    className: "col-span-12 md:col-span-12",
  },
];

const initialValues = LoginSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = LoginSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);

const TenantDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState("password");
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const { isUserLoading } = useAuth();

  const handleTenantRegistration = async (values: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div>
      <section className="flex flex-col  justify-center items-center w-full ">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleTenantRegistration}
        >
          {(formik) => (
            <Form className="w-full grid grid-cols-12 gap-4">
              {LoginSchema.map((inputItem) => (
                <Field name={inputItem.name} key={inputItem.key}>
                  {(props: {
                    meta: { touched: any; error: any };
                    field: JSX.IntrinsicAttributes & TextFieldProps;
                  }) => (
                    <div
                      className={`flex flex-col justify-center gap-3 ${inputItem.className}`}
                    >
                      {isUserLoading ? (
                        <Skeleton variant="text" width={200} height={30} />
                      ) : (
                        <div className="font-semibold">{inputItem.label}</div>
                      )}
                      <div className="col-span-6 w-full">
                        {isUserLoading ? (
                          <Skeleton variant="text" width={200} height={30} />
                        ) : (
                          <InputField
                            title={inputItem?.label}
                            key={inputItem?.key}
                            name={inputItem?.name}
                            type={
                              inputItem?.name === "password"
                                ? passwordFieldType
                                : inputItem?.name === "confirmPassword"
                                ? confirmPasswordFieldType
                                : (inputItem?.type as any)
                            }
                            placeholder={inputItem.placeHolder}
                            value={formik?.values[inputItem?.name]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            InputProps={
                              inputItem?.name === "password"
                                ? {
                                    endAdornment: (
                                      <IconButton
                                        onClick={() =>
                                          setPasswordFieldType((prev: string) =>
                                            prev === "password"
                                              ? "text"
                                              : "password"
                                          )
                                        }
                                      >
                                        {passwordFieldType === "password" ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    ),
                                  }
                                : inputItem?.name === "confirmPassword"
                                ? {
                                    endAdornment: (
                                      <IconButton
                                        onClick={() =>
                                          setConfirmPasswordFieldType(
                                            (prev: string) =>
                                              prev === "password"
                                                ? "text"
                                                : "password"
                                          )
                                        }
                                      >
                                        {confirmPasswordFieldType ===
                                        "password" ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    ),
                                  }
                                : {}
                            }
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
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              ))}

              <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-4">
                {isUserLoading ? (
                  <Skeleton variant="text" width={200} height={30} />
                ) : (
                  <p className="text-sm">
                    By registering, you agree to SKYRISE terms of use.
                  </p>
                )}
                {isUserLoading ? (
                  <Skeleton variant="text" width={200} height={30} />
                ) : (
                  <RippleLoadingButton
                    title="Tenant Register"
                    className="w-44"
                    loading={isLoading}
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default TenantDetails;
