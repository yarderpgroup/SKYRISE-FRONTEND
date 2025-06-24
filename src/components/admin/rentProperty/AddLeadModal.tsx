import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
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
import { CustomInput } from "../dashboard";
const AddStoreSchema = [
  {
    key: "1",
    name: "name",
    label: "Full Name",
    placeholder: "Full Name",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Name is Required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-12",
    required: true,
  },
  {
    key: "2",
    name: "email",
    label: "Email",
    placeholder: "Email",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string()
      .email("Invalid Email")
      .required("E-mail is required"),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-12",

    required: true,
  },
  {
    key: 5,
    label: "Country",
    type: "countrySelector",
    name: "countrySelector",
    className: "col-span-12 md:col-span-12",
  },
  {
    key: "3",
    name: "number",
    label: "Phone Number",
    placeholder: "Phone Number",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string()
      .required("Phone number is required !")
      .min(5, "Minimum 5 Digits")
      .max(16, "Maximum 16 Digits")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is invalid"
      ),
    initialValue: "",
    multiline: false,
    className: "col-span-12 md:col-span-12",

    required: true,
  },
  {
    key: "4",
    name: "message",
    label: "Message",
    placeholder: "Message",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Field is Required"),
    initialValue: "",
    className: "col-span-12 md:col-span-12",
    multiline: false,
    required: true,
  },
];

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const AddLeadModal = ({ open, onClose, mutate }: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [countrySelector, setCountrySelector] = useState<any>(null);

  const router = useRouter();
  const propertyID = router?.query?.management;
  const initialValues = AddStoreSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddStoreSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `leads/add`,
        isAlert: true,
        body: JSON.stringify({
          email: values?.email,
          displayName: values?.name,
          phoneNumber: values?.number,
          message: values?.message,
          propertyId: propertyID,
          countryCode: countrySelector?.code,
          countryName: countrySelector?.label,
          countryPhone: countrySelector?.phone,
        }),
      });
      if (response.status === 200) {
        setIsStatusLoading(false);
        mutate();
      }
      if (response?.error) {
        setIsStatusLoading(false);
      }

      onClose();
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    } finally {
      onClose();
      mutate();
    }
  };
  return (
    <>
      <Dialog
        maxWidth={"xs"}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div className="p-5">
          <h1 className="!text-2xl  !font-bold !text-themeDarkGray">
            Add Lead
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {AddStoreSchema.map((inputItem) => (
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
                          {inputItem?.name === "countrySelector" ? (
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
                              placeholder={inputItem.placeholder}
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
      </Dialog>
    </>
  );
};

export default AddLeadModal;
