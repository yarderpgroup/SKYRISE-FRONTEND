import { Delete, Edit } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { remove } from "api";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import Swal from "sweetalert2";
import { AddMoreModal } from "../properties";
import HomePriceEdit from "./HomePriceEdit";
import { AddHomePriceDetails } from ".";
import { ShowEmpty } from "components/core";

export default function HomeEdit() {
  const AddDetails = [
    {
      key: "11",
      name: "type",
      label: "Type",
      // placeholder: "Type",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      options: [
        {
          label: "Home",
          value: "home",
        },
        {
          label: "Price",
          value: "price",
        },
      ],

      validationSchema: Yup.string().required("Type is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-6",
    },
    {
      key: "1",
      name: "title",
      label: "Title",
      placeholder: "Title",
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "text",

      validationSchema: Yup.string().required("Title is Required"),
      initialValue: "",
      multiline: false,
      required: true,
      className: "col-span-6",
    },

    {
      key: 2,
      name: "description",
      label: "Description",
      placeHolder: "Description...",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Description is Required"),
      multiline: true,
      rows: 3,
      className: "col-span-6",
    },
  ];
  const [openHomeDetails, setOpenHomeDetails] = useState(false);
  const [addMoreModal, setAddMoreModal] = useState(false);

  const [activeData, setActiveData] = useState<any>();
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/my-property/property-facts/${propertyID}`
  );
  const handelOpen = (data: any) => {
    setOpenHomeDetails(true);
    setActiveData(data);
  };
  const handleDeleteHome = async (row: any) => {
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
        let response: any;
        if (result.isConfirmed) {
          response = await remove({
            path: `property/facts/delete/${row?._id}`,
            isAlert: true,
          });
          mutate();
        }
      });
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="w-full">
      {isValidating ? (
        <div className="w-full flex flex-col">
          <div className="w-full justify-between flex items-center">
            <Skeleton height={40} width="20%" animation="wave" />
            <Skeleton height={80} width={100} animation="wave" />
          </div>
          <div className="w-full grid grid-cols-4 gap-x-5">
            {[...Array(16)]?.map((_, index) => (
              <div key={index} className="col-span-1 h-36 rounded-lg">
                <Skeleton
                  height={200}
                  width="100%"
                  className="!rounded-lg"
                  animation="wave"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="!text-themeDarkGray flex flex-col gap-6">
          <AddHomePriceDetails
            setAddMoreModal={setAddMoreModal}
            addMoreModal={addMoreModal}
            AddDetails={AddDetails}
            mutate={mutate}
            propertyID={propertyID as any}
          />

          <HomePriceEdit
            open={openHomeDetails}
            mutate={mutate}
            activeData={activeData}
            onClose={() => setOpenHomeDetails(false)}
          />
          <div className="flex justify-between">
            <h1 className="text-xl text-themeDarkGray font-bold pt-5">
              Home And Price Facts
            </h1>
            <button
              onClick={() => setAddMoreModal(!addMoreModal)}
              className="btn-two w-20"
            >
              Add
            </button>
          </div>
          <div>
            {data?.data?.data?.length === 0 ? (
              <ShowEmpty />
            ) : (
              <div className="grid grid-cols-4 gap-5">
                {data?.data?.data?.map((curElm: any) => (
                  <div
                    key={curElm?._id}
                    className="flex hover:scale-[1.02] p-4 common-transition cursor-pointer shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gradient-to-br from-theme/5 to-themeGray/5 justify-between dashboard-card-shadow items-center group gap-4 rounded-xl"
                  >
                    <div className="flex h-full w-full flex-col ">
                      <div className="flex w-full justify-between  items-center">
                        <h1 className={`text-lg  font-semibold`}>
                          {curElm?.type}
                        </h1>

                        <div className="flex gap-2">
                          <div className="bg-gradient-to-br from-twitter to-facebook shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  text-white flex items-center justify-center h-10 w-10 rounded-lg">
                            <Edit
                              onClick={() => handelOpen(curElm)}
                              className=""
                            />
                          </div>
                          <div className="bg-gradient-to-br from-theme to-themeDarkGray shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] text-white flex items-center justify-center h-10 w-10 rounded-lg">
                            <Delete
                              onClick={() => handleDeleteHome(curElm)}
                              className=""
                            />
                          </div>
                        </div>
                      </div>
                      <h4 className={` font-semibold`}>{curElm?.title}</h4>
                      <h1 className={`font-semibold`}>{curElm?.description}</h1>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
