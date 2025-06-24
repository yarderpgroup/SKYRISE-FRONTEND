import { IOSSwitch } from "components/core";
const otherReportArr = [
  {
    id: 1,
    title: "Screening Report",
    subtitle: "credit Report (recommended)",
  },
  {
    id: 2,
    title: "View Sample Report",
    subtitle: "criminal Background Report(recommended)",
  },
  {
    id: 3,
    title: "Eviction Report",
    subtitle: "view ample report (recommended)",
  },
];

const OtherReportDetails = () => {
  return (
    <div>
      {otherReportArr?.map((item) => (
        <div key={item?.id} className="flex justify-between gap-3">
          <div className="pt-4">
            <h1 className="text-themeDarkGray text-base font-bold">
              {item?.title}
            </h1>
            <h2 className="text-black text-sm">{item?.subtitle}</h2>
          </div>
          <div>
            {" "}
            <IOSSwitch />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherReportDetails;
