import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomInput } from "../dashboard";
const AddStoreSchema = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "title",
    label: "Title *",
    placeholder: "Title",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Title is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },

  {
    key: "3",
    // placeholder: 'Enter your phone number',
    name: "description",
    label: "Description*",
    placeholder: "Description",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Description is Required"),
    initialValue: "",
    multiline: true,
    rows: 2,
  },
];

const RulesAdd = () => {
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
        <h1 className="!text-2xl  !font-bold !text-themeDarkGray">Rules Add</h1>

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

export default RulesAdd;
