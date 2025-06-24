import * as Yup from "yup";
import {
  FormControl,
  SelectProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { CountrySelector, RippleLoadingButton } from "components/core";
import { useState } from "react";
import useAuth from "hooks/useAuth";
import { put } from "api";

const EditProfile = ({ isImage }: any) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const [countryDetails, setCountryDetails] = useState<any>({
    code: user?.countryCode,
    label: user?.countryName,
    phone: user?.countryPhone,
  });

  const ProfileInfoSchema = [
    {
      key: "1",
      label: "First Name",
      name: "firstName",
      placeholder: "Enter Your First Name",
      type: "text",
      validationSchema: Yup.string()
        .required("required")
        .min(2, "Name must be at least 2 characters")
        .matches(/^[A-Za-z\s]+$/, "First Name must be only alphabets."),
      initialValue: user?.firstName,
      required: true,
      lg: "col-span-12 md:col-span-6",
      disabled: !isEditOpen,
    },
    {
      key: "2",
      label: "Last Name",
      name: "lastName",
      placeholder: "Enter Your Last Name",
      type: "text",
      validationSchema: Yup.string()
        .required("required")
        .min(2, "Name must be at least 2 characters")
        .matches(/^[A-Za-z\s]+$/, "Last Name must be only alphabets."),
      initialValue: user?.lastName,
      required: true,
      lg: "col-span-12 md:col-span-6",
      disabled: isEditOpen ? false : true,
    },
    {
      key: "3",
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Enter Phone Number",
      type: "number",
      validationSchema: Yup.number().required("required"),
      initialValue: user?.phoneNumber,
      disabled: true,
      lg: "col-span-12",
      disable: true,
    },
    {
      key: "4",
      label: "Email",
      name: "email",
      placeholder: "Enter Email Address",
      type: "email",
      validationSchema: Yup.string()
        .required("required")
        .email("Invalid Email Address"),
      initialValue: user?.email,
      disabled: true,
      required: true,
      lg: "col-span-12",
    },
  ];

  const handleUpdate = async (values: any, props: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("email", values.email);
    formData.append("countryCode", countryDetails.code);
    formData.append("countryName", countryDetails.label);
    formData.append("countryPhone", countryDetails.phone);
    if (isImage) {
      formData.append("photo", isImage);
    }

    isDisabled && setIsDisabled(false);
    if (isEditOpen) {
      try {
        const response = await put({
          path: "user/updateUser",
          isImage: true,
          isAlert: true,
          body: formData,
        });

        setIsLoading(false);
        setIsEditOpen(false);
        if (response) {
          setIsLoading(false);
          if (response?.status === 200) {
            props.resetForm();
          }
        }
      } catch (error) {
        setIsLoading(false);
        setIsEditOpen(false);
      }
    } else {
      setIsEditOpen(false);
    }
  };

  const initialValues = ProfileInfoSchema.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as { [key: string]: string }
  );
  const validationSchema = ProfileInfoSchema.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as { [key: string]: Yup.StringSchema }
  );

  return (
    <div className="w-full ">
      <FormControl sx={{ width: "100%" }}>
        <div className="flex flex-col w-full pt-8 gap-3">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleUpdate}
          >
            {(formik) => (
              <Form className="grid grid-cols-12 gap-3">
                {ProfileInfoSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes &
                        TextFieldProps &
                        SelectProps & {
                          name: string;
                          value: string;
                        };
                    }) => {
                      if (inputItem.type === "number") {
                        return (
                          <div className={`w-full ${inputItem?.lg}`}>
                            <p className="tracking-wider text-themeDarkGray font-semibold pb-2">
                              {inputItem.label}
                            </p>
                            <div className="w-full flex flex-col md:flex-row items-center gap-3">
                              {inputItem?.name === "phoneNumber" && (
                                <div className="w-full md:w-2/5">
                                  <CountrySelector
                                    setCountryDetails={setCountryDetails}
                                    countryDetails={countryDetails}
                                  />
                                </div>
                              )}
                              <div className="w-full">
                                <TextField
                                  fullWidth
                                  key={inputItem.key}
                                  placeholder={inputItem.placeholder}
                                  name={inputItem.name}
                                  variant="outlined"
                                  className="rounded-lg"
                                  disabled={inputItem?.disabled}
                                  value={formik.values[inputItem.name]}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      inputItem.name,
                                      e.target.value.replace(/[^0-9]/g, "")
                                    );
                                  }}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.phone &&
                                    Boolean(formik.errors.phone)
                                  }
                                  helperText={
                                    props.meta.touched && props.meta.error
                                  }
                                  InputProps={
                                    {
                                      classes: {
                                        root: " ",
                                        notchedOutline: "notchedOutline",
                                        input: "input-field",
                                      },
                                    } as any
                                  }
                                  inputProps={{
                                    maxLength: "15",
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div className={`w-full ${inputItem?.lg}`}>
                          <p className="tracking-wider text-themeDarkGray font-semibold pb-2">
                            {inputItem.label}
                          </p>
                          <TextField
                            fullWidth
                            disabled={inputItem?.disabled}
                            required={inputItem?.required}
                            placeholder={inputItem.placeholder}
                            type={inputItem.type}
                            className={`w-full ${
                              inputItem.type === "textArea" && "mui-multi-row"
                            }`}
                            error={Boolean(
                              props.meta.touched && props.meta.error
                            )}
                            helperText={props.meta.touched && props.meta.error}
                            InputProps={
                              {
                                classes: {
                                  notchedOutline: "notchedOutline",
                                  input: "input-field",
                                },
                              } as any
                            }
                            {...props.field}
                          />
                        </div>
                      );
                    }}
                  </Field>
                ))}
                {isEditOpen ? (
                  <div className="flex mt-4 !bg-facebook col-span-12">
                    <RippleLoadingButton
                      type="submit"
                      title={"Update Profile"}
                      className="w-full"
                      loading={isLoading}
                    />
                  </div>
                ) : (
                  <div className="flex mt-4 col-span-12">
                    <div
                      className="btn-two !w-full !text-center cursor-pointer"
                      onClick={() => setIsEditOpen(!isEditOpen)}
                    >
                      Edit Profile
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </FormControl>
    </div>
  );
};

export default EditProfile;
