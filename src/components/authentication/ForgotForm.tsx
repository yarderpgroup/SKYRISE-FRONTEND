import * as Yup from "yup";
import { TextField, TextFieldProps } from "@mui/material";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { toast } from "react-toastify";
import { post } from "api";
import { useState } from "react";
import { RippleLoadingButton } from "components/core";

const ForgetSchema = [
  {
    key: "1",
    label: "Enter your email",
    placeHolder: "demo@gmail.com",
    name: "email",
    type: "email",
    validationSchema: Yup.string()
      .required("Email is required")
      .email("Invalid email"),
    initialValue: "",
  },
];

const ForgotForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = ForgetSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as { [key: string]: string });

  const validationSchema = ForgetSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as { [key: string]: Yup.StringSchema });

  const handleSubmit = async (values: any, props: any) => {
    setIsLoading(true);
    try {
      const response = await post({
        isAlert: true,
        path: "auth/forgot-password",
        body: JSON.stringify({
          email: values.email,
        }),
      });

      setIsLoading(false);
      if (response?.status === 200) {
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
        <p className="text-2xl font-semibold">Forgot Password</p>
        <p className="tracking-wide">{`No worries, we'll send you reset instruction`}</p>
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
                {ForgetSchema.map((item) => (
                  <Field key={item.key} name={item.name}>
                    {(props: {
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                      meta: { touched: any; error: any };
                    }) => (
                      <div className="flex flex-col  w-full justify-center gap-3">
                        <div>{item.label}</div>
                        <TextField
                          size="medium"
                          variant="outlined"
                          className="w-full md:w-full !rounded-2xl"
                          margin="none"
                          {...props.field}
                          placeholder={item.placeHolder}
                          type={item.type}
                          error={
                            props.meta.touched && Boolean(props.meta.error)
                          }
                          helperText={props.meta.touched && props.meta.error}
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
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-sm">Remember Password?</p>
                    <Link href="/login">
                      <span className="text-theme text-lg font-semibold">
                        Login
                      </span>
                    </Link>
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

export default ForgotForm;
