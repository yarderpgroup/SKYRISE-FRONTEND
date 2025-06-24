import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import ImageSlider from "./ImageSlider";

interface Props {
  activeData?: any;
}
export const PriceAndSale_Arr = [
  {
    id: "1",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "2",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "3",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "4",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "5",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "6",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "7",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "8",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "9",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "10",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
  {
    id: "11",
    date: "Dec 8, 2022",
    message: "Price Changed",
    amount: "$589,000",
  },
];
const SaleAndTaxHistory = ({ activeData }: Props) => {
  const [value, setValue] = useState("1");
  const [openDialog, setOpenDialog] = useState(false);
  const [isContinue, setIsContinue] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <section
      className="flex flex-col w-full gap-3 text-themeDarkGray"
      id="sale"
    >
      <p className="text-xl font-semibold">
        Sale and Tax History for 84R Salem St
      </p>
      <div className="flex w-full flex-col border p-5 border-primaryBorder rounded-lg">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label={
                  <div className="font-semibold text-themeDarkGray">
                    Sale History
                  </div>
                }
                value="1"
              />
              <Tab
                label={
                  <div className="font-semibold text-themeDarkGray">
                    Tax History
                  </div>
                }
                value="2"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="flex gap-2">
              <div>
                <Stepper orientation="vertical">
                  {PriceAndSale_Arr.map((step, index) => (
                    <Step
                      key={step.id}
                      sx={{
                        "& .MuiStepLabel-root .Mui-completed": {
                          color: "#D9117B !important", // circle color (COMPLETED)
                        },
                        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                          {
                            color: "#D9117B !important", // Just text label (COMPLETED)
                          },
                        "& .MuiStepLabel-root .Mui-active": {
                          color: "#D9117B !important", // circle color (ACTIVE)
                        },
                        "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                          {
                            color: "#fff !important", // Just text label (ACTIVE)
                          },
                        "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                          fill: "#fff !important", // circle's number (ACTIVE)
                        },
                        my: 1,
                      }}
                    >
                      <StepLabel></StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>
              <div className="w-full flex flex-col gap-8">
                {PriceAndSale_Arr.map((item) => (
                  <div key={item.id} className="w-full grid grid-cols-11 gap-4">
                    <div className="col-span-3 flex flex-col">
                      <div className="w-fit">
                        <p>{item.date}</p>
                        <p>Date</p>
                      </div>
                    </div>
                    <div className="col-span-5 flex flex-col items-center">
                      <div className="w-fit">
                        <p>{item.message}</p>
                        <p>MLS PIN #73044950</p>
                      </div>
                    </div>
                    <div className="col-span-3 flex flex-col items-end">
                      <div className="w-fit">
                        <p>{item.amount}</p>
                        <p>Price</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-12 w-full gap-5 pt-8">
              {activeData?.images?.slice(0, 4)?.map((item: any) => (
                <div
                  className={`flex col-span-3 items-center rounded-lg overflow-hidden h-28 object-cover ${
                    item?.id === 14 ? "relative " : ""
                  }`}
                >
                  {item?.id === 14 && (
                    <div className="absolute w-full h-full bg-[#00000064] flex items-center justify-center text-2xl text-white">
                      + {activeData?.images?.length}
                    </div>
                  )}
                  <img
                    src={item.url}
                    onClick={() => setOpenDialog(!openDialog)}
                    alt="images"
                    className={`w-full h-full object-cover cursor-pointer`}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-8 text-base  pt-6 text-center">
              <p className="text-center w-full">
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
                className="text-theme cursor-pointer font-semibold text-base w-full text-left"
              >
                {isContinue ? "Show Less" : " Continue reading"}
              </p>
            </div>
          </TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
        </TabContext>
      </div>
      {/* <ImageSlider

        activeData={activeData}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
      /> */}
    </section>
  );
};

export default SaleAndTaxHistory;
