import * as Yup from "yup";

const AddDocumentSchema = [
  {
    key: "9",
    name: "id",
    type: "file",
    placeholder: "Id doc",
    styleContact: "rounded-lg",
    button: "  Same as above",
    label: "Id doc *",
    validationSchema: Yup.string().required("Id doc is required"),
    initialValue: "",

    required: true,
  },

  {
    key: "10",
    name: "lease",
    type: "file",
    placeholder: "Lease Document",
    button: "  Same as above",
    styleContact: "rounded-lg",
    label: "Lease Document *",
    validationSchema: Yup.string().required("Lease Document is required"),
    initialValue: "",

    required: true,
  },
];
export default AddDocumentSchema;
