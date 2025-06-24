import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { inspectionArr } from ".";

const beforeMoveInArr = [
  {
    id: "1",
    title: "Review and Sign Lease",
    description: "",
  },
  {
    id: "2",
    title: "Pay first month's rent",
    description:
      "Pay your first month's rent using either your bank account or credit card.",
  },
  {
    id: "3",
    title: "Coordinate move in and key exchanges",
    description:
      "Coordinate the official move in date and time with your landlord and when/where you can pickup the keys.",
  },

  {
    id: "4",
    title: "Complete move-in inspection checklist",
    description:
      "Protect your security key and avoid fees by completing this property inspection checklist on move-in-day.",
  },
];

const questionArr = [
  {
    id: 1,
    question: "Credit",
    description:
      "Include credit score , derogatory items, account summaries, and tradeline information",
  },
  {
    id: 2,
    question: "Criminal Background",
    description:
      "Include federal watch list, state reports, national sex offender registry.",
  },
  {
    id: 3,
    question: "Eviction",
    description:
      "Include eviction date , description and summary judgement, and offender name and location across all state.",
  },
];

const InspectionDetails = () => {
  const router = useRouter().query?.inspectionID;
  const [activeData, setActiveData] = useState<any>();
  useEffect(() => {
    const data = inspectionArr.find((item) => item.id === router);
    setActiveData(data);
  });
  return (
    <TenantLayout title={activeData?.title} headerText={activeData?.title}>
      <div className="w-full px-3 md:px-5 py-5 md:py-10 bg-white md:min-h-[calc(100vh-4.5rem)] text-themeDarkGray flex flex-col gap-5">
        <div className="w-full flex flex-col gap-5">
          <p className="text-lg font-semibold">
            Select Options for screening report
          </p>
          <div className="flex flex-col md:w-2/3 w-full gap-5 md:gap-7">
            {questionArr.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-col md:flex-row justify-between md:items-center "
              >
                <div className="flex flex-col w-full md:w-4/5">
                  <p className="md:text-lg text-base font-semibold">
                    {item.question}
                  </p>
                  <p className="text-sm w-full">{item.description}</p>
                </div>
                <div className="md:w-1/5 w-full">
                  <FormControl>
                    <RadioGroup row>
                      <FormControlLabel
                        value="yes"
                        control={
                          <Radio
                            sx={{
                              color: "#999999",
                              "&.Mui-checked": {
                                color: "#3b5998",
                              },
                            }}
                          />
                        }
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={
                          <Radio
                            sx={{
                              color: "#999999",
                              "&.Mui-checked": {
                                color: "#E33324",
                              },
                            }}
                          />
                        }
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default InspectionDetails;
