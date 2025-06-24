import { ShowEmpty } from "components/core";

const TermDetails = ({ curElm }: any) => {
  return (
    <>
      {curElm?.length === 0 ? (
        <ShowEmpty />
      ) : (
        <div className="">
          {curElm?.map((curElm: any) => (
            <div key={curElm.id} className="grid grid-cols-12">
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Contact Number:
                </h1>
                <h3>{curElm?.contactNumber || "NA"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  DisplayName:
                </h1>
                <h3>{curElm?.displayName || "NA"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Lease Duration:
                </h1>
                <h3>{curElm?.leaseDuration || "NA"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  MoveIn Fees:
                </h1>
                <h3>{curElm?.moveInFees || "NA"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Parking Fee:
                </h1>
                <h3>{curElm?.parking || "NA"}</h3>
              </div>
              <div className="col-span-2">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Rent Price:
                </h1>
                <h3>{curElm?.rentPrice || "NA"}</h3>
              </div>
              <div className="col-span-2 pt-3">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Security Deposit:
                </h1>
                <h3>{curElm?.securityDeposit || "NA"}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TermDetails;
