import useAuth from "hooks/useAuth";
import useAuthFetch from "hooks/useAuthFetch";
import { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorageItem } from "utils";
import useFCMToken from "./FcmToken";

const AppContext = createContext({});

export const AppContextProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false);
  const { getUser, isUserLoading } = useAuth();
  const authToken = getLocalStorageItem("ACCESS_TOKEN") as string;
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    (async () => {
      await getUser(authToken);
    })();
  }, [authToken, getUser]);

  const { user } = useAuth();

  useFCMToken(user?._id, user?.role);

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        isUserLoading,
        showLoginModal,
        setShowLoginModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const {
    isLogin,
    setIsLogin,
    isUserLoading,
    showLoginModal,
    setShowLoginModal,
  } = useContext<any>(AppContext);

  return {
    isLogin,
    setIsLogin,
    isUserLoading,
    showLoginModal,
    setShowLoginModal,
  };
};

export default useAppContext;
