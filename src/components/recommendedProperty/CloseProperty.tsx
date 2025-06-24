import Slider from "react-slick";
import {
  CloseProperty1,
  CloseProperty2,
  CloseProperty3,
  CloseProperty4,
} from "../../assets/property";
import SimilarPropertyCard from "./SimilarPropertyCard";
import useSWRAPI from "hooks/useSWRAPI";
import useAuth from "hooks/useAuth";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  speed: 700,
  autoplay: true,
  cssEase: "linear",
  pauseOnHover: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 940,
      settings: {
        autoplay: false,
        autoplaySpeed: 3000,
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
    {
      breakpoint: 760,
      settings: {
        autoplay: true,
        autoplaySpeed: 3500,
        speed: 500,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
      },
    },
  ],
};
interface Props {
  propertyId: string;
  type: any;
}
const CloseProperty = ({ propertyId, type }: Props) => {
  const { user } = useAuth();
  let url = `leadpage/get-recommended-property/${propertyId}?propertyType=${type}`;
  if (Boolean(user?._id)) url += `&userId=${user?._id}`;
  const { data, error, mutate, isValidating } = useSWRAPI(url);
  const totalLength = data?.data?.data && data?.data?.data?.data?.length;
  const Close_Property_Arr = [
    {
      id: "1",
      price: "RD$ 3,300,000",
      propertyName: "3Hab-2bd-4400mts",
      address: "2133 Calle Jose, Urb. Las Flores, SD, DN",
      image: CloseProperty1.src,
    },
    {
      id: "2",
      price: "RD$ 3,300,000",
      propertyName: "3Hab-2bd-4400mts",
      address: "2133 Calle Jose, Urb. Las Flores, SD, DN",
      image: CloseProperty2.src,
    },
    {
      id: "3",
      price: "RD$ 3,300,000",
      propertyName: "3Hab-2bd-4400mts",
      address: "2133 Calle Jose, Urb. Las Flores, SD, DN",
      image: CloseProperty3.src,
    },
    {
      id: "4",
      price: "RD$ 3,300,000",
      propertyName: "3Hab-2bd-4400mts",
      address: "2133 Calle Jose, Urb. Las Flores, SD, DN",
      image: CloseProperty4.src,
    },
  ];
  return (
    <section className="w-full flex flex-col text-themeDarkGray py-4 md:py-8 gap-2 md:gap-4">
      <p className="text-base font-semibold text-center md:text-left">
        CLOSE BY RECOMMENDED PROPERTIES
      </p>
      <section className="testimonial-slick company-slick-slider overflow-hidden md:pr-16">
        <Slider {...settings} className="our-store-dots">
          {data?.data?.data?.data?.map((curElm: any) => (
            <SimilarPropertyCard
              key={curElm.id}
              curElm={curElm}
              totalLength={totalLength}
              mutate={mutate}
            />
          ))}
        </Slider>
      </section>
    </section>
  );
};

export default CloseProperty;
