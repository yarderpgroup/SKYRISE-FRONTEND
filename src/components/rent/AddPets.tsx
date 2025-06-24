import { TextFieldProps } from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ModalForm = () => {
  const AddBankSchema = [
    {
      key: "1",
      name: "pet",
      label: "PetType",
      placeholder: "PetType",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("PetType is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "2",
      name: "petRent",
      label: "Pet Rent",
      placeholder: "Pet Rent",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Pet Rent  is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "3",
      name: "petLimit",
      label: "Pet Limit",
      placeholder: "Pet Limit",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("PetLimit is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "4",
      name: "petDescription",
      label: "Pet Description",
      placeholder: "Pet Description",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("PetDescription is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const propertyID = router?.query?.propertyID;

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

  const handleSend = async (values: any, props: any) => {
    try {
      setIsLoading(true);
      const response = await post({
        path: `property/pet/add`,
        isAlert: true,
        body: JSON.stringify({
          petRent: values?.petRent,
          petLimit: values?.petLimit,
          petDescription: values?.petDescription,
          petType: values?.pet,
          propertyId: propertyID,
        }),
      });
      if (response.status === 200) {
        setIsLoading(false);
        props.resetForm();
      }
      if (response.status !== 200) {
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full  flex flex-col ">
      <div className="w-full flex flex-col items-center justify-center py-3 ">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={handleSend}
        >
          {(formik) => (
            <Form className="w-full ">
              <div className="flex justify-between items-center w-full">
                <p className="text-themeDarkGray text-xl font-bold ">
                  Add Pets
                </p>
                <div className=" flex flex-row justify-between items-center ">
                  <RippleLoadingButton
                    title="Save"
                    className="btn-two w-36"
                    loading={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 md:gap-4">
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ModalForm;
