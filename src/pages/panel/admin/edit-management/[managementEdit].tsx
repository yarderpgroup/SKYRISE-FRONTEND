import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { AddRules } from "components/admin/managementEdit";

import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
interface Props {
  curElm: any;
}
const ManagementEdit = () => {
  const [openTab, setOpenTab] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setOpenTab(newValue);
  };

  return (
    <TenantLayout title="Management Edit">
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
                      Rules & Clauses
                    </div>
                  }
                  value="1"
                />
              </TabList>
            </div>
          </Box>
          <div>
            <TabPanel value="1">
              <AddRules />
            </TabPanel>
          </div>
        </TabContext>
      </div>
    </TenantLayout>
  );
};

export default ManagementEdit;
