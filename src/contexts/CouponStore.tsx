import create from "zustand";

type CouponDetailsType = {
  couponID?: string;
  couponCode?: string;
  productCouponID?: string;
  productCouponCode?: string;
  addressDetails?: string;
};
type CouponStoreType = {
  couponDetails: CouponDetailsType;
  couponApplied: boolean;
  setCouponApplied: any;
  setCouponDetails: any;
  productCouponDetails: CouponDetailsType;
  setProductCouponDetails: any;
  loadingCoupon?: boolean;
  setLoadingCoupon: any;
  setAddressDetails?: any;
  addressDetails?: any;
};

const CouponStore = create<CouponStoreType>((set) => ({
  couponDetails: {},
  couponApplied: false,
  setCouponApplied: async (applied: boolean) => {
    set({ couponApplied: applied });
  },
  setCouponDetails: async (couponDetails: CouponDetailsType) => {
    set({ couponDetails: couponDetails });
  },
  loadingCoupon: false,
  setLoadingCoupon: (value: boolean) => {
    set({ loadingCoupon: value });
  },
  productCouponDetails: {},
  setProductCouponDetails: async (productCouponDetails: CouponDetailsType) => {
    set({ productCouponDetails: productCouponDetails });
  },
  addressDetails: {},
  setAddressDetails: async (addressDetails: CouponDetailsType) => {
    set({ addressDetails: addressDetails });
  },
}));

export default CouponStore;
