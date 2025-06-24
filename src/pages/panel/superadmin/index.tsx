import { Apartment } from "@mui/icons-material";
import {
  approve,
  blocked,
  owner,
  pending,
  property,
  tenant,
} from "assets/admin/superAdmin";
import {
  AdminDashboardGraph,
  PropertyOverViewGraph,
  SuperAdminDashboard,
  SuperAdminPieGraph,
  SuperAdminTabel,
} from "components/admin/superAdmin";
import { withProtectedSuperAdmin } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";

const Dashboard = () => {
  const { data: totalUser } = useSWRAPI(`dashboard/super-admin/user/stats`);
  const { data: Property } = useSWRAPI(`dashboard/super-admin/property/stats`);
  const { data: chartData } = useSWRAPI(
    `dashboard/super-admin/user/percentage`
  );
  const count = chartData?.data?.data?.map((item: any) => item?.count);
  const roles = chartData?.data?.data?.map((item: any) => item?._id);
  const { data: propertyRecord } = useSWRAPI(
    `dashboard/super-admin/property/record`
  );

  const totalCount = propertyRecord?.data?.data?.map(
    (item: any) => item?.totalProperty
  );
  const totalMonth = propertyRecord?.data?.data?.map(
    (item: any) => item?.month
  );

  const totalPending = propertyRecord?.data?.data?.map(
    (item: any) => item?.pendingProperty
  );
  return (
    <TenantLayout title="SuperAdmin Dashboard">
      <div className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem)">
        <div className="grid grid-cols-12 content-between gap-5 py-3">
          {totalUser?.data?.data?.map((item: any) => (
            <div className="col-span-12 w-full  sm:col-span-12  md:col-span-3 ">
              <SuperAdminDashboard
                title={item?._id}
                iconClassName="bg-gradient-to-br from-theme to-youtube"
                content={item?.count}
                titleClassName="text-themeDarkGray font-normal text-base"
                contentClassName="text-black font-bold text-2xl"
                img={tenant.src}
                clickableRoute="/panel/superadmin/total-users"
              />
            </div>
          ))}
          {/* <SuperAdminDashboard
            title="Total Property"
            iconClassName="bg-gradient-to-br from-twitter to-linkedin "
            content={Property?.data?.data?.totalCount}
            titleClassName="text-themeDarkGray font-normal text-base"
            contentClassName="text-black font-bold text-2xl"
            className="col-span-12 w-full bg-white sm:col-span-12  md:col-span-3 "
            img={property.src}
            clickableRoute="/panel/superadmin/property/total-property"
          /> */}

          <SuperAdminDashboard
            title="Pending Property"
            iconClassName="bg-gradient-to-br from-youtube to-instagram "
            content={Property?.data?.data?.pendingCount || 0}
            titleClassName="text-themeDarkGray font-normal text-base"
            contentClassName="text-black font-bold text-2xl"
            className="col-span-12 w-full bg-white sm:col-span-12  md:col-span-3 "
            img={pending.src}
            clickableRoute="/panel/superadmin/property/pending-property"
          />
          <SuperAdminDashboard
            title="Approved Property"
            iconClassName="bg-gradient-to-br from-whatsapp to-youtube"
            content={Property?.data?.data?.approvedCount || 0}
            titleClassName="text-themeDarkGray font-normal text-base"
            contentClassName="text-black font-bold text-2xl"
            className="col-span-12 w-full bg-white sm:col-span-12  md:col-span-3 "
            img={approve.src}
            clickableRoute="/panel/superadmin/property/verified-property"
          />
          <SuperAdminDashboard
            title="Block Property"
            iconClassName="bg-gradient-to-b from-pinterest to-linkedin"
            content={Property?.data?.data?.blockedCount || 0}
            titleClassName="text-themeDarkGray font-normal text-base"
            contentClassName="text-black font-bold text-2xl"
            className="col-span-12 w-full bg-white sm:col-span-12  md:col-span-3 justify-center items-center"
            img={approve.src}
            clickableRoute="/panel/superadmin/property/total-property"
          />
        </div>

        <div className="w-full flex-col md:flex-row flex gap-5 py-8">
          <div className="md:w-2/3 w-full md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5">
            <AdminDashboardGraph
              title={"User Record"}
              categories={totalMonth}
              className={``}
              series={[
                {
                  name: "Total Property",
                  data: totalCount,
                },
                {
                  name: "Pending Property",
                  data: totalPending,
                },
              ]}
              colors={["#0072b1", "#999999"]}
              height={350}
            />
          </div>
          <div className="md:w-1/3 w-full md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5">
            <PropertyOverViewGraph
              title="User Type"
              labels={roles}
              colors={["#3b5998", "#BD33B5", "#E33324", "#25d366"]}
              count={count}
            />
          </div>
        </div>
        <div className="w-full flex-col md:flex-row flex gap-5 py-8">
          <div className="md:w-full w-full  bg-white rounded-xl overflow-hidden md:p-5">
            <SuperAdminTabel />
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedSuperAdmin(Dashboard);
