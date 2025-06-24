import { ContactDetails, RulesDetails } from "components/admin/LeaseBasic";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import { StepperLayout, TenantLayout } from "layouts";
import { useRouter } from "next/router";

const LeassorInfo = () => {
  const router = useRouter();
  const ID = router?.query?.management;
  const { data: propertyName } = useSWRAPI(`config/get/property-name/${ID}`);
  const activeUserArr = [
    {
      id: 1,
      title: "LeaseTerm ",
      link: `/panel/admin/rent/${ID}/lease-details`,
    },
    {
      id: 2,
      title: "Options Details ",
      link: `/panel/admin/rent/${ID}/lease-details/all-details`,
    },
    {
      id: 3,
      title: "Rules & Clauses",
      link: `/panel/admin/rent/${ID}/lease-details/clauses`,
    },

    {
      id: 5,
      title: "Disclosures",
      link: `/panel/admin/rent/${ID}/lease-details/disclosures`,
    },
    {
      id: 6,
      title: "Attachment",
      link: `/panel/admin/rent/${ID}/lease-details/attachment`,
    },
    {
      id: 7,
      title: "Lessor",
      link: `/panel/admin/rent/${ID}/lease-details/leassor-info`,
    },
    {
      id: 8,
      title: "Lessor Info",
      link: `/panel/admin/rent/${ID}/lease-details/leasor-info`,
    },
  ];
  return (
    <TenantLayout title="Lessor" headerText={propertyName?.data?.data}>
      <div className="w-full  md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem) ">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col rounded-lg  h-full">
            <div className="w-full flex flex-col gap-3 md:gap-5">
              <ContactDetails />
            </div>
          </div>
        </StepperLayout>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(LeassorInfo));
