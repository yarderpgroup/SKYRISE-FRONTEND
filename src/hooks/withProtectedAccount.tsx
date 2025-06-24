import useAppContext from "contexts/AppContextProvider";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { notify } from "utils";
import useAuth from "./useAuth";
import { Loader } from "components";

const withProtectedAccount = (PassedComponent: any) =>
  function NewComponent(props: any) {
    const { user, isUserLoading } = useAuth();
    const { push, asPath } = useRouter();
    const router = useRouter();
    let mounted = useRef<boolean>(false);

    useEffect(() => {
      (() => {
        mounted.current = true;
        if (isUserLoading || !mounted.current) return;
        if (!isUserLoading && !user?._id && router?.asPath !== "/account") {
          push("/login");
        }
      })();
      return () => {
        mounted.current = false;
      };
    }, [isUserLoading, user, push]);

    return (
      <>
        {/* {!user?._id ? (
          <Loader visible={true} />
        ) : ( */}
        <PassedComponent {...props} />
        {/* )} */}
      </>
    );
  };

export default withProtectedAccount;
