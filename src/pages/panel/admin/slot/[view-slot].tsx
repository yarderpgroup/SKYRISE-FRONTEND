import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import {
  AdditionalDetails,
  BasicDetailsEdit,
  Holiday,
  HomeEdit,
  ParkingDetailsEdit,
  PhotoEdit,
  PricingEdit,
  PropertyVideoEdit,
  ScheduleEdit,
  Slot,
  TermEdit,
} from "components/admin/propertyEdit";

import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
interface Props {
  curElm: any;
}
const ViewSlot = () => {
  const [openTab, setOpenTab] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };
  const propertyID = useRouter()?.query?.propertyID;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/my-property/basic-details/${propertyID}`
  );

  const propertyDetails = data?.data?.data;

  return (
    <TenantLayout title="View Slot" headerText={propertyDetails?.propertyName}>
      <div className="p-2">
        <TabContext value={openTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <div className="w-full flex items-center justify-between">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {propertyDetails?.type === "SELL" && (
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Schedule
                      </div>
                    }
                    value="1"
                  />
                )}
                {propertyDetails?.type === "SELL" && (
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Slot
                      </div>
                    }
                    value="2"
                  />
                )}
                {propertyDetails?.type === "SELL" && (
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Holiday
                      </div>
                    }
                    value="3"
                  />
                )}
              </TabList>
            </div>
          </Box>
          <div>
            <TabPanel value="1">
              <ScheduleEdit />
            </TabPanel>
            <TabPanel value="2">
              <Slot />
            </TabPanel>
            <TabPanel value="3">
              <Holiday />
            </TabPanel>
          </div>
        </TabContext>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(ViewSlot);
