import { Dialog, TextFieldProps } from "@mui/material";
import { post } from "api";
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
};
const AddGuestList = ({ open, onClose, mutate }: Props) => {
  const addGuestArr = [
    {
      key: 1,
      name: "guestName",
      label: "Guest Name",
      placeHolder: "Alexa Carter",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Guest Name is required."),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 2,
      name: "date",
      placeHolder: "",
      label: "Date",
      initialValue: "",
      type: "date",
      validationSchema: Yup.string().required("A date is required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 3,
      name: "phone",
      placeHolder: "023848838",
      label: "Phone Number",
      initialValue: "",
      type: "number",
      validationSchema: Yup.string()
        .required("Phone Number is required")
        .min(6, "A phone number must be at least 6 number"),
      className: "col-span-12 md:col-span-6",
    },

    {
      key: 4,
      name: "email",
      placeHolder: "alexacarter@gmail.com",
      label: "Email",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string()
        .required("Email ID is required")
        .email("Invalid Email"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 5,
      label: "Country",
      type: "countrySelector",
      name: "countrySelector",
      className: "col-span-12 md:col-span-12",
    },
  ];
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [countrySelector, setCountrySelector] = useState<any>(null);

  const router = useRouter();
  const propertyID = router?.query?.selectedId;
  const initialValues = addGuestArr.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = addGuestArr?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `tenant/guest/add/${propertyID}`,
        isAlert: true,
        body: JSON.stringify({
          guestName: values?.guestName,
          email: values?.email,
          phoneNumber: values?.phone,
          countryCode: countrySelector?.code,
          countryName: countrySelector?.label,
          countryPhone: countrySelector?.phone,
          visitDate: values?.date,
        }),
      });
      setIsStatusLoading(false);
      mutate();

      onClose();
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
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
      <div className="bg-white h-fit md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          Add new Guest
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {addGuestArr.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div
                        className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                      >
                        <div className="font-semibold text-themeDarkGray">
                          {inputItem.label}
                        </div>
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
                              type={inputItem?.type}
                              value={formik?.values[inputItem?.name]}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              fullWidth
                              error={Boolean(
                                formik?.touched[inputItem?.name] &&
                                  formik?.errors[inputItem?.name]
                              )}
                              helperText={
                                formik?.touched[inputItem?.name] &&
                                (formik?.errors[inputItem?.name] as any)
                              }
                            />
                          )}
                          {/* )} */}
                        </div>
                      </div>
                    )}
                  </Field>
                ))}

                <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-2">
                  <RippleLoadingButton
                    type="submit"
                    title="Save & Continue"
                    className="w-44"
                    loading={isStatusLoading}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
};

export default AddGuestList;
