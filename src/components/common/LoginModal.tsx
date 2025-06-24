import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import {
  Collapse,
  Dialog,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { LOGO } from "assets";
import { RippleLoadingButton } from "components/core";
import useAppContext from "contexts/AppContextProvider";
import { Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import useAuth from "hooks/useAuth";
import useAuthFetch from "hooks/useAuthFetch";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { saveToLocalStorage } from "utils";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginModal = () => {
  const { showLoginModal, setShowLoginModal } = useAppContext();
  const [showPassword, setShowPassword] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
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
      toast.success(response?.message);
      props.resetForm();
    } catch (error: any) {
      toast.error(error);
    }
  };
  const handleClose = () => {
    setShowLoginModal(false);
    setIsOpen(false);
  };

  return (
    <>
      <Dialog
        open={showLoginModal}
        TransitionComponent={Transition}
        keepMounted={false}
        fullWidth
        PaperProps={{
          style: {
            borderRadius: 18,
            height: isOpen ? "27rem" : "25rem",
            display: "grid",
            placeItems: "center",
            position: "relative",
          },
        }}
      >
        <Collapse
          in={!isOpen}
          className={`${!isOpen ? "!w-full !h-full" : ""}`}
        >
          <section className=" w-full px-4 md:px-8 py-6 !text-themeDarkGray">
            <div className="pb-4">
              <div className="flex justify-center">
                <Link href="/">
                  <img src={LOGO.src} alt="logo" className="w-28 md:w-44" />
                </Link>
              </div>
              <div className="flex flex-col items-center text-center pt-2">
                <h2 className="text-xl md:text-3xl font-bold md:pb-2">
                  Welcome To SKYRISE
                </h2>
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: 270, opacity: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="hidden md:inline-block border-2 border-theme bg-theme rounded-full"
                ></motion.div>
                <p className="pt-3">
                  To access all the features of <strong>SKYRISE</strong>, please
                  log in to your account. If you don't have an account yet, you
                  can create one for free by clicking the "Sign Up" button.
                  Thank you for choosing our website!
                </p>
                <div
                  className="flex gap-5 mt-4"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {/* <Link href={"/login"}> */}
                  <button className="btn-one w-44 !rounded-3xl">Login</button>
                  {/* </Link> */}
                  {/* <Link href={"/register"}>
                  <button className="btn-one w-44">Sign Up</button>
                </Link> */}
                </div>
                <p className="pt-4">
                  Don't Have Any Account Please{" "}
                  <Link href={"/register"}>
                    <strong>Register</strong>
                  </Link>
                </p>
              </div>
            </div>

            <IconButton
              className="!absolute !top-2 md:!top-4 !right-2 md:!right-4 !text-red-500"
              onClick={() => setShowLoginModal(false)}
            >
              <Close />
            </IconButton>
          </section>
        </Collapse>
        <Collapse
          in={isOpen}
          className={`${isOpen ? "!w-full relative !h-full" : ""}`}
        >
          <div className="!w-full h-full px-7 flex flex-col justify-center items-center">
            <div className=" flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-semibold text-themeDarkGray">
                Log in
              </p>
              <p>for a personalized Home online</p>
              <IconButton
                className="!absolute -top-2 !right-2 md:!right-4 !text-red-500"
                onClick={handleClose}
              >
                <Close />
              </IconButton>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleLogin}
            >
              {(formik) => (
                <Form className="w-full flex gap-5 md:gap-4 items-center justify-center flex-col">
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

                  <div className="flex items-center w-fit  justify-center flex-col gap-2">
                    <RippleLoadingButton
                      title="Sign In"
                      className="w-44"
                      loading={isLoading}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Collapse>
      </Dialog>
    </>
  );
};

export default LoginModal;
