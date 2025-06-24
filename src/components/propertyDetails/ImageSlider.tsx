import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { Close, FavoriteBorder, Share } from "@mui/icons-material";
import ImageView from "./ImageView";
import { StreetViewMap } from "components/propertyTypes";
import { EmptyComponents } from "components/core";
import { GOOGLE_MAPS_API_KEY_NEXT } from "configs";

interface Props {
  openDialog?: boolean;
  setOpenDialog?: any;
  activeData?: any;
  photos?: string;
  videos?: any;
  propertyID: any;
  latitude: any;
  longitude: any;
}
const ImageSlider = ({
  openDialog,
  setOpenDialog,
  activeData,
  photos,
  videos,
  propertyID,
  latitude,
  longitude,
}: Props) => {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div>
      {openDialog && (
        <div className="fixed !z-[200] top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[90vw] h-[90vh] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col rounded-lg ${
              openDialog ? "animate-[popup_400ms_ease-in-out]" : ""
            }`}
          >
            <div className="w-full">
              <div>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <div className="md:w-full w-screen justify-between flex px-5 pt-2">
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          label={
                            <div className="font-semibold text-themeDarkGray">
                              Photos
                            </div>
                          }
                          value="1"
                        />
                        <Tab
                          label={
                            <div className="font-semibold text-themeDarkGray">
                              3D WalkThrough
                            </div>
                          }
                          value="2"
                        />
                        <Tab
                          label={
                            <div className="font-semibold text-themeDarkGray">
                              Video Tour
                            </div>
                          }
                          value="3"
                        />
                        <Tab
                          label={
                            <div className="font-semibold text-themeDarkGray">
                              Street View
                            </div>
                          }
                          value="4"
                        />
                      </TabList>
                      <div className="flex gap-3 items-center">
                        {/* <div className="flex gap-1 items-center bg-theme/10 px-2 h-fit py-1.5 rounded-lg text-themeDarkGray cursor-pointer">
                          <FavoriteBorder /> <p>Favorite</p>
                        </div>
                        <div className="flex gap-1 items-center bg-theme/10 px-2 h-fit py-1.5 rounded-lg text-themeDarkGray cursor-pointer">
                          <Share /> <p>Share</p>
                        </div> */}
                        <div
                          onClick={() => setOpenDialog(false)}
                          className="flex gap-1 items-center bg-theme/10 px-2 h-fit py-1.5 rounded-lg text-themeDarkGray cursor-pointer"
                        >
                          <Close />
                        </div>
                      </div>
                    </div>
                  </Box>
                  <TabPanel value="1">
                    <div className="w-full !h-[80vh]">
                      <ImageView
                        activeData={activeData}
                        photos={photos}
                        propertyID={propertyID}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel value="2"></TabPanel>
                  <TabPanel value="3">
                    {videos?.length > 0 ? (
                      <div className="w-full h-full flex flex-col items-center justify-center relative ">
                        <div className="grid grid-cols-12 w-4/5 h-full items-center justify-center gap-4">
                          {videos?.map((item: any) => (
                            <div className="col-span-4 " key={item?._id}>
                              <iframe
                                title="hover"
                                className="w-full h-[30vh] rounded-lg"
                                src={item.video}
                                allow="fullscreen"
                              ></iframe>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <EmptyComponents />
                    )}
                  </TabPanel>
                  <TabPanel value="4">
                    {/* <div className="w-full h-full flex flex-col items-center justify-center">
                      <StreetViewMap
                        latitude={latitude}
                        longitude={longitude}
                      />
                    </div> */}
                  </TabPanel>
                </TabContext>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // </CustomDialog>
  );
};

export default ImageSlider;
