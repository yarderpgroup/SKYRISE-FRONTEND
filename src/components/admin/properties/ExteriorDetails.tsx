import { ShowEmpty } from "components/core";

const ExteriorDetails = ({ curElm }: any) => {
  return (
    <div className="py-4 flex flex-col w-full">
      {curElm?.length === 0 ? (
        <ShowEmpty />
      ) : (
        <div className="grid grid-cols-3 w-full gap-6">
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
      )}
    </div>
  );
};

export default ExteriorDetails;
