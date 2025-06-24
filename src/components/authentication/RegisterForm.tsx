import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Checkbox, IconButton, TextFieldProps } from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/router";
import CountrySelector from "components/core/CountrySelector";

const userSchema = [
  {
    key: 1,
    name: "firstName",
    label: "First Name",
    placeHolder: "demo fastName",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("First Name is required.")
      .min(3, "First Name must be at least 3 characters long.")
      .matches(/^[A-Za-z\s]+$/, "First Name must be only alphabets."),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 2,
    name: "lastName",
    placeHolder: "demo lastName",
    label: "Last Name",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters long.")
      .matches(/^[A-Za-z\s]+$/, "Last Name must be only alphabets."),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 3,
    name: "email",
    placeHolder: "demo email",
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
    name: "password",
    placeHolder: "demo password",
    label: "Password",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New Password is required"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
    //   "Password must contain at least one uppercase, one lowercase, one number and one special case character"
    // ),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 5,
    label: "Country",
    type: "countrySelector",
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 5,
    name: "phoneNumber",
    placeHolder: "demo phone",
    label: "Phone",
    initialValue: "",
    type: "number",
    validationSchema: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .required("A phone number is required"),
    className: "col-span-12 md:col-span-6",
  },
];
const typeOfUser = [
  {
    id: "1",
    title: "Buyer",
  },
  {
    id: "2",
    title: "Owner",
  },
  {
    id: "3",
    title: "Agent",
  },
  {
    id: "4",
    title: "Builder",
  },
];

const initialValues = userSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  },
  {} as any
);

const validationSchema = userSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue?.name] = currentValue?.validationSchema;
    return accumulator;
  },
  {} as any
);
const RegisterForm = () => {
  const [countrySelector, setCountrySelector] = useState<any>(null);
  const [checked, setChecked] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event: any) => {
    setChecked(event.target.value);
  };
  const router = useRouter();
  const handleRegister = async (values: any, props: any) => {
    setIsLoading(true);
    try {
      const response = await post({
        isAlert: true,
        path: "user/register",
        body: JSON.stringify({
          role: checked.toUpperCase(),
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
          countryCode: countrySelector?.code,
          countryName: countrySelector?.label,
          countryPhone: countrySelector?.phone,
        }),
      });
      setIsLoading(false);
      if (response?.status === 200) {
        setChecked("");
        props.resetForm();
        router.push("/verify-mail");
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setChecked("");
    }
  };

  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState("password");
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  return (
    <div className="w-full flex items-center justify-center flex-col text-themeDarkGray gap-8">
      <div className="flex flex-col gap-6">
        <p className="text-2xl font-semibold text-center">
          Start with your free account today
        </p>
        <div className="flex justify-between w-full md:w-fit md:gap-8 items-center">
          <p className="font-semibold text-sm md:text-lg">I am</p>
          {typeOfUser.map((item) => (
            <div className="flex items-center">
              <Checkbox
                sx={{
                  color: "#999999",
                  "&.Mui-checked": {
                    color: "#E33324",
                  },
                }}
                value={item.title}
                checked={item.title === checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <p className="md:text-lg text-xs">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-4/5 w-full flex flex-col items-center justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleRegister}
        >
          {(formik) => (
            <Form className="w-full grid grid-cols-12 gap-4">
              {userSchema.map((inputItem: any) => (
                <Field name={inputItem.name} key={inputItem.key}>
                  {(props: {
                    meta: { touched: any; error: any };
                    field: JSX.IntrinsicAttributes & TextFieldProps;
                  }) => (
                    <div
                      className={`flex flex-col justify-center gap-3 ${inputItem.className}`}
                    >
                      <div className="font-semibold">{inputItem.label}</div>
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
                            name={inputItem?.name}
                            type={
                              inputItem?.name === "password"
                                ? passwordFieldType
                                : inputItem?.name === "confirmPassword"
                                ? confirmPasswordFieldType
                                : (inputItem?.type as any)
                            }
                            placeholder={inputItem.placeHolder}
                            value={formik.values[inputItem?.name]}
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
                              formik?.touched[inputItem.name] &&
                                formik?.errors[inputItem.name]
                            )}
                            helperText={
                              formik?.touched[inputItem.name] &&
                              (formik?.errors[inputItem.name] as any)
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Field>
              ))}

              <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-4">
                <p className="text-sm">
                  By registering, you agree to SKYRISE terms of use.
                </p>
                <RippleLoadingButton
                  title="Sign Up"
                  className="w-44"
                  loading={isLoading}
                  // isDisabled={(formik.isValid || formik.isSubmitting) as any}
                />
                <div className="pt-5">
                  <p className="tracking-wide">
                    Already have SKYRISE account?{" "}
                    <Link href="/login">
                      <span className="text-theme text-lg font-semibold">
                        Login
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
  );
};

export default RegisterForm;
