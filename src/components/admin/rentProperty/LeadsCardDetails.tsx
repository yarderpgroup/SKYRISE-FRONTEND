import { Delete, Edit, Info, InfoOutlined, Reply } from "@mui/icons-material";
import {
  Avatar,
  Collapse,
  ListItem,
  ListItemAvatar,
  Tooltip,
} from "@mui/material";
import { remove } from "api";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { LeadsInfo } from ".";
import EditLeadModal from "./EditLeadModal";

const LeadsCardDetails = ({
  leadsData,
  mutate,
}: {
  leadsData?: any;
  mutate?: any;
}) => {
  const [isDetailsOPen, setDetailsOpen] = useState(false);
  const [openListing, setOpenListing] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);
  const [activeID, setActiveID] = useState<any>();
  const [activeData, setActiveData] = useState<any>();
  const [openData, setOpenData] = useState<any>();
  const router = useRouter();
  const PropertyID = router.query.management;

  const handleUpdateUser = (ID: any) => {
    setOpenListing(true);
    setActiveData(ID);
  };
  const handleDeleteLeads = async (row: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await remove({
            path: `leads/delete/${PropertyID}?leadId=${row?._id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="w-full">
        <EditLeadModal
          open={openListing}
          mutate={mutate}
          activeData={activeData}
          onClose={() => setOpenListing(false)}
        />
        <LeadsInfo
          open={openData}
          mutate={mutate}
          onClose={() => setOpenData(false)}
        />
      </div>
      <div className="flex flex-col gap-3 w-full ">
        <div className="flex justify-between !text-themeDarkGray">
          <div className="w-full px-5 py-3 grid grid-cols-12 gap-3">
            <div className="col-span-12 flex flex-col justify-center items-center  gap-5  ">
              {leadsData?.map((item: any) => (
                <div
                  key={item?.id}
                  className="grid grid-cols-12 w-full gap-2 p-5  rounded-md  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] "
                >
                  <div className="col-span-8 flex gap-7">
                    <div className=" flex gap-6 items-center ">
                      <div className="flex justify-center items-center">
                        <ListItem sx={{ paddingLeft: "0px" }}>
                          <ListItemAvatar>
                            <Avatar
                              src={""}
                              alt={"img"}
                              className="!h-12 !w-12 !mr-2"
                            >
                              {item?.displayName && item?.displayName[0]}
                            </Avatar>
                          </ListItemAvatar>
                        </ListItem>
                        <p className="font-semibold leading-5">
                          {item?.displayName}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <h3 className="text-sm  text-themeGray">
                          {item?.phoneNumber}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-row gap-8 justify-between items-center ">
                      <h3 className="text-sm  text-themeGray">{item?.email}</h3>
                      <h2 className="text-sm  text-themeGray">
                        {item?.message.slice(0, 50)}
                      </h2>
                    </div>
                  </div>
                  <div className="col-span-4 flex flex-row justify-end items-center gap-1 ">
                    <Tooltip title="Edit">
                      <Avatar
                        onClick={() => handleUpdateUser(item)}
                        variant="rounded"
                        className="!mr-1 !cursor-pointer !bg-themeDarkGray !p-0"
                      >
                        <Edit className="!p-0" />
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Info">
                      <Avatar
                        onClick={() => setOpenData(item)}
                        variant="rounded"
                        className="!mr-1 !cursor-pointer !bg-blue-600 !text-white !p-0"
                      >
                        <InfoOutlined className="!p-0" />
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Avatar
                        variant="rounded"
                        onClick={() => handleDeleteLeads(item)}
                        className="!mr-1 !cursor-pointer !bg-theme !text-white !p-0"
                      >
                        <Delete className="!p-0" />
                      </Avatar>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadsCardDetails;
