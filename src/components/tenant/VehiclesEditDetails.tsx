import { InputField, RippleLoadingButton } from "components/core";

import { TextFieldProps } from "@mui/material";
import CustomDialog from "components/core/CustomDialog";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import UploadImage from "components/core/PhotoUpload";
import { useState } from "react";
import { post, put } from "api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  activeData?: any;
};
const VehiclesEditDetails = ({ open, onClose, mutate, activeData }: Props) => {
  const addVehicles = [
    {
      key: 0,
      name: "photo",
      label: "Model Photo",
      placeHolder: "",
      initialValue: activeData?.vehiclePhoto,
      type: "photo",
      className: "col-span-12",
    },
    {
      key: 1,
      name: "carName",
      label: "Model Name",
      placeHolder: "Mustang GT 2016",
      initialValue: activeData?.modelName,
      type: "text",
      validationSchema: Yup.string().required("Model Name is required."),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 2,
      name: "color",
      placeHolder: "Jet Black",
      label: "Model Color",
      initialValue: activeData?.modelColor,
      type: "text",
      validationSchema: Yup.string().required("Model color is required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 3,
      name: "modelNumber",
      placeHolder: "OA-287726",
      label: "Vehicle Number",
      initialValue: activeData?.modelNumber,
      type: "text",
      validationSchema: Yup.string().required("Vehicles Number is required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 4,
      name: "owner",
      placeHolder: "Alexa Carter",
      label: "Owner Name",
      initialValue: activeData?.ownerName,
      type: "text",
      validationSchema: Yup.string().required("Owner Name is required"),
      className: "col-span-12 md:col-span-6",
    },
  ];

  const initialValues = addVehicles?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = addVehicles?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const [isImage, setIsImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFileChange = (event: any) => {
    setIsImage(event?.target?.files[0]);
  };
  const router = useRouter();
  const propertyID = router.query.selectedId;
  const handleEditCar = async (values: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (isImage) {
        formData.append(
          "vehiclePhoto",
          isImage || (activeData?.vehiclePhoto as any)
        );
      }
      formData.append("modelName", values?.carName);
      formData.append("modelColor", values?.color);
      formData.append("modelNumber", values?.modelNumber);
      formData.append("ownerName", values?.owner);
      formData.append("vehicleId", activeData?._id);
      formData.append("propertyId", propertyID as any);
      const response = await put({
        path: `tenant/vehicle/update`,
        isImage: true,
        isAlert: true,
        body: formData,
      });
      setIsLoading(false);
      mutate();
      onClose();
      setIsImage(null);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <CustomDialog
      open={open}
      onClose={() => onClose && onClose()}
      maxWidth="sm"
    >
      <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          Edit Car
        </p>
        <div className="w-full flex flex-col items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleEditCar}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {addVehicles.map((inputItem) => (
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
                            placeholder={inputItem.placeHolder}
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
                            image={isImage as any}
                            defaultImage={activeData?.vehiclePhoto as any}
                            setIsImage={setIsImage}
                            onFileChange={(event: any) => {
                              setIsImage(event?.target?.files[0]);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </Field>
                ))}
                <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-2">
                  <RippleLoadingButton
                    title="Save & Continue"
                    type="submit"
                    className="btn-one rounded-md text-white py-3 w-full"
                    loading={isLoading}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </CustomDialog>
  );
};

export default VehiclesEditDetails;
