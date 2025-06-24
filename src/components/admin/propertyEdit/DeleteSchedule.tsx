import { Dialog, TextFieldProps } from "@mui/material";
import { put, remove } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};
const DeleteSchedule = ({ open, onClose, mutate }: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const router = useRouter();
  const propertyID = router?.query?.propertyID;

  const AddBankSchema = [
    {
      key: "2",

      name: "date",
      label: "Date",
      placeholder: "DAte",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "Date",
      validationSchema: Yup.string().required("Date is Required"),
      initialValue: "",
      multiline: false,
      required: true,
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
    try {
      setIsStatusLoading(true);
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        let response: any;
        if (result.isConfirmed) {
          response = await remove({
            path: `schedule/delete-day/all`,
            isAlert: true,
            body: JSON.stringify({
              propertyId: propertyID,
              date: new Date(values.date).toISOString(),
            }),
          });
          setIsStatusLoading(false);
          onClose();
          mutate();
        }
      });
    } catch (error: any) {
      setIsStatusLoading(false);

      toast.error(error);
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
        <div className="flex justify-between ">
          <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
            Delete Schedule
          </p>
        </div>

        <div className="w-full  ">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="">
                <div className="w-full grid grid-cols-12 gap-2 md:gap-4">
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
                              type={inputItem?.type}
                              multiline={inputItem?.multiline}
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
                </div>

                <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-5">
                  <RippleLoadingButton
                    type="submit"
                    title="Delete & Continue"
                    className="w-60"
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

export default DeleteSchedule;
