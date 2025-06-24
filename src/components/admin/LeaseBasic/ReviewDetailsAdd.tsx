import { Dialog } from "@mui/material";

import { Form, Formik } from "formik";

import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const AddStoreSchema = [
  {
    key: "3",
    // placeholder: 'Enter your phone number',
    name: "description",
    label: "Send Message*",
    placeholder: "Message",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Description is Required"),
    initialValue: "",
    multiline: true,
    rows: 2,
  },
];

const AddMessage = ({ open, onClose, mutate }: Props) => {
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
    <>
      <Dialog
        maxWidth={"xs"}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <Formik
          onSubmit={handleSend}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
        >
          {(formik) => (
            <Form>
              <div className="w-full p-5">
                <h1 className="text-themeDarkGray text-xl font-bold">
                  Review Details
                </h1>
                <h1>Property Type :Single Family Residential</h1>
                <h1>Style :Cape</h1>
                <h1>Lot Size:6,829 Sq. Ft.</h1>
              </div>
              <div className="p-5 flex  gap-3 justify-end items-end">
                <button className="md:w-40 w-30 text-xs md:text-base text-white rounded-md gradientButton  border font-bold border-themeDarkGray px-1.5 py-2 md:py-2.5 text-center">
                  Delete
                </button>
                <button className="md:w-40 w-30 text-xs md:text-base text-white rounded-md bg-themeDarkGray px-1.5 py-2 md:py-2.5 text-center">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default AddMessage;
