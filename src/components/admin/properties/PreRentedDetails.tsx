import { SelectChangeEvent } from "@mui/material";

import { Form, Formik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { CustomInput } from "../dashboard";

interface Props {
  setSquareFeet: Dispatch<SetStateAction<number[]>>;
  squareFeet: number[];
}

const AddDetails = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "month",

    placeholder: "Current rent per month",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Rent is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
];
const AreaDetails = () => {
  const initialValues = AddDetails.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddDetails?.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);

  const handleSend = async (values: any) => {};
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const [areaType, setAreaType] = useState("sq.ft");

  const handleChange = (event: SelectChangeEvent) => {
    setAreaType(event.target.value as string);
  };
  return (
    <div className=" w-full flex gap-3 items-end ">
      <div className="">
        <Formik
          onSubmit={handleSend}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
        >
          {(formik) => (
            <Form>
              <div className="w-full gap-6 grid grid-cols-2">
                {AddDetails?.map((inputItem) => (
                  <>
                    <div className="!w-full">
                      <CustomInput
                        size="small"
                        key={inputItem.key}
                        type={inputItem?.type}
                        name={inputItem?.name}
                        multiline={inputItem?.multiline}
                        placeholder={inputItem?.placeholder}
                      />
                    </div>
                  </>
                ))}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AreaDetails;
