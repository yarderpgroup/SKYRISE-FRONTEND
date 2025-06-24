import { TextFieldProps } from "@mui/material";
import { put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const BasicDetailsEdit = ({
  pricingData,
  mutate,
  isValidating,
}: {
  pricingData: any;
  mutate: any;
  isValidating: boolean;
}) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const router = useRouter();
  const validPricingData =
    pricingData?.data?.data && pricingData?.data?.data[0];
  const propertyID: any = router?.query?.propertyID;

  const AddBankSchema = [
    {
      key: "1",
      name: "ownership",
      label: "OwnerShip",
      options: [
        {
          label: "Freehold",
          value: "freehold",
        },
        {
          label: "Leasehold",
          value: "leasehold",
        },
        {
          label: "Co-operative Society",
          value: "co-operative society",
        },
        {
          label: "Power of Attorney",
          value: "power of Attorney",
        },
      ],
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      validationSchema: Yup.string().required("OwnerShip is Required"),
      initialValue: validPricingData?.ownership?.toLowerCase(),
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "2",
      name: "preRented",
      label: "Is it Pre-leased/ Pre-Rented?",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      options: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
      type: "select",
      validationSchema: Yup.string().required("Field is Required"),
      initialValue: validPricingData?.isLeased,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "3",

      name: "negotiable",
      label: "Negotiable",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      options: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
      type: "select",
      validationSchema: Yup.string().required("Field is Required"),
      initialValue: validPricingData?.isNegotiable,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "4",

      name: "tax",
      label: "Tax",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      options: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
      type: "select",
      validationSchema: Yup.string().required("Field is Required"),
      initialValue: validPricingData?.isTax,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "5",

      name: "expectedPrice",
      label: "Expected Price",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Expected Price is Required"),
      initialValue: validPricingData?.expectedPrice,

      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "7",

      name: "rentedDetails",
      label: "Pre-Rented Details",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Pre-Rented Details is Required"),
      initialValue: validPricingData?.retPerMonth,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
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

      const response = await put({
        path: `property/pricing-details/update/${validPricingData?._id}`,
        isAlert: true,
        body: JSON.stringify({
          description: values?.description,
          ownership: values?.ownership,
          expectedPrice: values?.expectedPrice,
          squareFt: values?.price,
          retPerMonth: values?.rentedDetails,
          propertyId: propertyID,
          isLeased: values?.preRented,
          isNegotiable: values?.negotiable,
          isTax: values?.tax,
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
        Pricing Edit
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
                          options={inputItem?.options}
                          multiline={inputItem?.multiline}
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

export default BasicDetailsEdit;
