import React from "react";
const ApplicationQuestionDetails = [
  {
    id: 1,
    question: "Do you or anyone else living in the property smoke ?",
    answer: "Yes",
  },
  {
    id: 2,
    question: "Have you ever been evicted?",
    answer: "No",
  },
  {
    id: 3,
    question: "Have you ever refused to pay rent when due?",
    answer: "Yes",
  },
  {
    id: 4,
    question: "Have you ever been convicted of a felony?",
    answer: "No",
  },
  {
    id: 5,
    question: "Have you ever been convicted of a misdemeanor?",
    answer: "Yes",
  },
  {
    id: 6,
    question: "Have you ever been evicted?",
    answer: "No",
  },
  {
    id: 7,
    question: "Have you ever refused to pay rent when due?",
    answer: "No",
  },
];
const ApplicationQuestions = ({ viewDetails }: { viewDetails: any }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Application Questions</h1>
      <div className="w-full grid grid-cols-12 gap-4">
        {viewDetails?.map((item: any) => (
          <div className="col-span-12 md:col-span-4">
            <div className="w-full h-full bg-white rounded-lg shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-4">
              <h1 className="text-lg font-bold text-themeDarkGray">
                {item?.question}
              </h1>
              <p className="text-base">{item?.answer ? "Yes" : "No"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationQuestions;
