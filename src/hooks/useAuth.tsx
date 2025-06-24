import { BASE_URL, put } from "api";
import { toast } from "react-toastify";
import User from "types/user";
import { getLocalStorageItem, removeFromLocalStorage } from "utils";
import create from "zustand";

type AuthState = {
  isUserLoading: boolean;
  user?: Partial<User>;
  setUser: (user: Partial<User>) => Promise<void>;
  logOut: (params?: string) => Promise<void>;
  getUser: (token?: string) => Promise<void>;
};
const useAuth: any = create<AuthState>((set) => ({
  isUserLoading: true,
  user: {},
  setUser: async (user: Partial<User>) => {
    set({ user: { ...user } });
  },
  // userLogOut: async () => {
  //   await put({
  //     path: `/auth/logout`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   set({ user: {} });
  //   removeFromLocalStorage("ACCESS_TOKEN");
  //   window.location.replace("/");
  // },
  logOut: async (urlPath: any) => {
    await put({
      path: `${BASE_URL}/auth/logout`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    set({ user: {} });
    removeFromLocalStorage("ACCESS_TOKEN");
    removeFromLocalStorage("bg-color");
    window.location.replace(urlPath || "/login");
  },
  getUser: async (token?: string) => {
    const accessToken = getLocalStorageItem("ACCESS_TOKEN");
    if (!accessToken) {
      set({ user: {}, isUserLoading: false });
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/user/my-account`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res?.status === 401) {
        window?.localStorage?.removeItem("ACCESS_TOKEN");
        set({ user: {}, isUserLoading: false });
      }
      if (res?.status === 200) {
        const data = await res.json();
        set({ user: { ...data?.data }, isUserLoading: false });
      }
    } catch (error) {
      set({ user: {} });
    }
  },
}));

export default useAuth;
