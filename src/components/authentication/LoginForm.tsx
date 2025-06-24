import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import useAuth from "hooks/useAuth";
import useAuthFetch from "hooks/useAuthFetch";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { saveToLocalStorage } from "utils";
import * as Yup from "yup";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const { setUser, getUser, user, isUserLoading } = useAuth();
  const { isLoading, mutate } = useAuthFetch();
  const email = useRouter()?.query?.email;
  const LoginSchema = [
    {
      key: "1",
      // label: "Email / Phone Number",
      label: "Email",
      placeHolder: "demo@gmail.com",
      name: "email",
      type: "text",
      validationSchema: Yup.string()
        .required("Email/Phone is required")
        .email("Invalid Email Address"),
      initialValue: email,
    },
    {
      key: "2",
      label: "Enter your password",
      placeHolder: "Set Password",
      name: "password",
      type: "password",
      validationSchema: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      initialValue: "",
    },
  ];
  const router = useRouter();

  const initialValues = LoginSchema.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  const validationSchema = LoginSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as { [key: string]: Yup.StringSchema });
  const handleLogin = async (values: any, props: any) => {
    try {
      const response: any = await mutate({
        path: "auth/login",
        method: "POST",
        body: JSON.stringify({
          email: values?.email?.trim(),
          password: values?.password,
        }),
      });
      if (
        (response?.error === "Your email is not verified yet!" &&
          response?.status === 500) as any
      ) {
        router.push("/verify-mail");
      }
      if (response?.error) return toast.error(response?.error);
      if (response?.data?.ACCESS_TOKEN) {
        saveToLocalStorage("ACCESS_TOKEN", response?.data?.ACCESS_TOKEN);
      }
      getUser();
      await setUser(response?.data);
      if (response?.data && response?.data?.data?.role === "SUPERADMIN") {
        return router.push("/account");
      } else if (
        response?.data?.data?.role &&
        response?.data?.data?.role === "BUYER"
      ) {
        return router.push("/account");
      } else if (
        response?.data?.data?.role &&
        response?.data?.data?.role === "AGENT"
      ) {
        return router.push("/account");
      } else if (
        response?.data?.data?.role &&
        response?.data?.data?.role === "OWNER"
      ) {
        return router.push("/account");
      } else if (
        response?.data?.data?.role &&
        response?.data?.data?.role === "BUILDER"
      ) {
        return router.push("/account");
      } else if (
        response?.data?.data?.role &&
        response?.data?.data?.role === "TENANT"
      ) {
        router.push("/account");
        return;
      }
      toast.success(response?.message);
      props.resetForm();
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 text-themeDarkGray">
      <div className="flex flex-col gap-2 text-center">
        <p className="text-2xl font-semibold">Log in</p>
        <p className="tracking-wide">{`for a personalized Home online`}</p>
      </div>
      <div className="w-full items-center justify-center flex">
        <div className="md:w-4/5 w-full flex flex-col items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleLogin}
          >
            {(formik) => (
              <Form className="w-full flex gap-5 md:gap-8 items-center justify-center flex-col">
                {LoginSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div className="flex flex-col  w-full justify-center gap-3">
                        <div className="font-semibold">
                          {inputItem.label}
                          {inputItem.type === "password" && (
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <Visibility className="!text-themeDarkGray" />
                              ) : (
                                <VisibilityOff className="!text-themeDarkGray" />
                              )}
                            </IconButton>
                          )}
                        </div>
                        <TextField
                          size="medium"
                          variant="outlined"
                          className="w-full md:w-full !rounded-2xl"
                          margin="none"
                          // label={inputItem.label}
                          placeholder={inputItem.placeHolder}
                          type={!showPassword ? "text" : inputItem.type}
                          error={Boolean(
                            props.meta.touched && props.meta.error
                          )}
                          helperText={props.meta.touched && props.meta.error}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {inputItem.type === "password" && (
                                  <Link href="/login-otp">
                                    <div className="text-[#0075FF] text-sm">
                                      Login With OTP
                                    </div>
                                  </Link>
                                )}
                              </InputAdornment>
                            ),
                          }}
                          {...props.field}
                        />
                        {inputItem.type === "password" && (
                          <div className="w-full flex justify-end">
                            <Link href="/forgot-password">
                              <p className="text-sm text-theme">
                                Forget Password?
                              </p>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </Field>
                ))}

                <div className="flex items-center w-fit  justify-center flex-col gap-4">
                  <RippleLoadingButton
                    title="Sign In"
                    className="w-44"
                    loading={isLoading}
                  />
                  <div>
                    <p className="tracking-wide">
                      Don't have a SKYRISE account?{" "}
                      <Link href="/register">
                        <span className="text-theme text-lg font-semibold">
                          Sign Up
                        </span>
                      </Link>
                    </p>
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

export default LoginForm;
