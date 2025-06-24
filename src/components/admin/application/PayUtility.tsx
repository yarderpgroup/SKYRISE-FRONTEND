import { post } from "api";
import { RippleLoadingButton } from "components/core";
import useAuth from "hooks/useAuth";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { notify } from "utils";

const PayUtility = ({ amount, activeId, payMutate }: any) => {
  const router = useRouter();
  const propertyId = router.query.selectedId;
  const [isLoading, setIsLoading] = useState(false);
  const { data: accountDetails } = useSWRAPI(
    `account/tenant/get-account/${propertyId}`
  );

  const stripe = useRef<any>(null);
  const { user } = useAuth();
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret:
      "pk_live_51Me986FKqo6nOy15Gs2KyJ7agsfF4HCECMQ0AG6E3Xu4XTcPAQptiosHTL2SpflRWkYvZOB6RYmqtpPH4oeDMII600Px5rK9IU",
    email: user?.email,
    appearance,
  };

  const onToken = async (token: any) => {
    console.log(activeId);
    setIsLoading(true);
    try {
      const res: any = await post({
        isAlert: true,
        path: `utility/create-utility-order-tenant/${propertyId}`,
        body: JSON.stringify({
          utilityId: activeId,
        }),
      });
      if (res?.status === 200) {
        billingDetails({ res, token });
      }
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };
  const billingDetails = async ({ res: orderData, token }: any) => {
    try {
      const res: any = await post({
        path: `utility/complete-utility-payment-tenant/${propertyId}`,
        isAlert: true,
        body: JSON.stringify({
          billingId: orderData?.data?._id,
          token: token,
          stripeAccountId: accountDetails?.data?.data?.accountId,
        }),
      });

      setIsLoading(false);
      payMutate();
    } catch (error: any) {
      if (error instanceof Error) {
        setIsLoading(false);
        notify.error(error?.message);
      }
    }
  };
  return (
    <div>
      <RippleLoadingButton
        title={`$${amount} Pay`}
        className=" h-fit w-48"
        loading={isLoading}
        type="submit"
        handleClick={() => stripe?.current?.onClick()}
      />
      <div className={`absolute bottom-3 z-10  w-fit opacity-0`}>
        <StripeCheckout
          ref={stripe}
          stripeKey={options.clientSecret}
          token={onToken}
          amount={amount * 100}
          email={options.email}
          currency="USD"
          name="SKYRISE"
          image="https://res.cloudinary.com/dde63vr5c/image/upload/v1676692128/skyrise/Logo/logo_gxzfx1.png"
          alipay={true}
        />
      </div>
    </div>
  );
};

export default PayUtility;
