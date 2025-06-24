import { Dialog, TextFieldProps } from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
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
  tenantId?: any;
};
const QuestionModal = ({ open, onClose, mutate, tenantId }: Props) => {
  const router = useRouter();
  const propertyID = router?.query?.management;

  const AddRentSchema = [
    {
      key: "3",
      name: "standard",
      label: "Standard Question *",
      placeholder: "Standard Question ",
      className: "col-span-12",
      type: "text",
      validationSchema: Yup.string().required("Standard Question  is Required"),
      initialValue: "",
      multiline: false,
      required: true,
    },
  ];
  const [isStatusLoading, setIsStatusLoading] = useState(false);

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

  const handleSend = async (values: any, props: any) => {
    setIsStatusLoading(true);
    const questionFormData = new FormData();
    questionFormData.append("propertyId", propertyID as any);
    questionFormData.append("question", values?.standard);

    tenantId?.map((item: any) =>
      questionFormData?.append("tenantId", item?._id)
    );
    let formData = new FormData();
    tenantId?.map((item: any) => formData?.append("tenantId", item?._id));
    formData.append("propertyId", propertyID as any);
    formData.append("timePeriod", 1 as any);

    try {
      const questionResponse = await post({
        path: `application/landlord/add/application-question`,
        // isAlert: true,
        isImage: true,
        body: formData,
      });

      const response = await post({
        path: `application/landlord/add/custom-question`,
        isAlert: true,
        isImage: true,
        body: questionFormData,
      });

      setIsStatusLoading(false);
      props.resetForm();
      mutate();
      onClose();
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    } finally {
      onClose();
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
          Add Question
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

export default QuestionModal;
