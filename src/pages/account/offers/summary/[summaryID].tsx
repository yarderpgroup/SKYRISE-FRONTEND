import { WAVE } from "assets/backgrounds";
import { FeatureTwo } from "assets/property";
import useSWRAPI from "hooks/useSWRAPI";
import { AccountLayout } from "layouts";
import PublicLayout from "layouts/publicLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

const offerArr = [
  {
    id: 2,
    image: FeatureTwo.src,
    propertyName: "Eaton Garth Penthouse",
    propertyType: "Modern House",
    price: "750.00",
    typeOfProperty: "Sell",
    location: "New York, NY",
    type: "Featured",
    features: [
      {
        id: 21,
        featureOne: "2110 Sqft",
      },
      {
        id: 21,
        featureOne: "1 Beds",
      },
      {
        id: 23,
        featureOne: "1 Baths",
      },
    ],
  },
];

const summaryArr = [
  {
    id: 1,
    title: "Your Offer Status:",
    offerData: [
      {
        id: 11,
        name: "Status: Submitted",
      },
      {
        id: 12,
        name: "Created On: Thu, Jan 19, 2023 8:58 PM PST",
      },
    ],
  },
  {
    id: 2,
    title: "Basic Details:",
    offerData: [
      {
        id: 21,
        name: "Buyer Name: Rakesh Kumar Swain",
      },
      {
        id: 22,
        name: "Email: swainrakeshkumar60@gmail.com",
      },
      {
        id: 23,
        name: "Phone: (465) 883-6383",
      },
    ],
  },
  {
    id: 3,
    title: "Your Offer:",
    offerData: [
      {
        id: 31,
        name: "MLS Status: Active",
      },
      {
        id: 32,
        name: "MLS#: 11691766",
      },
      {
        id: 33,
        name: "How did you see this home? I haven't seen it in person",
      },
      {
        id: 34,
        name: "Your Price: –",
      },
    ],
  },
  {
    id: 4,
    title: "Financing:",
    offerData: [
      {
        id: 41,
        name: "Loan Type: Loan",
      },
    ],
  },
  {
    id: 5,
    title: "Anything else:",
    offerData: [
      {
        id: 51,
        name: "Notes for the agent: Hi Mike , please help me put together an offer for 1708 W North Ave Unit D3.",
      },
    ],
  },
];

