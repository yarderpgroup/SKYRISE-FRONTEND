import { useRouter } from "next/router";

type Props = {
  title: string;
  content?: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contain?: string;
  contentClassName?: string;
  clickableRoute?: string;
  img?: string;
};

export default function SuperAdminDashboard({
  title,
  img,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",

  clickableRoute = "",
}: Props) {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push(`${clickableRoute}`)}
        className={`flex   cursor-pointer dashboard-shadow justify-between flex-row dashboard-card-shadow items-center  gap-4 rounded-[1.5rem] p-6  ${className} `}
      >
        <div className="flex h-full w-2/3 flex-col justify-center  ">
          <h4
            className={`text-lg !text-themeDarkGray  font-semibold ${contentClassName}`}
          >
            {content}
          </h4>

          <h1 className={`text-md  font-semibold ${titleClassName}`}>
            Total {title}
          </h1>
        </div>
        <div
          className={`md:w-[5rem] w-12 md:h-[5rem] h-12 rounded-full flex items-center justify-center !z-[250] shadow-[0_8px_30px_rgb(0,0,0,0.12)] md:gap-0 ${iconClassName}`}
        >
          <img src={img} alt="image" className="md:w-12 w-16" />
        </div>
      </div>
    </>
  );
}
