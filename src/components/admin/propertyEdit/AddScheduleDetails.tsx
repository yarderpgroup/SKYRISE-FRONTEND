import { Dialog, TextFieldProps } from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import useSWRAPI from "hooks/useSWRAPI";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type Props = {
  addMoreModal: boolean;
  setAddMoreModal: Dispatch<SetStateAction<boolean>>;
  propertyID: string;
  mutate?: any;
};

const AddScheduleEdit = ({
  setAddMoreModal,
  addMoreModal,
  propertyID,
  mutate,
}: Props) => {
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
  const AddBankSchema = [
    {
      key: "2",

      name: "date",
      label: "Day",
      // placeholder: "Date",
      options: newArr,
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      validationSchema: Yup.string().required("Date is Required"),
      initialValue: "",
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
      validationSchema: Yup.string().required("StartTime is Required"),
      initialValue: "",
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
      validationSchema: Yup.string().required("EndTime is Required"),
      initialValue: "",
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
      initialValue: "",
      multiline: false,
      required: true,
      rows: 2,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "5",
      name: "duration",
      label: "Duration in Min",
      placeholder: "Duration",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Duration is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      rows: 2,
      className: "col-span-12 md:col-span-12",
    },
  ];
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const initialValues = AddBankSchema.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = AddBankSchema?.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );
  const handleSend = async (values: any) => {
    // const newStartDate = Date.parse(`${daysjs(values?.date).format()}`)
    let date = dayjs(values.date).format("MMMM DD, YYYY");
    const finalEndDate = Date.parse(`${date} ${values?.endTime}`);
    const finalStartDate = Date.parse(`${date} ${values?.startTime}`);

    // let startDate = new Date();
    // let endDate = new Date();
    // const startTimeArr = values.startTime.split(":");
    // const endTimeArr = values.endTime.split(":");

    // const startTimeHours = startTimeArr[0];
    // const endTimeHours = startTimeArr[1];

    // startDate.setHours(startTimeHours);
    // startDate.setMinutes(endTimeHours);
    // const startTimeForEndDate = endTimeArr[0];
    // const endTimeForEndDate = endTimeArr[1];

    // endDate.setHours(startTimeForEndDate);
    // endDate.setMinutes(endTimeForEndDate);

    // const finalStartDate = startDate;
    // const finalEndDate = endDate;
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `schedule/create-multiple`,
        isAlert: true,
        body: JSON.stringify({
          selectedDate: new Date(values?.date).toISOString(),
          propertyId: propertyID,
          start: finalStartDate,
          end: finalEndDate,
          durationInMin: values?.duration,
          visitCount: values?.visitor,
        }),
      });
      setIsStatusLoading(false);
      setAddMoreModal(false);
      mutate();
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
        open={addMoreModal}
        onClose={() => setAddMoreModal(false)}
      >
        <div className="p-5">
          <h1 className="!text-xl  !font-bold !text-themeDarkGray">
            Add Schedule
          </h1>
          <div className=" w-full flex-col flex gap-3 pt-3 ">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSend}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                  {AddBankSchema.map((inputItem: any) => (
                    <Field name={inputItem.name} key={inputItem.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <div
                          className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                        >
                          <div className="font-semibold">{inputItem.label}</div>
                          <div className=" w-full">
                            <InputField
                              title={inputItem?.label}
                              key={inputItem?.key}
                              name={inputItem?.name}
                              type={inputItem?.type}
                              options={inputItem.options}
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
                  <div className="pt-5 col-span-12">
                    <RippleLoadingButton
                      type="submit"
                      title="Save"
                      className=" h-fit !w-full col-span-12"
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

export default AddScheduleEdit;
