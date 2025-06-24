import { Avatar } from "@mui/material";
import { properties, rent, sell, visitor } from "assets/admin/properties";

import PropertiesBar from "components/admin/graph/PropertiesBar";
import PropertyTypes from "components/admin/graph/PropertyTypes";

import { PropertiesDashboardCard } from "components/admin/properties";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";
const admissionSeries = [
  {
    name: "2017-18",
    type: "column",
    data: [
      1400, 2000, 2500, 1500, 2500, 2800, 3800, 4600, 7900, 8900, 9000, 9500,
    ],
  },
  {
    name: "2018-19",
    type: "column",
    data: [
      1100, 1300, 2031, 1444, 1241, 1049, 1265, 2805, 3479, 2589, 4105, 4183,
    ],
  },
  {
    name: "2021-21",
    type: "line",
    data: [
      3000, 3500, 5000, 6000, 7000, 8000, 9000, 11000, 10000, 11000, 12000,
      13183,
    ],
  },
];

const dataOptions = {
  // title: {
  //   text: text,
  // },
  chart: {
    height: 350,
    type: "line",
    stacked: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [1, 1, 4],
  },
  // title: {
  //   text: "Repairs Report",
  //   align: "left",
  //   offsetX: 110,
  // },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  yaxis: [
    {
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: "#5B50A1",
      },
      labels: {
        style: {
          colors: "#5B50A1",
        },
      },
      title: {
        text: "Growth in Percentage",
        style: {
          color: "#5B50A1",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  ],
  colors: ["#999999", "#4D5969", "#BD33B5"],

  tooltip: {
    fixed: {
      enabled: true,
      position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
      offsetY: 30,
      offsetX: 60,
    },
  },
  legend: {
    horizontalAlign: "left",
    offsetX: 40,
  },
};
const Dashboard = () => {
  return (
    <TenantLayout title="Properties Dashboard">
      <div className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem)">
        <section className=" py-4">
          <div className="grid grid-cols-12 content-between gap-6  ">
            <PropertiesDashboardCard
              title="Total Properties"
              iconClassName="bg-gray-100  px-2 py-2 "
              content="125"
              titleClassName=" text-themeGray font-bold text-base pt-2"
              contentClassName="text-themeDarkGray text-3xl font-bold"
              className="col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-3  transition-all duration-500 ease-in-out hover:scale-95   "
              icon={<Avatar className="h-11 w-11 p-1 " src={properties.src} />}
              clickableRoute="/panel/admin/users/customers"
            />
            <PropertiesDashboardCard
              title="Total Application"
              iconClassName="bg-gray-100  px-2 py-2 "
              content="123"
              titleClassName=" text-themeGray font-bold text-base pt-2"
              contentClassName="text-themeDarkGray text-3xl font-bold"
              className="col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-3  transition-all duration-500 ease-in-out hover:scale-95   "
              icon={<Avatar className="h-11 !w-11 p-1 " src={rent.src} />}
              clickableRoute="/panel/admin/properties/view-property"
            />
            <PropertiesDashboardCard
              title="Total Visitor"
              iconClassName="bg-gray-100  px-2 py-2 "
              content="128"
              titleClassName="text-themeGray  font-bold text-base pt-2"
              contentClassName="text-themeDarkGray  text-3xl font-bold"
              className="col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-3  transition-all duration-500 ease-in-out hover:scale-95   "
              icon={<Avatar className="h-11 w-11 p-1 " src={visitor.src} />}
              clickableRoute="/panel/admin/property-visits"
            />
            <PropertiesDashboardCard
              title="Sale Properties"
              iconClassName="bg-gray-100  px-2 py-2 "
              content="128"
              titleClassName="text-themeGray font-bold text-base pt-2"
              contentClassName="text-themeDarkGray  text-3xl font-bold"
              className="col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-3  transition-all duration-500 ease-in-out hover:scale-95   "
              icon={<Avatar className="h-11 w-11 p-1 " src={sell.src} />}
              clickableRoute="/panel/admin/properties/view-property"
            />
          </div>
        </section>
        <section className=" w-full py-3 grid gap-5 grid-cols-11">
          <div className="w-full col-span-6 bg-white shadow-lg rounded-lg border flex flex-col gap-4 ">
            <h3 className="font-semibold tracking-wide text-lg p-5 ">
              Properties Overview
            </h3>
            <PropertiesBar
              type={"bar"}
              series={admissionSeries}
              options={dataOptions as any}
            />
          </div>

          <div className="w-full col-span-5">
            <PropertyTypes />
          </div>
        </section>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(Dashboard);
