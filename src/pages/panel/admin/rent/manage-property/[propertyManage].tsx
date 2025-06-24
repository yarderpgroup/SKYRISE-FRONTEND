import {
  AttachmentDetails,
  ClausesAdd,
  EditLeaseDetailsAdd,
  EditListingDetails,
  MaintenanceAdd,
  RulesAdd,
} from "components/admin/managPropertyView";
import { TenantLayout } from "layouts";

const propertyManageDetails = () => {
  return (
    <TenantLayout title="Leases Details" headerText="EATON GARTH PENTHOUSE">
      <div className="w-full py-5 md:py-10 px-3 text-themeDarkGray  md:px-5 !min-h-[calc(100vh-4.5rem] ">
        <h1 className="text-xl text-themeDarkGray font-bold">
          Listing Details
        </h1>
        <div>
          <EditListingDetails />
        </div>
        <div>
          <EditLeaseDetailsAdd />
        </div>
        <div>
          <ClausesAdd />
        </div>
        <div>
          <RulesAdd />
        </div>
        <div>
          <AttachmentDetails />
        </div>
        <div>
          <MaintenanceAdd />
        </div>
      </div>
    </TenantLayout>
  );
};

export default propertyManageDetails;
