import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ColumnChartStoreDashboard({
  type,
  text = "",
}: {
  type: "radialBar" | "bar";
  text?: string;
}) {
  const options = {
    series: [
      {
        name: "Total Stores",
        data: [35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 98],
      },
      {
        name: "Total Manager",
        data: [10, 15, 18, 25, 32, 40, 45, 48, 50, 55, 60, 76],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
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
    },
  };

  return (
    <div className="m-3">
      <ApexCharts
        height={"400"}
        options={{
          title: {
            text: text,
            // style: {
            //   fontWeight: "600",
            //   fontSize: "18px",
            //   color: "#db2777",
            //   fontFamily: "Montserrat",
            // },
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
          colors: ["#4D5969", "#999999"],
          // labels: ["Pending", "Verified"],
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
}
