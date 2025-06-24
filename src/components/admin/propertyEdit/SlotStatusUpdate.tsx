import { Dialog, TextFieldProps } from "@mui/material";
import { put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  activeId: any;
};
const SlotStatusUpdate = ({ open, onClose, activeId, mutate }: Props) => {
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const AddBankSchema = [
    {
      key: "1",
      name: "status",
      label: "Status",
      options: [
        {
          label: "APPROVED",
          value: "APPROVED",
        },
        {
          label: "REJECT",
          value: "reject",
        },
      ],
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      validationSchema: Yup.string().required("Type is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-12",
    },
    {
      key: "2",
      name: "link",
      label: "Link",

      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().nullable(),
      initialValue: "",
      multiline: false,
      className: "col-span-12 md:col-span-12",
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

  const handleSend = async (values: any) => {
    setIsStatusLoading(true);
    try {
      const response = await put({
        path: `schedule/tour/update/status`,
        isAlert: true,
        body: JSON.stringify({
          status: values?.status,
          propertyId: propertyID,
          slotId: activeId?._id,
          sendLink: values?.link,
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
    <Dialog
      maxWidth={"sm"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          Status Update
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
                        {activeId?.mode === "TOUR" ? (
                          <>
                            {inputItem?.name === "status" && (
                              <>
                                {" "}
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
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {" "}
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
                          </>
                        )}
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
  );
};

export default SlotStatusUpdate;
