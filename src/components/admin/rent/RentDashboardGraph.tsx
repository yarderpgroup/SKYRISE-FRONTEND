import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RadialBarUserDashboard({
  type,
  labels,
  series,
}: {
  type: "radialBar";
  labels: any;
  series: any;
}) {
  const options = {
    series: series,
    options: {
      chart: {
        height: 390,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },

      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 160,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {
          size: 0,
        },
        //   formatter: function(seriesName, opts) {
        //     return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
        //   },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    },
  };

  return (
    <div className="m-3">
      <p className="text-black font-semibold text-center">Rent Property view</p>
      <ApexCharts
        height={"300"}
        options={{
          chart: {
            height: 390,
            type: "radialBar",
            width: 100,
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: "30%",
                background: "transparent",
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          //   colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
          //   labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
          legend: {
            show: true,
            floating: true,
            fontSize: "16px",
            position: "left",
            offsetX: -20,
            offsetY: 38,
            labels: {
              useSeriesColors: true,
            },
            // markers: {
            //     size: 0,
            // },
            formatter: function (seriesName, opts) {
              return (
                seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              );
            },
            itemMargin: {
              vertical: 3,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  show: false,
                },
              },
            },
          ],
          colors: ["#db2777", "#E97451"],
          labels: labels,
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
}
