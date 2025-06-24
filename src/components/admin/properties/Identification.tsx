const Identification = ({curElm}:any) => {
  return (
    <>
      <div className="pt-4">
        <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
          Property Photos
        </h1>
        <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
          {curElm.map((curElm: any) => (
            <div key={curElm.id}>
              <img
                src={curElm?.photo}
                alt=""
                className="w-full h-40 2xl:h-48"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Identification;
