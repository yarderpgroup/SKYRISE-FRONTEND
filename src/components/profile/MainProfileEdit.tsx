import {
  Avatar,
  InputAdornment,
  Skeleton,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { post, put } from "api";
import { WAVE } from "assets/backgrounds";
import { LoginIcon } from "assets/staticImages";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import useAuth from "hooks/useAuth";
import { AccountLayout } from "layouts";
import { userArr } from "layouts/accountLayout/Sidebar";
import PublicLayout from "layouts/publicLayout";
import { useRef, useState } from "react";
import * as Yup from "yup";
import CountrySelector from "components/core/CountrySelector";

const MainProfileEdit = () => {
  const [isImage, setIsImage] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const profileRef = useRef<HTMLInputElement>(null);
  const { user, isUserLoading, getUser } = useAuth();
  const [showCountry, setShowCountry] = useState<any>({
    code: user?.countryCode,
    label: user?.countryName,
    phone: user?.countryPhone,
  });

  const onButtonPress = () => {
    profileRef?.current && profileRef?.current?.click();
  };

  const profileSchema = [
    {
      key: "1",
      label: "First Name",
      name: "firstName",
      placeholder: "Enter Your First Name",
      type: "text",
      validationSchema: Yup.string()
        .required("required")
        .min(2, "Name must be at least 2 characters"),
      initialValue: user && user?.firstName,
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
        .min(2, "Name must be at least 2 characters"),
      initialValue: user && user?.lastName,
      required: true,
      lg: "col-span-12 md:col-span-6",
      disabled: isEditOpen ? false : true,
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
      initialValue: user && user?.email,
      disabled: true,
      lg: "col-span-12",
    },
    {
      key: "3",
      label: "Phone Number",
      name: "phoneNumber",
      placeholder: "Enter Phone Number",
      type: "number",
      validationSchema: Yup.number().required("required"),
      initialValue: isUserLoading ? "" : user?.phoneNumber,
      disabled: true,
      lg: "col-span-12",
    },
  ];

  const initialValues = profileSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = profileSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleProfileUpdate = async (values: any, props: any) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("firstName", values?.firstName);
    formData.append("lastName", values?.lastName);
    // formData.append("phoneNumber", values?.phoneNumber);
    // formData.append("countryCode", showCountry.code);
    // formData.append("countryName", showCountry.label);
    // formData.append("countryPhone", showCountry.phone);
    if (isImage) {
      formData.append("photo", isImage);
    }
    if (isEditOpen === true) {
      try {
        const response = await put({
          path: "user/updateUser",
          isImage: true,
          isAlert: true,
          body: formData,
        });
        getUser();
        setIsLoading(false);
        setIsEditOpen(false);
      } catch (error) {
        setIsLoading(false);
        setIsEditOpen(false);
      }
    } else {
      setIsEditOpen(false);
    }
  };
  return (
    <div className="w-full flex text-themeDarkGray  h-full flex-col rounded-t-[2rem] md:rounded-md overflow-hidden md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
      <div className="md:bg-gradient-to-br from-slate-700 rounded-t-[2rem] md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] to-themeDarkGray/80 h-fit p-5 md:p-0 md:h-36 w-full relative md:rounded-t-md">
        <div className="md:absolute top-6 left-10 text-center md:text-start w-full flex-col md:flex-row justify-center md:justify-start flex md:gap-2 items-center h-full">
          <div className="w-fit h-fit hidden md:block rounded-full relative overflow-hidden">
            <Avatar
              sx={{
                width: "8.5rem",
                height: "8.5rem",
                border: "2px solid white",
              }}
              src={isImage ? URL?.createObjectURL(isImage) : user?.photoUrl}
            >
              <p className="!text-5xl">
                {user?.firstName && user?.firstName[0]}
              </p>
            </Avatar>
            {isEditOpen && (
              <div
                onClick={onButtonPress}
                className="w-full bottom-0 cursor-pointer absolute h-10 bg-[#0000004c] flex items-center justify-center text-clip"
              >
                <p className="text-white tracking-wide">Edit</p>
              </div>
            )}
          </div>
          <div className="w-fit h-fit block md:hidden rounded-full relative overflow-hidden">
            <Avatar
              sx={{
                width: "6rem",
                height: "6rem",
                border: "2px solid white",
              }}
              src={isImage ? URL?.createObjectURL(isImage) : user?.photoUrl}
            >
              {user?.firstName && user?.firstName[0]}
            </Avatar>
            <div
              onClick={onButtonPress}
              className="w-full bottom-0 cursor-pointer absolute h-8 bg-[#0000004c] flex items-center justify-center text-clip"
            >
              <p className="text-white text-sm tracking-wide">Edit</p>
            </div>
          </div>
          <input
            className="opacity"
            type="file"
            hidden
            onChange={(e: any) => {
              setIsImage(e?.target?.files?.[0]);
            }}
            ref={profileRef}
          />
          <div className="text-themeDarkGray md:text-white flex flex-col">
            <p className="md:text-3xl leading-6 md:leading-8 pt-2 md:pt-0 text-xl tracking-wide font-semibold">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="tracking-wider md:text-base text-sm">{user?.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full rounded-t-3xl md:rounded-none bg-white items-center grid grid-cols-12 py-5 md:py-10 px-4 md:px-6">
        <div className="w-full md:col-span-6 col-span-12">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleProfileUpdate}
          >
            {(formik) => (
              <Form className="md:grid flex flex-col md:grid-cols-12 w-full gap-3 md:gap-5">
                {profileSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div className="flex w-full flex-col md:col-span-12 justify-center gap-2">
                        <div className="font-semibold">{inputItem.label}</div>

                        <InputField
                          fullWidth
                          key={inputItem.key}
                          size="medium"
                          variant="outlined"
                          initialValue={initialValues}
                          className="w-full !rounded-2xl"
                          margin="none"
                          disabled={inputItem?.disabled}
                          value={formik.values[inputItem.name]}
                          onChange={(e) => {
                            formik.setFieldValue(
                              inputItem.name,
                              e.target.value.replace(/[^0-9]/g, "")
                            );
                          }}
                          onBlur={formik.handleBlur}
                          error={Boolean(
                            props.meta.touched && props.meta.error
                          )}
                          helperText={props.meta.touched && props.meta.error}
                          InputProps={
                            {
                              classes: {
                                root: " ",
                                notchedOutline: "notchedOutline",
                                input: "input-field",
                              },
                            } as any
                          }
                          {...(props.field as any)}
                        />
                      </div>
                    )}
                  </Field>
                ))}
                {/* <div className="w-full col-span-12">
              <CountrySelector
                setCountryDetails={setShowCountry}
                countryDetails={showCountry}
              />
            </div> */}

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
                      className="btn-two w-full !text-center cursor-pointer"
                      onClick={() => setIsEditOpen(!isEditOpen)}
                    >
                      Edit Profile
                    </div>
                  </div>
                )}
                {/* </div> */}
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-span-6 hidden md:flex h-full flex-col p-6">
          <img src={LoginIcon.src} alt="icon" className="w-9/12" />
          <div className="flex flex-col text-themeDarkGray w-full text-center gap-1">
            <p className="text-lg font-semibold">Verify Your Email</p>

            <p className="leading-5">
              To ensure the safety of our agents, we need you to verify your
              identity before we can take you on a home tour.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex">
        <img src={WAVE.src} alt="wave" className="w-full" />
      </div>
    </div>
  );
};

export default MainProfileEdit;
