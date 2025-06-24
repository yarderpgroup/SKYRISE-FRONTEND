import { InputAdornment } from "@material-ui/core";
import { OpenInNew, Save } from "@mui/icons-material";
import { CircularProgress, TextFieldProps, Tooltip } from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ReviewDetailsAdd } from "../LeaseBasic";
import {
  ExteriorDetailsAdd,
  InteriorExterior,
  ParkingDetails,
  PriceInsightDetailsAdd,
  OtherPropertyDetails,
} from "../propertiesDetails.tsx";
import AddMoreModal from "./AddMoreModal";

const AddDetails = [
  {
    key: "1",
    name: "title",
    label: "Title",
    // placeholder: "Title",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "select",
    options: [
      {
        label: "Property Type",
        value: "Property Type",
      },
      {
        label: "Style",
        value: "Style",
      },
      {
        label: "Lot Size",
        value: "Lot Size",
      },
      {
        label: "Year Built",
        value: "Year Built",
      },
      {
        label: "Community",
        value: "Community",
      },
      {
        label: "MLS#",
        value: "MLS#",
      },
    ],
    validationSchema: Yup.string().required("Title is Required"),
    initialValue: "",
    multiline: false,
    required: true,
    className: "col-span-6",
  },
  {
    key: 2,
    name: "des",
    label: "Description",
    placeholder: "Description...",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().required("Description is Required"),
    multiline: true,
    rows: 3,
    className: "col-span-6",
  },
];

const OtherDetailsAdd = () => {
  const router = useRouter();
  const [addMoreModal, setAddMoreModal] = useState(false);
  const propertyID = router?.query?.propertyID;
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [openLeaser, setOpenLeaser] = useState(false);

  const initialValues = AddDetails.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddDetails?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  const handleSend = async (values: any, props: any) => {
    try {
      setIsStatusLoading(true);
      const response = await post({
        path: `property/facts/add`,
        isAlert: true,
        body: JSON.stringify({
          title: values.title,
          propertyId: propertyID,
          description: values.des,
          type: "home",
        }),
      });
      setIsStatusLoading(false);
      props.resetForm();

      if (response.status === 200) {
        setIsStatusLoading(false);
      }
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };
  const handleSubmit = async (values: any) => {
    router.push(
      `/panel/admin/properties/add-property/property-photo?propertyID=${propertyID}`
    );
  };

  return (
    <div>
      <ReviewDetailsAdd
        open={openLeaser}
        onClose={() => setOpenLeaser(false)}
      />
      <AddMoreModal
        setAddMoreModal={setAddMoreModal}
        addMoreModal={addMoreModal}
        onClose={() => setAddMoreModal(false)}
        AddDetails={AddDetails}
        type="HOME"
        propertyID={propertyID as any}
      />
      <div className="flex flex-col gap-6">
        <div className=" w-full flex-col flex gap-3">
          <h1 className="text-themeDarkGray text-xl font-bold ">Home Facts</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className="w-full grid grid-cols-12 gap-2 md:gap-4">
                {AddDetails.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div
                        className={`flex flex-col justify-center gap-3 ${inputItem?.className}`}
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
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  {inputItem.name === "des" && (
                                    <div className="flex gap-2 items-center ">
                                      <Tooltip title="Save">
                                        <button
                                          type="submit"
                                          className="h-9  w-9 flex items-center justify-center  text-white rounded-md bg-gradient-to-br from-facebook to-twitter cursor-pointer"
                                        >
                                          {isStatusLoading ? (
                                            <CircularProgress
                                              className="!text-white"
                                              size={20}
                                            />
                                          ) : (
                                            <Save />
                                          )}
                                        </button>
                                      </Tooltip>
                                      <Tooltip title="Add More">
                                        <div
                                          onClick={() =>
                                            setAddMoreModal(!addMoreModal)
                                          }
                                          className="h-9  w-9 flex items-center justify-center  text-white rounded-md bg-gradient-to-br from-theme to-youtube cursor-pointer"
                                        >
                                          <OpenInNew />
                                        </div>
                                      </Tooltip>
                                    </div>
                                  )}
                                </InputAdornment>
                              ),
                            }}
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
              </Form>
            )}
          </Formik>
        </div>

        {/* other section */}

        <div>
          <PriceInsightDetailsAdd />
        </div>

        <div>
          <InteriorExterior />
        </div>
        <div>
          <ExteriorDetailsAdd />
        </div>

        <div>
          <ParkingDetails />
        </div>
        <div>
          <OtherPropertyDetails />
        </div>
        <div className="flex items-center col-span-12 justify-between flex-col gap-2 pt-2">
          <button
            onClick={handleSubmit}
            className="btn-one w-full rounded-md !py-2.5 "
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherDetailsAdd;
