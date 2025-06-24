import { Dialog, TextFieldProps } from "@mui/material";
import { post } from "api";
import {
  InputField,
  MultiplePhotoUpload,
  RippleLoadingButton,
} from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { notify } from "utils";
import * as Yup from "yup";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  propertyDetails?: any;
  activeId?: any;
};

const ManagePhoto = ({
  open,
  onClose,
  mutate,
  propertyDetails,
  activeId,
}: Props) => {
  const AddBankSchema = [
    {
      key: "1",
      name: "status",
      label: "Status",
      options: [
        {
          label: "PENDING",
          value: "PENDING",
        },
        {
          label: "ONGOING",
          value: "ONGOING",
        },
        {
          label: "COMPLETED",
          value: "COMPLETED",
        },
      ],
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      validationSchema: Yup.string().required("Type is Required"),
      initialValue: activeId?.photoRequestStatus,
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-12",
    },
  ];
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const [selectedFiles, setSelectedFiles] = useState<any>(undefined);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isStatusLoading, setIsStatusLoading] = useState(false);

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
    if (imagePreviews?.length <= 1) {
      setImagePreviews([]);
      toast.error("Please select at Least 2 photos");
      return;
    }
    try {
      const formData: any = new FormData();
      if (selectedFiles?.length >= 1) {
        for (let x in selectedFiles) {
          formData.append("propertyPhoto", selectedFiles[x] as any);
        }
      }

      formData.append("propertyId", propertyDetails?.property?._id);
      formData.append("billingId", propertyDetails?.billing?.billingId);
      formData.append("ownerId", propertyDetails?.owner?._id);
      formData.append("status", values?.status);
      setIsStatusLoading(true);
      const res: any = await post({
        isAlert: true,
        path: `photofees/upload/photos`,
        isImage: true,
        body: formData,
      });
      setIsStatusLoading(false);
      selectedFiles(null);
      setImagePreviews([]);
      mutate();
      onClose();
    } catch (error: any) {
      setIsStatusLoading(false);
      toast.error(error);
      setImagePreviews([]);
    } finally {
      onClose();
      mutate();
    }
  };
  return (
    <Dialog
      maxWidth={"lg"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose()}
    >
      <div className="w-full flex flex-col gap-4 p-6">
        <h1 className="text-xl md:text-xl font-bold">
          Add photos of Eaton Garth Penthouse
        </h1>
        <div className="w-full flex flex-col ">
          <MultiplePhotoUpload
            setSelectedFiles={setSelectedFiles}
            selectedFiles={selectedFiles}
            imagePreviews={imagePreviews}
            setImagePreviews={setImagePreviews}
          />
        </div>
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
                            initialValue={initialValues}
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

export default ManagePhoto;
