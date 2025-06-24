import { Check } from "@mui/icons-material";
import { post } from "api";
import { SubscriptionIcon } from "assets/admin";
import { PaginationButton, RippleLoadingButton } from "components/core";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Collapse,
  ListItemText,
  Paper,
  Tooltip,
} from "@mui/material";
import { json } from "stream/consumers";
import { MuiTblOptions, notify } from "utils";
import dayjs from "dayjs";
import MaterialTable from "@material-table/core";
import Info from "@mui/icons-material/Info";
import { SubscriptionAllDetails } from "components/admin/common";
import Link from "next/link";

const MakeSubscription = () => {
  const subscriptionArr = [
    {
      id: 1,
      title: "Unlimited Accounts",
    },
    {
      id: 2,
      title: "No Installation Fee ",
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const [openData, setOpenData] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const stripe = useRef<any>(null);
  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `subscription/plan/landlord/get`
  );
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const subScriptionDetails = data?.data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: subScriptionInfo, mutate: subScriptionInfoMutate } = useSWRAPI(
    `subscription/order-details/${propertyID}`
  );
  const subScriptionHistory = subScriptionInfo?.data?.data;
  const {
    data: subScriptionHistories,
    mutate: tableMutate,
    isValidating: subScriptionValidating,
  } = useSWRAPI(
    `subscription/order-histories/${propertyID}?perPage=10&pageNo=${currentPage}&&status=COMPLETE`
  );
  const subScriptionAllHistories = subScriptionHistories?.data?.data?.data;
  const checkoutData = {
    price: subScriptionDetails?.amount * 100,
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret:
      "pk_live_51Me986FKqo6nOy15Gs2KyJ7agsfF4HCECMQ0AG6E3Xu4XTcPAQptiosHTL2SpflRWkYvZOB6RYmqtpPH4oeDMII600Px5rK9IU",
    email: user?.email,
    appearance,
    // name: subScriptionDetails?.data?.propertyName,
  };
  const onToken = async (token: any) => {
    setIsLoading(true);
    try {
      const res: any = await post({
        isAlert: true,
        path: `subscription/order/make-order`,
        body: JSON.stringify({
          propertyId: propertyID,
          planId: subScriptionDetails?._id,
        }),
      });
      if (res?.status === 200) {
        billingDetails({ res, token });
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };
  const billingDetails = async ({ res: orderData, token }: any) => {
    try {
      const res: any = await post({
        path: `subscription/billing/make-payment`,
        isAlert: true,
        body: JSON.stringify({
          billingId: orderData?.data?._id,
          propertyName: subScriptionDetails?.data?.propertyName,
          token: token,
        }),
      });
      setIsLoading(false);
      mutate();
      tableMutate();
      subScriptionInfoMutate();
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };

  const handelOpenBilling = (ID: any) => {
    setActiveId(ID);
    setOpenData(!openData);
  };
  return (
    <div className="">
      <TenantLayout title="Subscription" headerText={propertyName?.data?.data}>
        <section className="custom-container py-4 ">
          <Link href={`/panel/admin/rent/${propertyID}`}>
            <button className="btn-two  w-44">Back</button>
          </Link>
          <div className="flex gap-3 w-full h-full py-4 ">
            <div className="w-3/5 h-full">
              <div className=" flex flex-col gap-2 h-full  shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-5">
                <div className="flex justify-between w-full">
                  <div>
                    <h1 className="text-themeDarkGray font-bold text-base">
                      {subScriptionDetails?.totalDays === 1
                        ? "Day"
                        : subScriptionDetails?.totalDays === 7
                        ? "Weekly"
                        : subScriptionDetails?.totalDays === 30
                        ? "Monthly"
                        : "Yearly"}{" "}
                      Subscription
                    </h1>
                    <p>{subScriptionDetails?.totalDays} Days</p>
                  </div>
                  <div>
                    <h1 className="text-themeDarkGray text-base font-bold">
                      Amount
                    </h1>
                    <p>$ {subScriptionDetails?.amount}</p>
                  </div>
                </div>

                {!Boolean(subScriptionInfo?.data?.error) && (
                  <div className="flex gap-3 flex-col">
                    <div className="flex justify-between w-full">
                      <div>
                        <h1 className="text-themeDarkGray font-bold text-base">
                          Plan Created{" "}
                        </h1>
                        <p>
                          {dayjs(subScriptionHistory?.planCreated).format("ll")}
                        </p>
                      </div>
                      <div>
                        <h1 className="text-themeDarkGray text-base font-bold">
                          Amount
                        </h1>
                        <p>$ {subScriptionHistory?.planId?.amount}</p>
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div>
                        <h1 className="text-themeDarkGray font-bold text-base">
                          Next Payment{" "}
                        </h1>
                        <p>
                          {dayjs(subScriptionHistory?.nextPayment).format("ll")}
                        </p>
                      </div>
                      <div>
                        <h1 className="text-themeDarkGray text-base font-bold">
                          Amount
                        </h1>
                        <p>$ {subScriptionHistory?.planId?.amount}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-2/5 md:gap-12 rounded-md gap-6 md:shadow-[0_8px_30px_rgb(0,0,0,0.12)] py-4">
              <div className=" w-full rounded-md flex flex-col gap-3 items-center justify-center   p-4">
                <p className="text-themeDarkGray">
                  Subscribe to use exclusive features and manage your{" "}
                  <strong>property online.</strong> Plus, you'll get access to
                  <strong> premium features </strong> that are not available to
                  non-subscribers. Our subscription service is an excellent way
                  to <strong>manage your property</strong> in our platform while
                  also getting the most out of your experience.
                </p>
              </div>

              <div className="px-5">
                <RippleLoadingButton
                  // title="Make Payment"
                  title={`$${subScriptionDetails?.amount} / ${subScriptionDetails?.interval}`}
                  className=" h-fit w-full col-span-12"
                  loading={isLoading}
                  type="submit"
                  handleClick={() => stripe?.current?.onClick()}
                />
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit opacity-0 `}
                >
                  <StripeCheckout
                    ref={stripe}
                    stripeKey={options.clientSecret}
                    token={onToken}
                    amount={checkoutData.price}
                    email={options.email}
                    currency="USD"
                    name="SKYRISE"
                    image="https://res.cloudinary.com/dde63vr5c/image/upload/v1676692128/skyrise/Logo/logo_gxzfx1.png"
                    alipay={true}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" py-4 flex flex-col gap-4">
            <div className="min-h-[30rem] pagination-shadow shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <SubscriptionAllDetails
                open={openData}
                mutate={mutate}
                activeId={activeId}
                onClose={() => setOpenData(false)}
              />
              <MaterialTable
                isLoading={isValidating || loading}
                data={subScriptionAllHistories?.map(
                  (property: any, i: number) => {
                    return {
                      ...property,
                      sl: i + 1,

                      timestamp: property?.createdAt
                        ? dayjs(property?.createdAt).format("LLL")
                        : "Not available",
                    };
                  }
                )}
                components={{
                  Container: (props) => <Paper {...props} elevation={5} />,
                }}
                title={
                  <div className="flex gap-3 justify-center items-center">
                    <div className="text-lg font-bold text-themeDarkGray">
                      Subscription History
                    </div>
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
                    title: "Amount",
                    field: "amount",

                    searchable: true,
                    width: "10%",
                  },

                  {
                    title: "Status",
                    field: "status",
                    width: "10%",
                  },
                  {
                    title: "Total Days",
                    field: "totalDays",
                    width: "10%",
                  },
                  {
                    title: "Currency",
                    field: "currency",
                    width: "10%",
                  },

                  {
                    title: "Payment Initiated",

                    field: "timestamp",
                    width: "15%",
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
                    width: "10%",
                    render: (row) => (
                      <>
                        <div className="flex">
                          <Tooltip title="Info">
                            <Avatar
                              onClick={() => handelOpenBilling(row?._id)}
                              variant="rounded"
                              className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
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
        </section>
      </TenantLayout>
    </div>
  );
};

export default MakeSubscription;
