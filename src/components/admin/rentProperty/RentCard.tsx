import Link from "next/link";

interface Props {
  curElm: {
    id: string;
    title: string;
    path: string;
    img: string;
    desc: string;
  };
}
const RentCard = ({ curElm }: Props) => {
  return (
    <div className=" col-span-5 lg:col-span-2 !text-themeDarkGray items-center">
      <Link href={curElm.path}>
        <div className="w-full flex flex-col items-center justify-center text-center gap-2 border border-primaryBorder/50 h-48 group rounded-md cursor-pointer hover:bg-themeGray/10 common-transition px-4 ">
          <div className="w-full h-[45%] items-end justify-center flex">
            <img
              src={curElm.img}
              alt="logo"
              className="w-16 group-hover:scale-105 common-transition"
            />
          </div>
          <div className="w-full h-[45%]">
            <p className="text-lg font-semibold leading-5">{curElm.title}</p>
            <p className="text-sm">{curElm.desc}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RentCard;
