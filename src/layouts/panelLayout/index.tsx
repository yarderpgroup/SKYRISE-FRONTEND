import Sidebar from "./Sidebar";

type Props = {
  children: JSX.Element[] | JSX.Element;
};

export default function panelLayout({ children = <></> }: Props) {
  return (
    <section
      className={`w-full items-center justify-center flex md:flex-row relative flex-col gap-4 md:gap-6 h-full`}
    >
      <div className="md:w-11/12 w-full flex md:gap-6">
        <div className="md:w-[22%] w-full h-full hidden md:block md:sticky top-24">
          <Sidebar />
        </div>
        <div className="md:w-[78%] w-full">{children}</div>
      </div>
    </section>
  );
}
