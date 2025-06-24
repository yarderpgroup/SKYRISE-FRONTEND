import PublicLayout from "../../layouts/publicLayout";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import {
  OfferOne,
  OfferTwo,
  OfferThree,
  OfferFour,
  StepOne,
  StepThree,
  StepFour,
} from "../../assets/staticImages";
import Link from "next/link";

const steps = [
  {
    id: 1,
    stepCount: "Step 1",
    question: "Before we get started, have you seen this home in person?",
    type: "checkbox",
    image: StepOne.src,
    checkQuestion: [
      {
        id: "11",
        title: "Yes, I have",
        subtitle: "",
        img: "",
      },
      {
        id: "12",
        title: "No, I haven't",
        subtitle: "",
        img: "",
      },
    ],
  },
  {
    id: 2,
    stepCount: "Step 2",
    image: "",
    question: "Okay! Here's what to expect:",
    checkQuestion: [
      {
        id: "21",
        title: "Tell us about yourself",
        subtitle: "Answer three quick questions online.",
        img: OfferOne.src,
      },
      {
        id: "22",
        title: "Talk to a SKYRISE Agent",
        subtitle:
          "A local buyer’s agent will reach out to discuss the offer you have in mind",
        img: OfferTwo.src,
      },
      {
        id: "23",
        title: "Develop a game plan",
        subtitle:
          "If you choose to work with us, your buyer’s agent will represent you and write your official offer.",
        img: OfferThree.src,
      },
      {
        id: "24",
        title: "Finalize the details",
        subtitle:
          "Your agent will do all the paperwork and negotiate on your behalf.",
        img: OfferFour.src,
      },
    ],
  },
  {
    id: 3,
    image: StepThree.src,
    stepCount: "Step 3",
    question: "Do you have an offer price in mind?",
    label:
      "Nothing you enter here is final. You and your agent will determine what’s best for you.",
    type: "checkbox",
    checkQuestion: [
      {
        id: "31",
        title: "Yes, I do",
        subtitle: "",
        img: "",
      },
      {
        id: "32",
        title: "No, I'll decide with my SKYRISE Agent",
        subtitle: "",
        img: "",
      },
    ],
  },
  {
    id: 4,
    stepCount: "Step 4",
    image: StepFour.src,
    question: "How do you plan to pay for this home?",
    label:
      "Nothing you enter here is final. You and your agent will determine what’s best for you.",
    type: "checkbox",
    checkQuestion: [
      {
        id: "41",
        title: "Loan",
        subtitle: "",
        img: "",
      },
      {
        id: "42",
        title: "I'll decide with my SKYRISE Agent",
        subtitle: "",
        img: "",
      },
      {
        id: "43",
        title: "All cash",
        subtitle: "",
        img: "",
      },
    ],
  },
];

const StartOffer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [activeValue, setActiveValue] = useState("");
  const [activeImage, setActiveImage] = useState<any>(1);
  const handleNext = (ID: any) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setActiveImage(ID + 1);
  };
  return (
    <PublicLayout title="Schedule a Tour | Real Estate">
      <section className="w-full flex flex-col">
        <div className="custom-container flex flex-col justify-between gap-5 w-full py-3 md:py-10">
          <div className="md:border-b border-primaryBorder text-themeDarkGray items-center h-fit md:h-28 flex gap-5">
            {/* {Feature_Property?.slice(0, 1).map((item) => (
              <section key={item.id}>
                <div className="md:flex hidden gap-12 text-themeDarkGray items-center ">
                  <div className="sm:px-2">
                    <img
                      src={item.image}
                      alt="image"
                      className="w-36 h-20 rounded-md overflow-hidden"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg tracking-wide font-semibold sm:text-base">
                      {item.propertyName}
                    </p>
                    <p className="text-sm">{item.location}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold sm:text-sm">
                      $ {item.price}
                    </p>
                    <p className="text-sm">Price</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold sm:text-base">3</p>
                    <p className="text-sm">Beds</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold sm:text-base">2</p>
                    <p className="text-sm">Baths</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold sm:text-sm">1851</p>
                    <p className="text-sm">Sq. ft</p>
                  </div>
                </div>
                <div className="flex md:hidden flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <img src={item.image} alt="" />
                    <div className="flex flex-col">
                      <p className="text-base font-semibold">
                        {item.propertyName}
                      </p>
                      <p className="text-sm">{item.location}</p>
                    </div>{" "}
                  </div>
                  <div className="flex gap-10 w-full">
                    <div className="flex flex-col">
                      <p className="font-semibold ">{item.price}</p>
                      <p className="text-sm">price</p>
                    </div>{" "}
                    <div className="flex flex-col">
                      <p className="font-semibold">3</p>
                      <p className="text-sm">Beds</p>
                    </div>{" "}
                    <div className="flex flex-col">
                      <p className="font-semibold">2</p>
                      <p className="text-sm">Baths</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold">1820</p>
                      <p className="text-sm">Sq. ft.</p>
                    </div>
                  </div>
                </div>
              </section>
            ))} */}
          </div>
          <div className="w-full flex relative">
            <Stepper
              sx={{ width: "100%" }}
              activeStep={activeStep}
              orientation="vertical"
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.stepCount}</StepLabel>
                  <StepContent>
                    <Typography>
                      <div className="flex w-full gap-2 md:gap-5 text-themeDarkGray relative">
                        <div className="flex w-full z-20 flex-col gap- md:gap-5">
                          <div className="w-full flex flex-col">
                            <div className="flex flex-col gap-2">
                              {/* <p className="text-sm">{step.stepCount}</p> */}
                              <p className="md:text-lg text-sm font-semibold">
                                {step.question}
                              </p>
                              <p className="text-sm">{step.label}</p>
                            </div>
                            {step.type === "checkbox" ? (
                              <div className="flex md:gap-5">
                                <div className="w-full">
                                  <FormGroup>
                                    {step.checkQuestion?.map((item) => (
                                      <FormControlLabel
                                        control={
                                          <Checkbox
                                            checked={activeValue === item.title}
                                            onChange={() =>
                                              setActiveValue(item.title)
                                            }
                                            name={item.title}
                                          />
                                        }
                                        label={item.title}
                                      />
                                    ))}
                                  </FormGroup>
                                </div>
                              </div>
                            ) : (
                              <div className="w-full pt-5 md:pt-0 md:py-5 items-center justify-between grid grid-cols-12">
                                {step.checkQuestion.map((item) => (
                                  <div
                                    className="w-full px-5 md:p-0 text-center col-span-10 md:col-span-3 items-center md:justify-start h-36 md:h-28 gap-3 md:gap-2 flex flex-col"
                                    key={item.id}
                                  >
                                    <div className="h-1/3 md:h-auto">
                                      <img src={item.img} alt="" />
                                    </div>
                                    <div className="flex flex-col text-center">
                                      <p className="md:text-lg text-sm font-semibold">
                                        {item.title}
                                      </p>
                                      <p className="md:text-sm leading-4 text-xs">
                                        {item?.subtitle}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="py-2 md:py-5">
                            {step.id === 4 ? (
                              <Link href={`/checkout/${step.id}`}>
                                <button className="text-white py-2 w-32 gradientButton rounded-md">
                                  Next
                                </button>
                              </Link>
                            ) : (
                              <button
                                className="text-white py-2 w-32 gradientButton rounded-md"
                                onClick={() => handleNext(step.id)}
                              >
                                Next
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {steps.map((item) => (
              <div className={`hidden md:flex`}>
                {item.id === activeImage && (
                  <img src={item?.image} alt="" className="w-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default StartOffer;
