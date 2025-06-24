import { CarRental, Delete, Edit } from "@mui/icons-material";
import { FordOne } from "assets/tenant";
import CustomDialog from "components/core/CustomDialog";
import { TenantLayout } from "layouts";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  EmptyComponents,
  EmptyHomeSearchComponent,
  InputField,
  RippleLoadingButton,
  ShowEmpty,
} from "components/core";
import { Field, Form, Formik } from "formik";
import { Skeleton, TextFieldProps } from "@mui/material";
import useSWRAPI from "hooks/useSWRAPI";
import { post, put, remove } from "api";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { WithProtectedTenant } from "hooks";
import { VehiclesEditDetails } from "components/tenant";

const myVehiclesArr = [
  {
    id: 1,
    title: "Ford Mustang GT",
    img: FordOne.src,
    color: "Jet Black",
    number: "OA-83472",
    ownerName: "Alexa Carter",
  },
  {
    id: 2,
    title: "Ford Mustang GT",
    img: FordOne.src,
    color: "Jet Black",
    number: "OA-83472",
    ownerName: "Alexa Carter",
  },
  {
    id: 3,
    title: "Ford Mustang GT",
    img: FordOne.src,
    color: "Jet Black",
    number: "OA-83472",
    ownerName: "Alexa Carter",
  },
  {
    id: 4,
    title: "Ford Mustang GT",
    img: FordOne.src,
    color: "Jet Black",
    number: "OA-83472",
    ownerName: "Alexa Carter",
  },
];
const addVehicles = [
  {
    key: 0,
    name: "photo",
    label: "Model Photo",
    placeHolder: "",
    initialValue: "",
    type: "photo",
    className: "col-span-12",
  },
  {
    key: 1,
    name: "carName",
    label: "Model Name",
    placeHolder: "Mustang GT 2016",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Model Name is required."),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 2,
    name: "color",
    placeHolder: "Jet Black",
    label: "Model Color",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Model color is required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 3,
    name: "modelNumber",
    placeHolder: "OA-287726",
    label: "Vehicle Number",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Vehicles Number is required"),
    className: "col-span-12 md:col-span-6",
  },
  {
    key: 4,
    name: "owner",
    placeHolder: "Alexa Carter",
    label: "Owner Name",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Owner Name is required"),
    className: "col-span-12 md:col-span-6",
  },
];

const initialValues = addVehicles?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.initialValue;
  return accumulator;
}, {} as any);

const validationSchema = addVehicles?.reduce((accumulator, currentValue) => {
  accumulator[currentValue?.name] = currentValue?.validationSchema;
  return accumulator;
}, {} as any);

