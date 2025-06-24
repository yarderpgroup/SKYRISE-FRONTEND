import { Dialog, TextFieldProps } from "@mui/material";
import { post, put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  activeData?: any;
};
const ScheduleDetailsEdit = ({ open, onClose, mutate, activeData }: Props) => {
  const { data } = useSWRAPI(`schedule/get-all-days`);
  const newArr: any = [];
  const customArr =
    data?.data?.data &&
    data?.data?.data?.map((item: any) => {
      return newArr.push({
        value: item?.currentDate,
        label: item?.day,
      });
    });
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const AddBankSchema = [
    {
      key: "2",

      name: "date",
      label: "Days",
      options: newArr,
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      validationSchema: Yup.string().required("Date is Required"),
      initialValue: dayjs(activeData?.date).format("ddd"),
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "2",
      name: "startTime",
      label: "StartTime",
      placeholder: "StartTime",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "time",
      validationSchema: Yup.string().required("StartDate is Required"),
      initialValue: dayjs(activeData?.startTime).format("hh:mm"),

      multiline: false,
      required: true,
      rows: 2,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "3",
      name: "endTime",
      label: "End Time",
      placeholder: "EndDate",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "time",
      validationSchema: Yup.string().required("EndDate is Required"),
      initialValue: dayjs(activeData?.endTime).format("hh:mm"),
      multiline: false,
      required: true,
      rows: 2,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "4",
      name: "visitor",
      label: "No.of Visitor",
      placeholder: "Visitor",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Visitor is Required"),
      initialValue: activeData?.visitCount,
      multiline: false,
      required: true,
      rows: 2,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "5",
      name: "duration",
      label: "Duration",
      placeholder: "Duration",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Duration is Required"),
      initialValue: activeData?.duration,
      multiline: false,
      required: true,
      rows: 2,
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
    let date = dayjs(values.date).format("MMMM DD, YYYY");
    const finalEndDate = Date.parse(`${date} ${values?.endTime}`);
    const finalStartDate = Date.parse(`${date} ${values?.startTime}`);
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `schedule/create-multiple`,
        isAlert: true,
        body: JSON.stringify({
          selectedDate: new Date(values.date),
          propertyId: propertyID,
          start: finalStartDate || new Date(activeData?.startTime),
          end: finalEndDate || new Date(activeData?.endTime),
          visitCount: values?.visitor,
          durationInMin: values?.duration,
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
          Edit Schedule
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
                            type={inputItem?.type}
                            multiline={inputItem?.multiline}
                            options={inputItem?.options}
                            initialValue={initialValues}
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
                            {...(props.field as any)}
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
  );
};

export default ScheduleDetailsEdit;