const OfferSummary = () => {
  const router = useRouter();
  const propertyID = router?.query?.summaryID;

  const { data, error, mutate, isValidating } = useSWRAPI(
    `leadpage/get-offer-details/${propertyID}`
  );
  const summeryDetails = data?.data?.data;
  useEffect(() => {}, [router]);

  const handleSubmit = () => {
    router.push(`/property/${propertyID}/schedule`);
  };

  return (
    <PublicLayout title="Summary | SKYRISE">
      <div className="w-full bg-gradient-to-b from-themeGray/10 to-white bg-themeGray/10 md:py-10 pt-5">
        <AccountLayout>
          <div className="bg-transparent md:bg-white h-full flex w-full flex-col justify-between text-themeDarkGray md:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md overflow-hidden">
            <div className="md:pt-2 items-center md:p-4 flex flex-col w-full">
              <div className="w-full md:flex-row flex flex-col  md:justify-between md:gap-0 gap-2 md:items-center md:py-4 py-2 md:px-4 px-2 border-b">
                <h1 className="md:text-2xl text-xl font-semibold">
                  My SkyRise: Offer Summary
                </h1>
                <p className="text-base">Questions? Call 773-303-6486</p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="w-full md:flex-row flex flex-col-reverse  justify-between border-t p-2 md:gap-0 gap-4">
                  <div className="w-full flex flex-col gap-3 p-2">
                    {/* {summeryDetails?.map((item: any) => ( */}
                    <div
                      className="w-full flex flex-col gap-2"
                      // key={summeryDetails?.id}
                    >
                      <h1 className="md:text-xl text-lg font-semibold">
                        Your Offer Status:
                      </h1>
                      <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">Status: </li>
                          <p className="text-base">{summeryDetails?.status}</p>
                        </div>
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">Created On: </li>
                          <p className="text-base">
                            {summeryDetails?.createdAt}
                          </p>
                        </div>
                      </div>
                      <h1 className="md:text-xl text-lg font-semibold">
                        Basic Details:
                      </h1>
                      <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">Buyer Name: </li>
                          <p className="text-base">
                            {summeryDetails?.firstName}{" "}
                            {summeryDetails?.lastName}
                          </p>
                        </div>
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">Email: </li>
                          <p className="text-base">{summeryDetails?.email}</p>
                        </div>
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">Phone: </li>
                          <p className="text-base">
                            {summeryDetails?.phoneNumber}
                          </p>
                        </div>
                      </div>
                      <h1 className="md:text-xl text-lg font-semibold">
                        Your Offer:
                      </h1>
                      <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">MLS Status: </li>
                          <p className="text-base">
                            {summeryDetails?.offerDetails?.mlsStatus} Active
                          </p>
                        </div>
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">MLS#: </li>
                          <p className="text-base">
                            {summeryDetails?.offerDetails?.mlsNumber} 11691766
                          </p>
                        </div>
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">Your Price: </li>
                          <p className="text-base">
                            ${summeryDetails?.offerAmount}
                          </p>
                        </div>
                      </div>
                      <h1 className="md:text-xl text-lg font-semibold">
                        Financing:
                      </h1>
                      <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">Loan Type: </li>
                          <p className="text-base">
                            {summeryDetails?.loanType} Conventional
                          </p>
                        </div>
                      </div>
                      <h1 className="md:text-xl text-lg font-semibold">
                        Ask the Owner:
                      </h1>
                      <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex items-center md:px-2">
                          <li className="text-base">Message: </li>
                          <p className="text-base">
                            {summeryDetails?.offerDetails?.message} I am
                            interested in buying this property.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                  <div className="w-full flex flex-col gap-2  p-2">
                    <div className="w-full flex flex-col items-center justify-center ">
                      {/* {summeryDetails?.map((item: any) => ( */}
                      <div
                        key={summeryDetails?.id}
                        className="w-full h-fit relative flex items-center justify-center"
                      >
                        <img
                          src={summeryDetails?.propertyHeroImage}
                          alt="image"
                          className="w-full h-[20rem] object-cover"
                        />
                        <div className="absolute bg-[#0000005f] bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-40 left-0 top-0 w-full h-full p-3 flex items-end">
                          <div className="flex flex-col w-full gap-2">
                            <div className="text-white flex flex-col">
                              <p className="text-lg font-semibold">
                                {summeryDetails?.propertyName}
                              </p>
                              <p>
                                {summeryDetails?.totalArea}{" "}
                                {summeryDetails?.measureIn}
                              </p>
                            </div>
                            <div className="w-full">
                              <div className="w-full justify-between flex text-white">
                                <p>Sq.ft</p>
                                <p>Beds</p>
                                <p>Baths</p>
                                <p>Balconies</p>
                              </div>
                              <div className="w-full justify-between flex text-white">
                                <p>{summeryDetails?.measureIn}</p>
                                <p>{summeryDetails?.bedrooms} BHK</p>
                                <p>{summeryDetails?.bathrooms} BATH</p>
                                <p>{summeryDetails?.balconies} Balconies</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* ))} */}
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-4">
                      <p className="text-base md:leading-5 leading-6 tracking-wide">
                        Thank you for submitting your proposed offer terms to
                        SkyRise. We're ready to work with you at each step of
                        the home-buying process.
                      </p>
                      <p className="text-base md:leading-5 leading-6 tracking-wide">
                        The proposed offer won't go anywhere until we talk. For
                        requests submitted before 5 p.m. local time, we'll
                        contact you within four hours. Otherwise, we'll contact
                        you the next day by noon.
                      </p>
                      <p className="text-base md:leading-5 leading-6 tracking-wide">
                        You're not committed to anything until you've signed the
                        formal offer. After you sign, we'll help you negotiate
                        with the seller, and if your formal offer is accepted,
                        we'll help close the deal.
                      </p>
                      <p className="text-base md:leading-5 leading-6 tracking-wide">
                        You can read{" "}
                        <a className="text-[#1080A2] cursor-pointer">
                          more about the home-buying process{" "}
                        </a>
                        on SkyRise's website.
                      </p>
                      <p className="text-base md:leading-5 leading-6 tracking-wide">
                        Thanks again for sending us your offer terms. We look
                        forward to working with you!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    className="gradientButton rounded-md text-white py-2 w-44"
                    onClick={handleSubmit}
                  >
                    View Tour
                  </button>
                </div>
              </div>
            </div>
            <div className="md:block w-full hidden">
              <img src={WAVE.src} alt="wave" className="w-full" />
            </div>
          </div>
        </AccountLayout>
      </div>
    </PublicLayout>
  );
};

export default OfferSummary;
