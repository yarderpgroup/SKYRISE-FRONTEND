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
    name: "description",

    placeholder: "Area",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "text",
    validationSchema: Yup.string().required("Area is Required"),
    initialValue: "",
    multiline: true,
    rows: 4,
  },
];
const AddPricingDescription = ({}) => {
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
      <div className="w-full">
        <h1 className="text-xl text-themeDarkGray font-bold">
          What makes your property unique
        </h1>
        <p className="text-themeGray text-base pt-2">
          Adding description will increase your listing visibility
        </p>
        <Formik
          onSubmit={handleSend}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
        >
          {(formik) => (
            <Form>
              <div className="w-full">
                {AddDetails?.map((inputItem) => (
                  <>
                    <div className="!w-full">
                      <CustomInput
                        size="small"
                        key={inputItem.key}
                        type={inputItem?.type}
                        name={inputItem?.name}
                        multiline={inputItem?.multiline}
                        placeholder={`Description`}
                        rows={inputItem?.rows}
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

export default AddPricingDescription;
