import { Close, Info } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import CustomInput from "../common/CustomInput";
import RangeSlider from "../core/RangeSlider";

type LoanType = {
  id: string;
  title: string;
};
interface Props {
  curElm: {
    title?: string;
    id?: string;
    amount?: string;
    icon?: JSX.Element;
    interest?: string;
    total?: string;
    year?: string;
    loanType?: LoanType[];
  };
  setActivePlan?: any;
}

const CalculatorCard = ({ curElm, setActivePlan }: Props) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 250000]);
  const handelPriceChange = (price: number[]) => {
    setPriceRange(price);
  };
  const handleClose = () => {
    setActivePlan(null);
  };
  return (
    <div className="flex flex-col w-full z-20">
      {curElm.title === "Down Payment" && (
        <div className="flex flex-col p-5 gap-5">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-themeDarkGray">
              {curElm.title}
            </p>
            <Close
              onClick={handleClose}
              className="!text-2xl text-themeDarkGray !z-[999]"
            />
          </div>
          <p className="flex text-lg gap-2 text-themeDarkGray items-center">
            Cash <Info />
          </p>
          <div className="flex">
            <RangeSlider
              setValue={(priceRange: number[]) => handelPriceChange(priceRange)}
              value={priceRange}
              bothValue={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-themeDarkGray">Have a home to sell?</p>
            <div className="w-full py-2 flex items-center justify-center text-center bg-primaryBorder/30 text-themeDarkGray rounded-lg text-sm font-semibold">
              Add my home equity
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-themeDarkGray w-full items-center">
              <p>Cash</p>
              <p>{curElm.total}</p>
            </div>
            <div className="flex justify-between text-sm text-themeDarkGray w-full items-center">
              <p>Total Down:</p>
              <p>{curElm.amount}</p>
            </div>
          </div>
        </div>
      )}
      {curElm.title === "Home Price" && (
        <div className="flex flex-col w-full gap-5">
          <div className="w-full flex flex-col p-5 gap-5">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-themeDarkGray">
                {curElm.title}
              </p>
              <Close
                onClick={handleClose}
                className="!text-2xl text-themeDarkGray !z-[999]"
              />
            </div>
            <RangeSlider
              setValue={(priceRange: number[]) => handelPriceChange(priceRange)}
              value={priceRange}
            />
          </div>
          <div className="w-full bg-themeDarkGray/20 py-3">
            <p className="flex items-center justify-center text-themeDarkGray text-sm text-center w-full">
              Find out the main costs involved in a home purchase in our Home
              Buying Guide.
            </p>
          </div>
        </div>
      )}
      {curElm.title === "Loan Details" && (
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col p-5 gap-5">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-themeDarkGray">
                {curElm.title}
              </p>
              <Close
                onClick={handleClose}
                className="!text-2xl text-themeDarkGray !z-[999]"
              />
            </div>
            <div>
              <input
                type="search"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-black-600 focus:outline-none focus:shadow-outline-black active:text-gray-800 active:bg-white"
                defaultValue={curElm.interest}
              />
            </div>
            <div className="w-full flex gap-2 text-themeDarkGray items-center">
              <p className="text-xl font-semibold">Loan Type</p>
              <Info />
            </div>
            <div className="flex w-full">
              <FormControl>
                {curElm?.loanType?.map((item) => (
                  <RadioGroup key={item.id} defaultValue={curElm.year}>
                    <FormControlLabel
                      value={item.title}
                      control={<Radio />}
                      label={item.title}
                    />
                  </RadioGroup>
                ))}
              </FormControl>
            </div>
          </div>
          <div className="w-full bg-themeDarkGray/20 py-3">
            <p className="flex items-center justify-center text-themeDarkGray text-sm text-center w-full">
              Be ready to make an offer when you find the perfect home. Learn
              more about pre-approval.
            </p>
          </div>
        </div>
      )}
      {curElm.title === "Advanced Options" && (
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-col p-5 gap-5">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-themeDarkGray">
                {curElm.title}
              </p>
              <Close
                onClick={handleClose}
                className="!text-2xl text-themeDarkGray !z-[999]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center text-themeDarkGray">
                <p className="text-sm">Property Taxed</p>
                <Info className="!text-lg -mt-1" />
              </div>
              <div className="flex items-center w-full overflow-hidden">
                <CustomInput
                  className="border-l border-t border-b rounded-l-md border-primaryBorder"
                  defaultValue={curElm.total}
                />
                <CustomInput
                  className="border border-primaryBorder rounded-r-md"
                  defaultValue={curElm.interest}
                />
              </div>
            </div>{" "}
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center text-themeDarkGray">
                <p className="text-sm">HOA Dues</p>
                <Info className="!text-lg -mt-1" />
              </div>
              <div className="flex items-center w-full overflow-hidden">
                <CustomInput
                  className="border-l border-t border-b rounded-l-md border-primaryBorder"
                  defaultValue={curElm.total}
                />
                <CustomInput
                  className="border border-primaryBorder rounded-r-md"
                  defaultValue={curElm.interest}
                />
              </div>
            </div>{" "}
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 items-center text-themeDarkGray">
                <p className="text-sm">Homeowners' Insurance</p>
                <Info className="!text-lg -mt-1" />
              </div>
              <div className="flex items-center w-full overflow-hidden">
                <CustomInput
                  className="border-l border-t border-b rounded-l-md border-primaryBorder"
                  defaultValue={curElm.total}
                />
                <CustomInput
                  className="border border-primaryBorder rounded-r-md"
                  defaultValue={curElm.interest}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-themeDarkGray/20 py-3">
            <p className="flex items-center justify-center text-themeDarkGray text-sm text-center w-full">
              Policygenius has saved customers an average of $350 per year.
              Compare Insurance Quotes
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorCard;
