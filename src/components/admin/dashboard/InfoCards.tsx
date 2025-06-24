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
  icon: React.ReactElement;
};

export default function InfoCards({
  title,
  icon,
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
        className={`flex hover:scale-105 common-transition hover:bg-themeDarkGray cursor-pointer dashboard-shadow justify-between flex-row dashboard-card-shadow items-center group gap-4 rounded-[1.5rem] p-6  ${className} `}
      >
        <div className="flex h-full w-2/3 flex-col ">
          <h4
            className={`text-lg !text-themeDarkGray group-hover:!text-white font-semibold ${contentClassName}`}
          >
            {content}
          </h4>

          <h1
            className={`text-md group-hover:text-white font-semibold ${titleClassName}`}
          >
            {title}
          </h1>
        </div>
        <div className={`rounded-xl w-fit ${iconClassName}`}>
          <div className="h-full w-[20%] text-sm p-3 ">{icon}</div>
        </div>
      </div>
    </>
  );
}
