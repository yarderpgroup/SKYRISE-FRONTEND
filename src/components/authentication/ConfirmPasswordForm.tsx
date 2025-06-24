import * as Yup from "yup";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RippleLoadingButton } from "components/core";
import { post } from "api";
import { useRouter } from "next/router";

const ConfirmPasswordSchema = [
  {
    key: "1",
    name: "newPassword",
    label: "Enter Password",
    initialValue: "",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  },
  {
    key: "2",
    name: "confirmPassword",
    label: "Confirm Password",
    initialValue: "",
    validationSchema: Yup.string()
      .min(6, "Confirm password must be at least 6 characters")
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  },
];

const ConfirmPasswordForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState("password");
  const [passwordFieldType, setPasswordFieldType] = useState("password");

  const initialValues = ConfirmPasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  const validationSchema = ConfirmPasswordSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );
  const handleSubmit = async (values: any, props: any) => {
    setIsLoading(true);
    try {
      const response = await post({
        isAlert: true,
        path: "auth/forgot-password/verify-token",
        body: JSON.stringify({
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
          token: router.query.token,
        }),
      });

      setIsLoading(false);
      if (response?.status === 200) {
        router.push("/login");
        props.resetForm();
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 text-themeDarkGray">
      <div className="flex flex-col gap-2 text-center">
        <p className="text-2xl font-semibold">Confirm Password</p>
        <p className="tracking-wide">{`confirm your password`}</p>
      </div>
      <div className="w-full items-center justify-center flex">
        <div className="md:w-4/5 w-full flex flex-col items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form className="w-full flex gap-5 md:gap-8 items-center justify-center flex-col">
                {ConfirmPasswordSchema.map((item) => (
                  <Field key={item.key} name={item.name}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div className="flex flex-col  w-full justify-center gap-3">
                        <div className="font-semibold">{item.label}</div>
                        <TextField
                          key={item?.key}
                          name={item?.name}
                          value={formik?.values[item?.name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type={
                            item?.name === "newPassword"
                              ? passwordFieldType
                              : item?.name === "confirmPassword"
                              ? confirmPasswordFieldType
                              : "text"
                          }
                          InputProps={
                            item?.name === "newPassword"
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
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  ),
                                }
                              : item?.name === "confirmPassword"
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
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  ),
                                }
                              : {}
                          }
                          fullWidth
                          error={Boolean(
                            formik?.touched[item?.name] &&
                              formik?.errors[item?.name]
                          )}
                          helperText={
                            formik?.touched[item?.name] &&
                            (formik?.errors[item?.name] as any)
                          }
                        />
                      </div>
                    )}
                  </Field>
                ))}
                <div className="flex items-center w-fit  justify-center flex-col gap-4">
                  <RippleLoadingButton
                    title="Reset Password"
                    className="w-44"
                    loading={isLoading}
                    // isDisabled={(formik.isValid || formik.isSubmitting) as any}
                  />
                  <div className="flex items-center text-center justify-center gap-1">
                    <p className="text-base mt-0.5">Go back to</p>
                    <span className="text-theme text-lg font-semibold">
                      <Link href="/login">Login</Link>
                    </span>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPasswordForm;
