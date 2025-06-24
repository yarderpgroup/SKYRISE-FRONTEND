import { RulesDetails } from "components/admin/LeaseBasic";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import { StepperLayout, TenantLayout } from "layouts";
import { useRouter } from "next/router";

const Rules = () => {
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
      link: `/panel/admin/rent/${ID}/lease-details/lessor-info`,
    },
  ];
  return (
    <TenantLayout title="Rules" headerText={propertyName?.data?.data}>
      <div className="w-full py-5 md:py-10 px-3 md:bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem) ">
        <StepperLayout menuItems={activeUserArr}>
          <div className="w-full flex flex-col bg-white md:p-6 rounded-lg md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full">
            <div className="w-full flex flex-col gap-3 md:gap-5">
              <RulesDetails />
            </div>
          </div>
        </StepperLayout>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(Rules));
