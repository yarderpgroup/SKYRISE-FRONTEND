import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Dialog, IconButton, TextFieldProps } from "@mui/material";
import { put } from "api";
import {
  CountrySelector,
  InputField,
  RippleLoadingButton,
} from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  isActiveId?: string;
  activeData?: any;
};
const TenantRegisterEdit = ({
  open,
  onClose,
  mutate,
  isActiveId,
  activeData,
}: Props) => {
  const router = useRouter();
  const PropertyID = router.query.management;
  const [isImage, setIsImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [countrySelector, setCountrySelector] = useState<any>();
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState("password");
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const tenantID = isActiveId;
  const LoginSchema = [
    {
      key: 1,
      name: "firstName",
      label: "First Name",
      placeHolder: "Enter Your FirstName",
      initialValue: activeData?.firstName,
      type: "text",
      validationSchema: Yup.string()
        .required("First Name is required.")
        .min(3, "First Name must be at least 3 characters long.")
        .matches(/^[aA-zZ\s]+$/, "First Name must be only alphabets"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 2,
      name: "lastName",
      placeHolder: "Enter Your LastName",
      label: "Last Name",
      initialValue: activeData?.lastName,
      type: "text",
      validationSchema: Yup.string()
        .required("Last Name is required")
        .min(3, "Last Name must be at least 3 characters long.")
        .matches(/^[aA-zZ\s]+$/, "First Name must be only alphabets"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 3,
      name: "email",
      placeHolder: "Enter Your Email",
      label: "Email",
      initialValue: activeData?.email,
      type: "text",
      validationSchema: Yup.string().email("Invalid Email"),
      className: "col-span-12 md:col-span-6",
      disable: true,
    },
    {
      key: 4,
      name: "phoneNumber",
      placeHolder: "Enter Your Phone",
      label: "Phone",
      initialValue: activeData?.phoneNumber,
      type: "number",
      validationSchema: Yup.number()
        .typeError("That doesn't look like a phone number")
        .positive("A phone number can't start with a minus")
        .integer("A phone number can't include a decimal point")
        .min(8),
      className: "col-span-12 md:col-span-6",
      disable: true,
    },
  ];

  const initialValues = LoginSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = LoginSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  const handleSend = async (values: any) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("firstName", values?.firstName);
      formData.append("lastName", values?.lastName);
      formData.append("propertyId", PropertyID as any);
      if (isImage) {
        formData.append("photo", isImage);
      }

      const response = await put({
        path: `tenant/update/${tenantID}`,
        isAlert: true,
        isImage: true,
        body: formData,
      });

      setIsLoading(false);
      mutate();
      onClose();
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    } finally {
      onClose();
    }
  };
  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          Edit Tenant Register
        </p>
        <div className="flex flex-col   w-full p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-4">
                {LoginSchema?.map((inputItem) => (
                  <Field name={inputItem?.name} key={inputItem?.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div
                        className={`flex flex-col justify-center gap-3 ${inputItem?.className}`}
                      >
                        {/* {isUserLoading ? (
                            <Skeleton variant="text" width={200} height={30} />
                          ) : ( */}
                        <div className="font-semibold">{inputItem?.label}</div>
                        {/* )} */}
                        <div className="col-span-6 w-full">
                          {inputItem?.type === "countrySelector" ? (
                            <CountrySelector
                              setCountryDetails={setCountrySelector}
                              countryDetails={countrySelector}
                            />
                          ) : (
                            <InputField
                              title={inputItem?.label}
                              key={inputItem?.key}
                              initialValue={initialValues}
                              name={inputItem?.name}
                              disabled={inputItem?.disable}
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
                                            setPasswordFieldType(
                                              (prev: string) =>
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
                                formik?.touched[inputItem?.name] &&
                                  formik?.errors[inputItem?.name]
                              )}
                              helperText={
                                formik?.touched[inputItem?.name] &&
                                (formik?.errors[inputItem?.name] as any)
                              }
                              {...(props.field as any)}
                            />
                          )}
                          {/* )} */}
                        </div>
                      </div>
                    )}
                  </Field>
                ))}

                <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-4">
                  {/* {isUserLoading ? (
                      <Skeleton variant="text" width={200} height={30} />
                    ) : ( */}
                  <p className="text-sm">
                    By registering, you agree to SKYRISE terms of use.
                  </p>
                  {/* )} */}
                  {/* {isUserLoading ? (
                      <Skeleton variant="text" width={200} height={30} />
                    ) : ( */}
                  <RippleLoadingButton
                    title="Tenant Register"
                    className="w-44"
                    loading={isLoading}
                  />
                  {/* )} */}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
};

export default TenantRegisterEdit;
