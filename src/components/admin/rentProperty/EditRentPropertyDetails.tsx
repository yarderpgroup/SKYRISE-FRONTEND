import { Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Container, Drawer, Typography } from "@mui/material";
import { InputField } from "components/core";
import { Form, Formik } from "formik";

import * as Yup from "yup";
import { PhotoUpload } from "../common";

const rentPropertySchema = [
  {
    key: "1ii",
    // placeholder: 'Enter your email',
    name: "propertyName",
    label: "Property Name *",
    placeholder: "Property Name",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("PropertyName is required"),
    initialValue: "",

    required: true,
  },
  {
    key: "1iii",
    // placeholder: 'Enter your email',
    name: "ownerName",
    label: "Owner Name *",
    placeholder: "OwnerName",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("OwnerName is required"),
    initialValue: "",

    required: true,
  },

  {
    key: "1iv",
    // placeholder: 'Enter your email',
    name: "number",
    label: "Contact Number *",
    placeholder: "Contact Number",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Contact Number is required"),
    initialValue: "",

    required: true,
  },
  {
    key: "1vii",
    // placeholder: 'Enter your email',
    name: " bedroom",
    label: " Bedroom *",
    placeholder: " Bedroom",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Bedroom Number is required"),
    initialValue: "",

    required: true,
  },
  {
    key: "1vii",
    // placeholder: 'Enter your email',
    name: " bath",
    label: " BathRoom *",
    placeholder: " Area",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Area Number is required"),
    initialValue: "",

    required: true,
  },
  {
    key: "1viii",
    // placeholder: 'Enter your email',
    name: "balconies",
    label: " Balconies *",
    placeholder: " Balconies",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Balconies is required"),
    initialValue: "",

    required: true,
  },
  {
    key: "IXX",
    // placeholder: 'Enter your email',
    name: "description",
    label: " Description *",
    placeholder: " Description",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Description is required"),
    initialValue: "",

    required: true,
  },

  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "location",
    label: "Location *",
    placeholder: "Location",
    styleContact: "rounded-lg",

    type: "text",
    validationSchema: Yup.string().required("Location required"),

    initialValue: "",

    required: true,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
  {
    key: "2",
    // placeholder: 'Enter your email',
    name: "price",
    label: "Price *",
    placeholder: "Price",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Price is required"),
    initialValue: "",

    required: true,
  },

  {
    key: "11",
    name: "deposit",
    type: "text",
    placeholder: "Security Deposit",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Security Deposit *",
    validationSchema: Yup.string().required("Deposit is required"),
    initialValue: "",

    required: true,
  },

  {
    key: "11",
    name: "date",
    type: "text",
    placeholder: "Date Available",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Date Available  *",
    validationSchema: Yup.string().required("Date Available  is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "duration",
    type: "number",
    placeholder: "Lease Duration",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Lease Duration*",
    validationSchema: Yup.string().required("Lease Duration is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "fee",
    type: "text",
    placeholder: "Move in Fee",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Move in Fee*",
    validationSchema: Yup.string().required("Move in Fee is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "12",
    name: "parking",
    type: "text",
    placeholder: "Parking",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Parking*",
    validationSchema: Yup.string().required("Parking is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "12",
    name: "pets",
    type: "text",
    placeholder: "Pets",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Pets*",
    validationSchema: Yup.string().required("Pets is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "13",
    name: "floor",
    type: "text",
    placeholder: "Floor",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Floor*",
    validationSchema: Yup.string().required("Floor is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "13i",
    name: "bathrooms",
    type: "number",
    placeholder: "Bathroom",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Floor*",
    validationSchema: Yup.string().required("Bathroom is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "13ii",
    name: "startTime",
    type: "number",
    placeholder: "StartTime",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "StartTime*",
    validationSchema: Yup.string().required("StartTime is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "13iii",
    name: "endTime",
    type: "number",
    placeholder: "EndTime",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "EndTime*",
    validationSchema: Yup.string().required("EndTime is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "14",
    name: "amenities",
    type: "text",
    placeholder: "Amenities",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Amenities*",
    validationSchema: Yup.string().required("Amenities is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "14",
    name: "utilities",
    type: "text",
    placeholder: "Utilities",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Utilities*",
    validationSchema: Yup.string().required("Utilities is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "1iv",
    // placeholder: 'Enter your email',
    name: "email",
    label: "Email *",
    placeholder: "OwnerName",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("OwnerName is required"),
    initialValue: "",

    required: true,
  },
  {
    key: "1iv",
    // placeholder: 'Enter your email',
    name: "phoneNumber",
    label: "Phone Number *",
    placeholder: "Contact Number",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Contact Number is required"),
    initialValue: "",

    required: true,
  },
  {
    key: "viii",
    // placeholder: 'Enter your email',
    name: "name",
    label: "Name *",
    placeholder: "Name",
    styleContact: "rounded-lg",
    type: "text",
    validationSchema: Yup.string().required("Name is required"),
    initialValue: "",

    required: true,
  },
];

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
};

const EditRentPropertyDetails = ({ open, onClose, mutate }: Props) => {
  const handleSend = async (values: any) => {};
  const initialValues = rentPropertySchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );
  const validationSchema = rentPropertySchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "40vw",
            marginTop: "5vh",
          }}
        >
          <Typography
            align="center"
            color="text.primary"
            variant="h5"
            sx={{ marginBottom: 3 }}
          >
            Edit Information
          </Typography>
          <div className="mt-4 flex justify-center text-center">
            <PhotoUpload variant={"square"} width={450} height={200} />
          </div>
          <div className="pt-5">
            <Formik
              validationSchema={Yup.object(validationSchema)}
              onSubmit={handleSend}
              enableReinitialize
              initialValues={initialValues}
            >
              {(formik) => (
                <Form>
                  <div className="grid grid-cols-1 gap-4 w-full justify-center items-center justify-items-center  ">
                    {rentPropertySchema?.map((inputItem) => (
                      <div className="w-full flex flex-col gap-1">
                        <p className="text-themeDarkGray font-bold text-base">
                          {inputItem?.label}
                        </p>
                        <InputField
                          fullWidth
                          key={inputItem.key}
                          name={inputItem?.name}
                          label={inputItem?.label}
                          styleContact={inputItem?.styleContact}
                          type={inputItem?.type}
                          placeholder={inputItem?.placeholder}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="mt-2 mb-2">
                      <LoadingButton
                        className="btn-background !bg-theme"
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={formik.isSubmitting || !formik.isValid}
                        loading={formik.isSubmitting}
                        loadingPosition="start"
                        startIcon={<Save />}
                      >
                        Save
                      </LoadingButton>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default EditRentPropertyDetails;
