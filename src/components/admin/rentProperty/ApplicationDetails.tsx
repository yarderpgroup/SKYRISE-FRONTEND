import { useState } from "react";
import ApplicationSetting from "./ApplicationSetting";

const ApplicationDetails = () => {
  const [tenantId, setTenantId] = useState("");
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-themeDarkGray">Application</h1>
        {/* <button className="  font-semibold tracking-wider rounded-md px-6 py-3ont-semibold  py-2  text-white bg-themeDarkGray  group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold">
          Request Application
        </button> */}
      </div>
      {/* <div className="flex gap-7 py-5">
        <div className="w-[40%]  relative flex items-center h-10 rounded-lg overflow-hidden ">
          <input
            type="search"
            className="form-control block w-full md:px-3 px-2 py-2 md:py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 transition ease-in-out rounded-lg"
            placeholder="Share Application"
          />
          <button className="md:w-24 w-12 absolute right-0 h-10 rounded-lg !bg-theme text-white">
            <ContentCopy />
          </button>
        </div>
        <div className="w-[40%]  relative flex items-center h-10 rounded-lg overflow-hidden ">
          <input
            type="search"
            className="form-control block w-full md:px-3 px-2 py-2 md:py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 transition ease-in-out rounded-lg"
            placeholder="View Single Application"
          />
          <button className="md:w-24 w-12 absolute right-0 h-10 rounded-lg !bg-theme text-white">
            <ContentCopy />
          </button>
        </div>
      </div> */}
      <div className="pt-4">
        <ApplicationSetting
          setTenantId={setTenantId as any}
          tenantId={tenantId}
        />
      </div>
    </div>
  );
};

export default ApplicationDetails;
