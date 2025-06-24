import * as Yup from "yup";
import { ArrowBack, LoginOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { post, put } from "api";
import { useRouter } from "next/router";
import { RippleLoadingButton } from "components/core";
import { toast } from "react-toastify";
import CustomDialog from "components/core/CustomDialog";
interface Props {
  setVerifyModelOpen: any;
  isSlotBooked: any;
  mutate: any;
}

const VerifyModal = ({ setVerifyModelOpen, isSlotBooked, mutate }: Props) => {
  const [isVerifyOtp, setIsVerifyOtp] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const propertyID = router?.query?.propertyDetails;

  const verifySchema = [
    {
      key: "1",
      label: `Enter Your Email*`,
      name: "email",
      type: "text",
      placeholder: "Enter Your Email",
      validationSchema: Yup.string()
        .min(6, `Email must be at least 6 characters`)
        .required(`Email is required`),
      initialValue: "",
    },
  ];

  const verifyOtpSchema = [
    {
      key: "1",
      label: `Enter Your OTP*`,
      name: "otp",
      type: "text",
      placeholder: "Enter Your OTP",
      validationSchema: Yup.string()
        .min(6, `OTP must be at least 6 characters`)
        .required(`OTP is required`),
      initialValue: "",
    },
  ];

  // timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  // get the initial values and validation schema
  const initialValues = verifySchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as { [key: string]: string });
  const validationSchema = verifySchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as { [key: string]: Yup.StringSchema });

  const initialValuesOtp = verifyOtpSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );

  const validationSchemaOtp = verifyOtpSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );

  // submit the form
  const handleSubmit = async (values: any) => {
    setMinutes(1);
    setSeconds(30);
    setIsLoading(true);
    try {
      const response = await post({
        path: `schedule/verify`,
        isAlert: true,
        body: JSON.stringify({
          email: values.email,
          propertyId: propertyID,
        }),
      });
      setIsVerifyOtp(true);
      setIsLoading(false);
      mutate();
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  const HandleVerifyOtp = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await put({
        path: `schedule/verify/otp`,
        isAlert: true,
        body: JSON.stringify({
          emailOtp: values.otp,
          propertyId: propertyID,
        }),
      });
      mutate();
      setVerifyModelOpen(false);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  return (
    <div className="w-full">
      {/* verify email */}
      <Collapse in={!isVerifyOtp}>
        <div className="w-full relative flex flex-col gap-5 text-themeDarkGray py-8 px-3 md:p-5 h-full justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSubmit}
          >
            {(formik) => (
              <Form>
                <div className="flex flex-col gap-4 items-center justify-center w-full h-full pt-5 md:pt-0 p-5">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-2xl font-semibold">Verify Schedule</p>
                    <p className="tracking-wide">{`Verify Your Email,For Booking Schedule `}</p>
                  </div>
                  <div className="w-full flex flex-col gap-4 md:gap-3 justify-center">
                    {verifySchema.map((inputItem) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: {
                          meta: { touched: any; error: any };
                          field: JSX.IntrinsicAttributes & TextFieldProps;
                        }) => (
                          <div className="flex gap-2 md:gap-3 items-end">
                            <div className="w-full ">
                              {inputItem.name === "otp" && (
                                <p className="md:py-3 py-2 text-xs md:text-sm">
                                  We sent a verification code to your email.
                                </p>
                              )}
                              <p className="pb-2 text-sm md:text-base">
                                {inputItem.label}
                              </p>
                              <TextField
                                variant="outlined"
                                fullWidth
                                margin="none"
                                size="medium"
                                type={inputItem.type}
                                error={Boolean(
                                  props.meta.touched && props.meta.error
                                )}
                                helperText={
                                  props.meta.touched && props.meta.error
                                }
                                {...props.field}
                              />
                            </div>
                          </div>
                        )}
                      </Field>
                    ))}
                    <div className="w-full flex items-center justify-center pt-2 ">
                      <RippleLoadingButton
                        title="verify"
                        type="submit"
                        className="w-44"
                        loading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Collapse>
      {/* verify otp */}
      <Collapse in={isVerifyOtp}>
        <div className="w-full relative flex flex-col gap-5 text-themeDarkGray py-8 px-3 md:p-5 h-full justify-center">
          <Formik
            initialValues={initialValuesOtp}
            validationSchema={Yup.object(validationSchemaOtp)}
            onSubmit={HandleVerifyOtp}
          >
            {(formik) => (
              <Form>
                <div className="flex flex-col gap-4 items-center justify-center w-full h-full pt-5 md:pt-0 p-5">
                  <div className="flex flex-col gap-2 text-center">
                    <p className="text-2xl font-semibold">Verify Otp</p>
                    <p className="tracking-wide">{`Verify Your Email,For Booking Schedule `}</p>
                  </div>
                  <div className="w-full flex flex-col gap-4 md:gap-3 justify-center">
                    {verifyOtpSchema.map((inputItem) => (
                      <Field name={inputItem.name} key={inputItem.key}>
                        {(props: {
                          meta: { touched: any; error: any };
                          field: JSX.IntrinsicAttributes & TextFieldProps;
                        }) => (
                          <div className="flex gap-2 md:gap-3 items-end">
                            <div className="w-full ">
                              {inputItem.name === "otp" && (
                                <p className="md:py-3 py-2 text-xs md:text-sm">
                                  We sent a verification code to your email.
                                </p>
                              )}
                              <p className="pb-2 text-sm md:text-base">
                                {inputItem.label}
                              </p>
                              <TextField
                                variant="outlined"
                                fullWidth
                                margin="none"
                                size="medium"
                                type={inputItem.type}
                                error={Boolean(
                                  props.meta.touched && props.meta.error
                                )}
                                helperText={
                                  props.meta.touched && props.meta.error
                                }
                                {...props.field}
                              />
                            </div>
                          </div>
                        )}
                      </Field>
                    ))}
                    <div className="w-full flex items-center justify-center pt-2 ">
                      <RippleLoadingButton
                        title="verify otp"
                        type="submit"
                        className="w-44"
                        loading={isLoading}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Collapse>
    </div>
  );
};

export default VerifyModal;
