import { DashboardWaveTwo, WAVE } from "assets/backgrounds";
import Link from "next/link";
import { useRouter } from "next/router";

interface menuItemsType {
  title: string;
  id?: string;
  link?: URL;
  menuItems: {
    title: string;
    id?: string;
    link: URL;
  };
}
const StepperSidebar = ({ menuItems }: any) => {
  const router: any = useRouter();
  let queryLen = 0;
  if (router?.query?.propertyID?.length > 0) {
    queryLen = router?.query?.propertyID?.length + 12;
  }
  return (
    <div className="flex w-full md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] text-themeDarkGray bg-white rounded-lg overflow-hidden h-full relative justify-between flex-col md:!min-h-[calc(100vh-8rem)] ">
      <div className="md:absolute hidden top-0 left-0 w-full h-32">
        <img src={WAVE.src} alt="wave" className="w-full rotate-180 h-full" />
      </div>
      <div className="flex w-screen md:w-full items-center md:items-start scrollBarNone overflow-scroll md:flex-col gap-2 md:gap-6 md:py-8 md:px-6 ">
        {menuItems?.map((item: menuItemsType, index: number) => (
          <div key={item.id}>
            {router?.asPath.slice(
              0,
              queryLen > 0 ? -queryLen : router?.asPath?.length
            ) === item?.link ? (
              <div className="flex items-center gap-1 text-sm md:text-base w-48 md:w-auto">
                <p
                  className={` rounded-full w-6 items-center justify-center flex h-6 
                   font-semibold text-themeDarkGray border border-primaryBorder
                  `}
                >
                  {index + 1}
                </p>
                <Link href={item.link as any}>
                  <p
                    className={`tracking-wide text-themeDarkGray font-semibold `}
                  >
                    {item?.title}
                  </p>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-sm md:text-base w-40 md:w-auto">
                <p
                  className={` rounded-full w-6 border border-primaryBorder/20 text-themeGray/30 items-center justify-center flex h-6 "text-themeGray/30"`}
                >
                  {index + 1}
                </p>
                <p className={`tracking-wide text-themeGray/30`}>
                  {item?.title}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <img src={DashboardWaveTwo.src} alt="wave" className="w-full h-20" />
      </div>
    </div>
  );
};

export default StepperSidebar;
