import * as Yup from "yup";

const InformationSchema = [
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
];
export default InformationSchema;
