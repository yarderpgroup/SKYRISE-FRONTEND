import { Skeleton } from "@mui/material";
import Link from "next/link";

interface Props {
  curElm: {
    id: string;
    title: string;
    path: string;
    img: string;
  };
  isUserLoading: string;
}
const QuickLinkCard = ({ curElm, isUserLoading }: Props) => {
  return (
    <div className="col-span-4 text-themeDarkGray">
      {isUserLoading ? (
        <div className="w-full h-48 ">
          <Skeleton animation="wave" className="" height={300} />
        </div>
      ) : (
        <Link href={curElm.path}>
          <div className="w-full flex flex-col items-center justify-center text-center gap-2 border border-primaryBorder/50 h-48 group rounded-md cursor-pointer hover:bg-themeGray/10 common-transition ">
            <div className="w-1/4">
              <div className="w-fit h-fit p-2">
                <img
                  src={curElm.img}
                  alt="logo"
                  className="w-20 group-hover:scale-105 common-transition"
                />
              </div>
            </div>
            <div className="w-3/4">
              <p className="text-lg font-semibold">{curElm.title}</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default QuickLinkCard;
