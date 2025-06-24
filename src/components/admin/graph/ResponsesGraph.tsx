import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ResponsesGraph({ type, labels, series }: any) {
  const options = {
    series: series,
    options: {
      chart: {
        type: type,
      },
      labels: ["Buy Responses", "Sell Responses"],

      colors: ["#b00b13", "#005d32"],
    },
  };

  return (
    <>
      <div className="p-3">
        <h2 className="text-black font-semibold pl-5 pb-8">Responses Status</h2>
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
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              height: 20,
            },

            labels: labels,

            colors: ["#db2777", "#C04000", "#E97451"],
          }}
          series={series}
          type={type}
        />
      </div>
    </>
  );
}
