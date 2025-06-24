import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PaymentPieGraph({ type }: any) {
  const options = {
    series: [35, 25, 30, 10],
    options: {
      chart: {
        type: type,
      },
      labels: ["Received Amount", "Distribution Amount"],
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 200,
      //       },
      //       legend: {
      //         position: 'bottom',
      //       },
      //     },
      //   },
      // ],
      colors: ["#b00b13", "#005d32"],
    },
  };

  return (
    <>
      <div className="md:p-5">
        <h2 className="text-xl font-semibold mb-5">Payment Status</h2>
        <ApexCharts
          height={"340"}
          options={{
            chart: {
              type: "donut",
              height: 850,
              width: "100%",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "50%",
                },
              },
            },

            //   dataLabels: {
            //     formatter: function (w) {
            //       return 249
            //     },
            //   },
            //   {
            //     total: {
            //       show: true,
            //       label: 'Total',
            //       formatter: function (w) {
            //         return 249
            //       },
            //     },
            //   },
            // ],

            labels: [
              "Total Pay",
              "Maintenance pay",
              "Available Balance",
              "others",
            ],

            colors: ["#C656C9", "#5856C9", "#5FC956", "#F7F70C"],
          }}
          series={options.series}
          type={type}
        />
      </div>
    </>
  );
}
