import * as Yup from "yup";
import {
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useSWRAPI from "hooks/useSWRAPI";
import { toast } from "react-toastify";
import { post } from "api";
import { RippleLoadingButton } from "components/core";
import useAuth from "hooks/useAuth";

const ConfirmPasswordSchema = [
  {
    key: "0",
    name: "oldPassword",
    label: "Old Password",
    initialValue: "",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  },
  {
    key: "1",
    name: "newPassword",
    label: "New Password",
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
const ChangePasswordCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFieldType, setPasswordFieldType] = useState(null);
  const { isUserLoading } = useAuth();

  const onButtonHide = (selectedId: any) => {
    if (selectedId === passwordFieldType) {
      setPasswordFieldType(null);
      return;
    }
    setPasswordFieldType(selectedId);
  };

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
      //post method to update password
      const response = await post({
        isAlert: true,
        path: "auth/change-password",
        body: JSON.stringify({
          oldPassword: values?.oldPassword,
          newPassword: values?.newPassword,
          confirmPassword: values?.confirmPassword,
        }),
        token: "ACCESS_TOKEN",
      });
      if (response.status === 200 || response.status !== 200) {
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error);
    } finally {
      setIsLoading(false);
      props.resetForm();
    }
  };

  return (
    <div className="w-full px-0 md:px-5 flex gap-6 md:gap-10 flex-col">
      <div className="w-full">
        {isUserLoading ? (
          <Skeleton
            variant="text"
            width="100%"
            height={50}
            animation="wave"
            className="mb-4"
          />
        ) : (
          <h1 className="text-xl font-semibold text-center md:text-start">
            Change Password
          </h1>
        )}
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className="w-full flex gap-4 items-center justify-center flex-col">
              {ConfirmPasswordSchema.map((item) => (
                <Field key={item.key} name={item.name}>
                  {(props: {
                    meta: { touched: any; error: any };
                    field: JSX.IntrinsicAttributes & TextFieldProps;
                  }) => (
                    <div className="flex flex-col w-full justify-center gap-2">
                      {isUserLoading ? (
                        <Skeleton
                          className="!w-3/5 h-10"
                          animation="wave"
                          variant="text"
                        />
                      ) : (
                        <div className="font-semibold">{item.label}</div>
                      )}
                      {isUserLoading ? (
                        <Skeleton
                          className="!w-3/5 h-20"
                          animation="wave"
                          variant="text"
                        />
                      ) : (
                        <TextField
                          key={item?.key}
                          name={item?.name}
                          value={formik?.values[item?.name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          type={
                            passwordFieldType === item.name
                              ? "text"
                              : "password"
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={(index) => onButtonHide(item.name)}
                                >
                                  {passwordFieldType === item.name ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
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
                      )}
                    </div>
                  )}
                </Field>
              ))}
              <div className="flex w-full justify-start items-start">
                <></>
                {/* <button
                  type="submit"
                  className="gradientButton rounded-md text-white py-2 w-44"
                >
                  Reset Password
                </button> */}
                {isUserLoading ? (
                  <Skeleton
                    className="!w-2/5 h-20"
                    animation="wave"
                    variant="text"
                  />
                ) : (
                  <RippleLoadingButton
                    title="Reset Password"
                    className="w-44"
                    loading={isLoading}
                  />
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePasswordCard;
