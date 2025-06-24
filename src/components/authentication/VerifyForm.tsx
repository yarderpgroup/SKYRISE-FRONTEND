import { post, put } from "api";
import Link from "next/link";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useRouter } from "next/router";
import { RippleLoadingButton } from "components/core";

const VerifyForm = () => {
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (otp: any) => setOtp(otp);

  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = async () => {
    setMinutes(1);
    setSeconds(30);
    try {
      const response = await post({
        path: "user/send-verify-email",
        isAlert: true,
        body: JSON.stringify({
          email: router?.query?.email,
        }),
      });
    } catch (error) {}
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await put({
        path: "user/verify-otp",
        isAlert: true,
        body: JSON.stringify({
          email: router?.query?.email,
          emailOTP: otp,
        }),
      });

      setIsLoading(false);

      if (response?.status === 200) {
        router.push(`/login?email=${router?.query?.email}`);
      }
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 md:gap-5 w-full text-themeDarkGray items-center justify-center ">
      <div className="flex flex-col gap-3 text-center w-full">
        <p className="text-2xl font-semibold ">Verifying it’s you</p>
        <p>
          We’ve sent an OTP to the verified email{" "}
          <span className="text-[#0075FF]">{router?.query?.email}</span>
          <br className="hidden md:block" /> Please enter it below and continue.
        </p>
      </div>
      <div className="w-full items-center flex justify-center  ">
        <div className="  w-fit pt-5 items-center justify-center">
          <OtpInput
            value={otp}
            numInputs={6}
            onChange={handleChange}
            containerStyle="w-full"
            isInputNum={true}
            separator={<div className="w-5"></div>}
            inputStyle="md:!w-20 !w-10 !h-10 md:!h-20 text-xl !text-themeDarkGray md:font-semibold rounded focus:outline-none !bg-themeGray/30 focus:shadow-outline-black flex items-center justify-center text-center"
          />
        </div>
      </div>
      <div className="flex w-full gap-5 items-center"></div>
      <div className="flex gap-5 items-center justify-between w-full md:w-2/3">
        <p className="text-sm md:text-base">
          You will receive OTP within{" "}
          <span className="text-[#0075FF] font-semibold">
            {" "}
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>
        <button
          disabled={seconds !== 0}
          style={{
            color: seconds !== 0 ? "#DFE3E8" : "#FF5630",
          }}
          onClick={resendOTP}
        >
          Resend it
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 w-full">
        <RippleLoadingButton
          title="Verify"
          className="w-44"
          loading={isLoading}
          handleClick={handleSubmit}
        />{" "}
        <p>
          Don't have a SKYRISE account?{" "}
          <Link href="/register">
            <span className="text-theme text-lg cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyForm;
