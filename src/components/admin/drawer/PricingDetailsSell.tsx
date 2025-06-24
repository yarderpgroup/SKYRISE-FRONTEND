import { ShowEmpty } from "components/core";

const PricingDetailsSell = ({ curElm }: any) => {
  return (
    <>
      {curElm.length === 0 ? (
        <ShowEmpty />
      ) : (
        <div className="py-4 flex flex-col gap-5 w-full">
          {curElm.map((innerElm: any) => (
            <div
              key={innerElm.id}
              className="grid grid-cols-12 w-full gap-6   "
            >
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Ownership:
                </h1>
                <h3>{innerElm?.ownership || "NA"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Description:
                </h1>
                <h3>{innerElm?.description || "NA"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Expected Price:
                </h1>
                <h3>{innerElm?.expectedPrice || "NA"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Leased:
                </h1>
                <h3>{innerElm?.isLeased ? "Yes" : "No"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Negotiable:
                </h1>
                <h3>{innerElm?.isNegotiable ? "Yes" : "No"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Tax :
                </h1>
                <h3>{innerElm?.isTax ? "Yes" : "No"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Rent PerMonth :
                </h1>
                <h3>{innerElm?.retPerMonth || "NA"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  SquareFt :
                </h1>
                <h3>{innerElm?.squareFt || "NA"}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PricingDetailsSell;
