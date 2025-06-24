import { TextFieldProps } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
const AddRentSchema = [
  {
    key: "1",

    name: "startDate",
    label: "Start Date *",
    placeholder: "StartDate",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "date",
    validationSchema: Yup.string().required("StartDate is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
  {
    key: "2",

    name: "endDate",
    label: "Custom End Date *",
    placeholder: "EndDate",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "date",
    validationSchema: Yup.string().required("EndDate is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
  {
    key: "3",

    name: "year",
    label: "Full Year *",
    placeholder: "Full Year",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "date",
    validationSchema: Yup.string().required("Full Year is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
  {
    key: "4",

    name: "month",
    label: "Month-to-Month *",
    placeholder: "Month-to-Month",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "date",
    validationSchema: Yup.string().required("month is Required"),
    initialValue: "",

    multiline: false,
    required: true,
  },
  {
    key: "5",

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
    key: "6",

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
    key: "7",

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
    key: "8",

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
  {
    key: "9",

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
    key: "10",

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
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "name",
    label: "Name *",
    placeholder: "Name",
    styleContact: "rounded-lg",

    type: "text",
    validationSchema: Yup.string()
      .required("Name required")
      .min(2, "Name must be at least 2 characters"),
    initialValue: "",

    required: true,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
  {
    key: "2",
    // placeholder: 'Enter your email',
    name: "email",
    label: "Email *",
    placeholder: "Email",
    styleContact: "rounded-lg",
    type: "email",
    validationSchema: Yup.string()
      .required("Email is required")
      .email("Invalid Email Address"),
    initialValue: "",

    required: true,
  },

  {
    key: "3",
    // placeholder: 'Enter your phone number',
    name: "phoneNumber",
    label: "Contact Number *",
    placeholder: "Contact Number",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Contact Number is required"),
    initialValue: "",

    required: true,
  },

  {
    key: "4",
    name: "companyName",
    label: "Company Name *",
    placeholder: "Company Name ",
    styleContact: "rounded-lg",
    validationSchema: Yup.string().required("Company Name is required"),
    type: "text",
    initialValue: "",

    required: true,
  },

  {
    key: "7",
    name: "companyPhone",
    label: "Company Phone*",
    type: "text",
    validationSchema: Yup.string().required("Company Phone is required"),
    styleContact: "rounded-lg",

    initialValue: "",
    placeholder: "Company Phone",

    required: true,
  },
  {
    key: "8",
    name: "emergencyNumber",
    label: "Emergency Number *",
    placeholder: "Emergency Number",

    type: "number",
    styleContact: "rounded-lg",
    validationSchema: Yup.string().required("Emergency Number   is required"),

    initialValue: "",
    required: true,
  },

  {
    key: "11",
    name: "address",
    type: "text",
    placeholder: "Lessor Address",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Lessor Address *",
    validationSchema: Yup.string().required("Lessor Address  is required"),
    initialValue: "",

    required: true,
  },
];

const EditLeaseDetailsAdd = () => {
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
    <div className="p-5">
      <div className=" w-full">
        <h1 className="text-2xl font-bold text-themeDarkGray">Lease Details</h1>

        <Formik
          onSubmit={handleSend}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
        >
          {(formik) => (
            <Form>
              <>
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationSchema)}
                  onSubmit={handleSend}
                >
                  {(formik) => (
                    <Form className="grid grid-cols-1  lg:grid-cols-2 md:gap-5  w-full justify-center items-center py-2 ">
                      {AddRentSchema.map((inputItem) => (
                        <Field name={inputItem.name} key={inputItem.key}>
                          {(props: {
                            meta: { touched: any; error: any };
                            field: JSX.IntrinsicAttributes & TextFieldProps;
                          }) => (
                            <div
                              className={`flex flex-col justify-center gap-2 w-full `}
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditLeaseDetailsAdd;