const Vehicles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isImage, setIsImage] = useState<any>(null);
  const [isAddVehicles, setIsAddVehicles] = useState(false);
  const [activeData, setActiveData] = useState();

  const [openVehicle, setOpenVehicle] = useState(false);
  const [isEditItem, setIsEditItem] = useState<any>(null);
  const [editId, setEditId] = useState<any>(null);
  const router = useRouter();
  const propertyID = router.query.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `tenant/vehicle/get/${propertyID}`
  );
  const myVehicles = data?.data?.data?.data;

  const handleAddCar = async (values: any, props: any) => {
    setIsAddVehicles(true);
    setIsLoading(true);
    try {
      const formData = new FormData();
      if (isImage) {
        formData.append("vehiclePhoto", isImage as any);
      }
      formData.append("modelName", values.carName);
      formData.append("modelColor", values.color);
      formData.append("modelNumber", values.modelNumber);
      formData.append("ownerName", values.owner);
      formData.append("propertyId", propertyID as any);
      const response = await post({
        path: `tenant/vehicle/add`,
        isImage: true,
        isAlert: true,
        body: formData,
      });
      setIsLoading(false);
      if (response?.status === 200) {
        setIsAddVehicles(false);
        setIsImage(null);
        mutate();
        props.resetForm();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleEditOpen = (ID: any) => {
    setOpenVehicle(true);
    setActiveData(ID);
  };

  const handleRemove = (_id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove it!",
      }).then(async (result) => {
        const response = await remove({
          path: `tenant/vehicle/delete/${propertyID}?vehicleId=${_id}`,
          isAlert: true,
          body: JSON.stringify({
            vehicleId: _id,
          }),
        });
        mutate();
      });
    } catch (error) {}
  };

  return (
    <TenantLayout title="My Vehicles | SKYRISE">
      <VehiclesEditDetails
        open={openVehicle}
        activeData={activeData}
        mutate={mutate}
        onClose={() => setOpenVehicle(false)}
      />
      <div className="w-full px-3 md:px-5 py-5 md:py-10  md:min-h-[calc(100vh-4.5rem)] text-themeDarkGray">
        <div className="flex w-full justify-end pb-5">
          <button
            onClick={() => setIsAddVehicles(!isAddVehicles)}
            className="btn-one py-2 px-4"
          >
            <CarRental /> Add
          </button>
        </div>
        <div className="w-full flex">
          {isValidating ? (
            <div className="w-full gap-x-6 gap-y-8 md:gap-8 items-center grid grid-cols-12 h-full">
              {[...Array(8)]?.map((_, index) => (
                <div className="md:col-span-3 col-span-12 flex gap-3 flex-col h-56 items-center justify-center">
                  <Skeleton
                    variant="rectangular"
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
              {myVehicles?.length > 0 ? (
                <div className="w-full grid grid-cols-12 gap-6">
                  {myVehicles?.map((item: any) => (
                    <div
                      key={item?.id}
                      className="md:col-span-3 col-span-12 bg-gradient  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-white rounded-lg hover:scale-[1.03] overflow-hidden h-64 common-transition"
                    >
                      <div className="gap-3 flex flex-col">
                        <div className="flex w-full items-center justify-center">
                          <img
                            src={item?.vehiclePhoto}
                            alt="car"
                            className="w-full h-40 object-cover"
                          />
                        </div>
                        <div className="w-full flex flex-col gap-1 px-3">
                          <div className="flex w-full items-center justify-between">
                            <p className="md:text-lg text-base flex w-full font-semibold leading-5 md:leading-4">
                              {item?.modelName}
                            </p>
                            <div className="flex gap-2">
                              <p
                                onClick={() => handleEditOpen(item)}
                                className="w-7 h-7 rounded-md bg-gradient-to-br from-facebook to-themeDarkGray text-white flex items-center justify-center"
                              >
                                <Edit className="!text-xl" />
                              </p>
                              <p
                                className="w-7 h-7 rounded-md bg-gradient-to-br from-youtube to-pinterest text-white flex items-center justify-center"
                                onClick={() => handleRemove(item?._id)}
                              >
                                <Delete className="!text-xl" />
                              </p>
                            </div>
                          </div>
                          <div className="flex w-full flex-col">
                            <p className="text-sm flex items-center gap-1">
                              {item?.modelNumber}
                              <p className="md:text-sm text-xs font-normal md:leading-5">
                                ({item?.modelColor})
                              </p>
                            </p>
                            <p>{item?.ownerName}</p>
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
        </div>
      </div>
      <CustomDialog
        onClose={() => setIsAddVehicles(false)}
        open={isAddVehicles}
        maxWidth="sm"
      >
        <div className="bg-white h-[30rem] md:h-auto scrollBarNone overflow-scroll w-full p-3 md:p-5 flex flex-col gap-5">
          <p className="pb-3 border-b font-semibold text-themeDarkGray text-lg border-primaryBorder">
            Add new Car
          </p>
          <div className="w-full flex flex-col items-center justify-center">
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleAddCar}
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
                              image={isImage}
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
    </TenantLayout>
  );
};

export default WithProtectedTenant(Vehicles);
