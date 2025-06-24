import { Dialog, TextFieldProps } from "@mui/material";
import { put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const LeaseUpdate = ({ open, onClose, mutate }: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const AddTenantsSchema = [
    {
      key: "1",
      name: "startDate",
      label: "Start Date *",
      placeholder: "StartDate",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "date",
      validationSchema: Yup.string().required("StartDate is Required"),
      initialValue: "",
      className: "col-span-6",
      multiline: false,
      disable: true,
    },
    {
      key: "2",
      name: "endDate",
      label: "Custom End Date *",
      placeholder: "EndDate",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "date",
      className: "col-span-6",
      validationSchema: Yup.string().required("EndDate is Required"),
      initialValue: "",

      multiline: false,
      required: true,
    },

    {
      key: "5",
      name: "moveInFees*",
      label: "Move in Fee*",
      placeholder: "Move in Fee*",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Move in Fee is Required"),
      initialValue: "",
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "6",

      name: "moveOutFees*",
      label: "Move Out Fee*",
      placeholder: "Move Out Fee*",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Move Out Fee is Required"),
      initialValue: "",
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "7",
      name: "parkingFees*",
      label: "Parking Fee *",
      placeholder: "Parking Fee *",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Parking Fee is Required"),
      initialValue: "",
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "8",
      name: "rentprice",
      label: "Late Rent Fee *",
      placeholder: "Month-to-Month",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Fee is Required"),
      initialValue: "",
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "1iii",

      name: "rent",
      label: "Rent Fee*",
      placeholder: "Rent",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Rent is Required"),
      initialValue: "",
      className: "col-span-6",
      multiline: false,
      required: true,
    },
    {
      key: "2ii",
      name: "deposit",
      label: "Security Deposit *",
      placeholder: "Security Deposit ",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Security Deposit  is Required"),
      initialValue: "",
      className: "col-span-6",
      multiline: false,
      required: true,
    },
  ];

  const initialValues = AddTenantsSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddTenantsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {};
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
          Edit Coupons
        </p>
        <div className="w-full flex flex-col items-center justify-center ">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {AddTenantsSchema?.map((inputItem) => (
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

export default LeaseUpdate;
