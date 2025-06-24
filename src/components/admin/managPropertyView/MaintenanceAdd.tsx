import { Edit, Info } from "@mui/icons-material";
import { FeatureFive } from "assets/property";
import { useState } from "react";
import { EditMaintenance } from "../rentProperty";

const openRequestArr = [
  {
    id: 1,
    img: FeatureFive.src,
    title: "Living Room",
    issue: "Sprinkler Heads",
    status: "Ongoing",
    date: "2 Feb 2023",
    priority: "High Priority",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem omnis rerum ab, rem excepturi, quia optio atque officiis repellendus minus, libero perspiciatis neque sint eveniet eum molestiae alias totam aspernatur!",
  },
  {
    id: 2,
    img: FeatureFive.src,
    title: "Living Room",
    issue: "Sprinkler Heads",
    status: "Completed",
    date: "2 Feb 2023",
    priority: "High Priority",
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem omnis rerum ab, rem excepturi, quia optio atque officiis repellendus minus, libero perspiciatis neque sint eveniet eum molestiae alias totam aspernatur!",
  },
];

const MaintenanceAdd = () => {
  const [openMaintenance, setOpenMaintenance] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEditView, setEditView] = useState(false);
  return (
    <div className="">
      <EditMaintenance open={openEditView} onClose={() => setEditView(false)} />
      <div>
        <h1 className="text-xl font-bold text-themeDarkGray">
          Maintenance Details
        </h1>
        <div className="w-full grid grid-cols-12 gap-6 py-4">
          {openRequestArr.map((item) => (
            <div
              key={item.id}
              className="md:col-span-3 col-span-12 bg-gradient  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-white rounded-lg hover:scale-[1.03] overflow-hidden h-full common-transition"
            >
              <div className="gap-3 flex flex-col">
                <div className="flex w-full items-center justify-center">
                  <img
                    src={item.img}
                    alt="car"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="w-full flex flex-col px-3 pb-3">
                  <div className="flex w-full items-center">
                    <p className="md:text-lg text-base flex w-full font-semibold leading- md:leading-4">
                      {item.title}
                    </p>
                    <div className="flex gap-1">
                      <p
                        onClick={() => setOpenMaintenance(true)}
                        className="w-7 h-7 cursor-pointer rounded-md bg-gradient-to-br from-facebook to-themeDarkGray text-white flex items-center justify-center"
                      >
                        <Info className="!text-xl" />
                      </p>
                      <p
                        onClick={() => setEditView(true)}
                        className="w-7 h-7 cursor-pointer rounded-md bg-theme text-white flex items-center justify-center"
                      >
                        <Edit className="!text-xl" />
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-0.5">
                    <p className="font-semibold">Issue: {item.issue}</p>
                    <p className="text-sm flex items-center gap-1">
                      submitted: {item.date}
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      priority: {item.priority}
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      Status: {item.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceAdd;
