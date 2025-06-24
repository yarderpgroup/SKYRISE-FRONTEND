import { Loader } from "components";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import useSWRAPI from "./useSWRAPI";

const withProtectedSubscription = (PassedComponent: any) =>
  function NewComponent(props: any) {
    const router = useRouter();
    const propertyId = router?.query?.management;
    const { data, error, isValidating, mutate } = useSWRAPI(
      `subscription/status/landlord/get-status/${propertyId}`
    );

    if (Boolean(data?.data?.error)) toast.error(data?.data?.error);
    const { user, isUserLoading } = useAuth();
    const { push } = useRouter();
    let mounted = useRef<boolean>(false);

    useEffect(() => {
      (() => {
        mounted.current = true;
        if (isUserLoading || isValidating || !mounted.current) return;
        if (!user?._id || !Boolean(data?.data?.data?.isActive)) {
          push(`/panel/admin/rent/${propertyId}/subscription`);
        }
      })();
      return () => {
        mounted.current = false;
      };
    }, [isUserLoading, user, push, data]);

    return (
      <>
        {!user?._id || !Boolean(data?.data?.data?.isActive) ? (
          <Loader visible={true} />
        ) : (
          <PassedComponent {...props} />
        )}
      </>
    );
  };

export default withProtectedSubscription;
