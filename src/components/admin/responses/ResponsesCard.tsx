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
  icon?: React.ReactElement;
};

export default function ResponsesCard({
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
    <div>
      <div
        onClick={() => router.push(`${clickableRoute}`)}
        className={` flex justify-between cursor-pointer flex-row shadow-[0_3px_10px_rgb(0,0,0,0.2)] items-center gap-4  p-6 transition duration-150 ease-in-out ${className}`}
      >
        <div className="flex h-full w-2/3 flex-col ">
          <h4
            className={`group-hover:text-white text-lg font-semibold ${contentClassName}`}
          >
            {content}
          </h4>

          {/* <h4 className={`text-sm ${contentClassName}`}>{content}</h4> */}
          <h1
            className={`group-hover:text-white text-md font-semibold ${titleClassName}`}
          >
            {title}
          </h1>
        </div>
        <div className={`rounded-full  ${iconClassName}`}>
          <div className="text-sm p-3 group-hover:text-white ">{icon}</div>
        </div>
      </div>
    </div>
  );
}
