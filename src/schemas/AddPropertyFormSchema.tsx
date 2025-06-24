import * as Yup from "yup";

const AddPropertyFormSchema = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "property",
    label: "Select Property *",
    placeholder: "Select Property ",
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
    key: "4",
    name: "startDate",
    label: "Start Date*",
    placeholder: "StartDate",
    styleContact: "rounded-lg",

    validationSchema: Yup.string().optional(),
    type: "date",
    initialValue: "",

    required: true,
  },

  {
    key: "7",
    name: "endDate",
    label: "End Date*",
    type: "date",
    validationSchema: Yup.string().required("Rented Till is required"),
    styleContact: "rounded-lg",

    initialValue: "",
    placeholder: "End Date",

    required: true,
  },
  {
    key: "7",
    name: "type",
    label: "Type*",
    type: "select",
    validationSchema: Yup.string().required("Rented Till is required"),
    styleContact: "rounded-lg",

    initialValue: "",
    placeholder: "Type",
    options: [
      {
        category: "UPCOMING",
        value: "UPCOMING",
        key: "4.1",
      },
      {
        category: "COMPLETED",
        value: "COMPLETED",
        key: "4.2",
      },
    ],
    required: true,
  },
];
export default AddPropertyFormSchema;
