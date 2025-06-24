import { ManagePropertyDetails } from "components/admin/properties";
import { TenantLayout } from "layouts";

const ManageProperty = () => {
  return (
    <div>
      <TenantLayout title="Manage Property">
        <div className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem] ">
          <ManagePropertyDetails />
        </div>
      </TenantLayout>
    </div>
  );
};

export default ManageProperty;
