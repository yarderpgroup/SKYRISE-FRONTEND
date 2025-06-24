import useAppContext from "contexts/AppContextProvider";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { notify } from "utils";
import useAuth from "./useAuth";
import { Loader } from "components";

const withProtectedRoute = (PassedComponent: any) =>
  function NewComponent(props: any) {
    const { user, isUserLoading } = useAuth();
    const { push, asPath } = useRouter();
    const router = useRouter();
    const { setShowLoginModal } = useAppContext();
    let mounted = useRef<boolean>(false);

    // useEffect(() => {
    //   (() => {
    //     mounted.current = true;
    //     if (isUserLoading || !mounted?.current) return;
    //     if (router?.asPath === "/" && !user?._id) {
    //       return setShowLoginModal(false);
    //     }
    //     if (!user?._id) {
    //       setShowLoginModal(true);
    //     }
    //   })();
    //   return () => {
    //     mounted.current = false;
    //   };
    // }, [isUserLoading, user, push, asPath]);
    useEffect(() => {
      mounted.current = true;
      (() => {
        if (
          isUserLoading ||
          user?.blockStatus !== "BLOCKED" ||
          !mounted?.current
        )
          return;

        let inProfile = Boolean(asPath?.split("/")[1] === "account");

        if (inProfile) return;

        notify.error("User is blocked");

        push("/");
      })();
      return () => {
        mounted.current = false;
      };
    }, [isUserLoading, user?.blockStatus, push, asPath]);

    return (
      <>
        <PassedComponent {...props} />
      </>
    );
  };

export default withProtectedRoute;
