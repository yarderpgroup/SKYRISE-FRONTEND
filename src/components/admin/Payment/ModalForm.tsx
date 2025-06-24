import { TextFieldProps } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const ModalForm = ({ isBankActiveCard }: any) => {
  const AddBankSchema = [
    {
      key: "1",
      // placeholder: 'Enter your name',
      name: "name",
      label: "Bank Name",
      placeholder: "Bank Name",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Bank Name is Required"),
      initialValue: isBankActiveCard?.bankName,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "2",

      name: "accountNumber",
      label: "AccountNumber",
      placeholder: "AccountNumber",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("AccountNumber is Required"),
      initialValue: isBankActiveCard?.accountNumber,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "3",

      name: "name",
      label: "Account Holder Name",
      placeholder: "Account Holder Name",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Name is Required"),
      initialValue: isBankActiveCard?.accountName,
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
    <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
      <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
        Add Bank Details
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
  );
};

export default ModalForm;
                   