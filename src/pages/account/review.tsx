import { WAVE } from "assets/backgrounds";
import { ReviewCard } from "components/account";
import withProtectedAccount from "hooks/withProtectedAccount";
import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";
import { useState } from "react";

const ReviewArr = [
  {
    id: "1",
    day: "20",
    month: "Jan",
    propertyName: "MA 02144",
    location: "Somerville, MA 02144",
    status: "Pending",
    price: "200m",
    count: 4,
  },
  {
    id: "1",
    day: "18",
    month: "Jan",
    propertyName: "108 Gilman #3",
    location: "Somerville, MA 02144",
    status: "Approved",
    price: "300m",
    count: 5,
  },
  {
    id: "1",
    day: "17",
    month: "Jan",
    propertyName: "22 Banks St #22",
    location: "Somerville, MA 02144",
    status: "Completed",
    price: "600m",
    count: 0,
  },
];

const ReviewProperty = () => {
  const [isReviewOpen, setReviewOpen] = useState(false);

  return (
    <PublicLayout title="Reviews | SKYRISE">
      <div className="w-full bg-gradient-to-b from-themeGray/10 to-white pt-6 md:py-10 text-themeDarkGray">
        <AccountLayout>
          <div className="w-full h-full">
            <div className="md:bg-white w-full rounded-md overflow-hidden md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] flex flex-col justify-between h-full">
              <div className="md:bg-white p-1 md:p-6 flex flex-col gap-3 md:gap-5">
                <p className="text-lg md:text-2xl font-semibold">Reviews</p>
                <div className="w-full flex flex-col gap-6">
                  {ReviewArr.map((item) => (
                    <ReviewCard curElm={item} />
                  ))}
                </div>
              </div>
              <div className="hidden md:flex w-full">
                <img src={WAVE.src} alt="wave" className="w-full" />
              </div>
            </div>
          </div>
        </AccountLayout>
      </div>
    </PublicLayout>
  );
};

export default withProtectedAccount(ReviewProperty);
