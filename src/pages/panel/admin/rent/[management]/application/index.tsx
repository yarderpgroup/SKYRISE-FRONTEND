import { Add, Complete, Edit, View, Pending } from "assets/admin";
import {
  ApplicationSetting,
  SatusRequestedCard,
} from "components/admin/rentProperty";
import { TenantLayout } from "layouts";
import { Collapse, TextField } from "@mui/material";
import { useState } from "react";
import PendingStatusRequest from "components/admin/rentProperty/PendingStatusRequest";
import CompleteStatusRequest from "components/admin/rentProperty/CompleteStatusRequest";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import withProtectedLandlord from "hooks/withProtectedLandlord";

const ButtonArray = [
  {
    id: 1,
    icon: Add.src,
    title: "Add Application",
    className:
      "bg-gradient-to-bl via-linkedin from-themeDarkGray to-primaryBorder",
  },
  {
    id: 2,
    icon: View.src,
    title: "View Application",
    className: "bg-gradient-to-t from-twitter to-themeGray",
  },
  {
    id: 3,
    icon: Pending.src,
    title: "Pending Application",
    className:
      "bg-gradient-to-bl via-themeGray from-themeDarkGray to-primaryBorder",
  },
  {
    id: 4,
    icon: Complete.src,
    title: "Complete Application",
    className: "bg-gradient-to-t from-instagram to-themeGray",
  },
];

const Application = () => {
  const router = useRouter();
  const PropertyID = router.query.management;
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${PropertyID}`
  );
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState("Add Application");
  const [tenantId, setTenantId] = useState([]);

  return (
    <TenantLayout title="Application" headerText={propertyName?.data?.data}>
      <div className="w-full gap-4 p-4 text-themeDarkGray min-h-[calc(100vh-5.5rem)]">
        <div className="flex justify-between  items-center p-4">
          {/* <h1 className="text-xl font-bold text-themeDarkGray">Application</h1> */}
        </div>
        {/* add view Application,add application ,EDIT APPLICATION, Complete Application */}
        <div className="w-full grid grid-cols-12 md:flex items-center justify-center gap-6">
          {ButtonArray.map((item) => (
            <div
              onClick={() => setActiveType(item.title)}
              key={item.id}
              className={`md:w-48 hover:scale-[1.03] common-transition bg-white col-span-6 rounded-lg h-40 flex flex-col items-center justify-center text-center cursor-pointer gap-2 ${
                activeType === item.title
                  ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] scale-[1.02]"
                  : " shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
              }`}
            >
              <div
                className={`${item.className}w-16 md:w-20 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] h-16 md:h-20 flex items-center justify-center rounded-full`}
              >
                <img src={item.icon} alt="image" className="md:w-12 w-10" />
              </div>
              <p className="font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
        <Collapse title="Add Application" in={activeType === "Add Application"}>
          <div className="pt-16 ">
            <ApplicationSetting
              setTenantId={setTenantId}
              tenantId={tenantId}
              setActiveType={setActiveType}
            />
          </div>
        </Collapse>
        <Collapse
          title="View Application"
          in={activeType === "View Application"}
        >
          <div className="pt-8 ">
            <SatusRequestedCard activeType={activeType} />
          </div>
        </Collapse>
        <Collapse
          title="Pending Application"
          in={activeType === "Pending Application"}
        >
          <div className="pt-16 ">
            <PendingStatusRequest activeType={activeType} />
          </div>
        </Collapse>
        <Collapse
          title="Complete Application"
          in={activeType === "Complete Application"}
        >
          <div className="pt-16 ">
            <CompleteStatusRequest activeType={activeType} />
          </div>
        </Collapse>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(Application));
