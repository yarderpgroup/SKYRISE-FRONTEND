import { TextFieldProps } from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddRentSchema = [
  {
    key: "1",
    name: "history",
    label: "Residence History *",
    placeholder: "Residence History ",
    className: "col-span-1",
    type: "select",
    validationSchema: Yup.string().required("Residence History  is Required"),
    initialValue: "",
    options: [
      {
        value: "1Year",
        label: "1 Year",
      },
      {
        value: "2 Year",
        label: "2 Year",
      },
      {
        value: "3 Year",
        label: "3 Year",
      },
      {
        value: "4 Year",
        label: "4 Year",
      },
      {
        value: "5 Year",
        label: "5 Year",
      },
    ],
    multiline: false,
    required: true,
  },
  {
    key: "2",
    name: "work",
    label: "Work History *",
    placeholder: "Work History",
    className: "col-span-1",
    type: "select",
    validationSchema: Yup.string().required(" Work History is Required"),
    initialValue: "",
    options: [
      {
        value: "1Year",
        label: "1 year",
      },
      {
        value: "2 Year",
        label: "2 year",
      },
      {
        value: "3 Year",
        label: "3 year",
      },
      {
        value: "4 Year",
        label: "4 year",
      },
      {
        value: "5 Year",
        label: "5 year",
      },
    ],
    multiline: false,
    required: true,
  },
  {
    key: "3",
    name: "standard",
    label: "Standard Question *",
    placeholder: "Standard Question ",
    className: "col-span-1",
    type: "select",
    validationSchema: Yup.string().required(" Standard Question  is Required"),
    initialValue: "",
    multiline: false,
    required: true,
    options: [
      {
        value: "Do any of the People applying smoke?",
        label: "Do any of the People applying smoke?",
      },
      {
        value: "Have you ever been evicted?",
        label: "Have you ever been evicted?",
      },
    ],
  },
];

const EditRentForm = () => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const router = useRouter();
  const propertyID = router?.query?.management;
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
      const response = await post({
        path: `application/landlord/add/residence-history`,
        isAlert: true,
        body: JSON.stringify({
          propertyId: propertyID,
          tenantId: values?._id,
          timePeriod: values?.history,
        }),
      });
      if (response.status === 200) {
        setIsStatusLoading(false);
      }
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center text-themeDarkGray ">
      <div className="w-full flex flex-col gap-3">
        <Formik
          onSubmit={handleSend}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
        >
          {(formik) => (
            <Form>
              <div className="grid grid-cols-1 w-full justify-center items-center py-4 ">
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationSchema)}
                  onSubmit={handleSend}
                >
                  {(formik) => (
                    <Form className="w-full  gap-2 md:gap-4">
                      {AddRentSchema.map((inputItem) => (
                        <Field name={inputItem.name} key={inputItem.key}>
                          {(props: {
                            meta: { touched: any; error: any };
                            field: JSX.IntrinsicAttributes & TextFieldProps;
                          }) => (
                            <div
                              className={`w-full flex flex-col justify-center gap-2 ${inputItem.className}`}
                            >
                              <div className="flex justify-start gap-4 items-center">
                                <div className=" text-themeDarkGray font-bold pt-4">
                                  {inputItem.label}
                                </div>{" "}
                              </div>
                              <div className="flex w-full">
                                <InputField
                                  title={inputItem?.label}
                                  key={inputItem?.key}
                                  name={inputItem?.name}
                                  type={inputItem?.type}
                                  value={formik?.values[inputItem?.name]}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  multiline={inputItem.multiline}
                                  options={inputItem.options}
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
                    </Form>
                  )}
                </Formik>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditRentForm;
