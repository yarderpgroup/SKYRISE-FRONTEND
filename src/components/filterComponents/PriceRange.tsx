import { CustomRangeSlider } from "components/core";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setPriceRange: Dispatch<SetStateAction<number[]>>;
  priceRange: number[];
}
const PriceRange = ({ setPriceRange, priceRange }: Props) => {
  const [isMinPrice, setIsMinPrice] = useState();
  const handelPriceChange = (price: number[]) => {
    setPriceRange(price);
  };
  return (
    <div className="w-full flex items-center justify-center flex-col gap-2 md:gap-5">
      <p className="text-xl font-semibold text-start w-full">Price</p>
      <div className="md:w-3/5 w-4/5 flex flex-col">
        <div className="flex flex-col  gap-5">
          <div className="w-full flex pt-5">
            <CustomRangeSlider
              maxValue={2500000}
              value={priceRange}
              isMinPrice={isMinPrice}
              setValue={(priceRange: number[]) => handelPriceChange(priceRange)}
              bothValue={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
