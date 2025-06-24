import { NotFoundOne } from "assets/animations";
import Link from "next/link";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: NotFoundOne,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const PageNotFound = () => {
  return (
    <section className="bg-white h-screen md:h-fit w-full flex flex-col gap-6 py-10 justify-center items-center">
      <div className="cursor-not-allowed w-">
        <Lottie options={defaultOptions} height={450} width="100%" />
      </div>
      <div className="w-full flex flex-col gap-2 items-center justify-center text-themeDarkGray text-center">
        <p className="text-3xl tracking-wide font-semibold">{`Whoops! Lost in Space ?`}</p>
        <p className="text-themeDarkGray">
          The page your are looking for isn't found :( <br />
          We suggest you back to home
        </p>
        <Link href="/">
          <button className="w-44 btn-two">Back to Home</button>
        </Link>
      </div>
    </section>
  );
};

export default PageNotFound;
