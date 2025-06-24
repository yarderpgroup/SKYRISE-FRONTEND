import { Edit } from "@mui/icons-material";
import { useState } from "react";
import AddRuleDetails from "./AddRuleDetails";
import EditRuleDetails from "./EditRuleDetails";

const clausesArr = [
  {
    id: 1,
    title: "1.Rent",
    description:
      ". Tenant shall pay, in lawful money of the United States of America which shall be legal tender for the payment of public and private debts, without offset, abatement, demand or deduction (unless otherwise expressly provided in this Agreement), Minimum Rent and Additional Rent to Landlord and Additional Charges to the party to whom such Additional Charges are payable, during the Term. All payments to Landlord shall be made by wire transfer of immediately available federal funds or by other means acceptable to Landlord in its sole discretion. Rent for any partial calendar month shall be prorated on a per diem basis.",
  },
  {
    id: 2,
    title: "2.Security Deposit",
    description:
      ". Tenant shall pay, in lawful money of the United States of America which shall be legal tender for the payment of public and private debts, without offset, abatement, demand or deduction (unless otherwise expressly provided in this Agreement), Minimum Rent and Additional Rent to Landlord and Additional Charges to the party to whom such Additional Charges are payable, during the Term. All payments to Landlord shall be made by wire transfer of immediately available federal funds or by other means acceptable to Landlord in its sole discretion. Rent for any partial calendar month shall be prorated on a per diem basis.",
  },
  {
    id: 3,
    title: "Smoking Prohibition",
    description:
      ". Tenant shall pay, in lawful money of the United States of America which shall be legal tender for the payment of public and private debts, without offset, abatement, demand or deduction (unless otherwise expressly provided in this Agreement), Minimum Rent and Additional Rent to Landlord and Additional Charges to the party to whom such Additional Charges are payable, during the Term. All payments to Landlord shall be made by wire transfer of immediately available federal funds or by other means acceptable to Landlord in its sole discretion. Rent for any partial calendar month shall be prorated on a per diem basis.",
  },
  {
    id: 4,
    title: "1.Rent",
    description:
      ". Tenant shall pay, in lawful money of the United States of America which shall be legal tender for the payment of public and private debts, without offset, abatement, demand or deduction (unless otherwise expressly provided in this Agreement), Minimum Rent and Additional Rent to Landlord and Additional Charges to the party to whom such Additional Charges are payable, during the Term. All payments to Landlord shall be made by wire transfer of immediately available federal funds or by other means acceptable to Landlord in its sole discretion. Rent for any partial calendar month shall be prorated on a per diem basis.",
  },
  {
    id: 5,
    title: "1.Rent",
    description:
      ". Tenant shall pay, in lawful money of the United States of America which shall be legal tender for the payment of public and private debts, without offset, abatement, demand or deduction (unless otherwise expressly provided in this Agreement), Minimum Rent and Additional Rent to Landlord and Additional Charges to the party to whom such Additional Charges are payable, during the Term. All payments to Landlord shall be made by wire transfer of immediately available federal funds or by other means acceptable to Landlord in its sole discretion. Rent for any partial calendar month shall be prorated on a per diem basis.",
  },
];

const RulesDetails = () => {
  const [openClauses, setOpenClauses] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div>
      <EditRuleDetails
        open={openClauses}
        onClose={() => setOpenClauses(false)}
      />
      <AddRuleDetails
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      />

      <div className="flex flex-col gap-3 py-5">
        {clausesArr?.map((item) => (
          <div
            key={item?.id}
            className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-gradient-to-b from-themeGray/10 to-white  p-5"
          >
            <div className="flex justify-between">
              <h1 className="text-base font-bold text-themeDarkGray">
                {item?.title}
              </h1>
              <div
                onClick={() => setOpenClauses(true)}
                className="gradientButton  rounded-full h-8 w-8 flex justify-center items-center"
              >
                <Edit className="text-white h-5 w-8 " />
              </div>
            </div>
            <p>{item?.description}</p>
          </div>
        ))}
      </div>
      <div className="py-3">
        <button
          onClick={() => setOpenDetails(true)}
          className="md:w-40 w-30 text-xs md:text-base text-white rounded-md bg-themeDarkGray  border font-bold border-themeDarkGray px-1.5 py-2 md:py-2.5 text-center"
        >
          Add New Rule
        </button>
      </div>
    </div>
  );
};

export default RulesDetails;
