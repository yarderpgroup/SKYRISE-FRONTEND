import { AddCircleOutline, ContentCopy } from "@mui/icons-material";
import { IOSSwitch } from "components/core";
import { useState } from "react";

import AddLeadModal from "./AddLeadModal";
import LeadsCardDetails from "./LeadsCardDetails";

const ListingDetails = () => {
  const [openListing, setOpenListing] = useState(false);
  return (
    <section className="custom-container ">
      <AddLeadModal open={openListing} onClose={() => setOpenListing(false)} />
      <div className="flex justify-between ">
        <h1 className="text-3xl text-themeDarkGray font-bold">
          Published Listing
        </h1>
        <div className="flex gap-3">
          <h1 className="text-base text-themeDarkGray font-bold">Publish</h1>
          <IOSSwitch />
        </div>
      </div>
      <h1 className="text-base text-themeGray pt-3">
        Active from Aug 24-Sep 24
      </h1>
      <hr></hr>
      <div className="w-[50%] py-4 relative flex items-center h-10 rounded-lg overflow-hidden ">
        <input
          type="search"
          className="form-control block w-full md:px-3 px-2 py-2 md:py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 transition ease-in-out rounded-lg"
          placeholder="Share Listing"
        />
        <button className="md:w-24 w-12 absolute right-0 h-10 rounded-lg !bg-theme text-white">
          <ContentCopy />
        </button>
      </div>
      <div className="flex gap-10 justify-start items-center w-[50%] pt-5">
        <h1 className="text-xl font-bold text-themeDarkGray ">Leads</h1>

        <button
          onClick={() => setOpenListing(true)}
          className="bg-themeDarkGray  font-semibold tracking-wider rounded-md px-6 py-3ont-semibold  py-2  text-white group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold"
        >
          Add Lead
          <AddCircleOutline className="!text-xl !text-white group-hover:!text-themeDarkGray transition-all ease-in-out duration-300 !cursor-pointer  " />
        </button>
      </div>
      <LeadsCardDetails />
    </section>
  );
};

export default ListingDetails;
