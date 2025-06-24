import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useRef, useState } from "react";
import { ArrowBack, Close, FavoriteBorder, Share } from "@mui/icons-material";
import ImageView from "components/propertyDetails/ImageView";
import CustomDialog from "components/core/CustomDialog";

interface Props {
  openDialog?: boolean;
  setOpenDialog?: any;
  activeData?: any;
  photos?: string;
  videos?: any;
  propertyID?: any;
}
const ImageSliderResponsive = ({
  openDialog,
  setOpenDialog,
  activeData,
  photos,
  videos,
  propertyID,
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
            className={`w-full h-[100vh] py-4 px-2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex flex-col rounded-lg ${
              openDialog ? "animate-[popup_400ms_ease-in-out]" : ""
            }`}
          >
            <div className="w-full h-fit overflow-none">
              <div className="">
                <div className="flex gap-5 items-center justify-between px-3">
                  <div onClick={() => setOpenDialog(false)}>
                    <ArrowBack />
                  </div>
                  <div className="flex justify-end gap-5">
                    <div>
                      <FavoriteBorder />
                    </div>
                    <div>
                      <Share />
                    </div>
                    <div onClick={() => setOpenDialog(false)}>
                      <Close />
                    </div>
                  </div>
                </div>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <div
                      className="w-full
                     justify-between flex-col overflow-scroll flex px-5 pt-2"
                    >
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          label={
                            <div className="md:font-semibold md:text-base text-sm text-themeDarkGray">
                              Photos
                            </div>
                          }
                          value="1"
                        />
                        <Tab
                          label={
                            <div className="md:font-semibold md:text-base text-sm text-themeDarkGray">
                              3D WalkThrough
                            </div>
                          }
                          value="2"
                        />
                        <Tab
                          label={
                            <div className="md:font-semibold md:text-base text-sm text-themeDarkGray">
                              Video Tour
                            </div>
                          }
                          value="3"
                        />
                        <Tab
                          label={
                            <div className="md:font-semibold text-sm md:text-base text-themeDarkGray">
                              Street View
                            </div>
                          }
                          value="4"
                        />
                      </TabList>
                    </div>
                  </Box>
                  <TabPanel value="1">
                    <div className="w-full h-fit overflow-auto">
                      <ImageView
                        propertyID={propertyID}
                        activeData={activeData}
                        photos={photos}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel value="2">Item Two</TabPanel>
                  <TabPanel value="3">
                    <div className="w-full h-full flex items-center justify-center relative mt-3 ">
                      <div className="grid grid-cols-12 w-full md:w-4/5 h-full items-center justify-center gap-4">
                        {videos?.map((item: any) => (
                          <div className="col-span-12" key={item?._id}>
                            <iframe
                              title="hover"
                              className="w-full h-[24vh] rounded-lg"
                              src={item.video}
                              allow="fullscreen"
                            ></iframe>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default ImageSliderResponsive;
