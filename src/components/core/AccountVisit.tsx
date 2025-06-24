import { post } from "api";
import RippleLoadingButton from "./RippleLoadingButton";
import { Router, useRouter } from "next/router";
import { toast } from "react-toastify";
import { useState } from "react";

const AccountVisit = ({ rowData }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const ID = router?.query?.management;

  const handleAccount = async () => {
    console.log(rowData);
    setIsLoading(true);
    try {
      const response = await post({
        path: `account/landlord/get-pending-account-link/${ID}`,
        isAlert: true,
        body: JSON.stringify({
          stripeAccountId: rowData,
        }),
      });
      if (response?.status === 200) router?.push(response?.data?.url);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  return (
    <div>
      <RippleLoadingButton
        type="submit"
        title="Visit"
        className="w-36"
        loading={isLoading}
        handleClick={handleAccount}
      />
    </div>
  );
};

export default AccountVisit;
