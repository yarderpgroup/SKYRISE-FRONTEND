import { Avatar } from "@mui/material";
import { TESTIMONIALTWO } from "assets/property";

type Props = {
  title?: string;
  email?: string;
  number?: string;
  className?: string;
};

const DuePaymentDetails = ({ title, email, number, className }: Props) => {
  return (
    <div className="flex w-full py-3 flex-col gap-5 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-7 ">
          <div className="flex gap-4 ">
            <div className="">
              <Avatar
                sx={{
                  height: "3.5rem",
                  width: "3.5rem",
                  cursor: "pointer",
                }}
                src={TESTIMONIALTWO.src}
              ></Avatar>
            </div>
            <div>
              <h1 className="text-themeDarkGray font-bold text-base whitespace-nowrap">
                {title}
              </h1>
              <h2 className="text-themeDarkGray font-normal text-sm">
                {email}
              </h2>
              <h2 className="text-themeDarkGray font-normal text-sm">
                {number}
              </h2>
            </div>
          </div>
        </div>
        <div>
          <button className=" btn-one">Select</button>
        </div>
      </div>
    </div>
  );
};

export default DuePaymentDetails;
