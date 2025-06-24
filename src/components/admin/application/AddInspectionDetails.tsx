import { InputField, RippleLoadingButton } from "components/core";

import { TextFieldProps } from "@mui/material";
import CustomDialog from "components/core/CustomDialog";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import UploadImage from "components/core/PhotoUpload";
import { useState } from "react";
import { post } from "api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import dayjs from "dayjs";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const AddInspectionDetails = ({ open, onClose, mutate }: Props) => {
  const issueSchema = [
    {
      key: 1,
      name: "inspectorName",
      label: "Inspector Name",
      placeHolder: "",
      initialValue: "",
      type: "text",

      validationSchema: Yup.string().required("InspectorName is required."),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 2,
      name: "startTime",
      placeHolder: "",
      label: "StartTime",
      initialValue: "",
      type: "time",

      validationSchema: Yup.string().required("Issue Location is required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 3,
      name: "date",
      placeHolder: "",
      label: "Date",
      initialValue: "",
      type: "date",

      validationSchema: Yup.string().required("Date is required"),
      className: "col-span-12 md:col-span-6",
    },
    // {
    //   key: 4,
    //   name: "status",
    //   placeHolder: "",
    //   label: "Status",
    //   options: [
    //     {
    //       id: 2,
    //       label: "COMPLETE",
    //       value: "COMPLETE",
    //     },
    //     {
    //       id: 3,
    //       label: "PENDING",
    //       value: "PENDING",
    //     },
    //     {
    //       id: 4,
    //       label: "ONGOING",
    //       value: "ONGOING",
    //     },
    //   ],
    //   initialValue: "",
    //   type: "select",
    //   validationSchema: Yup.string().required("Problem Name is required"),
    //   className: "col-span-12 md:col-span-6",
    // },
  ];

  const initialValues = issueSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = issueSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const handleAddInspection = async (values: any, props: any) => {
    let date = dayjs(values.date).format("MMMM DD, YYYY");
    const finalStartDate = Date.parse(`${date} ${values?.startTime}`);

    try {
      setIsLoading(true);
      const response = await post({
        path: `inspection/landlord/add/${propertyID}`,
        isAlert: true,
        body: JSON.stringify({
          date: new Date(values?.date),
          startTime: finalStartDate,
          inspectorName: values.inspectorName,
        }),
      });
      setIsLoading(false);
      mutate();
      onClose();
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    } finally {
      onClose();
    }
  };

  return (
    <CustomDialog
      open={open}
      onClose={() => onClose && onClose()}
      maxWidth="sm"
    >
      <div className="md:col-span-6 col-span-12 flex flex-col gap-6 p-6">
        <p className="font-semibold text-xl">Add Inspection</p>

        <div className="w-full flex flex-col items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleAddInspection}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {issueSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div
                        className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                      >
                        <div className=" text-themeDarkGray">
                          {inputItem.label}
                        </div>
                        <div className="col-span-6 w-full">
                          <InputField
                            title={inputItem?.label}
                            key={inputItem?.key}
                            name={inputItem?.name}
                            type={inputItem?.type}
                            placeholder={inputItem.placeHolder}
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
                    className="btn-one text-white py-3 w-full"
                    loading={isLoading}
                    title="Save & Continue"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </CustomDialog>
  );
};

export default AddInspectionDetails;
