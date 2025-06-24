import { TenantLayout } from "layouts";
import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Collapse, TextField } from "@mui/material";
import {
  EmptyComponents,
  EmptyHomeSearchComponent,
  IOSSwitch,
  RippleLoadingButton,
  ShowEmpty,
} from "components/core";
import * as Yup from "yup";
import { InputField, MultiplePhotoUpload } from "components/core";
import { Field, Form, Formik } from "formik";
import { Skeleton, TextFieldProps } from "@mui/material";
import { ContactCard, Inspection, Request, TotalRent } from "assets/tenant";
import { FeatureFive } from "assets/property";
import {
  Add,
  AssignmentTurnedIn,
  Delete,
  Edit,
  Info,
  PostAdd,
  TypeSpecimen,
} from "@mui/icons-material";
import CustomDialog from "components/core/CustomDialog";
import { useRouter } from "next/router";
import useSWRAPI from "hooks/useSWRAPI";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import { post, put } from "api";
import UploadImage from "components/core/PhotoUpload";
import { WithProtectedTenant } from "hooks";
import MaintenanceEditDetails from "components/tenant/MaintenanceEditDetails";

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
    className: "col-span-12",
  },
  {
    key: 6,
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

const validationSchema = issueSchema?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);

const maintenanceTypeArr = [
  {
    id: 1,
    title: "Open Request",
    img: TotalRent.src,
    className:
      "bg-gradient-to-bl via-linkedin from-themeDarkGray to-primaryBorder",
  },
  {
    id: 2,
    title: "Past Request",
    img: Request.src,
    className: "bg-gradient-to-t from-twitter to-themeGray",
  },
  {
    id: 0,
    title: "Make Request",
    img: Inspection.src,
    className:
      "bg-gradient-to-bl via-themeGray from-themeDarkGray to-primaryBorder",
  },
  {
    id: 3,
    title: "Phone Number",
    img: ContactCard.src,
    className: "bg-gradient-to-tl from-theme to-themeGray",
  },
];

const MaintenanceRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeType, setActiveType] = useState("Open Request");
  const [activeData, setActiveData] = useState();
  const [openMaintenance, setOpenMaintenance] = useState(false);
  const [isImage, setIsImage] = useState(null);
  const [moreInfo, setMoreInfo] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedData, setSelectedData] = useState<any>();
  const [contact, setContact] = useState("");
  const [haveAnimal, setHaveAnimal] = useState<any>(false);
  const [staffAgree, setStaffAgree] = useState<any>(false);
  const [animalNote, setAnimalNote] = useState("");
  const [selectedId, setSelectedId] = useState<any>(null);
  const router = useRouter();
  const { user } = useAuth();
  const propertyID = router.query.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `tenant/maintenance/get-all/${propertyID}?status=${
      activeType === "Open Request" ? "PENDING" : "COMPLETE"
    }`
  );
  console.log(data);
  const MaintenanceData = data?.data?.data?.data;

  const handleAddRequest = async (values: any, props: any) => {
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
      formData.append("animalNote", values.animalNote);
      formData.append("propertyId", propertyID as any);
      if (isImage) {
        formData.append("maintenancePhoto", isImage as any);
      }
      const response = await post({
        path: `tenant/maintenance/add`,
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
    }
  };
  const onFileChange = (event: any) => {
    setIsImage(event?.target?.files[0]);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setContact(event.target.value as string);
  };
  const handleMoreInfoOpen = (data: any) => {
    setMoreInfo(true);
    setSelectedData(data);
  };

  const handleEditOpen = async (item: any) => {
    setOpenMaintenance(true);
    setSelectedData(item);
    setSelectedId(item?._id);
  };

  return (
    <TenantLayout title="Maintenance Request | SKYRISE">
      <MaintenanceEditDetails
        open={openMaintenance}
        selectedData={selectedData}
        mutate={mutate}
        selectedId={selectedId}
        user={user}
        onClose={() => setOpenMaintenance(false)}
      />
      <div className="w-full px-3 md:px-5 py-5 md:py-10 min-h-[calc(100vh-4.5rem)] flex flex-col gap-5 md:gap-10  text-themeDarkGray">
        <div className="flex w-full justify-end pb-5">
          <div className="flex  gap-5">
            <button
              className={`${
                activeType === "Open Request"
                  ? "border-2 border-primaryBorder border-dashed py-2 px-4 text-themeDarkGray rounded-lg"
                  : "btn-one"
              }`}
              onClick={() => {
                setActiveType("Open Request");
              }}
            >
              <AssignmentTurnedIn /> Pending Request
            </button>
            <button
              className={`${
                activeType === "Past Request"
                  ? "border-2 border-primaryBorder border-dashed py-2 px-4 text-themeDarkGray rounded-lg"
                  : "btn-one"
              }`}
              onClick={() => {
                setActiveType("Past Request");
              }}
            >
              <PostAdd /> Complete Request
            </button>
          </div>
        </div>

        {/* make request */}
        <Collapse in={activeType === "Make Request"}>
          <div className="flex flex-col w-full gap-6">
            <div className="grid grid-cols-12 gap-4">
              {/* contact information */}
              <div className="md:col-span-6 col-span-12 flex flex-col gap-6">
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
                <div className="flex flex-col gap-3 w-full">
                  <p className=" leading-5">Do you have an animal?</p>
                  <div className="flex w-full flex-col gap-4">
                    <IOSSwitch
                      onChange={(e) => setHaveAnimal(e.target.checked)}
                    />
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
                </div>

                {/* agree switch */}
                <div className="w-full flex flex-col gap-3">
                  <p className=" leading-5">
                    Do you agree to let the property staff enter your unit to
                    work on this maintenance issue?
                  </p>
                  <div>
                    <IOSSwitch
                      onChange={(e) => setStaffAgree(e.target.checked)}
                    />
                  </div>
                </div>
                {/* upload maintenance image here */}
                <div className="w-full flex flex-col gap-3">
                  <p className=" leading-5">Upload a photo of the issue</p>
                  <UploadImage
                    className="!h-72"
                    image={isImage}
                    onChange={onFileChange}
                    // clearImage={() => setIsImage(null)}
                    setIsImage={setIsImage}
                  />
                </div>
              </div>

              {/* issue information */}
              <div className="md:col-span-6 col-span-12 flex flex-col gap-6">
                <p className="font-semibold text-xl">Issue Details</p>
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
                          {/* <button
                            type="submit"
                            className="btn-one text-white py-3 w-full"
                          >
                            Save & Continue
                          </button> */}
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
        </Collapse>

        {/* open request */}
        <Collapse in={activeType === "Open Request"}>
          {isValidating ? (
            <div className="w-full gap-x-6 gap-y-8 md:gap-8 items-center grid grid-cols-12 h-full">
              {[...Array(8)]?.map((_, index) => (
                <div className="md:col-span-3 col-span-12 flex gap-3 flex-col h-60 items-center justify-center">
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width="100%"
                    height="70%"
                  />

                  <Skeleton
                    variant="rounded"
                    width="100%"
                    animation="wave"
                    height={40}
                  />
                  <Skeleton variant="rounded" width="100%" animation="wave" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {MaintenanceData?.length > 0 ? (
                <div className="w-full grid grid-cols-12 gap-6">
                  {MaintenanceData?.map((item: any) => (
                    <div
                      key={item?.id}
                      className="md:col-span-3 col-span-12 bg-gradient  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-white rounded-lg hover:scale-[1.03] overflow-hidden h-full common-transition"
                    >
                      <div className="gap-3 flex flex-col">
                        <div className="flex w-full items-center justify-center">
                          <img
                            src={item?.maintenancePhoto}
                            alt="car"
                            className="w-full h-40 object-cover"
                          />
                        </div>
                        <div className="w-full flex flex-col px-3 pb-3">
                          <div className="flex w-full items-center">
                            <p className="md:text-lg text-base flex w-full font-semibold leading- md:leading-4">
                              {item?.category}
                            </p>
                            <div className="flex gap-1">
                              <p
                                onClick={() => handleEditOpen(item)}
                                className="w-7 h-7 cursor-pointer rounded-md bg-gradient-to-br from-facebook to-themeDarkGray text-white flex items-center justify-center"
                              >
                                <Edit className="!text-xl" />
                              </p>
                              <p
                                onClick={() => handleMoreInfoOpen(item)}
                                className="w-7 h-7 cursor-pointer rounded-md bg-gradient-to-br  from-twitter to-facebook text-white flex items-center justify-center"
                              >
                                <Info className="!text-xl" />
                              </p>
                            </div>
                          </div>
                          <div className="flex w-full flex-col gap-0.5">
                            <p className="font-semibold">
                              Issue: {item?.problem}
                            </p>
                            <p className="text-sm flex items-center gap-1">
                              submitted:{" "}
                              {dayjs(
                                new Date(
                                  Number(new Date(selectedData?.createdAt))
                                )
                              ).format("DD MMM YYYY")}
                            </p>
                            <p className="text-sm flex items-center gap-1">
                              priority: {item?.priority}
                            </p>
                            <p className="text-sm flex items-center gap-1">
                              status: {item?.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ShowEmpty />
              )}
            </>
          )}
        </Collapse>

        {/* past request */}
        <Collapse in={activeType === "Past Request"}>
          {isValidating ? (
            <div className="w-full gap-x-6 gap-y-8 md:gap-8 items-center grid grid-cols-12 h-full">
              {[...Array(8)]?.map((_, index) => (
                <div className="md:col-span-3 col-span-12 flex gap-3 flex-col h-60 items-center justify-center">
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width="100%"
                    height="70%"
                  />

                  <Skeleton
                    variant="rounded"
                    width="100%"
                    animation="wave"
                    height={40}
                  />
                  <Skeleton variant="rounded" width="100%" animation="wave" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {MaintenanceData?.length > 0 ? (
                <div className="w-full grid grid-cols-12 gap-6">
                  {MaintenanceData?.map((item: any) => (
                    <div
                      key={item?.id}
                      className="md:col-span-3 col-span-12 bg-gradient  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-white rounded-lg hover:scale-[1.03] overflow-hidden h-full common-transition"
                    >
                      <div className="gap-3 flex flex-col">
                        <div className="flex w-full items-center justify-center">
                          <img
                            src={item?.maintenancePhoto}
                            alt="image"
                            className="w-full h-40 object-cover"
                          />
                        </div>
                        <div className="w-full flex flex-col px-3 pb-3">
                          <div className="flex w-full items-center">
                            <p className="md:text-lg text-base flex w-full font-semibold leading- md:leading-4">
                              {item?.category}
                            </p>
                            <div className="flex gap-1">
                              {/* <p
                                onClick={() => handleEditOpen(item?._id)}
                                className="w-7 h-7 cursor-pointer rounded-md bg-gradient-to-br from-facebook to-themeDarkGray text-white flex items-center justify-center"
                              >
                                <Edit className="!text-xl" />
                              </p> */}
                              <p
                                onClick={() => handleMoreInfoOpen(item)}
                                className="w-7 h-7  rounded-md bg-gradient-to-br  cursor-pointer from-twitter to-facebook text-white flex items-center justify-center"
                              >
                                <Info className="!text-xl" />
                              </p>
                            </div>
                          </div>
                          <div className="flex w-full flex-col gap-0.5">
                            <p className="font-semibold">
                              Issue: {item?.problem}
                            </p>
                            <p className="text-sm flex items-center gap-1">
                              submitted:{" "}
                              {dayjs(
                                new Date(
                                  Number(new Date(selectedData?.createdAt))
                                )
                              ).format("DD MMM YYYY")}
                            </p>
                            <p className="text-sm flex items-center gap-1">
                              priority: {item?.priority}
                            </p>
                            <p className="text-sm flex items-center gap-1">
                              status: {item?.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyHomeSearchComponent />
              )}
            </>
          )}
        </Collapse>
      </div>
      <CustomDialog
        open={moreInfo}
        onClose={() => setMoreInfo(false)}
        maxWidth="xs"
      >
        <div className="bg-white md:h-auto p-3 md:p-5 flex flex-col gap-5">
          <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
            More Info
          </p>
          <div className="gap-1 flex flex-col">
            <div className="pb-2">
              <img
                src={selectedData?.maintenancePhoto}
                alt="image"
                className="w-full h-40"
              />
            </div>
            <p className="text-sm">
              <span className="font-semibold text-base">Issue in:</span>{" "}
              {selectedData?.category}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Issue:</span>{" "}
              {selectedData?.problem}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Submitted Date:</span>{" "}
              {dayjs(
                new Date(Number(new Date(selectedData?.createdAt)))
              ).format("DD MMM YYYY")}
            </p>
            <p className="text-sm">
              <span className="font-semibold text-base">Priority :</span>{" "}
              {selectedData?.priority}
            </p>
            <p className="text-sm flex flex-col">
              <span className="font-semibold text-base">Message :</span>{" "}
              {selectedData?.description}
            </p>
          </div>
        </div>
      </CustomDialog>
    </TenantLayout>
  );
};

export default WithProtectedTenant(MaintenanceRequest);
