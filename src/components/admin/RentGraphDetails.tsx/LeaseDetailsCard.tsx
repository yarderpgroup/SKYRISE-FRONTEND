import { useRouter } from "next/router";

type Props = {
  title: string;
  content?: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contain?: string;
  contentClassName?: string;
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
}: Props) {
  const router = useRouter();
  return (
    <>
      <div
        className={`flex bg-gradient-to-br from-themeDarkGray/90 to-facebook/70 cursor-pointer dashboard-shadow justify-between flex-row dashboard-card-shadow items-center group gap-4 rounded-3xl p-6  ${className} `}
      >
        <div className="flex h-full w-2/3 flex-col justify-center  ">
          <h4
            className={`text-lg !text-white font-semibold ${contentClassName}`}
          >
            {content}
          </h4>

          <h1 className={` text-white font-semibold ${titleClassName}`}>
            {title}
          </h1>
        </div>
        <div className={`rounded-xl w-fit ${iconClassName}`}>
          <div className=" ">{icon}</div>
        </div>
      </div>
    </>
  );
}
