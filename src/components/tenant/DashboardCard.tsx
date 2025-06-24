import { Skeleton } from "@mui/material";
import Link from "next/link";

interface Props {
  curElm: {
    id: number;
    title: string;
    heading: string;
    img: string;
    wave: string;
    link: string;
  };
  isValidating: boolean;
}
const DashboardCard = ({ curElm, isValidating }: Props) => {
  return (
    <div className="w-full">
      <Link href={curElm.link}>
        <div className="bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] md:py-6 pb-6 md:px-5 px-2.5  w-full h-fit hover:scale-[1.03] common-transition gap-2 flex justify-between cursor-pointer text-themeDarkGray items-center rounded-lg md:rounded-2xl relative overflow-hidden">
          <div className=" w-full md:flex-row flex items-center md:justify-between md:gap-0 gap-2 py-2">
            <div className="md:w-[4.5rem] w-12 md:h-[4.5rem] h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-white to-twitter !z-[200] shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:gap-0">
              <img src={curElm.img} alt="image" className="md:w-10 w-7" />
            </div>
            <div className="text-start">
              {isValidating ? (
                <Skeleton variant="text" width={100} height={20} />
              ) : (
                <p className="md:text-3xl text-xl font-bold">
                  {curElm.heading}
                </p>
              )}
              <p className="md:text-sm text-xs">{curElm.title}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full !z-[0]">
            <img
              src={curElm.wave}
              alt="wave"
              className="w-full h-8 md:h-10 z-0"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DashboardCard;
