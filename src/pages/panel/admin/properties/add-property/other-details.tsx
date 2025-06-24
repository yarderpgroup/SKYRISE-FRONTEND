import { OtherDetailsAdd } from "components/admin/properties";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { StepperLayout, TenantLayout } from "layouts";
import { activeUserArr } from ".";

const OtherDetails = () => {
  return (
    <TenantLayout title="Property Details" headerText={"Home & Price"}>
      <div className="w-full py-5 md:py-10 px-3 md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem) ">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col bg-white md:p-6 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full">
            <div className="w-full flex flex-col gap-3 md:gap-5">
              <OtherDetailsAdd />
            </div>
          </div>
        </StepperLayout>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(OtherDetails);
