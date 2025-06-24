import create from "zustand";
type TenantType = {
  tenantId?: string;
  setTenantId: any;
};

export const TenantIDStore = create<TenantType>((set) => ({
  setTenantId: (tenantId: string) => set({ tenantId: tenantId }),
}));
