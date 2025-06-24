import { TextFieldProps } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddRentSchema = [
  {
    key: "1",

    name: "rent",
    label: "Rent*",
    placeholder: "Rent",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Rent is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
  {
    key: "2",

    name: "deposit",
    label: "Security Deposit *",
    placeholder: "Security Deposit ",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Security Deposit  is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
];

const DepositDetails = () => {
  const initialValues = AddRentSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddRentSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {};

  return (
    <div className="pt-6">
      <div className="w-full ">
        <h1 className="text-2xl font-bold text-themeDarkGray">Fee Details</h1>

        <Formik
          onSubmit={handleSend}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
        >
          {(formik) => (
            <Form>
              <div className="grid grid-cols-1  lg:grid-cols-1 md:gap-5  w-full justify-center items-center py-2 ">
                <>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={handleSend}
                  >
                    {(formik) => (
                      <Form className="w-full  gap-2 md:gap-4">
                        {AddRentSchema.map((inputItem) => (
                          <Field name={inputItem.name} key={inputItem.key}>
                            {(props: {
                              meta: { touched: any; error: any };
                              field: JSX.IntrinsicAttributes & TextFieldProps;
                            }) => (
                              <div
                                className={`flex flex-col justify-center gap-2 `}
                              >
                                <div className=" text-themeDarkGray font-bold pt-4">
                                  {inputItem.label}
                                </div>
                                <div className=" w-full">
                                  <InputField
                                    title={inputItem?.label}
                                    key={inputItem?.key}
                                    name={inputItem?.name}
                                    type={inputItem?.type}
                                    value={formik?.values[inputItem?.name]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    multiline={inputItem.multiline}
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
                      </Form>
                    )}
                  </Formik>
                </>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DepositDetails;
