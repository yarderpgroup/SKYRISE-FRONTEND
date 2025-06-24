import { ArrowRightAlt } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import Link from "next/link";

interface Props {
  curElm: {
    id: number;
    title: string;
    description: string;
    path: string;
    icon: JSX.Element;
  };
  isUserLoading: boolean;
}
const DashboardCard = ({ curElm, isUserLoading }: Props) => {
  return (
    <div key={curElm?.id} className="col-span-4">
      {isUserLoading ? (
        <div className="w-full !h-32">
          <Skeleton animation="wave" className="" height={180} />
        </div>
      ) : (
        <Link href={curElm?.path}>
          <div className="items-center justify-center bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] flex gap-2 h-32   rounded-lg hover:bg-theme common-transition group hover:!text-white cursor-pointer p-3">
            <div className="w-1/4 flex items-end justify-end">
              <p className="rounded-full flex items-center justify-center w-14 h-14 text-white p-3 bg-gradient-to-br from-themeGray to-themeDarkGray shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                {curElm?.icon}
              </p>
            </div>
            <div className="flex gap-2 w-3/4">
              <div className="flex flex-col w-full">
                <p className="text-xl font-semibold ">{curElm?.title}</p>
                <p className="text-sm leading-5">{curElm?.description}</p>
              </div>
              <div className="w-fit flex items-center">
                <ArrowRightAlt className="!text-4xl group-hover:translate-x-2 common-transition group-hover:text-white" />
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default DashboardCard;
