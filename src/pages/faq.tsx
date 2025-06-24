import { Account, Maintenance, RequestCard, Wallet } from "assets/tenant";
import { TenantLayout } from "layouts";
import React from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { WithProtectedTenant } from "hooks";
import PublicLayout from "layouts/publicLayout";
const faqArr = [
  {
    id: 1,
    name: "Account",
    img: RequestCard.src,
    className: "bg-gradient-to-br from-twitter to-facebook",
    title: "Ask a question about your account",
    icon: Account.src,
    questions: [
      {
        id: 1,
        question: "How do I change my password?",
        answer:
          "You can change your password by going to the settings page and clicking on the change password button.",
      },
      {
        id: 2,
        question: "What are the benefits of a premium account?",
        answer:
          "Mainly, you get to enjoy the benefits of a premium account.such as the ability to make payments, request maintenance, and more",
      },
      {
        id: 3,
        question: "Why do I need to verify my account?",
        answer:
          "Most of our services require you to verify your account. This is to ensure that you are the rightful owner of the account.",
      },
    ],
  },
  {
    id: 2,
    name: "Payments",
    className: "bg-gradient-to-br from-youtube to-theme",
    img: Wallet.src,
    title: "Ask a question about your payments",
    icon: Wallet.src,
    questions: [
      {
        id: 1,
        question: "How do I make payment?",
        answer:
          "By going to the payments page and clicking on the make payment button.",
      },
      {
        id: 2,
        question: "what are the payment methods are available?",
        answer:
          "You can make payments using your debit card, credit card, or bank transfer.",
      },
      {
        id: 3,
        question: "Is there a minimum amount I can pay?",
        answer: "yes, the minimum amount you can pay is 1000 naira.",
      },
    ],
  },
  {
    id: 3,
    name: "Maintenance",
    img: Maintenance.src,
    className: "bg-gradient-to-br from-themeDarkGray to-theme",
    title: "Ask a question about maintenance",
    icon: Maintenance.src,
    questions: [
      {
        id: 1,
        question: "How do I make maintenance request?",
        answer:
          "Maintenance requests can be made by going to the maintenance page and clicking on the make request button.",
      },
      {
        id: 2,
        question: "How I send a maintenance request to a specific person?",
        answer:
          "By going to the maintenance page and clicking on the make request button and selecting the owner of the property.",
      },
      {
        id: 3,
        question:
          "How do I know when my maintenance request has been resolved?",
        answer:
          "You will be notified via email when your maintenance request has been resolved.",
      },
    ],
  },
];

const FaqSection = () => {
  const [activeID, setActiveID] = useState<any>({
    id: 1,
    name: "Account",
    img: RequestCard.src,
    className: "bg-gradient-to-br from-twitter to-facebook",
    title: "Ask a question about your account",
    icon: Account.src,
    questions: [
      {
        id: 1,
        question: "How do I change my password?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      },
      {
        id: 2,
        question: "How do I change my password?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      },
      {
        id: 3,
        question: "How do I change my password?",
        answer:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      },
    ],
  });
  return (
    <PublicLayout title="FAQ | Real Estate">
      <div className="flex flex-col w-full gap-6">
        <div className="flex flex-col relative gap-4 w-full text-themeDarkGray h-full">
          <div className="flex flex-col w-full md:h-[40vh] h-[30svh] justify-center text-white items-center faqBgClipPath bg-gradient-to-br from-twitter to-facebook">
            <h1 className="md:text-3xl text-xl font-semibold ">
              Frequently Asked Questions
            </h1>
            <p>How can I help you Today?</p>
          </div>
          <div className="flex w-full absolute items-center cursor-pointer justify-center md:-bottom-24 -bottom-16 z-0 md:gap-6 gap-3 md:p-0 p-4">
            {faqArr.map((faq) => (
              <div
                className={`flex common-transition flex-col md:w-64 w-36 md:h-44 h-22 items-center justify-center  gap-1 p-4 bg-white rounded-lg text-center ${
                  activeID?.id === faq.id
                    ? "shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] scale-[1.03]"
                    : "shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
                }`}
                onClick={() => setActiveID(faq)}
              >
                <div
                  className={`md:w-14 w-10  md:h-14 h-10 rounded-full flex items-center justify-center ${faq.className}`}
                >
                  <img src={faq.img} alt="image" className="md:w-8 w-5" />
                </div>
                <p className="md:text-xl text-sm font-semibold">{faq.name}</p>
                <p className="md:text-sm text-xs md:leading-5 leading-4 md:block hidden ">
                  {faq.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 md:pt-24 pt-14 pb-10 ">
          <div className="flex flex-col w-full items-center justify-center md:gap-2 gap-3">
            <div className="flex flex-col md:w-1/3 w-full md:px-0  px-3 gap-2">
              <p className="md:text-3xl text-xl text-center font-semibold text-themeDarkGray">
                Need Help
              </p>
              <p className="md:text-sm text-xs text-themeDarkGray text-center">
                We are here to help you with any questions you may have about
                our services
              </p>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="md:w-1/2 w-full flex flex-col gap-4 md:px-0 px-3">
                {activeID?.questions?.map((item: any) => (
                  <div>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <p className="px-5">{item.question}</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className="px-5">{item.answer}</p>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default FaqSection;
