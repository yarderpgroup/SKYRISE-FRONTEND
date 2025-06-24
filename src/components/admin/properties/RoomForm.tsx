import { Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Container } from "@mui/material";
import { InputField } from "components/core";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";

import * as Yup from "yup";

const AddPropertyFormSchema = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "roomType",
    label: "Room Type *",
    placeholder: "Room Type  ",
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
    name: "floor",
    label: "Floor*",
    placeholder: "Floor",
    styleContact: "rounded-lg",

    validationSchema: Yup.string().optional(),
    type: "text",
    initialValue: "",

    required: true,
  },
];

const RoomForm = () => {
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
      <div className="">
        <div className="  w-full   ">
          <Formik
            validationSchema={Yup.object(validationSchema)}
            onSubmit={handleSend}
            enableReinitialize
            initialValues={initialValues}
          >
            {(formik) => (
              <Form>
                <div className="grid grid-cols-4 gap-4 w-full ">
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
                          //   options={inputItem.options.map((item)=> item?.value)}
                          type={inputItem?.type}
                          placeholder={inputItem?.placeholder}
                        />
                      </div>
                    </>
                  ))}
                  <div className=" pt-7 flex flex-row justify-center items-center ">
                    <LoadingButton
                      className="btn-background rounded-xl !w-full p-3 text-base !bg-theme cursor-pointer"
                      ref={buttonRef}
                      variant="contained"
                      type="submit"
                      fullWidth
                      disabled={formik.isSubmitting || !formik.isValid}
                      loading={formik.isSubmitting}
                      loadingPosition="start"
                      startIcon={<Done />}
                    >
                      Save
                    </LoadingButton>
                  </div>
                </div>

                <div></div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default RoomForm;
