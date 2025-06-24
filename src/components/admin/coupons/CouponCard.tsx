import dayjs from "dayjs";
import { toast } from "react-toastify";
import { CouponCardType } from "types";

interface Props {
  coupon: CouponCardType;
  setIsCoupon: any;
  isCoupon: any;
}
const CouponCard = ({ coupon, setIsCoupon, isCoupon }: Props) => {
  const handleCoupon = async (coupon: CouponCardType) => {
    setIsCoupon(null);
    new Date(coupon?.validFrom) > new Date()
      ? toast.error("Coupon is not valid yet")
      : setIsCoupon(coupon);
  };
  return (
    <section className="w-full">
      <button
        onClick={() => handleCoupon(coupon)}
        className={`${
          isCoupon?.couponCode === coupon?.couponCode
            ? "bg-themeDarkGray !text-white rounded "
            : " border-theme border border-dashed "
        }rounded-md w-full h-10 overflow-hidden`}
      >
        <p className="text-sm font-semibold">{coupon?.couponCode}</p>
      </button>
      <div className="flex justify-between gap-1 text-xs pt-2">
        {/* <p className="font-semibold">{coupon?.title}</p> */}
        {/* <p className="">{coupon?.description}</p> */}
        <p className="">Valid From : {dayjs(coupon?.validFrom).format("LL")}</p>

        <p className="">Expires on : {dayjs(coupon?.validTill).format("LL")}</p>
      </div>
      {/* add more  button */}
    </section>
  );
};

export default CouponCard;
