const HomePriceRent = ({ curElm }: any) => {
  return (
    <div className="pt-4">
      <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
        {curElm?.map((curElm: any) => (
          <div key={curElm.id}>
            <div className="">
              <h1 className="text-base font-bold text-themeDarkGray">
                {curElm?.title}
              </h1>
              <h3>{curElm?.description || "NA"}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePriceRent;
