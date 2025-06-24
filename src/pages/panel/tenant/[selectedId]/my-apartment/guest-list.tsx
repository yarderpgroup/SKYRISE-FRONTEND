import { Add, Delete, Edit, Info } from "@mui/icons-material";
import CustomDialog from "components/core/CustomDialog";
import { TenantLayout } from "layouts";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  EmptyComponents,
  EmptyHomeSearchComponent,
  InputField,
  MultiplePhotoUpload,
} from "components/core";
import { Field, Form, Formik } from "formik";
import { Skeleton, TextFieldProps } from "@mui/material";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { remove } from "api";
import { AddGuessList, EditGuestList } from "components/tenant/applications";
import { WithProtectedTenant } from "hooks";

const guestHeaderArr = [
  {
    id: 1,
    title: "Guest Name",
    className: "md:col-span-2 col-span-4",
  },
  {
    id: 2,
    title: "Date",
    className: "col-span-2 md:block hidden",
  },
  {
    id: 3,
    title: "Phone",
    className: "col-span-4 md:col-span-2",
  },
  {
    id: 4,
    title: "E-mail",
    className: "col-span-3 hidden md:block",
  },
  {
    id: 5,
    title: "Action",
    className: "col-span-1",
  },
];

interface Props {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  date: string;
}
const GuestList = () => {
  const [loading, setLoading] = useState(false);
  const [openGuestList, setOpenGuestList] = useState(false);
  const [openEditGuestList, setOpenEditGuestList] = useState(false);
  const [activeId, setActiveId] = useState<any>();

  const router = useRouter();
  const propertyID = router?.query?.selectedId;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `tenant/guest/get/${propertyID}`
  );
  const { data: propertyName } = useSWRAPI(
    `config/get/property-name/${propertyID}`
  );
  const handleDeleteGuestList = async (row: any) => {
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
            path: `tenant/guest/delete/${propertyID}?guestId=${row?._id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handelUpdate = (ID: any) => {
    setOpenEditGuestList(true);
    setActiveId(ID);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [loading]);

  return (
    <TenantLayout title="My GuestList | SKYRISE">
      <AddGuessList
        open={openGuestList}
        mutate={mutate}
        onClose={() => setOpenGuestList(false)}
      />
      <EditGuestList
        open={openEditGuestList}
        mutate={mutate}
        activeId={activeId}
        onClose={() => setOpenEditGuestList(false)}
      />

      <div className="w-full px-3 md:px-5 py-5 md:py-10  md:h-[calc(100vh-4.5rem)] text-themeDarkGray flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <button onClick={() => setOpenGuestList(true)} className="btn-one">
            <Add /> Add
          </button>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full py-3 md:py-4 rounded-md rounded-b-none grid grid-cols-10 px-2 md:px-5 text-white bg-themeDarkGray/60">
            {guestHeaderArr.map((item) => (
              <div
                className={`${item.className} text-sm md:text-base font-semibold`}
              >
                {item.title}
              </div>
            ))}
          </div>
          {loading ? (
            <>
              {propertyName?.data?.data > 0 ? (
                <div className="w-full flex flex-col text-themeDarkGray">
                  {data?.data?.data?.data?.map((item: any) => (
                    <div className="grid grid-cols-10 bg-white items-center py-2 md:py-3 px-2 md:px-5 border-b border-primaryBorder/10">
                      <p className="col-span-4 md:col-span-2 text-sm md:text-base ">
                        {item.guestName}
                      </p>
                      <p className="col-span-2 hidden md:block">
                        {dayjs(item.visitDate).format("ll")}
                      </p>
                      <p className="col-span-3 md:col-span-2 text-sm md:text-base">
                        {item.phoneNumber}
                      </p>
                      <p className="col-span-3  hidden md:block">
                        {item.email}
                      </p>
                      <div className="flex gap-2 md:gap-4 items-center col-span-3 md:col-span-1">
                        <p
                          onClick={() => handelUpdate(item)}
                          className="bg-gradient-to-br  cursor-pointer from-twitter to-facebook h-7 w-7 md:h-8 md:w-8 flex items-center justify-center text-white rounded-md"
                        >
                          <Edit className="!text-lg md:!text-2xl" />
                        </p>

                        <p className="bg-gradient-to-br cursor-pointer from-youtube to-theme h-7 w-7 md:h-8 md:w-8 flex items-center justify-center text-white rounded-md">
                          <Delete
                            onClick={() => handleDeleteGuestList(item)}
                            className="!text-lg md:!text-2xl"
                          />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyHomeSearchComponent />
              )}
            </>
          ) : (
            <div className="w-full flex flex-col gap-2 py-3">
              {[...Array(8)]?.map((_, index) => (
                <div className="grid grid-cols-10 gap-2 md:gap-4">
                  <div className="col-span-4 md:col-span-2">
                    <Skeleton
                      variant="rounded"
                      width="100%"
                      animation="wave"
                      height={35}
                    />
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <Skeleton
                      variant="rounded"
                      width="100%"
                      animation="wave"
                      height={35}
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <Skeleton
                      variant="rounded"
                      width="100%"
                      animation="wave"
                      height={35}
                    />
                  </div>
                  <div className="col-span-3 hidden md:block">
                    <Skeleton
                      variant="rounded"
                      width="100%"
                      animation="wave"
                      height={35}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 flex gap-2">
                    <Skeleton
                      variant="rounded"
                      width={35}
                      animation="wave"
                      height={35}
                    />{" "}
                    <Skeleton
                      variant="rounded"
                      width={35}
                      animation="wave"
                      height={35}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TenantLayout>
  );
};

export default WithProtectedTenant(GuestList);
