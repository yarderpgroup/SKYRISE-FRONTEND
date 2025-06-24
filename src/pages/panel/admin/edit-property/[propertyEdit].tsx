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
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
interface Props {
  curElm: any;
}
const PropertyEdit = () => {
  const [openTab, setOpenTab] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };
  const propertyID = useRouter()?.query?.propertyID;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/my-property/basic-details/${propertyID}`
  );

  const propertyDetails = data?.data?.data;
  const { data: pricingData, isValidating: pricingValidating } = useSWRAPI(
    `property/my-property/pricing/${propertyID}`
  );
  console.log(data);

  return (
    <TenantLayout
      title="Edit Property"
      headerText={propertyDetails?.propertyName}
    >
      <div className="p-2">
        <TabContext value={openTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <div className="w-full flex items-center justify-between">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={
                    <div className="text-base font-bold text-themeDarkGray">
                      Basic Details
                    </div>
                  }
                  value="1"
                />

                <Tab
                  label={
                    <div className="text-base font-bold text-themeDarkGray">
                      Photos
                    </div>
                  }
                  value="2"
                />
                <Tab
                  label={
                    <div className="text-base font-bold text-themeDarkGray">
                      Videos
                    </div>
                  }
                  value="3"
                />
                <Tab
                  label={
                    <div className="text-base font-bold text-themeDarkGray">
                      Home & Price Edit
                    </div>
                  }
                  value="4"
                />
                {propertyDetails?.type === "SELL" && (
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Additional Details
                      </div>
                    }
                    value="5"
                  />
                )}

                <Tab
                  label={
                    <div className="text-base font-bold text-themeDarkGray">
                      Parking Details
                    </div>
                  }
                  value="6"
                />
                {propertyDetails?.type === "SELL" && (
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        Pricing Details
                      </div>
                    }
                    value="7"
                  />
                )}
                {propertyDetails?.type === "RENT" && (
                  <Tab
                    label={
                      <div className="text-base font-bold text-themeDarkGray">
                        TERM
                      </div>
                    }
                    value="8"
                  />
                )}
              </TabList>
            </div>
          </Box>
          <div>
            <TabPanel value="1">
              <BasicDetailsEdit
                propertyDetails={propertyDetails}
                mutate={mutate}
                isValidating={isValidating}
              />
            </TabPanel>
            <TabPanel value="2">
              <PhotoEdit />
            </TabPanel>
            <TabPanel value="3">
              <PropertyVideoEdit />
            </TabPanel>
            <TabPanel value="4">
              <HomeEdit />
            </TabPanel>
            <TabPanel value="5">
              <AdditionalDetails />
            </TabPanel>
            <TabPanel value="6">
              <ParkingDetailsEdit />
            </TabPanel>
            <TabPanel value="7">
              <PricingEdit
                pricingData={pricingData}
                mutate={mutate}
                isValidating={pricingValidating}
              />
            </TabPanel>
            <TabPanel value="8">
              <TermEdit />
            </TabPanel>
          </div>
        </TabContext>
      </div>
    </TenantLayout>
  );
};

export default PropertyEdit;
