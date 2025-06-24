import { RentSchedule } from "components/admin/rentProperty";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { StepperLayout, TenantLayout } from "layouts";
import { activeUserArr } from ".";

const Schedule = () => {
  return (
    <TenantLayout title="Property Schedule" headerText={"Property Schedule"}>
      <div className="w-full py-5 md:py-10 px-3 md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem) ">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col  h-full">
            <div className="w-full flex flex-col gap-3 md:gap-5">
              <RentSchedule />
            </div>
          </div>
        </StepperLayout>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(Schedule);
