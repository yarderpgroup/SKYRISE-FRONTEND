import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Collapse, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import { PriceAndSale_Arr } from "../propertyDetails/SaleAndTaxHistory";

interface Props {
  activeData?: any;
}
const SaleHistoryResponsive = ({ activeData }: Props) => {
  const [isSaleOpen, setIsSaleOpen] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  return (
    <div className="flex flex-col text-themeDarkGray border-b border-primaryBorder w-full overflow-hidden">
      <div
        className="flex justify-between  w-full py-4"
        onClick={() => setIsSaleOpen(!isSaleOpen)}
      >
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold">Sale and Tax History</p>
          <p className="text-sm">Details will be added when we have them</p>
        </div>
        <div className="flex items-center common-transition">
          {!isSaleOpen ? (
            <KeyboardArrowDown className="!text-4xl" />
          ) : (
            <KeyboardArrowUp className="!text-4xl" />
          )}
        </div>
      </div>
      <Collapse in={isSaleOpen} timeout="auto" unmountOnExit>
        <div className="flex w-full flex-col py-3 gap-5">
          <div className="w-full flex flex-col gap-8">
            {PriceAndSale_Arr.map((item) => (
              <div key={item.id} className="w-full grid grid-cols-11 gap-4">
                <div className="col-span-3 flex flex-col">
                  <div className="w-fit text-sm">
                    <p>{item.date}</p>
                    <p>Date</p>
                  </div>
                </div>
                <div className="col-span-5 flex flex-col items-center">
                  <div className="w-fit text-sm">
                    <p>{item.message}</p>
                    <p>MLS PIN #73044950</p>
                  </div>
                </div>
                <div className="col-span-3 flex flex-col items-end">
                  <div className="w-fit text-sm">
                    <p>{item.amount}</p>
                    <p>Price</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-base pt-6 text-left">
            <p className="text-left w-full">
              {`Listing provided courtesy of Multiple Listing Service Property
                Information Network (MLSPIN) - Boston Area MLS`}
            </p>
            {isContinue ? (
              <p className="text-left w-full">{`nvestors/ Home Buyer with a tool belt take note!! Convenient location in WOBURN with all the big ticket items completed! New Roof 2014, New WEIL-McLAIN Furnace 2016 and many Replacement Windows. 3 Bedroom 1.5 Bath home with over 1800 sqft. of living space. First level includes Kitchen, Living Room, Family Room and Main Bedroom with Bath along with a large enclosed front porch. Two additional Bedrooms and full bath complete the second level. Full Basement partially finished with a Laundry area, work bench, 1/4 bathroom and great storage space. This property shares a driveway with 84 and has a very private backyard with 2 storage sheds. With a little TLC this could be your Dream Home!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, molestiae saepe? Libero autem illum fuga pariatur sapiente perspiciatis, dolor aut, mollitia culpa corrupti vel veritatis, necessitatibus itaque voluptatibus omnis vero?`}</p>
            ) : (
              <p className="text-left w-full">{`nvestors/ Home Buyer with a tool belt take note!! Convenient location in WOBURN with all the big ticket items completed! New Roof 2014, New WEIL-McLAIN Furnace 2016 and many Replacement Windows. 3 Bedroom 1.5 Bath home with over 1800 sqft. of living space. First level includes Kitchen, Living Room, Family Room and Main Bedroom with Bath along with a large enclosed front porch. Two additional Bedrooms and full bath complete the second level. Full Basement partially finished with a Laundry area, work bench, 1/4 bathroom and great storage space. This property shares a driveway with 84 and has a very private backyard with 2 storage sheds. With a little TLC this could be your Dream Home!`}</p>
            )}
            <p
              onClick={() => setIsContinue(!isContinue)}
              className="text-theme cursor-pointer font-semibold text-sm w-full text-left"
            >
              {isContinue ? "Show Less" : " Continue reading"}
            </p>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default SaleHistoryResponsive;
