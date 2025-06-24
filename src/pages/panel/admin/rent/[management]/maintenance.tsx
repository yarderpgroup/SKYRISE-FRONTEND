import {
  Add,
  Delete,
  Edit,
  Info,
  InfoRounded,
  SecurityUpdateWarning,
} from "@mui/icons-material";
import { TextFieldProps, Tooltip } from "@mui/material";
import { remove } from "api";
import { FeatureFive } from "assets/property";
import { MaintenanceViewDetails } from "components/admin/rent";
import {
  AddMaintenanceView,
  EditMaintenance,
  MaintenanceModal,
} from "components/admin/rentProperty";
import { EmptyComponents, InputField } from "components/core";
import { MaintenanceSkeleton } from "components/skeleton/property";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { withProtectedSuperAdmin } from "hooks";
import useSWRAPI from "hooks/useSWRAPI";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import withProtectedSubscription from "hooks/withProtectedSubscription";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

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
  {
    id: 3,
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

const statusArr = [
  {
    id: 1,
    title: "Pending",
    value: "PENDING",
  },
  {
    id: 2,
    title: "On Going",
    value: "ONGOING",
  },
  {
    id: 3,
    title: "Completed",
    value: "COMPLETE",
  },
];
const MaintenanceDetails = () => {
  const router = useRouter();
  const propertyID: any = router?.query?.management;
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );

  const [openMaintenance, setOpenMaintenance] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEditView, setEditView] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState("PENDING");
  const [activeData, setActiveData] = useState();
  const [activeId, setActiveId] = useState();
  const [openDetails, setOpenDetails] = useState(false);

  const { data, mutate, isValidating } = useSWRAPI(
    `maintenance/get-all/${propertyID}?perPage=10&pageNo=1&status=${openStatus}`
  );
  const isEmpty = !data?.data?.data?.data?.length;
  const handleChangeStatus = (data: string) => {
    setOpenStatus(data);
    mutate();
  };
  const handleDelete = async (row: any) => {
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
            path: `maintenance/delete-one/${propertyID}?maintenanceId=${row?._id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handelMaintenanceUpdate = (ID: any) => {
    setEditView(true);
    setActiveData(ID);
  };
  const handelStatusUpdate = (ID: any) => {
    setActiveId(ID);
    setOpenMaintenance(true);
  };
  return (
    <TenantLayout
      title="Maintenance Request"
      headerText={propertyName?.data?.data}
    >
      <div className="p-4">
        <MaintenanceModal
          open={openMaintenance}
          activeId={activeId}
          mutate={mutate}
          onClose={() => setOpenMaintenance(false)}
        />
        <MaintenanceViewDetails
          open={openDetails}
          onClose={() => setOpenDetails(false)}
        />
        <AddMaintenanceView
          open={openView}
          mutate={mutate}
          onClose={() => setOpenView(false)}
        />
        <EditMaintenance
          open={openEditView}
          activeData={activeData}
          mutate={mutate}
          onClose={() => setEditView(false)}
        />

        <div>
          <div className="flex  justify-between items-center py-4">
            <h1 className="text-xl font-bold text-themeDarkGray ">
              Maintenance Request
            </h1>
            <div className="flex gap-4 justify-end items-end">
              <div className="flex gap-3">
                {statusArr.map((item: any) => (
                  <button
                    onClick={() =>
                      handleChangeStatus(String(item?.value).toUpperCase())
                    }
                    key={item?.id}
                    className={`!border-2 rounded-lg px-4 py-2  common-transition  w-32 hover:bg-white hover:text-black ${
                      openStatus === String(item?.value)?.toUpperCase()
                        ? "bg-white"
                        : "text-white bg-themeDarkGray"
                    }`}
                  >
                    {item?.title}
                  </button>
                ))}
              </div>

              <div className=" flex flex-col items-center justify-center gap-3">
                <button onClick={() => setOpenView(true)} className="btn-two">
                  {" "}
                  <Add className="text-white " /> Add Maintenance
                </button>
              </div>
            </div>
          </div>
          <>
            {isValidating ? (
              <MaintenanceSkeleton />
            ) : (
              <>
                {isEmpty ? (
                  <EmptyComponents />
                ) : (
                  <div className="w-full grid grid-cols-12 gap-6 py-7">
                    {data?.data?.data?.data?.map((item: any) => (
                      <div
                        key={item.id}
                        className="md:col-span-3 col-span-12 bg-gradient  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-white rounded-lg  overflow-hidden h-full common-transition"
                      >
                        <div className="gap-3 flex flex-col">
                          <div className="flex w-full items-center justify-center">
                            <img
                              src={item?.maintenancePhoto}
                              alt="car"
                              className="w-full h-40 object-cover"
                            />
                          </div>

                          <div className="flex justify-between">
                            <div className="w-full flex flex-col px-3 pb-3">
                              <div className="flex w-full items-center">
                                <p className="md:text-lg text-base flex w-full font-semibold leading- md:leading-4">
                                  {item?.animalNote}
                                </p>
                              </div>
                              <div className="flex w-full flex-col gap-0.5">
                                <p className="font-semibold">
                                  Issue : {item.problem}
                                </p>
                                <p className="text-sm flex items-center gap-1">
                                  Submitted:{" "}
                                  {dayjs(item.createdAt).format("ll")}
                                </p>

                                <p className="text-sm flex items-center gap-1">
                                  Category: {item?.category}
                                </p>
                                <p className="text-sm flex items-center gap-1">
                                  Amount: {item?.amount}
                                </p>
                                <p className="text-sm flex items-center gap-1">
                                  CreatedAt:{" "}
                                  {dayjs(item?.createdAt).format("lll")}
                                </p>

                                <p className="text-sm flex items-center gap-1">
                                  Priority: {item?.priority}
                                </p>
                                <p className="text-sm flex items-center gap-1">
                                  Status: {item?.status}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col p-3 gap-1">
                              <Tooltip title="Status Update">
                                <p
                                  onClick={() => handelStatusUpdate(item)}
                                  className="w-7 h-7 cursor-pointer rounded-md bg-gradient-to-br from-facebook to-themeDarkGray text-white flex items-center justify-center"
                                >
                                  <SecurityUpdateWarning className="!text-xl" />
                                </p>
                              </Tooltip>
                              <Tooltip title="Info">
                                <p
                                  onClick={() => setOpenDetails(item)}
                                  className="w-7 h-7 cursor-pointer rounded-md bg-blue-600 text-white flex items-center justify-center"
                                >
                                  <InfoRounded className="!text-xl" />
                                </p>
                              </Tooltip>
                              <Tooltip title="Edit">
                                <p
                                  onClick={() => handelMaintenanceUpdate(item)}
                                  className="w-7 h-7 cursor-pointer rounded-md bg-theme text-white flex items-center justify-center"
                                >
                                  <Edit className="!text-xl" />
                                </p>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <p
                                  onClick={() => handleDelete(item)}
                                  className="w-7 h-7 cursor-pointer rounded-md bg-themeDarkGray text-white flex items-center justify-center"
                                >
                                  <Delete className="!text-xl" />
                                </p>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(
  withProtectedSubscription(MaintenanceDetails)
);
