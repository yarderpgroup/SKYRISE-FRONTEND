import ImageSlider from "components/propertyDetails/ImageSlider";
import { useState } from "react";
import Slider from "react-slick";
import { FeatureEight, FeatureFive, FeatureOne } from "../../assets/property";
import ImageSliderResponsive from "./ImageSliderResponsive";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  speed: 400,
  cssEase: "linear",
  pauseOnHover: false,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
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
        slidesToShow: 1,
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
  activeData?: any;
  photos?: any;
  videos?: any;
}
const ResponsiveImageSlider = ({ activeData, photos, videos }: Props) => {
  const Media_Type = [
    {
      id: "1",
      title: "10 Photos",
      img: activeData?.image,
    },
    {
      id: "2",
      title: "3D Walkthrough",
      img: FeatureEight?.src,
    },
    {
      id: "3",
      title: "Video",
      img: FeatureFive?.src,
    },
    {
      id: "4",
      title: "Street View",
      img: FeatureOne?.src,
    },
  ];
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <section className="w-full flex flex-col gap-3">
      <section className="testimonial-slick company-slick-slider overflow-hidden">
        <Slider {...settings} className="our-store-dots">
          {photos?.map((curElm: any) => (
            <div className="w-full h-60" key={curElm._id}>
              <img
                onClick={() => setOpenDialog(!openDialog)}
                src={curElm?.photo}
                alt="logo"
                className="w-full object-cover h-full"
              />
            </div>
          ))}
        </Slider>
      </section>
      <div className="w-full overflow-scroll scrollBarNone">
        <div className="flex gap-3 overflow-x-scroll w-fit">
          {Media_Type.map((item) => (
            <div key={item.id} className="w-36 h-20 relative">
              <div className="w-full h-full z-[100] bg-[#0000005a] tracking-wide text-sm flex items-end p-2 justify-center absolute top-0 left-0 text-white ">
                {item.title}
              </div>
              <img
                src={item.img}
                alt="item image"
                className="w-full object-cover h-full rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-white">
        {/* <ImageSlider
          activeData={activeData}
          setOpenDialog={setOpenDialog}
          openDialog={openDialog}
        /> */}
        <ImageSliderResponsive
          activeData={activeData}
          setOpenDialog={setOpenDialog}
          openDialog={openDialog}
          photos={photos}
          videos={videos}
        />
      </div>
    </section>
  );
};

export default ResponsiveImageSlider;
