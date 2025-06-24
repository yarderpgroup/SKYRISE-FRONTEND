import * as Yup from "yup";
const ExteriorDetailsSchema = [
  {
    key: "11",
    name: "information",
    type: "number",
    placeholder: "Virtural Tour Information",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Virtural Tour Information *",
    validationSchema: Yup.string().required(
      "Virtural Tour Informationent is required"
    ),
    initialValue: "",

    required: true,
  },
  {
    key: "11",
    name: "bedroom",
    type: "number",
    button: "  Same as above",
    placeholder: "bedroom",
    styleContact: "rounded-lg",
    label: "Bedroom *",
    validationSchema: Yup.string().required("Bedroom is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "basement",
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
];
export default ExteriorDetailsSchema;
