import { TenantLayout } from "layouts";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TextField } from "@mui/material";
import { IOSSwitch, RippleLoadingButton } from "components/core";
import * as Yup from "yup";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import { TextFieldProps } from "@mui/material";
import CustomDialog from "components/core/CustomDialog";
import { useRouter } from "next/router";
import { put } from "api";
import UploadImage from "components/core/PhotoUpload";
import { WithProtectedTenant } from "hooks";
type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  user?: any;
  selectedData?: any;
  selectedId?: any;
};

const MaintenanceEditDetails = ({
  open,
  onClose,
  user,
  mutate,
  selectedData,
  selectedId,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openMaintenance, setOpenMaintenance] = useState(false);
  const [isImage, setIsImage] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [contact, setContact] = useState("");
  const [haveAnimal, setHaveAnimal] = useState<any>(false);
  const [staffAgree, setStaffAgree] = useState<any>(false);
  const [animalNote, setAnimalNote] = useState("");
  const router = useRouter();
  const propertyID = router.query.selectedId;

  const maintenanceSchema = [
    {
      key: 0,
      name: "photo",
      label: "Model Photo",
      placeHolder: "",
      initialValue: selectedData?.maintenancePhoto,
      type: "photo",
      className: "col-span-12",
    },
    {
      key: 1,
      name: "locationType",
      label: "Location Type",
      placeHolder: "",
      initialValue: selectedData?.locationType,
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
      initialValue: selectedData?.issueLocation,
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
      initialValue: selectedData?.category,
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
      initialValue: selectedData?.problem,
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
      initialValue: selectedData?.priority,
      type: "select",
      validationSchema: Yup.string().required("Priority is required"),
      className: "col-span-12",
    },
    {
      key: 6,
      name: "description",
      label: "Description",
      placeHolder: "Description...",
      initialValue: selectedData?.description,
      type: "text",
      multiline: true,
      rows: 3,
      className: "col-span-12",
    },
  ];

  const initialValues = maintenanceSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = maintenanceSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const onFileChange = (event: any) => {
    setIsImage(event?.target?.files[0]);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setContact(event.target.value as string);
  };

  const handleEditMaintenance = async (values: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("contactPreference", contact);
      formData.append("haveAnimal", haveAnimal);
      formData.append("staffAgree", staffAgree);
      formData.append("locationType", values.locationType);
      formData.append("issueLocation", values.issueLocation);
      formData.append("category", values.category);
      formData.append("priority", values.priority);
      formData.append("description", values.description);
      formData.append("problem", values.problem);
      formData.append("animalNote", animalNote);
      formData.append("propertyId", propertyID as any);
      formData.append("maintenanceID", selectedId as any);
      if (isImage) {
        formData.append("maintenancePhoto", isImage as any);
      }
      if (isImage) {
        formData.append(
          "maintenancePhoto",
          isImage || (selectedId?.maintenancePhoto as any)
        );
      }
      const response = await put({
        path: `tenant/maintenance/update`,
        isImage: true,
        isAlert: true,
        body: formData,
      });
      setIsLoading(false);
      if (response.status === 200) {
        setOpenEdit(false);
        mutate();
      }
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
      <div className="bg-white md:h-auto p-3 md:p-5 flex flex-col gap-5">
        <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
          Edit Request
        </p>
        <div className="flex flex-col w-full gap-6">
          <div className="grid grid-cols-12 gap-4">
            {/* contact information */}
            {/* <div className="md:col-span-6 col-span-12 flex flex-col gap-6">
              <p className="text-xl font-semibold">General Info</p>
              <div className="w-full flex-col flex gap-3">
                <p className="">Contact Preference</p>
                <FormControl fullWidth>
                  <InputLabel>Contact</InputLabel>
                  <Select
                    value={contact}
                    label="Contact"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Email"}>{user?.email}</MenuItem>
                    <MenuItem value={"Phones"}>{user?.phoneNumber}</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* pet note */}
            {/* <div className="flex flex-col gap-3 w-full">
              <p className=" leading-5">Do you have an animal?</p>
              <div className="flex w-full flex-col gap-4">
                <IOSSwitch onChange={(e) => setHaveAnimal(e.target.checked)} />
                <TextField
                  placeholder="Entry Note"
                  variant="outlined"
                  rows={3}
                  multiline
                  fullWidth
                  disabled={!haveAnimal}
                  onChange={(e) => setAnimalNote(e.target.value)}
                />
              </div>
            </div> */}

            {/* agree switch */}
            {/* <div className="w-full flex flex-col gap-3">
              <p className=" leading-5">
                Do you agree to let the property staff enter your unit to work
                on this maintenance issue?
              </p>
              <div>
                <IOSSwitch onChange={(e) => setStaffAgree(e.target.checked)} />
              </div>
            </div> */}
            {/* upload maintenance image here */}
            {/* <div className="w-full flex flex-col gap-3">
                <p className=" leading-5">Upload a photo of the issue</p>
                <UploadImage
                  className="!h-72"
                  image={isImage}
                  onChange={onFileChange}
                  clearImage={() => setIsImage(null)}
                  setIsImage={setIsImage}
                />
              </div> */}
            {/* </div> */}

            {/* issue information */}
            <div className="md:col-span-12 col-span-12 flex flex-col gap-6">
              <p className="font-semibold text-xl">Issue Details</p>
              <div className="w-full flex flex-col items-center justify-center">
                <Formik
                  initialValues={initialValues}
                  validationSchema={Yup.object(validationSchema)}
                  onSubmit={handleEditMaintenance}
                >
                  {(formik) => (
                    <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                      {maintenanceSchema?.map((inputItem) => (
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
                                  initialValue={initialValues}
                                  rows={inputItem?.rows}
                                  multiline={inputItem?.multiline}
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
                                  image={isImage as any}
                                  defaultImage={
                                    selectedData?.maintenancePhoto as any
                                  }
                                  setIsImage={setIsImage}
                                  onFileChange={(event: any) => {
                                    setIsImage(event?.target?.files[0]);
                                  }}
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
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default WithProtectedTenant(MaintenanceEditDetails);
