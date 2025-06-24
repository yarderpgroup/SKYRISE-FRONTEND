import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PieGraph = ({
  title,
  labels,
  colors,
  monthlySeries,
}: {
  title?: string;
  labels?: string[];
  colors?: string[];
  monthlySeries?: any;
}) => {
  return (
    <div className=" w-full flex flex-col gap-3 md:gap-5 items-center">
      <h3 className="font-semibold pb-3 text-start w-full tracking-wide text-themeDarkGray text-lg ">
        {title}
      </h3>
      <ReactApexChart
        type="pie"
        height={380}
        width={380}
        series={monthlySeries}
        options={{
          chart: {
            width: 380,
            type: "pie",
          },
          legend: {
            position: "bottom",
          },
          colors: colors,
          labels: labels,
          responsive: [
            {
              breakpoint: 1500,
              options: {
                chart: {
                  width: 350,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
            {
              breakpoint: 1200,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        }}
      />
    </div>
  );
};

export default PieGraph;
