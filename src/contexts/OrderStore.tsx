import create from "zustand";
type OrderStoreType = {
  addressId?: string;
  setAddressId: (updatedAddressId: string) => void;
  couponId?: any;
  productCouponLoading?: boolean;
  setProductCouponLoading: any;
  setCouponId: (updatedCoupon: {
    couponID: string;
    couponCode: string;
  }) => void;
};

export const useOrderStore = create<OrderStoreType>((set) => ({
  setAddressId: (updatedAddressId: string) =>
    set({ addressId: updatedAddressId }),
  setCouponId: (updatedCoupon: any) => set({ couponId: updatedCoupon }),
  productCouponLoading: false,
  setProductCouponLoading: (val: any) => set({ productCouponLoading: val }),
}));
