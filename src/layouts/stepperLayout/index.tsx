import StepperSidebar from "./StepperSidebar";

type Props = {
  children: JSX.Element[] | JSX.Element;
  menuItems?: any;
};

export default function stepperLayout({ menuItems, children = <></> }: Props) {
  return (
    <section
      className={`w-full flex md:flex-row flex-col gap-4 md:gap-6 h-full relative`}
    >
      <div className="md:w-[22%] w-full h-full md:sticky top-24">
        <StepperSidebar menuItems={menuItems} />
      </div>
      <div className="md:w-[78%] w-full">{children}</div>
    </section>
  );
}
