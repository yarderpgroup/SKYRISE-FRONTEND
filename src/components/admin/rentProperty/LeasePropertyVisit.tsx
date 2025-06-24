import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Stepper from "@mui/material/Stepper";
import { Fragment, useState } from "react";
import { LeaserInfo } from ".";
import {
  AttachmentDetails,
  Clauses,
  ContactDetails,
  Disclosures,
  LeaseTerm,
  RentDepositDetails,
  RulesDetails,
} from "../LeaseBasic";
import OptionsDetails from "../LeaseBasic/OptionsDetails";
const steps = [
  "Lease Term",
  "Rent Deposit&Fee",
  "Options",
  "Clauses",
  "Rules",
  "Disclosures",
  "Attachments",
  "Lessor",
  "Leaser Info",
];

export default function LeasePropertyVisit() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleSend = async (values: any) => {};

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <div className="w-full py-5 ">
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              <div className="!text-base !text-themeDarkGray !font-bold">
                {label}
              </div>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div className="w-full ">
        <Fragment>
          {/* <div className="">{activeStep === 0 && <LeaseTerm />}</div>
          <div className="">{activeStep === 1 && <RentDepositDetails />}</div>
          <div className="">{activeStep === 2 && <OptionsDetails />}</div>
          <div className="">{activeStep === 3 && <Clauses />}</div>
          <div className="">{activeStep === 4 && <RulesDetails />}</div>
          <div className="">{activeStep === 5 && <Disclosures />}</div>
          <div className="">{activeStep === 6 && <AttachmentDetails />}</div>
          <div className="">{activeStep === 7 && <ContactDetails />}</div>
          <div className="">{activeStep === 8 && <LeaserInfo />}</div> */}
          {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}> */}
          <div className="flex justify-start ">
            {/* <div
              color="inherit"
             
              onClick={handleBack}
             
            >
              Back
            </div> */}
            {/* <Box sx={{ flex: "1 1 auto" }} /> */}
            <div onClick={handleNext} className="">
              <button className="  w-44 tracking-wider font-bold text-base h-10 rounded-full  text-white gradientButton  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] border py-2">
                Continue
              </button>
            </div>
            {/* </Box> */}
          </div>
        </Fragment>
      </div>
    </div>
  );
}
