import { PieChart } from "@mui/icons-material";
import {
  DashboardWave,
  DashboardWaveFour,
  DashboardWaveOne,
  DashboardWaveTwo,
  PaymentWaveFour,
  PaymentWaveOne,
  WAVE,
} from "assets/backgrounds";
import {
  AmenitiesCard,
  ContactCard,
  DocumentCard,
  EmailIcon,
  InsuranceCard,
  LocationCard,
  Message,
  Request,
  RequestCard,
  TotalRent,
  Wallet,
} from "assets/tenant";
import { PieGraph, RentRevenueGraph } from "components/admin/graph";
import { DashboardCard, TenantPaymentCard } from "components/tenant";
import dayjs from "dayjs";
import { WithProtectedTenant } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TenantDashboard = () => {
  const router = useRouter();
  const propertyId: any = router.query.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `dashboard/tenant/get-stats/${propertyId}`
  );
  const StatsDetails = data?.data?.data;
  const { data: paymentCost } = useSWRAPI(
    `dashboard/tenant/rent/get-payment/${propertyId}`
  );
  const totalRent = paymentCost?.data?.data?.map(
    (item: any) => item?.totalRent
  );
  const totalMonth = paymentCost?.data?.data?.map(
    (item: any) => `${item?.month} `
  );
  const { data: monthlyChat } = useSWRAPI(
    `dashboard/tenant/rent/get-monthly-chart/${propertyId}`
  );
  console.log(monthlyChat);
  let monthlySeries: any = [];
  monthlySeries.push(
    monthlyChat?.data?.data?.totalRent,
    monthlyChat?.data?.data?.totalParking,
    monthlyChat?.data?.data?.totalMaintenance,
    monthlyChat?.data?.data?.totalPetFee,
    monthlyChat?.data?.data?.totalUtility
  );
  const { data: notification } = useSWRAPI(
    `dashboard/tenant/rent/get-recent-message/${propertyId}`
  );
  const tenantOptionsArr = [
    {
      id: "1",
      title: "Request Maintenance",
      description: "How can we help?",
      img: RequestCard.src,
      className: "bg-gradient-to-br from-theme to-youtube",
      link: `/panel/tenant/${propertyId}/my-apartment/maintenance-request`,
    },
    {
      id: "2",
      title: "Inspection",
      description: "View your Inspection details.",
      img: InsuranceCard.src,
      className: "bg-gradient-to-br from-linkedin to-youtube",
      link: `panel/tenant/${propertyId}/my-apartment/inspection`,
    },
    {
      id: "3",
      title: "Contact Us",
      description: "Let us know what you need.",
      img: ContactCard.src,
      className: "bg-gradient-to-br from-twitter to-linkedin",
      link: `/panel/tenant/${propertyId}/contact-property`,
    },
    {
      id: "4",
      title: "View Documents",
      description: "View your documents.",
      img: DocumentCard.src,
      className: "bg-gradient-to-br from-youtube to-instagram",
      link: `/panel/tenant/${propertyId}/my-apartment/documents`,
    },
    {
      id: "5",
      title: "Rent Payment",
      description: "View and reserve available amenities.",
      img: AmenitiesCard.src,
      className: "bg-gradient-to-br from-whatsapp to-youtube",
      link: `/panel/tenant/${propertyId}/my-apartment/pay-rent`,
    },
    {
      id: "6",
      title: "Guest",
      description: "Get your guest list.",
      img: LocationCard.src,
      className: "bg-gradient-to-b from-pinterest to-linkedin",
      link: `/panel/tenant/${propertyId}/my-apartment/guest-list`,
    },
  ];

  const tenantCardArr = [
    {
      id: 1,
      title: "Total Payment",
      heading: `$ ${StatsDetails?.totalPayment || 0}`,
      img: Wallet.src,
      wave: DashboardWave.src,
      link: `/panel/tenant/${propertyId}`,
    },
    {
      id: 2,
      title: "Monthly Rent",
      heading: `$ ${StatsDetails?.rentPrice || 0}`,
      img: TotalRent.src,
      wave: DashboardWaveOne.src,
      link: `/panel/tenant/${propertyId}/my-apartment/pay-rent`,
    },
    {
      id: 3,
      title: "Total Messages",
      heading: StatsDetails?.totalMessage || 0,
      img: Message.src,
      wave: DashboardWaveTwo.src,
      link: `/panel/tenant/${propertyId}/message`,
    },
    {
      id: 4,
      title: "Maintenance",
      heading: StatsDetails?.totalMaintenance || 0,
      img: Request.src,
      wave: DashboardWaveFour.src,
      link: `/panel/tenant/${propertyId}/my-apartment/maintenance-request`,
    },
  ];
  return (
    <TenantLayout title="Tenant Dashboard | SKYRISE">
      <div className="w-full">
        <div className="flex flex-col md:py-10 py-5 gap-5 md:gap-8 px-2  md:px-5 text-themeDarkGray">
          <div className="grid grid-cols-12 w-full gap-3 md:gap-5 h-full">
            {tenantCardArr?.map((item) => (
              <div key={item?.id} className="col-span-6 md:col-span-3">
                <DashboardCard curElm={item} isValidating={isValidating} />
              </div>
            ))}
          </div>
          <div className="w-full md:flex-row flex flex-col gap-5">
            <div className="md:w-2/3 w-full !order-2 md:!order-1">
              <div className="w-full md:p-5 p-1 grid grid-cols-12 gap-3 md:gap-5">
                {tenantOptionsArr?.map((item) => (
                  <div
                    key={item?.id}
                    className="md:col-span-4 col-span-6 hover:scale-[1.03] common-transition cursor-pointer md:h-48 h-full py-5 px-1 md:px-0 md:p-0 overflow-hidden rounded-xl shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
                  >
                    <Link href={item?.link}>
                      <div className="w-full flex  flex-col items-center justify-center h-full gap-3">
                        <div
                          className={`md:w-20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-16 md:h-20 h-16 rounded-full ${item.className} flex items-center justify-center`}
                        >
                          <img
                            src={item.img}
                            alt="image"
                            className="md:w-12 w-10"
                          />
                        </div>
                        <div className="flex flex-col w-full text-center h-1/3">
                          <p className="md:text-lg text-sm font-semibold md:leading-5 leading-4">
                            {item.title}
                          </p>
                          <p className=" text-xs md:text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 !order-1 md:!order-2 md:w-1/3 w-full z-0">
              <TenantPaymentCard
                propertyId={propertyId}
                totalAmount={monthlyChat?.data?.data?.totalExpenses}
              />
              <div className="w-full flex flex-col h-fit gap-2 rounded-xl md:p-5 p-2 shadow-[0px_13px_15px_1px_#00000011]">
                <div className="flex w-full items-center gap-2">
                  <div className="md:w-14 w-12 md:h-14 h-12 rounded-full bg-gradient-to-bl from-linkedin to-twitter flex items-center justify-center text-white">
                    <img
                      src={EmailIcon.src}
                      alt="email"
                      className="md:w-8 w-5"
                    />
                  </div>
                  <div className="text-themeDarkGray w-5/6 gap-1 md:gap-1 flex-col flex">
                    <div className="w-full flex items-center justify-between">
                      <p className="md:text-lg text-base md:leading-5 font-semibold">
                        {notification?.data?.data?.subject}
                      </p>
                      <p className="text-xs md:text-sm">
                        {dayjs(notification?.data?.data?.createdAt).format(
                          "ll"
                        )}
                      </p>
                    </div>
                    {/* <div className="md:text-sm text-xs">
                      {notification?.data?.data?.subject}
                    </div> */}
                    <div className="md:text-sm text-xs">
                      {notification?.data?.data?.description?.slice(0, 100)}...
                    </div>
                  </div>
                </div>
                <div className="w-full justify-end flex items-center">
                  <Link href={`/panel/tenant/${propertyId}/message`}>
                    <button className="btn-one">View</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-col md:flex-row flex gap-5">
            <div className="md:w-2/3 w-full md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5">
              <RentRevenueGraph
                title={"Rent Overview"}
                categories={totalMonth}
                className={``}
                series={[
                  {
                    name: "Total Rent",
                    data: totalRent,
                  },
                ]}
                colors={["#0072b1"]}
                height={350}
              />
            </div>
            <div className="md:w-1/3 w-full md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5">
              <PieGraph
                title={`Monthly Expenses of ${monthlyChat?.data?.data?.month}`}
                labels={[
                  "Total Monthly Rent",
                  "Total Parking Expenses",
                  "Maintenance Expenses",
                  "Total Pet Fee",
                  "Total Utility",
                ]}
                colors={["#3b5998", "#BD33B5", "#E33324", "#25d366", "#3b5998"]}
                monthlySeries={monthlySeries as any}
              />
            </div>
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default WithProtectedTenant(TenantDashboard);
