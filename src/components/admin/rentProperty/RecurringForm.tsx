import { TextFieldProps } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const RecurringForm = ({ isBankActiveCard }: any) => {
  const AddBankSchema = [
    {
      key: "1",
      // placeholder: 'Enter your name',
      name: "title",
      label: "Title",
      placeholder: "Title",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Title is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 ",
    },
    {
      key: "2",
      name: "description",
      label: "Description",
      placeHolder: "Description...",
      initialValue: "",
      validationSchema: Yup.string().required("Description is Required"),
      type: "text",
      multiline: true,
      rows: 3,
      className: "col-span-12",
    },

    {
      key: "3",

      name: "payDate",
      label: "PayDate",
      placeholder: "PayDate",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      validationSchema: Yup.string().required("PayDate is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
      options: [
        {
          id: 2,
          label: "10th every month",
          value: "10th every month",
        },
        {
          id: 3,
          label: "11th every month",
          value: "11th every month",
        },
      ],
    },
    {
      key: "4",

      name: "amount",
      label: "Amount",
      placeholder: "Amount",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Amount is Required"),
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
    <div className="bg-white h-[30rem] md:h-auto scrollBarNone shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5 ">
      <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
        Add Details
      </p>
      <div className="w-full  flex flex-col items-center justify-center ">
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
                          multiline={inputItem.multiline}
                          options={inputItem.options}
                          rows={inputItem.rows}
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

export default RecurringForm;
