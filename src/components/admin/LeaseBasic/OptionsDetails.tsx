import {
  Collapse,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { post } from "api";
import { InputField, RippleLoadingButton } from "components/core";
import { Router, useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const otherPolicyArr = [
  {
    id: 1,
    heading: "Pet Policy",
    options: [
      {
        id: 14,
        description: "Pets are allowed but there is a deposit.",
        price: true,
        date: false,
      },
      {
        id: 13,
        description: "Pets are allowed but there is a one time fee.",
        price: true,
        date: false,
      },
      {
        id: 15,
        description:
          "Pets are allowed but there is a an additional monthly charge per pet.",
        price: false,
        date: false,
      },
    ],
  },
];

const OptionsDetails = () => {
  const AddBankSchema = [
    {
      key: "2",
      name: "fee",
      label: "Fee",
      placeholder: "Fee",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "number",
      validationSchema: Yup.string().required("Title is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-12 md:col-span-12",
    },
  ];
  const initialValues = AddBankSchema.reduce((accumulator, currentValue) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);
  const validationSchema = AddBankSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [isDetailsOPen, setIsDetailsOpen] = useState(false);
  const [openSmoking, setOpenSmoking] = useState(false);
  const [openPet, setOpenPet] = useState<any>();
  const [openMonth, setOpenMonth] = useState(false);
  const [openInsurance, setOpenInsurance] = useState(false);
  const [openSetup, setOpenSetup] = useState(false);
  const [openFees, setOpenFees] = useState<any>();
  // onChange(e)=> setFees(e.target.value)
  const router = useRouter();
  const ID = router?.query?.management;
  const tenantId: any = router?.query?.tenant;
  let isArray = Array.isArray(tenantId);

  let tenant = "";
  if (isArray) {
    tenantId?.forEach((item: any, i: number) => {
      if (i === 0) {
        tenant = "?tenant=" + item;
      } else {
        tenant += `&tenant=${item}`;
      }
    });
  } else {
    tenant = "?tenant=" + tenantId;
  }
  const handleChose = async (Data: any) => {
    setIsStatusLoading(true);
    try {
      const formData = new FormData();
      formData.append("smokingPolicy", openSmoking as any);
      formData.append("monthToMonth", openMonth as any);
      formData.append("renterInsurance", openInsurance as any);
      formData.append("petFee", openFees as any);
      formData.append("petTitle", openPet?.description);

      formData.append("propertyId", ID as any);
      if (isArray) {
        tenantId?.map((item: any) => formData?.append("tenantId", item));
      } else {
        formData?.append("tenantId", tenantId);
      }
      const response = await post({
        path: `lease/add/lease-options`,
        isImage: true,
        isAlert: true,
        body: formData,
      });

      setIsStatusLoading(false);
      router.push(`/panel/admin/rent/${ID}/lease-details/clauses${tenant}`);
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
    }
  };
  return (
    <div className="">
      <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] px-4 py-4 rounded-lg">
        <h1 className="text-xl font-bold text-themeDarkGray">Options</h1>

        {/* for options */}
        <div className="pt-3">
          <div className="flex flex-col">
            <h1 className="text-base text-themeDarkGray font-bold">
              Smoking Policy
            </h1>
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  value={openSmoking}
                  onChange={() => setOpenSmoking(!openSmoking)}
                  control={
                    <Radio
                      sx={{
                        color: "#999999",
                        "&.Mui-checked": {
                          color: "#3b5998",
                        },
                      }}
                      checked={openSmoking}
                    />
                  }
                  label="Smoking is not allowed in the unit"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base text-themeDarkGray font-bold">
              Month to Month
            </h1>
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  value={openMonth}
                  onChange={() => setOpenMonth(!openMonth)}
                  control={
                    <Radio
                      sx={{
                        color: "#999999",
                        "&.Mui-checked": {
                          color: "#3b5998",
                        },
                      }}
                      checked={openMonth}
                    />
                  }
                  label="Allow lease to become a month to month agreement at the end of lease term"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="flex flex-col">
            <h1 className="text-base text-themeDarkGray font-bold">
              Require Renters Insurance
            </h1>
            <FormControl>
              <RadioGroup>
                <FormControlLabel
                  value={openInsurance}
                  onChange={() => setOpenInsurance(!openInsurance)}
                  control={
                    <Radio
                      sx={{
                        color: "#999999",
                        "&.Mui-checked": {
                          color: "#3b5998",
                        },
                      }}
                      checked={openInsurance}
                    />
                  }
                  label="Require tenants to provide proof of tenters insurance before move in ."
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {otherPolicyArr?.map((item) => (
          <div key={item?.id} className="flex flex-col">
            <h1 className="text-themeDarkGray font-bold text-xl">
              {item?.heading}
            </h1>

            <FormControl>
              <RadioGroup>
                {item?.options?.map((innerItem: any) => (
                  <div>
                    <FormControlLabel
                      onChange={() => setOpenPet(innerItem)}
                      value={openPet}
                      control={
                        <Radio
                          sx={{
                            color: "#999999",
                            "&.Mui-checked": {
                              color: "#3b5998",
                            },
                          }}
                          checked={openPet?.id === innerItem.id}
                        />
                      }
                      label={<div>{innerItem?.description}</div>}
                    />
                    <div>
                      <Collapse in={innerItem.id === openPet?.id}>
                        <div className="w-full">
                          <TextField
                            id="outlined-error-helper-text"
                            label="Fees"
                            defaultValue="Fees"
                            type="number"
                            className="w-full"
                            onChange={(e: any) => setOpenFees(e.target.value)}
                          />
                        </div>
                      </Collapse>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        ))}
        <div className="flex items-center col-span-12  justify-center flex-col gap-2 py-8">
          <RippleLoadingButton
            type="submit"
            title="Save & Continue"
            className="w-full"
            loading={isStatusLoading}
            handleClick={handleChose}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionsDetails;
