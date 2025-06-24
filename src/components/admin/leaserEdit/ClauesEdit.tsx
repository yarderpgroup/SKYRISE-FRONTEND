import { Dialog, Drawer, TextFieldProps } from "@mui/material";

import { CustomInput } from "../dashboard";

import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { put } from "api";
import { toast } from "react-toastify";
import { InputField, RippleLoadingButton } from "components/core";
import { useState } from "react";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  activeData?: any;
};

const ClausesEdit = ({ open, onClose, mutate, activeData }: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const AddDetails = [
    {
      key: "2",
      name: "type",
      label: "Type",
      options: [
        {
          label: "RULE",
          value: "RULES",
        },
        {
          label: "CLAUSES",
          value: "CLAUSES",
        },
      ],
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",

      validationSchema: Yup.string().required("Type is Required"),
      initialValue: activeData?.type,
      multiline: false,
      required: true,
      className: "col-span-12",
    },
    {
      key: "1",
      name: "title",
      label: "Title",
      placeholder: "Title",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",

      validationSchema: Yup.string().required("Title is Required"),
      initialValue: activeData?.title,
      multiline: false,
      required: true,
      className: "col-span-12",
    },

    {
      key: "3",
      name: "description",
      label: "Description",
      placeHolder: "Description...",
      initialValue: activeData?.description,
      type: "text",
      validationSchema: Yup.string().required("Description is Required"),
      multiline: true,
      rows: 3,
      className: "col-span-12",
    },
  ];

  const initialValues = AddDetails.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddDetails?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);
      const response = await put({
        path: `lease/update/rules-clauses/${activeData?._id}`,
        isAlert: true,
        body: JSON.stringify({
          title: values.title,

          description: values.description,
          type: values.type,
        }),
      });

      setIsStatusLoading(false);
      mutate();
      onClose();
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };
  return (
    <>
      <Dialog
        maxWidth={"sm"}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
          <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
            Edit Rules & Clauses
          </p>
          <div className="w-full flex flex-col items-center justify-center ">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSend}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                  {AddDetails.map((inputItem) => (
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
                              options={inputItem?.options}
                              multiline={inputItem?.multiline}
                              rows={inputItem?.rows}
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
                    <RippleLoadingButton
                      type="submit"
                      title="Save & Continue"
                      className="w-44"
                      loading={isStatusLoading}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ClausesEdit;
