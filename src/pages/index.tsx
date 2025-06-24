import useSWRAPI from "hooks/useSWRAPI";
import {
  FeaturedSection,
  Hero,
  Loader,
  PropertyType,
  RentProperty,
  SellPropertySection,
  Testimonials,
} from "../components";
import PublicLayout from "../layouts/publicLayout";
import { useEffect, useState } from "react";
import withProtectedRoute from "hooks/withProtectedRoute";
import useAuth from "hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  let url = `leadpage/home/property/featured?perPage=15&pageNo=1`;
  if (Boolean(user?._id)) url += `&userId=${user?._id}`;
  // if (Boolean(user?._id)) url += `&userId=${user && user?._id}`;
  let sellUrl = `leadpage/home/property?type=SELL&perPage=15&pageNo=1`;
  if (Boolean(user?._id)) sellUrl += `&userId=${user && user?._id}`;
  let rentUrl = `leadpage/home/property?type=RENT&perPage=15&pageNo=1`;
  if (Boolean(user?._id)) rentUrl += `&userId=${user && user?._id}`;

  const {
    data: featureData,
    mutate: featureMutate,
    isValidating: featureValidating,
  } = useSWRAPI(url);

  const {
    data: SellData,
    error: SellError,
    mutate: SellMutate,
    isValidating: SellValidating,
  } = useSWRAPI(sellUrl);

  const {
    data: RentData,
    error: RentError,
    mutate: RentMutate,
    isValidating: RentValidating,
  } = useSWRAPI(rentUrl);

  if (featureValidating || SellValidating || RentValidating)
    return <Loader visible={true} />;
  return (
    <PublicLayout title="SKYRISE" description="The Real Estate Company">
      <div className="">
        <Hero />
        <FeaturedSection
          featureData={featureData}
          mutate={featureMutate}
          isValidating={featureValidating}
        />
        <SellPropertySection
          featureData={SellData}
          mutate={SellMutate}
          isValidating={SellValidating}
        />
        <RentProperty
          featureData={RentData}
          mutate={RentMutate}
          isValidating={RentValidating}
        />
        <PropertyType />
        <Testimonials />
      </div>
    </PublicLayout>
  );
};
export default withProtectedRoute(Home);
