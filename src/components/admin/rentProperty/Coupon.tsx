import { TextFieldProps } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import useSWRAPI from "hooks/useSWRAPI";
import { useState } from "react";
import * as Yup from "yup";
const couponSchema = [
  {
    key: 1,
    name: "applyCoupon",
    label: "Apply Coupon",
    placeholder: "Apply Coupon",
    styleContact: "rounded-lg",
    type: "select",
    validationSchema: Yup.string().required("Selected Name is required."),
    initialValue: "",
    options: [
      {
        id: 1,
        label: "GET 20% OFF",
        value: "FREE20",
      },
      {
        id: 2,
        label: "GET 30% OFF",
        value: "FREE30",
      },
      {
        id: 3,
        label: "GET 40% OFF",
        value: "FREE40",
      },
      {
        id: 4,
        label: "GET 50% OFF",

        value: "FREE50",
      },
    ],
  },
];

const couponSection = [
  {
    id: 1,
    label: "SubTotal",
    value: "200",
  },
  {
    id: 2,
    label: "Coupon Discount",
    value: "300",
  },
  {
    id: 3,
    label: "Taxes",
    value: "500",
  },
];

const initialValues = couponSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);
const validationSchema = couponSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);

const Coupon = () => {
  const { data, error, isValidating, mutate } = useSWRAPI(`coupon/all`);

  const [isLoading, setIsLoading] = useState("");
  const handleSubmit = (values: any) => {
    setIsLoading(values?.applyCoupon);
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="w-full flex flex-col gap-6">
            <div className="flex flex-col w-full gap-4">
              <div className="flex w-full  py-3 gap-3">
                {couponSchema?.map((item) => (
                  <Field name={item.name} key={item.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div className="flex w-full p-4 gap-4">
                        <div className="flex w-full  gap-2">
                          <div className="font-bold w-2/4 text-lg">
                            {item.label} :
                          </div>
                          <div className={`flex w-full gap-4`}>
                            <InputField
                              variant="outlined"
                              key={item?.key}
                              name={item?.name}
                              type={item?.type}
                              placeholder={item?.placeholder}
                              options={item?.options}
                              {...(props.field as any)}
                              error={Boolean(
                                formik?.touched[item?.name] &&
                                  formik?.errors[item?.name]
                              )}
                              helperText={
                                formik?.touched[item?.name] &&
                                (formik?.errors[item?.name] as any)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </Field>
                ))}
              </div>
              <div className="flex w-full flex-col  p-3 gap-4">
                {couponSection.map((item) => (
                  <div className="flex w-full justify-between" key={item.id}>
                    <h1 className="text-lg font-semibold">{item.label} :</h1>
                    <h1 className="text-base font-semibold">${item.value}</h1>
                  </div>
                ))}
              </div>
              <div className="flex w-full flex-col border-t p-3 gap-4">
                <div className="flex w-full justify-between">
                  <h1 className="text-lg font-semibold">Total :</h1>
                  <h1 className="text-base font-semibold">$1000</h1>
                </div>
              </div>
              <div className="w-full flex justify-end ">
                <button type="submit" className="btn-two w-full">
                  Pay
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Coupon;
