import { Check } from "@mui/icons-material";
import { PaymentCard } from "../dashboard";

const paymentCard = [
  {
    id: 1,
    title: "Eaton PentHouse",
    icon: <Check className="!text-3xl !text-white ] " />,
    des: "5 march, 18:33.",
    heading: "$ 12,434.00",
    className: "#ff7a29",
  },
  {
    id: 2,
    title: "Eaton PentHouse",
    icon: <Check className="!text-3xl !text-white ] " />,
    des: "5 march, 18:33",
    heading: "$ 12,434.00",
    className: "#6d73f6",
  },
  {
    id: 3,
    title: "Eaton PentHouse",
    icon: <Check className="!text-3xl !text-white ] " />,
    des: "5 march, 18:33",
    heading: "$ 12,434.00",
    className: "#6546d2",
  },
  {
    id: 4,
    title: "Eaton PentHouse",
    icon: <Check className="!text-3xl !text-white ] " />,
    des: "5 march, 18:33",
    heading: "$ 12,434.00",
    className: "#00cfde",
  },
  {
    id: 5,
    title: "Eaton PentHouse",
    icon: <Check className="!text-3xl !text-white ]" />,
    des: "5 march, 18:33",
    heading: "$ 12,434.00",
    className: "#00cfde",
  },
];

const Monthly = () => {
  return (
    <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="p-5">
        <h1 className="text-xl font-bold text-black">Monthly Invoice</h1>
      </div>
      {paymentCard?.map((item) => (
        <>
          <PaymentCard
            title={item?.title}
            icon={item?.icon}
            des={item?.des}
            heading={item?.heading}
            key={item?.id}
            className={item?.className}
          />
        </>
      ))}
    </div>
  );
};

export default Monthly;
