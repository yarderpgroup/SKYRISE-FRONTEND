import { Container, TextFieldProps } from "@mui/material";
import { InputField } from "components/core";
import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
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
        id: 2,
        label: "Virtual",
        value: "Virtual",
      },
      {
        id: 3,
        label: "Offline",
        value: "Offline",
      },
    ],
    required: true,
  },
];

const PropertyVisitForm = () => {
  const [isTenantsOpen, setIsTenantsOpen] = useState(true);
  const [isCount, setIsCount] = useState(0);
  const buttonRef = useRef<any>(null);
  const [isActive, setIsActive] = useState(false);

  const handleTenants = () => {
    buttonRef?.current && buttonRef?.current.click();
  };
  const handleSend = async (values: any) => {};
  const handleChange = () => {
    handleTenants();
    setIsCount((prev) => prev + 1);
    setIsTenantsOpen(false);
    setIsActive(true);
  };

  const initialValues = AddPropertyFormSchema.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );
  const validationSchema = AddPropertyFormSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  return (
    <Container
      maxWidth="xl"
      // style={{
      //   width: '40vw',
      //   marginTop: '5vh',
      // }}
    >
      <div className="py-8 bg-white">
        <div className="w-full  flex flex-col items-center justify-center ">
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
          >
            {(formik) => (
              <Form className=" grid grid-cols-4 gap-4 w-full justify-center items-center">
                {AddPropertyFormSchema.map((inputItem) => (
                  <Field name={inputItem.name} key={inputItem.key}>
                    {(props: {
                      meta: { touched: any; error: any };
                      field: JSX.IntrinsicAttributes & TextFieldProps;
                    }) => (
                      <div className={`flex flex-col justify-center gap-2`}>
                        <div className="font-semibold text-themeDarkGray">
                          {inputItem.label}
                        </div>
                        <div className="col-span-6 w-full">
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
        {/* <div className=" w-full  ">
          <Formik
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
            enableReinitialize
            initialValues={initialValues}
          >
            {(formik) => (
              <Form>
                <div className="grid grid-cols-4 gap-4 w-full justify-center items-center justify-items-center  ">
                  {AddPropertyFormSchema?.map((inputItem) => (
                    <>
                      <div className="w-full flex flex-col gap-1">
                        <p className="text-themeDarkGray font-bold text-xl">
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
                    </>
                  ))}
                </div>

                <div>
                 
                </div>
              </Form>
            )}
          </Formik>
        </div> */}
      </div>
    </Container>
  );
};

export default PropertyVisitForm;
