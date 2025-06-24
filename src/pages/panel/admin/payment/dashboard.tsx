import { MoreHoriz } from "@mui/icons-material";

import { Available, Maintenance, Other, TotalPay } from "assets/tenant";
import { PieGraph, RentRevenueGraph } from "components/admin/graph";
import {
  NotificationDetails,
  PaymentDashboard,
  PaymentHistoryDetails,
} from "components/admin/Payment";
import { TenantLayout } from "layouts";
import Link from "next/link";
const tourArr = [
  {
    id: "1",
    day: "20",
    tenants: "Natasha Dalal",
    month: "Jan",
    maintance: "$478543",
    mail: "test@gmail.com",
    address: "84R Salem St",
  },
  {
    id: "1",
    day: "18",
    month: "Jan",

    maintance: "$478543",
    tenants: "Natasha Dalal",

    mail: "test@gmail.com",
    address: "84R Salem St",
  },
  {
    id: "1",
    day: "17",
    month: "Jan",

    mode: "Virtual",
    maintance: "$478543",
    tenants: "Natasha Dalal",

    mail: "test@gmail.com",
    address: "84R Salem St",
  },
];
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
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: [
          {
            title: false,
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "80%",
          },
        },
        chart: {
          height: 300,
        },
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
const PaymentsHeader = [
  {
    id: 1,
    title: "Total Revenue",
    icon: <MoreHoriz className="!text-4xl cursor-pointer" />,
    heading: "$24355",
    img: TotalPay.src,

    link: "/panel/admin/payment/account-details",
  },
  {
    id: 2,
    title: "Maintenance Expenses",

    icon: <MoreHoriz className="!text-4xl cursor-pointer" />,
    heading: "$478543",
    img: Maintenance.src,

    link: "/panel/admin/payment/account-details",
  },
  {
    id: 3,
    title: "Total Rent Amount",
    icon: <MoreHoriz className="!text-4xl cursor-pointer " />,
    heading: "$27878",
    img: Available.src,
    link: "/panel/admin/payment/bank-account",
  },
  {
    id: 4,
    title: "Total Expenses",
    icon: <MoreHoriz className="!text-4xl cursor-pointer" />,
    heading: "$1877560",
    img: Other.src,

    link: "/panel/admin/payment/account-details",
  },
];

const Dashboard = () => {
  return (
    <TenantLayout title="Payment | SKYRISE">
      <div className="flex flex-col md:py-10 py-5 gap-5 md:gap-8 px-3 md:px-5 text-themeDarkGray">
        <div className="grid grid-cols-12 w-full gap-3 md:gap-5 h-full">
          {PaymentsHeader.map((item) => (
            <div key={item.id} className="col-span-6 md:col-span-3">
              <Link href={item.link}>
                <PaymentDashboard curElm={item} />
              </Link>
            </div>
          ))}
        </div>
        {/* <div className="flex gap-7 justify-center flex-col md:flex-row w-full">
          <div className="md:w-[70%] w-full h-full md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5 ">
            <h1 className="text-xl font-semibold mb-3">Payment Graph</h1>
            <PaymentGraph
              type={"bar"}
              series={admissionSeries}
              options={dataOptions as any}
            />
          </div>
          <div className="md:w-[30%]  w-full h-full md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5">
            <PaymentHistory />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center w-full h-full">
          <div className="w-full !order-2 md:!order-1 md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5">
            <PaymentDetails />
          </div>
          <div className="w-full !order-1 md:!order-2 block md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5">
            <PaymentPieGraph type="donut" />
          </div>
        </div> */}
        <div className="w-full flex-col md:flex-row flex gap-5">
          <div className="md:w-2/3 w-full md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5">
            <RentRevenueGraph
              title={"Payment Overview"}
              categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              className={``}
              series={[
                {
                  name: "Rent",
                  data: [28, 17, 20, 34, 20, 30, 35],
                },
                {
                  name: "Maintenance",
                  data: [1, 2, 1, 0, 10, 2, 2],
                },
              ]}
              colors={["#0072b1", "#999999"]}
              height={350}
            />
          </div>
          <div className="md:w-1/3 w-full md:shadow-[0px_13px_15px_1px_#00000011] bg-white rounded-xl overflow-hidden md:p-5">
            <PieGraph
              title="Monthly Expenses"
              labels={[
                "Total Revenue",
                "Maintenance Expenses",
                "Total Rent Amount",
                "Total Expenses",
              ]}
              colors={["#3b5998", "#BD33B5", "#E33324", "#25d366"]}
            />
          </div>
        </div>
        <div className="flex gap-8 w-full ">
          <div className=" w-[50%]">
            <h1 className="text-xl font-bold text-themeDarkGray">
              Payment Notification
            </h1>
            <div>
              <div className=" h-full flex justify-center">
                <div className="flex flex-col w-full gap-4 pt-5 md:gap-5 ">
                  {tourArr.map((item) => (
                    <NotificationDetails curElm={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[45%] shadow-[0px_13px_15px_1px_#00000011] p-6">
            <PaymentHistoryDetails />
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default Dashboard;
