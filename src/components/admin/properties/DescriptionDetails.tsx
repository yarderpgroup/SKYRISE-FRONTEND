import { Form, Formik } from "formik";

import * as Yup from "yup";
import { CustomInput } from "../dashboard";

const AddDetails = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "description",
    label: "Description (Optional)",
    placeholder: "Area",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Area is Required"),
    initialValue: "",
    multiline: true,
    rows: 2,
  },
];
const DescriptionDetails = ({}) => {
  const initialValues = AddDetails.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddDetails?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  const handleSend = async (values: any) => {};

  return (
    <div className=" w-full flex gap-3 items-end ">
      <div className="w-full">
        <Formik
          onSubmit={handleSend}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
        >
          {(formik) => (
            <Form>
              <div className="w-full">
                {AddDetails?.map((inputItem) => (
                  <>
                    <div className="!w-full">
                      <CustomInput
                        size="small"
                        key={inputItem.key}
                        type={inputItem?.type}
                        name={inputItem?.name}
                        multiline={inputItem?.multiline}
                        label={inputItem?.label}
                        placeholder={`Description`}
                        rows={inputItem?.rows}
                      />
                    </div>
                  </>
                ))}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DescriptionDetails;
