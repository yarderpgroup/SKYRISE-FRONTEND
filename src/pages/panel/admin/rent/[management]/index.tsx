import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";

import {
  house,
  lease,
  list,
  price,
  screen,
  leads,
  register,
  maintenance,
  application,
  notification,
  message,
  subscription,
  announcement,
  number,
  inspection,
  account,
  utility,
  payment2,
} from "assets/admin/rent";
import {
  ApplicationDetails,
  LeasePropertyVisit,
  ListingDetails,
  MaintenanceDetails,
  RentCard,
  TenantDetails,
} from "components/admin/rentProperty";
import { useMenuItems } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";

const PropertyDetails = () => {
  const [openAction, setOpenAction] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const MenuItems = useMenuItems();
  const [openTab, setOpenTab] = useState("1");
  const ID = useRouter().query.management;
  const { data: propertyName } = useSWRAPI(`config/get/property-name/${ID}`);

  const quickLinks = [
    {
      id: "7viii",
      title: "Accounts",
      path: `/panel/admin/rent/${ID}/accounts`,
      img: account.src,
      desc: "Manage Your Accounts",
    },
    {
      id: "8",
      title: "Subscription",
      path: `/panel/admin/rent/${ID}/subscription`,
      img: subscription.src,
      desc: "Get Important updates",
    },
    {
      id: "1",
      title: "Collect Rent",
      path: `/panel/admin/rent/${ID}/collect-rent`,
      img: price.src,
      desc: "Collect rent from tenants",
    },
    {
      id: "11",
      title: "Utility",
      path: `/panel/admin/rent/${ID}/utility`,
      img: utility.src,
      desc: "Get Important Utility",
    },
    {
      id: "12",
      title: "Payment History",
      path: `/panel/admin/rent/${ID}/payment-history`,
      img: payment2.src,
      desc: "Payment History",
    },
    {
      id: "3",
      title: "Leads",
      path: `/panel/admin/rent/${ID}/leads`,
      img: leads.src,
      desc: "leads your interested  property",
    },

    {
      id: "2",
      title: "Tenant Register",
      path: `/panel/admin/rent/${ID}/tenant-register`,
      img: register.src,
      desc: "Register new tenants to your property",
    },

    {
      id: "4",
      title: "Application",
      path: `/panel/admin/rent/${ID}/application`,
      img: application.src,
      desc: "View Your Applications tenants",
    },
    {
      id: "5",
      title: "Leases",
      path: `/panel/admin/rent/${ID}/lease-details`,
      img: lease.src,
      desc: "lease property To give to tenants",
    },
    {
      id: "9ii",
      title: "Lease History",
      path: `/panel/admin/rent/${ID}/lease-history`,
      img: announcement.src,
      desc: "Lease History",
    },
    {
      id: "6",
      title: "Maintenance",
      path: `/panel/admin/rent/${ID}/maintenance`,
      img: maintenance.src,
      desc: "Get maintenance requests",
    },
    {
      id: "7iv",
      title: "Inspection",
      path: `/panel/admin/rent/${ID}/inspection`,
      img: inspection.src,
      desc: "Get Important inspection",
    },
    {
      id: "7iii",
      title: "Emergency Contact",
      path: `/panel/admin/rent/${ID}/emergency-contact`,
      img: number.src,
      desc: "Get Important Emergency contact",
    },
    {
      id: "7",
      title: "Messages",
      path: `/panel/admin/rent/${ID}/message`,
      img: message.src,
      desc: "Get message from your tenants",
    },

    {
      id: "7ii",
      title: "Announcement",
      path: `/panel/admin/rent/${ID}/announcement`,
      img: announcement.src,
      desc: "Get Important Announcement",
    },
  ];
  const handleClick = () => {
    setOpenAction(!openAction);
  };
  const handleClickAway = () => {
    setOpenAction(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };
  return (
    <TenantLayout title="Leases Details" headerText={propertyName?.data?.data}>
      <div className="p-4 md:min-h-[calc(100vh-5.5rem)] flex justify-center items-center">
        {/* <TabContext value={openTab}> */}
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <div className="w-full flex items-center justify-between">
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label={
                      <div className="">
                        <img src={house.src} alt="logo" className="w-9 h-9 " />
                      </div>
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Tenant Registration
                      </div>
                    }
                    value="2"
                  />
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Listing
                      </div>
                    }
                    value="3"
                  />
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Applications
                      </div>
                    }
                    value="4"
                  />
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Leases
                      </div>
                    }
                    value="5"
                  />
                  {/* <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Payments
                      </div>
                    }
                    value="5"
                  /> */}
        {/* <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Maintenance
                      </div>
                    }
                    value="6"
                  />
                </TabList>
              </div>
            </Box> */}
        {/* <TabPanel value="1"> */}
        <div className="w-full items-center flex justify-center py-7  ">
          <div className=" w-[85%] lg:w-[85%] grid-cols-10 grid gap-3 p-5">
            {quickLinks.map((item) => (
              <RentCard curElm={item} key={item.id} />
            ))}
          </div>
        </div>
        {/* </TabPanel> */}
        {/* <TabPanel value="2">
              <TenantDetails />
            </TabPanel>
            <TabPanel value="3">
              <ListingDetails />
            </TabPanel>
            <TabPanel value="4">
              <ApplicationDetails />
            </TabPanel>
            <TabPanel value="5">
              <LeasePropertyVisit />
            </TabPanel> */}
        {/* <TabPanel value="5">
              <PaymentView />
            </TabPanel> */}
        {/* <TabPanel value="6">
              <MaintenanceDetails />
            </TabPanel>
          </TabContext> */}
      </div>
    </TenantLayout>
  );
};

export default PropertyDetails;
