import { ShowEmpty } from "components/core";
import { useState } from "react";

const OtherDetailsProperty = ({ curElm }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleChange = () => {
    setOpenDrawer(true);
  };
  return (
    <div className="py-4 flex flex-col gap-5 w-full">
      {curElm.length === 0 ? (
        <ShowEmpty />
      ) : (
        <div className="grid grid-cols-3 w-full gap-6">
          {curElm.map((innerElm: any) => (
            <div key={curElm.id}>
              <div className="">
                <h1 className="text-base font-bold text-themeDarkGray">
                  {innerElm?.heading}
                </h1>
                <h3>{innerElm?.description || "NA"}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OtherDetailsProperty;
