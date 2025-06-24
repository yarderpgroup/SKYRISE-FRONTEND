import { Drawer } from "@mui/material";

import { CustomInput } from "../dashboard";

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
    key: "1",
    // placeholder: 'Enter your phone number',
    name: "notice",
    label: "Notice of Habitability*",
    placeholder: "Notice of Habitability",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required(
      "Notice of Habitability is Required"
    ),
    initialValue: "",
    multiline: true,
    rows: 2,
  },
  {
    key: "2",
    // placeholder: 'Enter your phone number',
    name: "noticeClousure",
    label: "Notice of Forclousure*",
    placeholder: "Notice of Forclousure",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required(
      "Notice of Forclousure is Required"
    ),
    initialValue: "",
    multiline: true,
    rows: 2,
  },
  {
    key: "3",
    // placeholder: 'Enter your phone number',
    name: "acknowledgement ",
    label: "Acknowledgement *",
    placeholder: "Acknowledgement ",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Acknowledgement is Required"),
    initialValue: "",
    multiline: true,
    rows: 2,
  },
];

const Disclosure = ({ open, onClose, mutate }: Props) => {
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
      <Drawer
        anchor="right"
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
                <h1 className="text-themeDarkGray text-xl font-bold">Edit Information </h1>
                {AddStoreSchema?.map((inputItem) => (
                  <>
                    <div
                      className={
                        inputItem?.multiline
                          ? " lg:col-span-2 w-full"
                          : "w-full"
                      }
                    >
                      <CustomInput
                        size="small"
                        key={inputItem.key}
                        label={inputItem.label}
                        name={inputItem?.name}
                        multiline={inputItem?.multiline}
                        placeholder={inputItem?.placeholder}
                        rows={inputItem?.rows}
                        fieldClass={
                          inputItem.name === "message" ? "" : "filedSet"
                        }
                      />
                    </div>
                  </>
                ))}
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
      </Drawer>
    </>
  );
};

export default Disclosure;
