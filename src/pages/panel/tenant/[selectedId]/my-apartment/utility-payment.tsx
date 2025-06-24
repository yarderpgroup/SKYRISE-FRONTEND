import MaterialTable from "@material-table/core";
import { Paper } from "@mui/material";
import { post } from "api";
import PayUtility from "components/admin/application/PayUtility";
import { PaginationButton, RippleLoadingButton } from "components/core";
import PayRentSkeleton from "components/skeleton/property/PayRentSkeleton";
import dayjs from "dayjs";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { MuiTblOptions, notify } from "utils";

const UtilityPayments = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const propertyId = router.query.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `utility/get-all-utility-tenant/${propertyId}?perPage=10&pageNo=${currentPage}`
  );

  return (
    <TenantLayout title="Utility Pay | SKYRISE">
      <div className="px-3 py-4 flex flex-col gap-4 w-full">
        <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <MaterialTable
            isLoading={isValidating}
            data={data?.data?.data?.data?.map((item: any, i: number) => ({
              ...item,
              sl: i + 1,
              timestamp: item?.createdAt
                ? dayjs(item?.createdAt).format("LLL")
                : "Not available",
            }))}
            components={{
              Container: (props) => <Paper {...props} elevation={5} />,
            }}
            title={
              <div className="flex gap-3 justify-center items-center">
                <div className="text-lg font-bold text-themeDarkGray">
                  Utility Pay
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
                width: "1%",
              },
              {
                title: "Type",
                field: "type",
                searchable: true,
              },
              {
                title: "Amount",
                field: "amount",
                searchable: true,
              },

              {
                title: "Status",
                field: "status",
                searchable: true,
              },
              {
                title: "Month",
                field: "month",
                searchable: true,
              },
              {
                title: "Year",
                field: "year",
                searchable: true,
              },
              {
                editable: "never",
                title: "Create At",

                field: "timestamp",
                render: ({ createdAt }: any) => (
                  <>{dayjs(createdAt).format("lll")}</>
                ),
              },
              {
                title: "Actions",
                headerStyle: {
                  textAlign: "center",
                },
                export: false,
                render: (row) => (
                  <>
                    {/* <RippleLoadingButton
                      title={`$${row?.amount} Pay`}
                      className=" h-fit w-48"
                      loading={isLoading}
                      type="submit"
                      handleClick={() => selectID(row?._id)}
                    />
                    <div className={`absolute bottom-3 z-10  w-fit opacity-0`}>
                      <StripeCheckout
                        ref={stripe}
                        stripeKey={options.clientSecret}
                        token={onToken}
                        amount={row?.amount * 100}
                        email={options.email}
                        currency="USD"
                        name="SKYRISE"
                        image="https://res.cloudinary.com/dde63vr5c/image/upload/v1676692128/skyrise/Logo/logo_gxzfx1.png"
                        alipay={true}
                      />
                    </div> */}
                    {row?.status === "COMPLETE" ? (
                      <div>Already Paid</div>
                    ) : (
                      <PayUtility
                        amount={row?.amount}
                        activeId={row?._id}
                        payMutate={mutate}
                      />
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
        {data?.data?.data?.totalCount >= 10 && (
          <PaginationButton
            setCurrentPage={setCurrentPage}
            previousDisable={data?.data?.data?.pageNo === 1}
            isLastChunk={data?.data?.data?.isLastChunk}
            currentPage={currentPage}
          />
        )}
      </div>
    </TenantLayout>
  );
};

export default UtilityPayments;
