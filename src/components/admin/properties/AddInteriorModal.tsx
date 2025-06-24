import { Delete } from "@mui/icons-material";
import { Dialog, TextField, TextFieldProps } from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import CustomDialog from "components/core/CustomDialog";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

type Props = {
  AddDetails: any;
  type: "INTERIOR" | "EXTERIOR" | "OTHER";
  addMoreModal: boolean;
  setAddMoreModal: Dispatch<SetStateAction<boolean>>;
  propertyID: string;
  mutate?: any;
  onClose: () => void;
  allData?: any;
  setAllData?: any;
};

const AddInteriorModal = ({
  setAddMoreModal,
  addMoreModal,
  AddDetails,
  type,
  propertyID,
  mutate,
  onClose,
  allData,
  setAllData,
}: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [activeState, setActiveState] = useState("");
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

  const handleCustomChange = (e: any) => {
    setActiveState(e.target.value);
  };

  const handleAdd = () => {
    if (activeState?.length <= 0) return;
    setAllData([...allData, activeState]);
    setActiveState("");
    toast.success("Saved successfully");
  };

  const handleRemove = (index: number) => {
    const newArray = [...allData];
    newArray.splice(index, 1);
    setAllData(newArray);
    toast.success("Removed successfully");
  };
  const handleSend = async (values: any) => {
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `property/additional/add`,
        isAlert: true,
        body: JSON.stringify({
          heading: values.title,
          propertyId: propertyID,
          description: allData,
          type: type,
        }),
      });
      mutate();
      setIsStatusLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    } finally {
      setIsStatusLoading(false);
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
        <CustomDialog
          onClose={() => setPreviewOpen(false)}
          open={previewOpen}
          maxWidth="xs"
        >
          <div className="p-5 flex flex-col gap-3">
            <p>{type}</p>
            <ul className="pl-8 gap-3 flex flex-col list-disc pb-5">
              {allData?.map((item: any, index: number) => (
                <div className="flex w-full justify-between">
                  <li className="">{item}</li>
                  <div onClick={() => handleRemove(index)}>
                    <Delete className="!text-themeDarkGray cursor-pointer !text-xl" />
                  </div>
                </div>
              ))}
            </ul>
            <div className="pt-2 border-t border-primaryBorder w-full justify-end flex">
              <div
                className="btn-one w-fit cursor-pointer"
                onClick={() => setPreviewOpen(false)}
              >
                Close
              </div>
            </div>
          </div>
        </CustomDialog>
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
                          <div className="font-semibold text-themeDarkGray flex items-center gap-2">
                            {inputItem.label}
                            {inputItem.name === "des" && (
                              <div
                                onClick={() => setPreviewOpen(true)}
                                className="btn-two cursor-pointer w-20"
                              >
                                View
                              </div>
                            )}
                          </div>

                          <div className=" w-full">
                            {inputItem.name !== "des" ? (
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
                                {...(props.field as any)}
                              />
                            ) : (
                              <div className="w-full grid gap-2 items-center grid-cols-12">
                                <div className="col-span-10">
                                  <TextField
                                    fullWidth
                                    onChange={handleCustomChange}
                                    variant="outlined"
                                    value={activeState}
                                  />
                                </div>
                                <div
                                  onClick={handleAdd}
                                  className={`col-span-2 ${
                                    activeState?.length <= 0
                                      ? "bg-themeGray cursor-not-allowed text-white text-center py-2 rounded-lg"
                                      : "btn-one !text-center !h-fit cursor-pointer"
                                  }`}
                                >
                                  Add
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </Field>
                  ))}
                  <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-2">
                    <RippleLoadingButton
                      type="submit"
                      title="Save & Continue"
                      className="w-full"
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

export default AddInteriorModal;
