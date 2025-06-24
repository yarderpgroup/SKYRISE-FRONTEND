const OtherDetailsRent = ({ curElm, innerElm, innerItem }: any) => {
  return (
    <div>
      <div className="pt-4">
        <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
          Terms Details
        </h1>
        {innerElm?.map((innerElm: any) => (
          <div
            key={innerElm.id}
            className="grid grid-cols-12 w-full gap-6  pt-4 "
          >
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Display Name:
              </h1>
              <h3>{innerElm?.displayName || "NA"}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                ContactNumber:
              </h1>
              <h3>{innerElm?.contactNumber || "NA"}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Available Date:
              </h1>
              <h3>{innerElm?.availableDate || "NA"}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">Pets:</h1>
              <h3>{innerElm?.isPets ? "Yes" : "No"}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Lease Duration:
              </h1>
              <h3>{innerElm?.leaseDuration || "NA"}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                MoveInFees :
              </h1>
              <h3>{innerElm?.moveInFees || "NA"}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Parking :
              </h1>
              <h3>{innerElm?.parking}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                RentPrice :
              </h1>
              <h3>{innerElm?.rentPrice || "NA"}</h3>
            </div>
            <div className="col-span-2">
              <h1 className="text-base font-bold text-themeDarkGray">
                Security Deposit :
              </h1>
              <h3>{innerElm?.securityDeposit || "NA"}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4">
        <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
          Parking Details
        </h1>
        <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
          {innerItem?.map((innerElm: any) => (
            <div key={innerElm.id}>
              <div className="">
                <h1 className="text-base font-bold text-themeDarkGray">
                  {innerElm?.title}
                </h1>
                <h3>{innerElm?.description || "NA"}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-4">
        <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
          Pets Details
        </h1>
        <div className="grid grid-cols-3 w-full gap-6  pt-4 ">
          {curElm?.map((innerElm: any) => (
            <div key={innerElm.id}>
              <div className="">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Pet Type
                </h1>
                <h3>{innerElm?.petType || "NA"}</h3>
              </div>
              <div className="">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Pet Rent
                </h1>
                <h3>{innerElm?.petRent || "NA"}</h3>
              </div>
              <div className="">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Pet Limit
                </h1>
                <h3>{innerElm?.petLimit || "NA"}</h3>
              </div>
              <div className="">
                <h1 className="text-base font-bold text-themeDarkGray">
                  Pet Description
                </h1>
                <p>{innerElm?.petDescription || "NA"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherDetailsRent;
