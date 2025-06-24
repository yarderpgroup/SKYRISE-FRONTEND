import { Dialog, TextFieldProps } from "@mui/material";
import { post, put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  activeId?: any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const SubScriptionAdd = ({ open, onClose, mutate, activeId }: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const SubScriptionSchema = [
    {
      key: "1",
      name: "title",
      placeholder: "Title",

      label: "Title",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Title is Required"),
      initialValue: activeId?.title,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "2",

      name: "amount",
      label: "Amount",
      placeholder: "Amount",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Amount is Required"),
      initialValue: activeId?.amount,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "4",

      name: "currency",
      label: "Currency",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      options: [
        { label: "USD", value: "USD" },
        { label: "EUR", value: "EUR" },
        { label: "JPY", value: "JPY" },
        { label: "GBP", value: "GBP" },
        { label: "AUD", value: "AUD" },
        { label: "CAD", value: "CAD" },
        { label: "CHF", value: "CHF" },
        { label: "CNY", value: "CNY" },
        { label: "HKD", value: "HKD" },
        { label: "NZD", value: "NZD" },
        { label: "SEK", value: "SEK" },
        { label: "KRW", value: "KRW" },
        { label: "SGD", value: "SGD" },
        { label: "NOK", value: "NOK" },
        { label: "MXN", value: "MXN" },
        { label: "INR", value: "INR" },
        { label: "RUB", value: "RUB" },
        { label: "ZAR", value: "ZAR" },
        { label: "TRY", value: "TRY" },
        { label: "BRL", value: "BRL" },
        { label: "TWD", value: "TWD" },
        { label: "DKK", value: "DKK" },
        { label: "PLN", value: "PLN" },
        { label: "THB", value: "THB" },
        { label: "IDR", value: "IDR" },
        { label: "HUF", value: "HUF" },
        { label: "CZK", value: "CZK" },
        { label: "ILS", value: "ILS" },
        { label: "CLP", value: "CLP" },
        { label: "PHP", value: "PHP" },
        { label: "AED", value: "AED" },
        { label: "COP", value: "COP" },
        { label: "SAR", value: "SAR" },
        { label: "MYR", value: "MYR" },
        { label: "RON", value: "RON" },
        { label: "ARS", value: "ARS" },
        { label: "KWD", value: "KWD" },
        { label: "DZD", value: "DZD" },
        { label: "EGP", value: "EGP" },
        { label: "QAR", value: "QAR" },
        { label: "BDT", value: "BDT" },
        { label: "CRC", value: "CRC" },
        { label: "HRK", value: "HRK" },
        { label: "HNL", value: "HNL" },
        { label: "IQD", value: "IQD" },
        { label: "JOD", value: "JOD" },
        { label: "KES", value: "KES" },
        { label: "LBP", value: "LBP" },
        { label: "MAD", value: "MAD" },
        { label: "MKD", value: "MKD" },
      ],
      type: "select",
      validationSchema: Yup.string().required("Currency is Required"),
      initialValue: activeId?.currency,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-12",
    },
    {
      key: "5",

      name: "description",
      label: "Description",
      placeholder: "Description",

      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Description is Required"),
      initialValue: activeId?.description,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-12",
    },
  ];

  const initialValues = SubScriptionSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );
  const validationSchema = SubScriptionSchema?.reduce(
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
        path: `subscription/plan/update/${activeId?._id}`,

        isAlert: true,
        body: JSON.stringify({
          title: values.title || activeId?.title,
          description: values.description || activeId?.description,
          amount: values.amount || activeId?.amount,
          interval: values.interval || activeId?.interval,
          totalDays: values.totalDays || activeId?.totalDays,
          currency: values.currency || activeId?.currency,
        }),
      });
      if (response.status === 200) {
        setIsStatusLoading(false);
        mutate();
      }
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
          Edit SubScription
        </p>
        <div className="w-full flex flex-col items-center justify-center ">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {SubScriptionSchema.map((inputItem) => (
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
                            options={inputItem.options}
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

export default SubScriptionAdd;
