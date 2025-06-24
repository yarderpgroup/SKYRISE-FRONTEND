import { AccountBalance } from "@mui/icons-material";

type Props = {
  icon?: React.ReactElement;
  title?: string;
  des?: string;
  heading?: string;
  className?: string;
};

const PaymentCard = ({ title, des, heading, className }: Props) => {
  return (
    <div className="flex w-full py-3 flex-col gap-5 hover:scale-[1.03] common-transition">
      <div className="flex flex-col gap-7 ">
        <div className="grid h-fit w-full cursor-pointer grid-cols-5 items-center justify-center   ">
          <div className="flex flex-col items-start justify-start ">
            <div className="rounded-xl bg-[#ff7a29]  flex justify-center items-center h-10 w-10">
              <AccountBalance className="!text-3xl !text-white ] " />
            </div>
          </div>
          <div className="col-span-4 pr-2">
            <div className="flex flex-row gap-4 justify-between">
              <div>
                <h1 className="text-base font-bold text-themeDarkGray">
                  {title}
                </h1>
                <p className="text-themeDarkGray text-sm">{des}</p>
              </div>
              <div className="">
                <h3 className="text-base text-themeDarkGray">{heading}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
