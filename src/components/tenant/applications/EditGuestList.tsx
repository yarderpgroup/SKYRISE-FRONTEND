import { Dialog, TextFieldProps } from "@mui/material";
import { post, put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import dayjs from "dayjs";
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
  activeId?: any;
};
const EditGuestList = ({ open, onClose, mutate, activeId }: Props) => {
  const addGuestArr = [
    {
      key: 1,
      name: "guestName",
      label: "Guest Name",
      placeHolder: "Alexa Carter",
      initialValue: activeId?.guestName,
      type: "text",
      validationSchema: Yup.string().required("Guest Name is required."),
      className: "col-span-12 md:col-span-12",
    },
    {
      key: 2,
      name: "date",
      placeHolder: "",
      label: "Date",
      initialValue: dayjs(activeId?.visitingDate).format("YYYY-MM-DD"),
      type: "date",
      validationSchema: Yup.string().required("A date is required"),
      className: "col-span-12 md:col-span-12",
    },
  ];
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const router = useRouter();
  const propertyID = router?.query?.selectedId;
  const initialValues = addGuestArr.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = addGuestArr?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);
      const response = await put({
        path: `tenant/guest/update/${propertyID}`,
        isAlert: true,
        body: JSON.stringify({
          guestName: values?.guestName,
          guestId: activeId?._id,
          visitDate: new Date(values?.date),
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
      <div className="bg-white h-fit md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          Edit new Guest
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {addGuestArr.map((inputItem) => (
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

                          {/* )} */}
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
  );
};

export default EditGuestList;
