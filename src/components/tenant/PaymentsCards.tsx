interface Props {
  curElm: {
    id: number;
    title: string;
    heading: string;
    img: string;
    wave: string;
  };
}

const PaymentCard = ({ curElm }: Props) => {
  return (
    <div className="w-full">
      <div className="bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] pt-6 pb-2 md:py-6 px-2 md:px-5 w-full md:h-fit hover:scale-[1.03] common-transition gap-2 flex justify-between cursor-pointer text-themeDarkGray items-center rounded-lg md:rounded-2xl relative overflow-hidden">
        <div className=" w-full flex items-center gap-3 md:justify-between py-2">
          <div className="md:w-[4.5rem] w-12 h-12 md:h-[4.5rem] rounded-full flex items-center justify-center bg-gradient-to-br from-white to-twitter !z-[200] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <img src={curElm.img} alt="image" className="w-7 md:w-10" />
          </div>
          <div className="text-start">
            <p className="md:text-3xl text-xl font-bold">{curElm.heading}</p>
            <p className="text-[10px] md:text-sm">{curElm.title}</p>
          </div>
        </div>
        <div className="absolute top-0 rotate-180 left-0 w-full !z-[0]">
          <img
            src={curElm.wave}
            alt="wave"
            className="w-full h-8 md:h-10 z-0"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
