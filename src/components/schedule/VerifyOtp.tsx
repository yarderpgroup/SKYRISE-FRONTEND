import * as Yup from "yup";
import { ArrowBack } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { put } from "api";
import { useRouter } from "next/router";
import { RippleLoadingButton } from "components/core";
import { toast } from "react-toastify";

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

const VerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReturn = () => {
    // router.back();
  };
  // get the initial values and validation schema
  const initialValues = verifyOtpSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as { [key: string]: string });

  const validationSchema = verifyOtpSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );

  const handleSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await put({
        path: `schedule/verify/otp`,
        isAlert: true,
        body: JSON.stringify({
          otp: values.otp,
        }),
      });
      if (response?.data?.status === "success") {
        // router.push(`/schedule/verify/${response?.data?.data?.id}`);
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  <div className="w-full relative flex flex-col gap-5 text-themeDarkGray py-8 px-3 md:p-5 h-full justify-center">
    <div className=" absolute top-4 left-4">
      <IconButton>
        <ArrowBack className="cursor-pointer" onClick={handleReturn} />
      </IconButton>
    </div>
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <div className="flex flex-col gap-4 items-center justify-center w-full h-full pt-5 md:pt-0 p-5">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-2xl font-semibold">Verify Oto</p>
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
                          helperText={props.meta.touched && props.meta.error}
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
  </div>;
};

export default VerifyOtp;
