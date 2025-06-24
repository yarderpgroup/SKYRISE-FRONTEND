import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomInput } from "../dashboard";
const AddStoreSchema = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "name",
    label: "Full Name",
    placeholder: "Full Name",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Name is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "email",
    label: "Email",
    placeholder: "Email",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Email is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "number",
    label: "Phone Number",
    placeholder: "Phone Number",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Number is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "description",
    label: "How did you source this lead?",
    placeholder: "How did you source this lead?",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Field is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
];

const AddLeadModal = () => {
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

  const handleSend = async (values: any) => {};
  return (
    <div>
      <div className="p-5">
        <h1 className="!text-2xl  !font-bold !text-themeDarkGray">
          Lead Details
        </h1>

        <div className="">
          <Formik
            onSubmit={handleSend}
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-1 justify-center items-center lg:grid-cols-2 gap-2 md:gap-4">
                {AddStoreSchema?.map((inputItem) => (
                  <>
                    <div className="!w-full">
                      <CustomInput
                        size="small"
                        key={inputItem.key}
                        type={inputItem?.type}
                        label={inputItem?.label}
                        name={inputItem?.name}
                        multiline={inputItem?.multiline}
                      />
                    </div>
                  </>
                ))}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddLeadModal;
