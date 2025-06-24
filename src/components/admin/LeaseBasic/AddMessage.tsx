import { Dialog, TextFieldProps } from "@mui/material";

import { CustomInput } from "../dashboard";

import { Field, Form, Formik } from "formik";

import * as Yup from "yup";
import { post } from "api";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { InputField, RippleLoadingButton } from "components/core";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const AddStoreSchema = [
  {
    key: 1,
    name: "subject",
    label: "Subject",
    placeholder: "Your message",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Title is required."),
    multiline: false,
    className: "col-span-12",
  },
  {
    key: 1,
    name: "description",
    label: "Description",
    placeholder: "Description",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Description is required."),
    multiline: true,
    rows: 3,
    className: "col-span-12",
  },
];

const AddMessage = ({ open, onClose, mutate }: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const tenantId = router?.query?.tenantId;

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

  const handleSend = async (values: any, props: any) => {
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `message/landlord/add/${propertyID}`,

        isAlert: true,
        body: JSON.stringify({
          subject: values?.subject,
          description: values?.description,
          tenantId: tenantId,
        }),
      });
      setIsStatusLoading(false);
      props.resetForm();
      mutate();
      onClose();
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    } finally {
      onClose();
    }
  };
  return (
    <>
      <Dialog
        maxWidth={"xs"}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        onClose={() => onClose && onClose()}
      >
        <div className="w-full flex flex-col items-center justify-center p-6 ">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {AddStoreSchema.map((inputItem) => (
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
      </Dialog>
    </>
  );
};

export default AddMessage;
