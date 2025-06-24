import { HOMEBG, WorkWithUs } from "assets/backgrounds";
import PublicLayout from "layouts/publicLayout";
import {
  AddCircleOutline,
  Engineering,
  AccountBalance,
  DeveloperMode,
} from "@mui/icons-material";
import React from "react";

const AboutArr = [
  {
    id: "1",
    icon: <AddCircleOutline className="!text-theme" />,
    title: "Lorem ipsum dolor sit amet",
  },
  {
    id: "2",
    icon: <AddCircleOutline className="!text-theme" />,
    title: "consectetur adipiscing elit",
  },
  {
    id: "3",
    icon: <AddCircleOutline className="!text-theme" />,
    title: "nunc nisl aliquam massa",
  },
  {
    id: "4",
    icon: <AddCircleOutline className="!text-theme" />,
    title: "nunc nisl aliquam massa",
  },
];

const AboutDetails = [
  {
    id: "1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa",
  },
  {
    id: "2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa",
  },
];

const OurService = [
  {
    id: "1",
    icon: <Engineering className="!text-[#8C75E1] !text-6xl" />,
    title: "Consulting",
    desc: "lerem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa",
  },
  {
    id: "2",
    icon: <AccountBalance className="!text-[#B47264] !text-6xl" />,
    title: "Finance",
    desc: "lerem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa",
  },
  {
    id: "3",
    icon: <DeveloperMode className="!text-[#9DDFD9] !text-6xl" />,
    title: "Development",
    desc: "lerem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec lacinia nunc lorem eget massa",
  },
];

const AboutUsPage = () => {
  return (
    <PublicLayout>
      <div className="custom-container flex flex-col md:gap-6 gap-3 py-5 md:py-10">
        <h1 className="md:text-3xl text-xl font-semibold text-themeDarkGray">
          WHY CHOOSE US
        </h1>
        <div className="w-full md:flex-row flex flex-col md:gap-20 gap-5 ">
          <div className="md:w-1/2 w-full flex flex-col md:gap-6 gap-4">
            <div className="w-fit flex flex-col md:gap-4 gap-2">
              {AboutDetails.map((item) => (
                <div className="w-full flex flex-col md:gap-4 gap-2">
                  <p className="text-themeDarkGray md:text-base text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2">
              {AboutArr.map((item) => (
                <div className="w-full flex gap-2">
                  <p className="">{item.icon}</p>
                  <p className="text-themeDarkGray md:text-lg text-base">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
            <div className="md:w-1/2 w-full">
              <button className="w-1/3 bg-theme text-white py-2 rounded-md">
                Read More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 hidden w-full md:flex flex-col gap-2">
            <img src={WorkWithUs.src} alt="" className="h-[50vh] w-[27vw]" />
          </div>
        </div>
        <div className="flex flex-col w-full gap-6 py-8">
          <div className="w-full flex flex-col gap-6">
            <h1 className="md:text-3xl text-xl font-semibold text-themeDarkGray text-center">
              OUR SERVICE
            </h1>
            <p className="text-themeDarkGray md:text-base text-sm text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa, nec
              lacinia nunc lorem eget massa. <br />
              Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam massa,
              nec lacinia nunc lorem eget massa.
            </p>
          </div>
          <div className="w-full md:flex-row flex flex-col justify-center items-center md:gap-12 gap-6">
            {OurService.map((item) => (
              <div className="md:w-1/4 w-full rounded-md flex flex-col gap-3 items-center justify-center md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-4">
                <p className=" text-center">{item.icon}</p>
                <p className="text-themeDarkGray text-xl text-center">
                  {item.title}
                </p>
                <div className="h-1 w-10 border border-primaryBorder bg-theme"></div>
                <p className="text-themeDarkGray md:text-base text-sm text-center">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default AboutUsPage;
