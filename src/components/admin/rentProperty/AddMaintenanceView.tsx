import { InputField, RippleLoadingButton } from "components/core";

import { TextFieldProps } from "@mui/material";
import CustomDialog from "components/core/CustomDialog";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import UploadImage from "components/core/PhotoUpload";
import { useState } from "react";
import { post } from "api";
import { useRouter } from "next/router";
import useSWRAPI from "hooks/useSWRAPI";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const AddMaintenanceView = ({ open, onClose, mutate }: Props) => {
  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const { data, error, isValidating } = useSWRAPI(
    `utility/rent-details/${propertyID}`
  );
  let selectArr: any = [];
  data?.data?.data?.map((item: any) => {
    selectArr?.push({
      label: `${item?.month} ${item?.year}`,
      value: item?._id,
    });
  });
  const issueSchema = [
    {
      key: 1,
      name: "locationType",
      label: "Location Type",
      placeHolder: "",
      initialValue: "",
      type: "select",
      options: [
        {
          id: 1,
          label: "Appliance",
          value: "appliance",
        },
        {
          id: 2,
          label: "Cabinet/Drawer/Coun",
          value: "Cabinet/Drawer/Coun",
        },
        {
          id: 3,
          label: "Cabinetry",
          value: "Cabinetry",
        },
        {
          id: 4,
          label: "Carpet",
          value: "carpet",
        },
        {
          id: 5,
          label: "Appliance",
          value: "appliance",
        },
        {
          id: 6,
          label: "Closets",
          value: "closets",
        },
        {
          id: 7,
          label: "Common Area",
          value: "common Area",
        },
        {
          id: 8,
          label: "Door Knob Locks",
          value: "door Knob Locks",
        },
        {
          id: 9,
          label: "Electrical",
          value: "electrical",
        },
        {
          id: 10,
          label: "Exterior",
          value: "exterior",
        },
      ],
      validationSchema: Yup.string().required("Location Type is required."),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 2,
      name: "issueLocation",
      placeHolder: "",
      label: "Issue Location",
      initialValue: "",
      type: "select",
      options: [
        {
          id: 1,
          label: "Appliance",
          value: "appliance",
        },
        {
          id: 2,
          label: "Cabinet/Drawer/Coun",
          value: "Cabinet/Drawer/Coun",
        },
        {
          id: 3,
          label: "Cabinetry",
          value: "Cabinetry",
        },
        {
          id: 4,
          label: "Carpet",
          value: "carpet",
        },
        {
          id: 5,
          label: "Appliance",
          value: "appliance",
        },
        {
          id: 6,
          label: "Closets",
          value: "closets",
        },
        {
          id: 7,
          label: "Common Area",
          value: "common Area",
        },
        {
          id: 8,
          label: "Door Knob Locks",
          value: "door Knob Locks",
        },
        {
          id: 9,
          label: "Electrical",
          value: "electrical",
        },
        {
          id: 10,
          label: "Exterior",
          value: "exterior",
        },
      ],
      validationSchema: Yup.string().required("Issue Location is required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 3,
      name: "category",
      placeHolder: "",
      label: "Category",
      initialValue: "",
      type: "select",
      options: [
        {
          id: 1,
          label: "Appliance",
          value: "appliance",
        },
        {
          id: 2,
          label: "Cabinet/Drawer/Coun",
          value: "Cabinet/Drawer/Coun",
        },
        {
          id: 3,
          label: "Cabinetry",
          value: "Cabinetry",
        },
        {
          id: 4,
          label: "Carpet",
          value: "carpet",
        },
        {
          id: 5,
          label: "Appliance",
          value: "appliance",
        },
      ],
      validationSchema: Yup.string().required("Category is required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 4,
      name: "problem",
      placeHolder: "",
      label: "Problem",
      options: [
        {
          id: 2,
          label: "Cabinet/Drawer/Coun",
          value: "Cabinet/Drawer/Coun",
        },
        {
          id: 3,
          label: "Cabinetry",
          value: "Cabinetry",
        },
        {
          id: 4,
          label: "Carpet",
          value: "carpet",
        },
        {
          id: 5,
          label: "Appliance",
          value: "appliance",
        },
      ],
      initialValue: "",
      type: "select",
      validationSchema: Yup.string().required("Problem Name is required"),
      className: "col-span-12 md:col-span-6",
    },
    {
      key: 5,
      name: "priority",
      placeHolder: "",
      label: "Priority",
      options: [
        {
          id: 2,
          label: "Emergency",
          value: "emergency",
        },
        {
          id: 3,
          label: "Low",
          value: "Low",
        },
        {
          id: 4,
          label: "High",
          value: "high",
        },
        {
          id: 5,
          label: "Medium",
          value: "medium",
        },
      ],
      initialValue: "",
      type: "select",
      validationSchema: Yup.string().required("Priority is required"),
      className: "col-span-6",
    },
    {
      key: "5ii",
      name: "amount",
      placeHolder: "",
      label: "Amount",

      initialValue: "",
      type: "number",
      validationSchema: Yup.string().required("Amount is required"),
      className: "col-span-6",
    },
    {
      key: 5,
      name: "month",
      placeHolder: "",
      label: "Date",
      options: selectArr,
      initialValue: "",
      type: "select",
      validationSchema: Yup.string().required("Date is required"),
      className: "col-span-12",
    },
    {
      key: 0,
      name: "description",
      label: "Description",
      placeHolder: "Description...",
      initialValue: "",
      type: "text",
      multiline: true,
      rows: 3,
      className: "col-span-12",
    },
  ];

  const initialValues = issueSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue?.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = issueSchema?.reduce(
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

  const handleAddRequest = async (values: any, props: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("locationType", values?.locationType);
      formData.append("issueLocation", values?.issueLocation);
      formData.append("category", values?.category);
      formData.append("priority", values?.priority);
      formData.append("description", values?.description);
      formData.append("problem", values?.problem);
      formData.append("amount", values?.amount);
      formData.append("rentId", values?.month);
      if (isImage) {
        formData.append("maintenancePhoto", isImage as any);
      }
      const response = await post({
        path: `maintenance/add/${propertyID}`,
        isImage: true,
        isAlert: true,
        body: formData,
      });
      if (response?.status === 200) {
        props.resetForm();
      }
      setIsLoading(false);
      mutate();
      setIsImage(null);
    } catch (error) {
      setIsLoading(false);
    } finally {
      onClose();
    }
  };

  return (
    <CustomDialog
      open={open}
      onClose={() => onClose && onClose()}
      maxWidth="sm"
    >
      <div className="md:col-span-6 col-span-12 flex flex-col gap-6 p-6">
        <p className="font-semibold text-xl">Add Maintenance</p>
        <div className="w-full flex flex-col gap-3">
          <p className=" leading-5">Upload Photo </p>
          <UploadImage
            className="!h-44"
            image={isImage}
            onChange={onFileChange}
            clearImage={() => setIsImage(null)}
            setIsImage={setIsImage}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleAddRequest}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {issueSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div
                        className={`flex flex-col justify-center gap-2 ${inputItem.className}`}
                      >
                        <div className=" text-themeDarkGray">
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
                            multiline={inputItem.multiline}
                            rows={inputItem.rows}
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
                <div className="flex items-center col-span-12  justify-center flex-col gap-2 pt-2">
                  <RippleLoadingButton
                    type="submit"
                    className="btn-one text-white py-3 w-full"
                    loading={isLoading}
                    title="Save & Continue"
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

export default AddMaintenanceView;
