import { Loader } from "components";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import useAuth from "./useAuth";

const withProtectedSuperAdmin = (PassedComponent: any) =>
  function NewComponent(props: any) {
    const { user, isUserLoading } = useAuth();
    const { push } = useRouter();

    let mounted = useRef<boolean>(false);

    useEffect(() => {
      (() => {
        mounted.current = true;
        if (isUserLoading || !mounted.current) return;
        if (!user?._id || user?.role !== "SUPERADMIN") {
          push("/login");
        }
      })();
      return () => {
        mounted.current = false;
      };
    }, [isUserLoading, user, push]);

    return (
      <>
        {!user?._id || user?.role !== "SUPERADMIN" ? (
          <Loader visible={true} />
        ) : (
          <PassedComponent {...props} />
        )}
      </>
    );
  };

export default withProtectedSuperAdmin;
