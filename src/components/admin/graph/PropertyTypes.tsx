import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const PropertyTypes = () => {
  const series = [
    {
      name: "For Sell",
      data: [44, 55, 41, 67, 22, 43, 21, 49, 55, 41, 17, 22],
    },
    {
      name: "Buy",
      data: [13, 23, 20, 8, 13, 27, 33, 12, 23, 20, 8, 13],
    },
    {
      name: "Rent",
      data: [10, 33, 52, 28, 13, 27, 30, 20, 52, 12, 88, 53],
    },
    {
      name: "Others",
      data: [12, 28, 28, 82, 51, 42, 53, 71, 52, 42, 38, 73],
    },
  ];

  const options = {
    title: {
      text: "",
      style: {
        fontWeight: "700",
        fontSize: "16px",
        color: "black",
        fontFamily: "Montserrat",
      },
    },
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "normal",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
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
    plotOptions: {
      bar: {
        borderRadius: 10,
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
    },

    colors: ["#5B50A1", "#ff4560", "#3399FF", "#34b4eb"],
  };

  return (
    <div className="w-full bg-white shadow-xl rounded-xl  justify-center flex flex-col gap-4 p-5 border ">
      <h3 className="font-semibold tracking-wide text-lg">Property Types</h3>
      <ApexCharts
        options={options as any}
        height={500}
        series={series as any}
        type="bar"
      />
    </div>
  );
};

export default PropertyTypes;
