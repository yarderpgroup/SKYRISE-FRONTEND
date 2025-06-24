import { Delete } from "@mui/icons-material";
import { Autocomplete, Dialog, TextField, TextFieldProps } from "@mui/material";
import { post, put } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import CustomDialog from "components/core/CustomDialog";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  mutate?: any;
};
const AddNewAdditionalDetails = ({ open, onClose, mutate }: Props) => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [activeState, setActiveState] = useState("");
  const [allData, setAllData] = useState<any>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const propertyID = useRouter()?.query?.propertyID;
  const AddBankSchema = [
    {
      key: "3",
      name: "type",
      label: "Type",
      placeholder: "Type",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Type is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },
    {
      key: "2",
      name: "title",
      label: "Title",
      placeholder: "Title",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      validationSchema: Yup.string().required("Title is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-6",
    },

    {
      key: "4",
      name: "description",
      label: "Description",
      placeholder: "Description",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",
      initialValue: "",
      validationSchema: Yup.array(),
      multiline: false,
      required: true,
      rows: 2,
      className: "col-span-12 md:col-span-12",
    },
  ];

  const handleCustomChange = (e: any) => {
    setActiveState(e.target.value);
  };

  const handleAdd = () => {
    if (allData?.length < 1) {
      setAllData([activeState]);
      toast.success("Saved successfully");
      setActiveState("");
      return;
    }

    setAllData((prv: any) => [...prv, activeState]);
    toast.success("Saved successfully");
    setActiveState("");
  };
  const handleRemove = (index: number) => {
    const newArray = [...allData];
    newArray.splice(index, 1);
    setAllData(newArray);
    toast.success("Removed successfully");
  };

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
      const response = await post({
        path: `property/additional/add`,
        isAlert: true,
        body: JSON.stringify({
          heading: values.title,
          description: allData,
          type: values.type,
          propertyId: propertyID,
        }),
      });
      setIsStatusLoading(false);
      onClose();
      mutate();
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
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
        <CustomDialog
          onClose={() => setPreviewOpen(false)}
          open={previewOpen}
          maxWidth="xs"
        >
          <div className="p-5 flex flex-col gap-3">
            <p className="text-lg font-semibold">Descriptions</p>

            {allData?.length > 0 && (
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
            )}
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
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          Edit Interior & Exterior
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
                        <div className="font-semibold text-themeDarkGray flex items-center gap-2">
                          {inputItem.label}
                          {inputItem.name === "description" && (
                            <div
                              onClick={() => setPreviewOpen(true)}
                              className="btn-two cursor-pointer w-20"
                            >
                              View
                            </div>
                          )}
                        </div>
                        <div className=" w-full">
                          {inputItem.name !== "description" ? (
                            <InputField
                              title={inputItem?.label}
                              key={inputItem?.key}
                              name={inputItem?.name}
                              type={inputItem?.type}
                              initialValue={initialValues}
                              multiline={inputItem?.multiline}
                              rows={inputItem?.rows}
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
  );
};

export default AddNewAdditionalDetails;
