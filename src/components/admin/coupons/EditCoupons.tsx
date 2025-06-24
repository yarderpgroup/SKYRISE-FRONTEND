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
  activeId: any;
};
const EditCoupons = ({ open, onClose, mutate, activeId }: Props) => {
  console.log(dayjs(new Date(activeId?.validFrom)).format("YYYY-DD-MM"));
  console.log(activeId);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const AddBankSchema = [
    {
      key: "2",

      name: "validForm",
      label: "Valid Form",
      placeholder: "valid Form",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "date",
      validationSchema: Yup.string().required("validForm is Required"),
      initialValue: dayjs(new Date(activeId?.validFrom)).format("YYYY-DD-MM"),
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "3",

      name: "validTill",
      label: "Valid Till",
      placeholder: "valid Till",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "date",
      validationSchema: Yup.string().required("validTill is Required"),
      initialValue: dayjs(new Date(activeId?.validTill)).format("YYYY-DD-MM"),
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "3",

      name: "maxUser",
      label: "Max Uses",
      placeholder: "Max Uses",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Max Uses is Required"),
      initialValue: activeId?.maxUser,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "4",

      name: "discount",
      label: "Discount",
      placeholder: "Discount",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Discount is Required"),
      initialValue: activeId?.discount,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
  ];

  const initialValues = AddBankSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddBankSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);
      const response = await put({
        path: `coupon/update/${activeId?._id}`,

        isAlert: true,
        body: JSON.stringify({
          validFrom: new Date(dayjs(values?.validForm).format("LLL")),
          validTill: new Date(dayjs(values?.validTill).format("LLL")),
          maxUser: values.maxUser,
          discount: values.discount,
        }),
      });
      console.log(response, "response");
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
                {AddBankSchema.map((inputItem) => (
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

export default EditCoupons;
