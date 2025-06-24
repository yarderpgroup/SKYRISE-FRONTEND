import { ArrowRightAltSharp } from "@mui/icons-material";
import useAuth from "hooks/useAuth";
import Link from "next/link";

const TenantPaymentCard = ({
  totalAmount,
  propertyId,
}: {
  totalAmount: number;
  propertyId: string;
}) => {
  const { user } = useAuth();
  return (
    <div className="w-full md:h-60 h-40 rounded-xl !z-0 overflow-hidden shadow-[0px_13px_15px_1px_#00000011] bg-red-800 flex flex-col justify-between common-transition md:p-6 p-3 text-white relative">
      <div className="absolute -top-10 -right-10 md:h-40 h-[100px] md:w-40 w-[100px] bg-gradient-to-br to-theme/90 from-themeDarkGray rounded-full z-0"></div>
      <div className="w-full flex flex-col md:gap-4 gap-2">
        <p>Total Monthly Expenses</p>
        <p className="md:text-4xl text-2xl font-semibold leading-8">
          $ {totalAmount}
        </p>
      </div>
      <div className="w-full flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <p>
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <Link href={`/panel/tenant/${propertyId}/payment/record`}>
          <button className="">
            View <ArrowRightAltSharp />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TenantPaymentCard;
