import useSWRAPI from "hooks/useSWRAPI";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const PropertyOverviewGraph = ({
  title,
  labels,
  colors,
  count,
}: {
  title?: string;
  labels?: string[];
  count?: any;
  colors?: string[];
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
        series={count || []}
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

export default PropertyOverviewGraph;
