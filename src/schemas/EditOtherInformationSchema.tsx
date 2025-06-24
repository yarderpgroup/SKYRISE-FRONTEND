import * as Yup from "yup";

const EditOtherInformationSchema = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "disclosure:",
    label: "Disclosure: *",
    placeholder: "Disclosure:",
    styleContact: "rounded-lg",

    type: "text",
    validationSchema: Yup.string().required("Disclosure: required"),

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
    name: "disclosure",
    label: "Disclosures *",
    placeholder: "Disclosures",
    styleContact: "rounded-lg",
    type: "number",
    validationSchema: Yup.string().required("Disclosures is required"),
    initialValue: "",

    required: true,
  },

  {
    key: "11",
    name: "standardStatus",
    type: "text",
    placeholder: "StandardStatus",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "StandardStatus *",
    validationSchema: Yup.string().required("Floors is required"),
    initialValue: "",

    required: true,
  },

  {
    key: "11",
    name: "agency ",
    type: "text",
    placeholder: "BuyerAgencyCompensation",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "BuyerAgencyCompensation*",
    validationSchema: Yup.string().required("Style  is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "built",
    type: "number",
    placeholder: "TransactionBrokerCompensation",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Year Built*",
    validationSchema: Yup.string().required(
      "TransactionBrokerCompensation Built is required"
    ),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "community",
    type: "text",
    placeholder: "Community",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Community*",
    validationSchema: Yup.string().required("Community is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "SubAgency Compensation",
    type: "text",
    placeholder: "SubAgency Compensation",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "SubAgency Compensation*",
    validationSchema: Yup.string().required(
      "SubAgencyCompensation  is required"
    ),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "11",
    name: "internet",
    type: "text",
    placeholder: "Internet",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Internet*",
    validationSchema: Yup.string().required("Internet  is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "12",
    name: "utilities",
    type: "text",
    placeholder: "Utilities",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Utilities*",
    validationSchema: Yup.string().required("Utilities  is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "13",
    name: "sewer",
    type: "text",
    placeholder: "Sewer",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Sewer*",
    validationSchema: Yup.string().required("Sewer  is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "14",
    name: "water Source:",
    type: "text",
    placeholder: "Sewer",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Water Source:*",
    validationSchema: Yup.string().required("Water Source is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
  {
    key: "14",
    name: "Cooling:",
    type: "text",
    placeholder: "Sewer",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Heating & Cooling:*",
    validationSchema: Yup.string().required("Heating & Cooling is required"),
    initialValue: "",

    // icon: <AddLocationAlt />,
    required: true,
  },
];
export default EditOtherInformationSchema;
