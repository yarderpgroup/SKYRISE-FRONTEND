import { Dialog, TextFieldProps } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const AddHomeDetails = ({ open, onClose, mutate }: Props) => {
  const [openDetails, setOpenDetails] = useState();
  const AddBankSchema = [
    {
      key: "1",
      // placeholder: 'Enter your name',
      name: "type",
      label: "Type",
      placeholder: "Type",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      options: [
        {
          label: "Home",
          value: "Home",
        },
        {
          label: "Facts",
          value: "Facts",
        },
        {
          label: "Parking",
          value: "Parking",
        },
      ],
      validationSchema: Yup.string().required("Type is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "2",

      name: "title",
      label: "Title",
      typeSelect: "HOME",
      placeholder: "Title",
      options: [
        {
          label: "Property Type",
          value: "Property Type",
        },
        {
          label: "Style",
          value: "Style",
        },
        {
          label: "Lot Size",
          value: "Lot Size",
        },
        {
          label: "Year Built",
          value: "Year Built",
        },
        {
          label: "Community",
          value: "Community",
        },
        {
          label: "MLS#",
          value: "MLS#",
        },
        {
          label: "List Price",
          value: "List Price",
        },
      ],
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      validationSchema: Yup.string().required("Title is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "4",

      name: "description",
      label: "Description",
      placeholder: "Description",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Description is Required"),
      initialValue: "",
      multiline: true,
      required: 2,
      className: "col-span-12 ",
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
    <Dialog
      maxWidth={"sm"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          Add Details
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
                            multiline={inputItem?.multiline}
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
    </Dialog>
  );
};

export default AddHomeDetails;
