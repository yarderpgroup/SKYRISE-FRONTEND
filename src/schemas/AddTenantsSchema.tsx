import * as Yup from "yup";

const AddTenantsSchema = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "name",
    label: "Name *",
    placeholder: "Name",
    styleContact: "rounded-lg",

    type: "text",
    validationSchema: Yup.string()
      .required("Name required")
      .min(2, "Name must be at least 2 characters"),
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
    name: "email",
    label: "Email *",
    placeholder: "Email",
    styleContact: "rounded-lg",
    type: "email",
    validationSchema: Yup.string()
      .required("Email is required")
      .email("Invalid Email Address"),
    initialValue: "",

    required: true,
  },

  {
    key: "3",
    // placeholder: 'Enter your phone number',
    name: "phoneNumber",
    label: "Contact Number *",
    placeholder: "Contact Number",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Store contact number is required"),
    initialValue: "",

    required: true,
  },

  {
    key: "4",
    name: "rentedOn",
    label: "Rented On *",
    placeholder: "Rented On",
    styleContact: "rounded-lg",
    button: "  Same as above",
    validationSchema: Yup.string().optional(),
    type: "date",
    initialValue: "",

    required: true,
  },

  {
    key: "7",
    name: "rentedTill",
    label: "Rented Till *",
    type: "date",
    validationSchema: Yup.string().required("Rented Till is required"),
    styleContact: "rounded-lg",
    button: "  Same as above",
    initialValue: "",
    placeholder: "Rented Till",

    required: true,
  },
  {
    key: "8",
    name: "room",
    label: "Room Type *",
    placeholder: "Room Type ",
    button: "  Same as above",
    type: "text",
    styleContact: "rounded-lg",
    validationSchema: Yup.string().required("Room Type  is required"),

    initialValue: "",
    required: true,
  },

  {
    key: "11",
    name: "monthly",
    type: "number",
    placeholder: "Monthly Rent",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Monthly Rent *",
    validationSchema: Yup.string().required("Monthly Rent is required"),
    initialValue: "",

    required: true,
  },
  {
    key: "11",
    name: "security",
    type: "number",
    button: "  Same as above",
    placeholder: "Security Deposit",
    styleContact: "rounded-lg",
    label: "Security Deposit *",
    validationSchema: Yup.string().required("Security is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "maintenance",
    type: "number",
    placeholder: "Maintenance Fee",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Maintenance Fee *",
    validationSchema: Yup.string().required("Security is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "electricity",
    type: "number",
    placeholder: "Electricity Bill",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Electricity Bill *",
    validationSchema: Yup.string().required("Electricity Bill is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "water",
    type: "number",
    button: "  Same as above",
    placeholder: "Water Bill",
    styleContact: "rounded-lg",
    label: "Water Bill *",
    validationSchema: Yup.string().required("Water Bill is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "others",
    type: "number",
    placeholder: "Others Fee",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Others Fee *",
    validationSchema: Yup.string().required("Others Fee is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  // {
  //   key: "9",
  //   name: "id",
  //   type: "file",
  //   placeholder: "Id doc",
  //   styleContact: "rounded-lg",
  //   button: "  Same as above",
  //   label: "Id doc *",
  //   validationSchema: Yup.string().required("Id doc is required"),
  //   initialValue: "",

  //   required: true,
  // },

  // {
  //   key: "10",
  //   name: "lease",
  //   type: "file",
  //   placeholder: "Lease Document",
  //   button: "  Same as above",
  //   styleContact: "rounded-lg",
  //   label: "Lease Document *",
  //   validationSchema: Yup.string().required("Lease Document is required"),
  //   initialValue: "",

  //   required: true,
  // },
];
export default AddTenantsSchema;
