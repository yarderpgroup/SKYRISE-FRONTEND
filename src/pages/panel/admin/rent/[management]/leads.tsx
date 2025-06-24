import { AddCircleOutline, ContentCopy } from "@mui/icons-material";
import { AddLeadModal, LeadsCardDetails } from "components/admin/rentProperty";
import { ShowEmpty } from "components/core";
import { LeaseSkeleton } from "components/skeleton/property";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";

const ListingDetails = () => {
  const router = useRouter();
  const PropertyID = router.query.management;
  const { data, error, isValidating, mutate } = useSWRAPI(
    `leads/get-leads/${PropertyID}`
  );

  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${PropertyID}`
  );
  const leadsData = data?.data?.data?.data;

  const [openListing, setOpenListing] = useState(false);
  return (
    <TenantLayout title="Leads" headerText={propertyName?.data?.data}>
      <section className="custom-container p-4">
        <AddLeadModal
          open={openListing}
          mutate={mutate}
          onClose={() => setOpenListing(false)}
        />

        <div className="flex gap-10 justify-end items-center w-full pt-5">
          <button
            onClick={() => setOpenListing(true)}
            className="bg-themeDarkGray  font-semibold tracking-wider rounded-md px-6 py-3ont-semibold  py-2  text-white group flex items-center gap-3 border border-themeDarkGray hover:bg-white hover:text-themeDarkGray hover:font-bold"
          >
            Add Lead
            <AddCircleOutline className="!text-xl !text-white group-hover:!text-themeDarkGray transition-all ease-in-out duration-300 !cursor-pointer  " />
          </button>
        </div>
        {isValidating ? (
          <div className="w-full h-full flex justify-center items-center pt-4">
            <LeaseSkeleton />
          </div>
        ) : (
          <>
            {leadsData?.length === 0 ? (
              <ShowEmpty />
            ) : (
              <LeadsCardDetails leadsData={leadsData} mutate={mutate} />
            )}
          </>
        )}
      </section>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(ListingDetails));
