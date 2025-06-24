import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboardGraph({
  className = "",
  title = "",
  series,
  categories = [
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
  colors,
  height = 320,
}: {
  title?: string;
  className?: string;
  series?: any[];
  categories?: string[];
  colors?: string[];
  height?: number;
}) {
  return (
    <div className={` ${className} rounded-lg`}>
      <h3 className="font-semibold pb-3 text-start w-full tracking-wide text-themeDarkGray text-lg ">
        {title}
      </h3>
      <ApexCharts
        height={height}
        options={{
          title: {
            text: "",
          },
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              //   endingShape: "rounded",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: categories || [],
          },
          yaxis: {
            // title: {
            //   text: "$ (thousands)",
            // },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            //   y: {
            //     formatter: function (val) {
            //       return "$ " + val + " thousands"
            //     }
            //   }
          },
          responsive: [
            {
              breakpoint: 600,
              options: {
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: "90%",
                  },
                },
                chart: {
                  height: 250,
                },
              },
            },
          ],
          colors: colors || [],
        }}
        series={series}
        type={"bar"}
      />
    </div>
  );
}
