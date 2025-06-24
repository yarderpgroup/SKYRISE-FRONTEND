import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { Form, Formik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { CustomInput } from "../dashboard";

interface Props {
  setSquareFeet: Dispatch<SetStateAction<number[]>>;
  squareFeet: number[];
}

const areaTypeArr = [
  {
    id: 1,
    title: "sq.ft",
  },
  {
    id: 2,
    title: "sq.yards",
  },
  {
    id: 3,
    title: "sq.m",
  },
  {
    id: 4,
    title: "acres",
  },
  {
    id: 5,
    title: "marla",
  },
  {
    id: 6,
    title: "cents",
  },
];
const AddDetails = [
  {
    key: "1",
    // placeholder: 'Enter your name',
    name: "area",
    label: "Add Area Details",
    placeholder: "Area",
    styleContact: "rounded-xl overflow-hidden bg-white ",
    type: "number",
    validationSchema: Yup.string().required("Area is Required"),
    initialValue: "",
    multiline: false,
    required: true,
  },
];
const AreaDetails = ({ setSquareFeet, squareFeet }: Props) => {
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
  const handelPriceChange = (price: number[]) => {
    setSquareFeet(price);
  };
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
              <div className="w-60">
                {AddDetails?.map((inputItem) => (
                  <>
                    <div className="!w-full">
                      <CustomInput
                        size="small"
                        key={inputItem.key}
                        type={inputItem?.type}
                        name={inputItem?.name}
                        multiline={inputItem?.multiline}
                        label={inputItem?.label}
                        placeholder={`Area Details`}
                      />
                    </div>
                  </>
                ))}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <FormControl margin="none" className="w-40 ">
        <InputLabel>Area</InputLabel>
        <Select value={areaType} label="Area" onChange={handleChange}>
          {areaTypeArr.map((item) => (
            <MenuItem value={item.title}>{item.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default AreaDetails;
