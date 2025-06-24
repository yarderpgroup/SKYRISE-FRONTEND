import MaterialTable from "@material-table/core";
import { Info } from "@mui/icons-material";
import { Avatar, Paper, Tooltip, Typography } from "@mui/material";

import dayjs from "dayjs";
import useSWRAPI from "hooks/useSWRAPI";

import { useRouter } from "next/router";
import { useState } from "react";
import { MuiTblOptions } from "utils";
import { PaginationButton } from "components/core";
import { CollectRentdetails } from "components/admin/common";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import { TenantLayout } from "layouts";

const CollectRent = () => {
  const router = useRouter();
  const propertyID = router?.query?.management;
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [openAccount, setOpenAccount] = useState(false);
  const [activeData, setActiveData] = useState(false);
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const { data, error, mutate, isValidating } = useSWRAPI(
    `lease/landlord/get-all-rent/${propertyID}?perPage=10&pageNo=${currentPage}`
  );
  const handelAccount = (data: any) => {
    setOpenAccount(true);
    setActiveData(data);
  };
  return (
    <TenantLayout title=" Collect Rent" headerText={propertyName?.data?.data}>
      <>
        <div className="px-3 py-4">
          <CollectRentdetails
            open={openAccount}
            activeData={activeData}
            mutate={mutate}
            onClose={() => setOpenAccount(false)}
          />
          <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <MaterialTable
              isLoading={isValidating || loading}
              data={data?.data?.data?.data?.map((property: any, i: number) => {
                return {
                  ...property,
                  sl: i + 1,

                  timestamp: property?.createdAt
                    ? dayjs(property?.createdAt).format("LLL")
                    : "Not available",
                };
              })}
              components={{
                Container: (props) => <Paper {...props} elevation={5} />,
              }}
              title={
                <div className="flex gap-3 justify-center items-center">
                  <div className="text-lg font-bold text-themeDarkGray">
                    Collect Rent
                  </div>
                  <div></div>
                </div>
              }
              options={{ ...MuiTblOptions(), selection: false }}
              columns={[
                {
                  title: "#",
                  field: "sl",
                  editable: "never",
                },
                {
                  title: "Month",
                  field: "month",
                  searchable: true,
                },
                {
                  title: "Rent Amount",
                  field: "totalRent",
                  searchable: true,
                },

                {
                  title: "Due Date",
                  field: "dueDate",
                  render: ({ dueDate }) => <div>{dueDate} Every month</div>,
                  searchable: true,
                },
                {
                  title: "LateRentFee",
                  field: "lateRentFee",
                  searchable: true,
                },
                {
                  title: "MoveInFee",
                  field: "moveInFee",
                  searchable: true,
                },
                {
                  title: "MoveOutFee",
                  field: "moveOutFee",
                  searchable: true,
                },
                {
                  title: "Status",
                  field: "status",
                  searchable: true,
                },
                {
                  title: "Actions",
                  headerStyle: {
                    textAlign: "center",
                  },
                  export: false,
                  width: "10%",
                  render: (row) => (
                    <>
                      <div className="flex">
                        <Tooltip title="Info">
                          <Avatar
                            variant="rounded"
                            onClick={() => handelAccount(row)}
                            className=" !mr-1 !cursor-pointer !bg-red-700"
                          >
                            <Info className="!p-0" />
                          </Avatar>
                        </Tooltip>
                      </div>
                    </>
                  ),
                },
              ]}
            />
          </div> 
        </div>
        {data?.data?.data?.totalCount >= 10 && (
          <PaginationButton
            setCurrentPage={setCurrentPage}
            previousDisable={data?.data?.data?.pageNo === 1}
            isLastChunk={data?.data?.data?.isLastChunk}
            currentPage={currentPage}
          />
        )}
      </>
    </TenantLayout>
  );
};

export default withProtectedLandlord(withProtectedSubscription(CollectRent));
