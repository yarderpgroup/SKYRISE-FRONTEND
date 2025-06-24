import { Add, Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Collapse, Container } from "@mui/material";
import { InputField } from "components/core";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";

import * as Yup from "yup";

const AddPropertyFormSchema = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "information",
    label: "Add Information*",
    placeholder: "Add Information ",
    styleContact: "rounded-lg",

    type: "text",
    validationSchema: Yup.string().required("Information required"),

    initialValue: "",

    required: true,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
];
const AddExteriorForm = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "information",
    label: "Add Information*",
    placeholder: "Add Information ",
    styleContact: "rounded-lg",

    type: "text",
    validationSchema: Yup.string().required("Information required"),

    initialValue: "",

    required: true,
    contactField: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
    },
  },
];
const Exterior = () => {
  const [isTenantsOpen, setIsTenantsOpen] = useState(true);
  const [isCount, setIsCount] = useState(0);
  const buttonRef = useRef<any>(null);
  const [isActive, setIsActive] = useState(false);
  const [isDetailsOPen, setIsDetailsOpen] = useState(false);

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
                </div>
                <div>
                  <Collapse in={isDetailsOPen}>
                    <div className="grid grid-cols-4 gap-4 w-full justify-center items-center py-5 ">
                      {AddExteriorForm?.map((inputItem) => (
                        <>
                          <div className=" flex flex-col gap-1">
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
                      <div className="pt-7">
                        <div className="flex gap-2 cursor-pointer justify-center items-center w-full tracking-wider font-bold text-base h-10 rounded-full  text-white bg-blue-600 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border">
                          <Add className="" />
                          <button className="">Add More</button>
                        </div>
                      </div>
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
                  </Collapse>
                </div>
              </Form>
            )}
          </Formik>
          <div className="py-5">
            <div
              onClick={() => setIsDetailsOpen(!isDetailsOPen)}
              className="flex gap-2 cursor-pointer justify-center items-center w-44 tracking-wider font-bold text-base h-10 rounded-full  text-white bg-blue-600 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border"
            >
              <Add className="" />
              <button className="">Add Details</button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Exterior;
