import { TextFieldProps } from "@mui/material";
import { put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { TermSkeleton } from "components/skeleton/propertyDetails";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const TermEdit = () => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const router = useRouter();

  const propertyID = router?.query?.propertyID;
  const {
    data: termData,
    mutate,
    isValidating: termValidating,
  } = useSWRAPI(`property/my-property/terms/${propertyID}`);
  const validTermData = termData?.data && termData?.data?.data;
  if (termValidating)
    return (
      <div>
        <TermSkeleton />
      </div>
    );
  const AddRentSchema = [
    {
      key: "1",
      name: "price",
      label: "Rent Price *",
      placeholder: "Rent Price",
      styleContact: "rounded-lg",
      type: "number",
      validationSchema: Yup.string().required("Rent Price is required"),
      initialValue: validTermData?.rentPrice,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "2",
      name: "security",
      label: "Security Deposit *",
      placeholder: "Security Deposit ",
      styleContact: "rounded-lg",
      type: "number",
      validationSchema: Yup.string().required("Security Deposite is required"),
      initialValue: validTermData?.securityDeposit,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "3",
      name: "date",
      label: "Date Available *",
      placeholder: "Date Available",
      styleContact: "rounded-lg",
      type: "date",
      validationSchema: Yup.string().required("Date Available  is required"),
      initialValue: dayjs(validTermData?.availableDate).format("YYYY-MM-DD"),
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "4",
      name: "duration",
      label: "Lease Duration*",
      placeholder: "Lease Duration",
      styleContact: "rounded-lg",
      button: "  Same as above",
      validationSchema: Yup.string().required("Lease Duration  is required"),
      type: "number",
      initialValue: validTermData?.leaseDuration,

      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "5",
      name: "fee",
      label: "Move in Fee*",
      placeholder: "Move in Fee",
      styleContact: "rounded-lg",
      button: "  Same as above",
      validationSchema: Yup.string().required("Fee is required"),
      type: "number",
      initialValue: validTermData?.moveInFees,

      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "6",
      name: "parking",
      label: "Parking Fee *",
      placeholder: "Parking",
      styleContact: "rounded-lg",
      button: "  Same as above",
      validationSchema: Yup.string().required("Parking is required"),
      type: "number",
      initialValue: validTermData?.parking,

      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "7",
      name: "name",
      label: "Name *",
      placeholder: "Name",
      styleContact: "rounded-lg",
      button: "  Same as above",
      validationSchema: Yup.string().required("Name is required"),
      type: "text",
      initialValue: validTermData?.displayName,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "8",
      name: "contactNumber",
      label: "Contact Number *",
      placeholder: "Contact Number",
      styleContact: "rounded-lg",
      button: "  Same as above",
      validationSchema: Yup.string().required("Number is required"),
      type: "number",
      initialValue: validTermData?.contactNumber,

      required: true,
      className: "col-span-12 md:col-span-6",
    },
  ];

  const initialValues = AddRentSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddRentSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);

      const response = await put({
        path: `property/terms/update/${validTermData?._id}`,
        isAlert: true,
        body: JSON.stringify({
          rentPrice: values?.price,
          securityDeposit: values?.security,
          availableDate: values?.date,
          leaseDuration: values?.duration,
          moveInFees: values?.fee,
          propertyId: propertyID,
          parking: values?.parking,
          displayName: values?.name,
          contactNumber: values?.contactNumber,
        }),
      });
      setIsStatusLoading(false);
      mutate();
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };
  return (
    <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full flex flex-col gap-5">
      <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
        Term Edit
      </p>
      <div className="w-full flex flex-col items-center justify-center ">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSend}
        >
          {(formik) => (
            <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
              {AddRentSchema.map((inputItem) => (
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
                          initialValue={initialValues}
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
                  className="!w-full"
                  loading={isStatusLoading}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TermEdit;
