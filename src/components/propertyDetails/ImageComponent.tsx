import { useState } from "react";
import {
  FloorPlan,
  StreetView,
  VideoView,
  ViewIcon,
} from "../../assets/static";
import ImageSlider from "./ImageSlider";

interface Props {
  activeData?: any;
  photos?: any;
  videos?: any;
  heroImage?: string;
  propertyID?: any;
  latitude?: any;
  longitude?: any;
}
const Views_Arr = [
  {
    id: "1",
    title: "3D Walkthrough",
    icon: ViewIcon.src,
  },
  {
    id: "2",
    title: "Video Tour",
    icon: VideoView.src,
  },
  {
    id: "3",
    title: "Floor Plans",
    icon: FloorPlan.src,
  },
  {
    id: "4",
    title: "Street View",
    icon: StreetView.src,
  },
];
const ImageComponent = ({
  activeData,
  photos,
  heroImage,
  videos,
  propertyID,
  latitude,
  longitude,
}: Props) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <section className="w-full" id="home">
      <div className="w-full flex justify-between gap-5 h-[28rem] ">
        <div className="w-[65%] relative">
          <img
            onClick={() => setOpenDialog(!openDialog)}
            src={heroImage}
            alt="imageOne"
            className="w-full object-cover hover:brightness-75 common-transition cursor-pointer h-full bg-center rounded-lg "
          />
          <div className="absolute flex p-5 gap-3 top-0 left-0 w-full h-20 ">
            {Views_Arr.map((item: any) => (
              <div
                key={item.id}
                className="bg-[#4D5969] flex items-center justify-center gap-2 w-fit text-white h-fit px-4 py-2.5 rounded-md"
              >
                <img src={item.icon} alt="icon" className="w-5 h-5" />
                <p className=" text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[35%] grid grid-cols-12 gap-4 h-full">
          {photos?.slice(0, 4).map((item: any) => (
            <div
              className="flex w-full col-span-6 object-contain h-52"
              key={item.id}
            >
              <img
                onClick={() => setOpenDialog(!openDialog)}
                src={item?.photo}
                alt="url"
                className="w-full object-cover hover:brightness-75 common-transition cursor-pointer h-full rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-white">
        <ImageSlider
          propertyID={propertyID}
          activeData={activeData}
          setOpenDialog={setOpenDialog}
          photos={photos}
          videos={videos}
          openDialog={openDialog}
          latitude={latitude}
          longitude={longitude}
        />
      </div>
    </section>
  );
};

export default ImageComponent;
