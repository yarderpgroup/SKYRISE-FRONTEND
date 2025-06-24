import { RentBasicDetails } from "components/admin/rentProperty";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { StepperLayout, TenantLayout } from "layouts";

export const activeUserArr = [
  {
    id: 1,
    title: "Basic Details",
    link: `/panel/admin/rent/add-property`,
  },
  {
    id: 2,
    title: "Location Details",
    link: `/panel/admin/rent/add-property/location-details`,
  },
  {
    id: 3,
    title: "Property Details",
    link: `/panel/admin/rent/add-property/property-profile`,
  },

  {
    id: 5,
    title: "Add Photos",
    link: `/panel/admin/rent/add-property/photos`,
  },
  {
    id: 53,
    title: "Property Information",
    link: `/panel/admin/rent/add-property/property-information`,
  },
  {
    id: 4,
    title: "Term",
    link: `/panel/admin/rent/add-property/term`,
  },
  // {
  //   id: 6,
  //   title: "Add Schedule",
  //   link: `/panel/admin/rent/add-property/schedule`,
  // },
];
const AddProperty = () => {
  return (
    <TenantLayout title="Add Property">
      <div className="w-full py-5 md:py-10 px-3 md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem) ">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col bg-white md:p-6 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full">
            <div className="w-full flex flex-col gap-3 md:gap-5">
              <RentBasicDetails />
            </div>
          </div>
        </StepperLayout>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(AddProperty);
