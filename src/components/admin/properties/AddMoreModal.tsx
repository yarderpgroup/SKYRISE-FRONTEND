import { Dialog, TextFieldProps } from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type Props = {
  AddDetails: any;
  type: "HOME" | "PRICE" | "INTERIOR" | "EXTERIOR" | "OTHER" | "PARKING";
  addMoreModal: boolean;
  setAddMoreModal: Dispatch<SetStateAction<boolean>>;
  propertyID: string;
  mutate?: any;
  onClose: () => void;
};

const AddMoreModal = ({
  setAddMoreModal,
  addMoreModal,
  AddDetails,
  type,
  propertyID,
  mutate,
  onClose,
}: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const initialValues = AddDetails.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );
  const validationSchema = AddDetails?.reduce(
    (accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `property/facts/add`,
        isAlert: true,
        body: JSON.stringify({
          title: values.title,
          propertyId: propertyID,
          description: values.des,
          type: type,
        }),
      });
      mutate();
      setIsStatusLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    } finally {
      setAddMoreModal(false);
    }
  };
  return (
    <>
      <Dialog
        maxWidth={"sm"}
        fullWidth
        open={addMoreModal}
        onClose={() => setAddMoreModal(false)}
        // onClose={onClose}
      >
        <div className="p-5">
          <h1 className="!text-xl  !font-bold !text-themeDarkGray">
            {type} Facts
          </h1>
          <div className=" w-full flex-col flex gap-3 pt-3 ">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSend}
            >
              {(formik) => (
                <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                  {AddDetails.map((inputItem: any) => (
                    <Field name={inputItem.name} key={inputItem.key}>
                      {(props: {
                        meta: { touched: any; error: any };
                        field: JSX.IntrinsicAttributes & TextFieldProps;
                      }) => (
                        <div
                          className={`flex flex-col justify-center gap-3 col-span-12`}
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
                      // handleClick={handleSend}
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

export default AddMoreModal;
