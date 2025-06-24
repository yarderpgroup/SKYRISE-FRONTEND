import { Avatar } from "@mui/material";
import { TenantLayout } from "layouts";

const paymentHeadingArr = [
  {
    id: "0",
    title: "Name",
    className: "col-span-1 md:col-span-2",
  },
  {
    id: "1",
    title: "Date",
    className: "hidden md:block md:col-span-1",
  },
  {
    id: "2",
    title: "Type",
    className: "hidden md:block md:col-span-1",
  },
  {
    id: "3",
    title: "Source",
    className: "hidden md:block md:col-span-1",
  },
  {
    id: "4",
    title: "Charges",
    className: "col-span-1",
  },
  {
    id: "5",
    title: "Balance",
    className: "col-span-1",
  },
];
const PaymentRecordData = [
  {
    id: "1",
    date: "Dec 2 ,2022",
    type: "Rent",
    time: "5:10 AM",
    invoiceID: "9583235",
    source: "Property",
    charge: "$9875",
    balance: "$8768787",
  },
  {
    id: "2",
    date: "Dec 2 ,2022",
    type: "Parking fees",
    time: "5:10 AM",
    invoiceID: "9583235",
    source: "Property",
    charge: "$9875",
    balance: "$8768787",
  },
  {
    id: "3",
    date: "Dec 2 ,2022",
    type: "American Express",
    invoiceID: "9583235",
    time: "5:10 AM",
    source: "You",
    charge: "$9875",
    balance: "$8768787",
  },
  {
    id: "4",
    date: "Dec 2 ,2022",
    type: "Rent",
    invoiceID: "9583235",
    source: "Property",
    time: "5:10 AM",
    charge: "$9875",
    balance: "$8768787",
  },
  {
    id: "5",
    date: "Dec 2 ,2022",
    type: "Parking fees",
    invoiceID: "9583235",
    source: "Property",
    charge: "$9875",
    time: "5:10 AM",
    balance: "$8768787",
  },
  {
    id: "6",
    date: "Dec 2 ,2022",
    type: "RUBES Utilities",
    source: "Property",
    invoiceID: "9583235",
    charge: "$9875",
    balance: "$8768787",
    time: "5:10 AM",
  },
  {
    id: "7",
    date: "Dec 2 ,2022",
    type: "Rent",
    invoiceID: "9583235",
    source: "Property",
    charge: "$9875",
    balance: "$8768787",
    time: "5:10 AM",
  },
];
const AccountDetails = () => {
  return (
    <TenantLayout title="Payment History | SKYRISE">
      <div className="w-full md:py-10 py-5 px-3 md:px-5 text-themeDarkGray">
        <div className="flex flex-col w-full md:px-5 gap-4">
          <div className="grid grid-cols-3 md:grid-cols-7 bg-themeGray/10 py-5 rounded-md w-full px-2 md:px-5">
            {paymentHeadingArr.map((item) => (
              <div
                key={item.id}
                className={`${item.className} ${
                  item.id === "5"
                    ? "justify-end"
                    : item.id === "4"
                    ? "justify-center"
                    : "justify-start"
                } flex`}
              >
                <p className="md:text-lg font-semibold text-base">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full flex gap-9 flex-col ">
            {PaymentRecordData.map((item) => (
              <div className="w-full grid grid-cols-3 md:grid-cols-7 px-3 md:px-5">
                <div className="col-span-1 md:col-span-2 flex items-center gap-2">
                  <div className="hidden md:block">
                    <Avatar src="" sx={{ width: "3rem", height: "3rem" }}>
                      {item.type && item.type[0]}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm md:text-base">
                      {item.type}
                    </p>
                    <p className="text-sm hidden md:block">{item.invoiceID}</p>
                    <p className="block md:hidden text-xs">{item.date}</p>
                  </div>
                </div>
                <div className="col-span-1 text-xs md:text-base hidden md:block">
                  <p className="font-semibold text-xs md:text-base">
                    {item.date}
                  </p>
                  <p className="text-sm ">At {item.time}</p>
                </div>
                <div className="col-span-1 hidden md:block text-xs md:text-base">
                  {item.type}
                </div>
                <div className="col-span-1 hidden md:block text-xs md:text-base">
                  {item.source}
                </div>
                <div className="col-span-1 justify-center flex items-center text-xs md:text-base">
                  {item.charge}
                </div>
                <div className="col-span-1 flex justify-end items-center text-xs md:text-base">
                  {item.balance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default AccountDetails;
