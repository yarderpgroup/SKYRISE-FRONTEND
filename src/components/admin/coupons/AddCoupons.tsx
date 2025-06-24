import { Dialog, TextFieldProps } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const AddCoupons = ({ open, onClose, mutate }: Props) => {
  const AddBankSchema = [
    {
      key: "1",
      // placeholder: 'Enter your name',
      name: "code",
      label: "Code",
      placeholder: "Code",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Code is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "2",

      name: "validForm",
      label: "Valid Form",
      placeholder: "valid Form",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "date",
      validationSchema: Yup.string().required("validForm is Required"),
      initialValue: "",
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
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "3",

      name: "cashback",
      label: "Max cashback",
      placeholder: "Max cashback",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Max cashback is Required"),
      initialValue: "",
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
      initialValue: "",
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
          Add Coupons
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
                  <button
                    type="submit"
                    className="btn-one rounded-md text-white py-3 w-full"
                  >
                    Save & Continue
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Dialog>
  );
};

export default AddCoupons;
