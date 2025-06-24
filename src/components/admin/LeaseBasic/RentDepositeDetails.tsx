import { TextFieldProps } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DepositDetails from "./DepositDetails";

const AddRentSchema = [
  {
    key: "1",

    name: "inFee",
    label: "Move in Fee*",
    placeholder: "Move in Fee",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Move in Fee is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
  {
    key: "2",

    name: "out Fee",
    label: "Move Out Fee *",
    placeholder: "Move Out Fee ",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Move Out Fee  is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
  {
    key: "3",

    name: "parking fee",
    label: "Parking Fee*",
    placeholder: "Parking Fee",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Parking Fee is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
  {
    key: "4",

    name: "rentFee",
    label: "Late Rent Fee *",
    placeholder: "Month-to-Month",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Fee is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
];

const RentDepositDetails = () => {
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
    <div className="pt-8">
      <div className="flex w-full gap-10">
        <div className=" w-1/2">
          <h1 className="text-2xl font-bold text-themeDarkGray">
            Rent Details
          </h1>

          <div className=" w-full flex flex-col gap-3">
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
                                  field: JSX.IntrinsicAttributes &
                                    TextFieldProps;
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
                                          (formik?.errors[
                                            inputItem?.name
                                          ] as any)
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
        <div className="w-1/2">
          <DepositDetails />
        </div>
      </div>
    </div>
  );
};

export default RentDepositDetails;
