import { Apartment, MapsHomeWork, Money } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { offer, other, tour, video, visitor } from "assets/admin";
import { Loader } from "components";
import { InfoCards } from "components/admin/dashboard";
import {
  PaymentOverView,
  PaymentTable,
  TableProperty,
} from "components/admin/dashboardGarph";
import TotalVisitorCard from "components/admin/dashboardGarph/TotalVisitorCard";
import { MultiBarGraph } from "components/admin/graph";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";

import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: totalDetails } = useSWRAPI(`dashboard/admin/property/stats`);
  const { data: visitorCard } = useSWRAPI(
    `dashboard/admin/property/get-tour-details`
  );

  return (
    <TenantLayout title="Owner Dashboard">
      <div className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem)">
        <div className="grid grid-cols-12 content-between gap-5 py-3 ">
          <InfoCards
            title="Total Properties"
            iconClassName="bg-[#e6e5fd] "
            content={totalDetails?.data?.data?.totalProperty || 0}
            titleClassName="text-themeDarkGray font-normal text-base"
            contentClassName="text-black font-bold text-2xl"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3"
            icon={<Apartment className="h-7 w-7 rounded-md  text-[#6546d2]" />}
            clickableRoute="/panel/admin/rent/rent-property"
          />
          <InfoCards
            title="Total Responses"
            iconClassName="bg-[#ffc9c9]"
            content={totalDetails?.data?.data?.totalResponse || 0}
            titleClassName="text-themeDarkGray font-normal text-lg"
            contentClassName="text-black font-bold text-2xl"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 "
            icon={<Apartment className="h-7 w-7 rounded-md  text-[#ff2929]" />}
            clickableRoute="/panel/admin/responses/manage-response"
          />
          <InfoCards
            title="Property Visits"
            iconClassName="bg-[#ffc9c9]"
            content={totalDetails?.data?.data?.totalVisit || 0}
            titleClassName="text-themeDarkGray font-normal text-base"
            contentClassName="text-black font-bold text-2xl"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 "
            icon={
              <MapsHomeWork className="h-7 w-7 rounded-lg text-[#fad02e]" />
            }
            clickableRoute="/panel/admin/properties/view-property"
          />
          <InfoCards
            title="Total Revenue"
            iconClassName="bg-[#bff3f7]"
            content={`$ ${totalDetails?.data?.data?.totalRevenue || 0}`}
            titleClassName="text-themeDarkGray font-normal text-base"
            contentClassName="text-black font-bold text-2xl"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 "
            icon={<Money className="h-7 w-7 rounded-lg text-[#00cfde]" />}
            clickableRoute="/panel/admin/rent/manage-property"
          />
        </div>
        <section className=" w-full py-3 grid gap-5 grid-cols-11">
          {/* <div className="col-span-5 h-full">
            <MultiBarGraph
              title={"Monthly Revenue"}
              categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              className={`p-5`}
              series={[
                {
                  name: "Property Visit",
                  data: [7, 8, 10, 14, 20, 30, 35],
                },
                {
                  name: "Total Response",
                  data: [4, 5, 6, 7, 6, 5, 6],
                },
              ]}
              colors={["#4D5969", "#999999"]}
              height={450}
            />
          </div> */}
          <div className="col-span-3 h-full flex justify-center">
            <PaymentTable />
          </div>{" "}
          <div className="col-span-3 h-full flex justify-center">
            <PaymentOverView />
          </div>
          <div className="col-span-5 h-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl px-4 flex flex-col gap-4 py-6">
            <p className="text-lg font-semibold text-themeDarkGray">
              Visitor Overview
            </p>
            <div className="grid grid-cols-12 content-between gap-4">
              <TotalVisitorCard
                title="Total Visitors"
                content={visitorCard?.data?.data?.totalVisitors || 0}
                titleClassName="text-pink-600"
                contentClassName="text-pink-600"
                className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-4"
                icon={<Avatar className="!h-11 !w-11 p-1" src={visitor.src} />}
              />
              <TotalVisitorCard
                title="Video Call"
                content={visitorCard?.data?.data?.viaVideoCall || 0}
                titleClassName="text-pink-400"
                contentClassName="text-pink-400"
                className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
                icon={<Avatar className="!h-11 !w-11 p-1" src={video.src} />}
              />
              <TotalVisitorCard
                title="By Tour"
                content={visitorCard?.data?.data?.viaTour || 0}
                titleClassName="text-pink-400"
                contentClassName="text-pink-400"
                className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
                icon={<Avatar className="!h-11 !w-11 p-1" src={tour.src} />}
              />
              <TotalVisitorCard
                title="Today Visitor"
                content={visitorCard?.data?.data?.todayVisit || 0}
                titleClassName="text-pink-400"
                contentClassName="text-pink-400"
                className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
                icon={
                  <Avatar
                    className="!h-11 !w-11 p-1 !object-contain"
                    src={visitor.src}
                  />
                }
              />{" "}
              <TotalVisitorCard
                title="Total Offer"
                content={visitorCard?.data?.data?.totalOffer || 0}
                titleClassName="text-pink-400"
                contentClassName="text-pink-400"
                className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
                icon={<Avatar className="!h-11 !w-11 p-1" src={offer.src} />}
              />
              <TotalVisitorCard
                title="Others"
                content={visitorCard?.data?.data?.others || 0}
                titleClassName="text-pink-400"
                contentClassName="text-pink-400"
                className="col-span-12 w-full  sm:col-span-12 md:col-span-4 lg:col-span-4"
                icon={<Avatar className="!h-11 !w-11 p-1 " src={other.src} />}
              />
            </div>
          </div>
        </section>
        <section className=" w-full py-3 grid gap-5 grid-cols-12">
          <div className="col-span-12 h-full  ">
            <TableProperty />
          </div>
        </section>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(Dashboard);
