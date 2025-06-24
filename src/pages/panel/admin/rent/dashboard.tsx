import { Home, Money } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import {
  application,
  expired,
  expired1,
  income,
  lease1,
  main,
  payment,
  rent,
  rental,
  tenant,
} from "assets/admin/rent";
import {
  ApplicationRate,
  LeaseDetailsCard,
  MaintenanceCost,
  MonthlyMaintenanceRequest,
  MonthlyRentDetails,
  RentCollectRate,
  RentDefaultRate,
  RentOccupay,
} from "components/admin/RentGraphDetails.tsx";
import ApplicationApprovalRate from "components/admin/RentGraphDetails.tsx/ApplicationApprovalRate";
import UtilityCostGraph from "components/admin/RentGraphDetails.tsx/UtilityCostgraph";
import { DashboardRentGraph, RentRevenueGraph } from "components/admin/graph";
import { RentDashboardCard, RentRequest } from "components/admin/rent";
import MaintenanceCard from "components/admin/rent/MaintenanceCard";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";
import Link from "next/link";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const { data: totalDetails } = useSWRAPI(`dashboard/admin/rent/get-stat`);
  const { data: tenantDetails } = useSWRAPI(`dashboard/admin/rent/tenant-info`);
  const { data: occupiedInfo } = useSWRAPI(
    `dashboard/admin/rent/occupied-info`
  );
  const { data: leaseData } = useSWRAPI(`dashboard/admin/rent/lease-stat`);
  const { data: maintenanceData } = useSWRAPI(
    `dashboard/admin/rent/maintenance-stat`
  );
  const { data: rentalData } = useSWRAPI(
    `dashboard/admin/rent/rent-default-rate`
  );
  const totalCount = maintenanceData?.data?.data?.map(
    (item: any) => item?.totalMaintenance
  );
  const totalMonth = maintenanceData?.data?.data?.map(
    (item: any) => `${item?.month} ${item?.year}`
  );
  const totalTime = maintenanceData?.data?.data?.map((item: any) =>
    parseFloat(String(item?.timeDifference / 3600000)).toFixed(2)
  );
  const { data: rentCollectionData } = useSWRAPI(
    `dashboard/admin/rent/rent-collection-rate`
  );
  const totalRate = rentCollectionData?.data?.data?.map(
    (item: any) => item?.totalRentAmount
  );
  const totalPaid = rentCollectionData?.data?.data?.map(
    (item: any) => item?.totalPaidRentAmount
  );
  const totalCollection = rentCollectionData?.data?.data?.map(
    (item: any) => item?.rentCollectionRate
  );
  const totalRentMonth = rentCollectionData?.data?.data?.map(
    (item: any) => `${item?.month} ${item?.year}`
  );
  const { data: vacanyRate } = useSWRAPI(`dashboard/admin/rent/vacancy-rate`);
  let vacancySeries: any = [];

  vacancySeries.push(
    100 - Number(vacanyRate?.data?.data?.vacancyRate),
    vacanyRate?.data?.data?.vacancyRate
  );
  const { data: applicationRate } = useSWRAPI(
    `dashboard/admin/rent/get-application`
  );
  let applicationSeries: any = [];
  applicationSeries.push(
    applicationRate?.data?.data?.totalCompleteApplication,
    applicationRate?.data?.data?.totalPendingApplication
  );
  const { data: maintenanceCost } = useSWRAPI(
    `dashboard/admin/rent/get-maintenance`
  );
  const totalMaintenanceCost = maintenanceCost?.data?.data?.map(
    (item: any) => item?.totalMaintenance
  );
  const totalMaintenanceAmount = maintenanceCost?.data?.data?.map(
    (item: any) => item?.totalMaintenanceAmount
  );
  const totalMaintenanceMonth = maintenanceCost?.data?.data?.map(
    (item: any) => `${item?.month} `
  );
  const { data: utilityCost } = useSWRAPI(`dashboard/admin/rent/get-utility`);
  const totalUtility = utilityCost?.data?.data?.map(
    (item: any) => item?.totalRentAmount
  );
  const totalUtilityMonth = utilityCost?.data?.data?.map(
    (item: any) => `${item?.month} ${item?.year}`
  );
  let series: any = [];

  series.push(
    tenantDetails?.data?.data?.completeApplication,
    tenantDetails?.data?.data?.pendingApplication,
    tenantDetails?.data?.data?.pendingLease,
    tenantDetails?.data?.data?.signedLease
  );
  let occupiedSeries: any = [];

  occupiedSeries.push(
    occupiedInfo?.data?.data?.totalProperty,
    occupiedInfo?.data?.data?.totalTenant
  );

  let rentCollectionSeries: any = [];
  rentCollectionSeries.push();

  // let approvalSeries: any = [];
  // approvalSeries.push();

  return (
    <TenantLayout title=" Rent Dashboard">
      <div className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem">
        <div className="grid grid-cols-1 py-3 lg:grid-cols-4 content-between gap-4">
          <RentDashboardCard
            title="Total Property"
            iconClassName="bg-gray-100  px-2 py-1"
            content={totalDetails?.data?.data?.totalProperty || 0}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1 " src={rent.src} />}
            clickableRoute="/panel/admin/rent/rent-property"
          />
          <RentDashboardCard
            title="Average Rent"
            iconClassName="bg-gray-100  px-2 py-1"
            content={`$ ${totalDetails?.data?.data?.averageRent || 0}`}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1 " src={rent.src} />}
            clickableRoute="/panel/admin/rent/manage-payment"
          />
          <RentDashboardCard
            title="Total Maintenance"
            iconClassName="bg-gray-100  px-2 py-1"
            content={` ${totalDetails?.data?.data?.totalMaintenance || 0}`}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1 " src={main.src} />}
            clickableRoute="/panel/admin/rent/manage-payment"
          />
          <RentDashboardCard
            title="Total Application"
            iconClassName="bg-gray-100  px-2 py-1"
            content={totalDetails?.data?.data?.totalApplication || 0}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1" src={application.src} />}
            clickableRoute="/panel/admin/rent/manage-property"
          />
          <RentDashboardCard
            title="Total Tenants"
            iconClassName="bg-gray-100  px-2 py-1"
            content={totalDetails?.data?.data?.totalTenants || 0}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1" src={tenant.src} />}
            clickableRoute="/panel/admin/rent/manage-property"
          />
          <RentDashboardCard
            title="Total Rent Payment"
            iconClassName="bg-gray-100  px-2 py-1"
            content={`$ ${totalDetails?.data?.data?.totalPayment || 0}`}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1" src={payment.src} />}
            clickableRoute="/panel/admin/rent/manage-property"
          />
          <RentDashboardCard
            title="Occupied Rate "
            iconClassName="bg-gray-100  px-2 py-1"
            content={`${totalDetails?.data?.data?.occupiedRate || 0} %`}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1" src={application.src} />}
            clickableRoute="/panel/admin/rent/manage-property"
          />
          <RentDashboardCard
            title="Rental Income "
            iconClassName="bg-gray-100  px-2 py-1"
            content={`$ ${totalDetails?.data?.data?.totalRent || 0}`}
            titleClassName="text-themeDarkGray font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold flex flex-col justify-end items-end"
            className="col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 rounded-xl transition-all duration-500 ease-in-out hover:scale-95  "
            icon={<Avatar className="h-11 w-11 p-1" src={income.src} />}
            clickableRoute="/panel/admin/rent/manage-property"
          />
        </div>
        <section className=" w-full py-6 grid gap-5 grid-cols-12 ">
          <div className="col-span-8 h-full">
            <MonthlyMaintenanceRequest
              title={"Maintenance Request Monthly"}
              categories={totalMonth}
              className={`p-5`}
              series={[
                {
                  name: "Total Maintenance Request",
                  data: totalCount,
                },
                {
                  name: "Average Time(in hours)) to resolve",
                  data: totalTime,
                },
              ]}
              colors={["#4D5969", "#999999"]}
              height={450}
            />
          </div>
          <div className="col-span-4 h-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl px-4 flex flex-col gap-4 py-6">
            <MonthlyRentDetails
              title="Tenant Overview"
              labels={[
                "Total Complete Application",
                "Total Pending Application",
                "Total Pending Lease ",
                "Total Signed Lease",
              ]}
              colors={["#3b5998", "#BD33B5", "#E33324", "#25d366"]}
              series={series as any}
            />
          </div>
        </section>

        <div className="col-span-3 h-full  flex flex-row gap-4 py-4">
          <LeaseDetailsCard
            title="Total Lease"
            iconClassName=""
            content={leaseData?.data?.data?.totalLease || 0}
            titleClassName="text-themeDarkGray font-normal text-sm"
            contentClassName="text-black font-bold text-4xl"
            className="col-span-12 w-full h-36  sm:col-span-12 md:col-span-12 lg:col-span-12 "
            // icon={<Home className="h-7 w-7 rounded-lg text-[#00cfde]" />}
            icon={
              <Avatar
                className="!h-16 !w-16 p-1 rounded-lg text-[#00cfde] "
                src={lease1.src}
              />
            }
          />
          <LeaseDetailsCard
            title="Lease Expire This Month"
            iconClassName=""
            content={leaseData?.data?.data?.expireThisMonth || 0}
            titleClassName="text-themeDarkGray font-normal text-sm"
            contentClassName="text-black font-bold text-4xl"
            className="col-span-12 w-full h-36 sm:col-span-12 md:col-span-12 lg:col-span-12 "
            icon={
              <Avatar
                className="!h-16 !w-16 p-1 rounded-lg text-[#00cfde] "
                src={expired.src}
              />
            }
          />
          <LeaseDetailsCard
            title="Lease Expire In 30 Days"
            iconClassName=""
            content={leaseData?.data?.data?.expireInThirtyDays || 0}
            titleClassName="text-themeDarkGray font-normal text-sm"
            contentClassName="text-black font-bold text-4xl"
            className="col-span-12 w-full h-36 sm:col-span-12 md:col-span-12 lg:col-span-12 "
            icon={<Avatar className="!h-16 !w-16" src={expired1.src} />}
          />
          <LeaseDetailsCard
            title="Rental Income"
            iconClassName=""
            content={rentalData?.data?.data?.rentalIncome || 0}
            titleClassName="text-themeDarkGray font-normal text-sm"
            contentClassName="text-black font-bold text-4xl"
            className="col-span-12 w-full h-36 sm:col-span-12 md:col-span-12 lg:col-span-12 "
            icon={<Avatar className="!h-16 !w-16" src={rental.src} />}
          />
          <LeaseDetailsCard
            title="Rent Default Rate"
            iconClassName=""
            content={` ${rentalData?.data?.data?.rentDefaultRate || 0} %`}
            titleClassName="text-themeDarkGray font-normal text-sm"
            contentClassName="text-black font-bold text-4xl"
            className="col-span-12 w-full h-36 sm:col-span-12 md:col-span-12 lg:col-span-12 "
            icon={<Avatar className="!h-16 !w-16" src={rental.src} />}
          />
        </div>
        <section className=" w-full py-6 grid gap-3 grid-cols-12">
          <div className="col-span-4 h-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl px-4 flex flex-col gap-4 py-6">
            <RentOccupay
              title="Property Occupied Ratio"
              labels={["Total Property", "Total Tenant"]}
              colors={["#25d366", "#BD33B5"]}
              occupiedSeries={occupiedSeries as any}
            />
          </div>
          <div className="col-span-8 h-full  rounded-xl px-4 flex flex-col gap-4 ">
            <RentCollectRate
              title={`Rent Collection Rate ${rentCollectionData?.data?.data[0]?.month}`}
              categories={totalRentMonth}
              className={`p-5`}
              series={[
                {
                  name: "Total Rent Amount",
                  data: totalRate,
                },
                {
                  name: "Total Paid RentAmount",
                  data: totalPaid,
                },
                // {
                //   name: "Rent CollectionRate",
                //   data: totalCollection,
                // },
              ]}
              colors={["#4D5969", "#999999", "#4D5969"]}
              height={450}
            />
          </div>
        </section>
        <section className=" w-full py-6 grid gap-5 grid-cols-12 ">
          <div className="col-span-4 h-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl px-4 flex flex-col gap-4 py-6">
            <ApplicationApprovalRate
              title="Vacancy Rate"
              labels={["Occupancy Rate", "Vacancy Rate"]}
              colors={["#3b5998", "#4D5969"]}
              vacancySeries={vacancySeries as any}
            />
          </div>
          <div className="col-span-8 h-full  rounded-xl px-4 flex flex-col gap-4 ">
            <UtilityCostGraph
              title={"Utility Cost"}
              categories={totalUtilityMonth}
              className={`p-5`}
              series={[
                {
                  name: "Total Utility Cost",
                  data: totalUtility,
                },
              ]}
              colors={["#4D5969", "#999999", "#4D5969"]}
              height={450}
            />
          </div>
        </section>
        <section className=" w-full py-6 grid gap-5 grid-cols-12 ">
          <div className="col-span-4 h-full shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-xl px-4 flex flex-col gap-4 py-6">
            <ApplicationRate
              title="Application Rate"
              labels={[
                "Total Complete Application",
                "Total Pending Application",
              ]}
              colors={["#0072b1", "#BD33B5"]}
              applicationSeries={applicationSeries as any}
            />
          </div>
          <div className="col-span-8 h-full  rounded-xl px-4 flex flex-col gap-4 ">
            <MaintenanceCost
              title={"Maintenance Cost"}
              categories={totalMaintenanceMonth}
              className={`p-5`}
              series={[
                {
                  name: "Total Maintenance",
                  data: totalMaintenanceCost,
                },
                {
                  name: "Total MaintenanceAmount",
                  data: totalMaintenanceAmount,
                },
              ]}
              colors={["#4D5969", "#BD33B5"]}
              height={450}
            />
          </div>
        </section>

        {/* <div className="flex gap-8  py-4">
          <div className=" w-[40%] h-full bg-white flex justify-center">
            <RentRequest />
          </div>
          <div className="">
            <div className="flex justify-between">
              <h1 className="text-themeDarkGray text-xl font-bold">
                Maintenance Request
              </h1>
              <div>
                <Link href={`panel/admin/rent/manage-property`}>
                  <div className="h-fit flex flex-col p-2 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] w-44    cursor-pointer items-center text-center bg-blue-600 rounded-lg  ">
                    <button className="text-white">View Details</button>
                  </div>
                </Link>
              </div>
            </div>
            <div className=" h-full flex justify-center">
              <div className="flex flex-col w-full gap-4 pt-5 md:gap-5 ">
                {maintenanceDetails?.data?.data?.data?.map((item: any) => (
                  <MaintenanceCard curElm={item} />
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(Dashboard);
