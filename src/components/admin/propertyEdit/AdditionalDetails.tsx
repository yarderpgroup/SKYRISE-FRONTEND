import { Delete, Edit } from "@mui/icons-material";
import { remove } from "api";
import { InteriorDetailsSkeleton } from "components/skeleton/propertyDetails";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { isJsxOpeningFragment } from "typescript";
import AdditionalDetailsEdit from "./AdditionalDetailsEdit";
import AddNewAdditionalDetails from "./AddNewAdditionalDetails";
import { ShowEmpty } from "components/core";

interface props {
  heading: string;
  type: string;
  description: [string];
  _id: string;
}

export default function HomeEdit() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeData, setActiveData] = useState<props>();
  const router = useRouter();
  const [allData, setAllData] = useState<any>();
  const propertyID = router?.query?.propertyID as any;
  const [isNewAdditionalOpen, setIsNewAdditionalOpen] = useState(false);
  const { data, error, mutate, isValidating } = useSWRAPI(
    `property/my-property/additional-details/${propertyID}`
  );
  if (isValidating) {
    return (
      <div>
        <InteriorDetailsSkeleton />
      </div>
    );
  }
  const additionalDetails = data?.data?.data;
  const handleOpen = (data: props) => {
    setIsOpen(true);
    setActiveData(data);
    setAllData(data?.description);
  };

  const handleDeleteAdditionalDetails = async (ID: string) => {
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
            path: `property/additional/delete/${ID}`,
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
    <div>
      <AdditionalDetailsEdit
        open={isOpen}
        activeData={activeData as props}
        mutate={mutate}
        onClose={() => setIsOpen(false)}
        allData={allData}
        setAllData={setAllData}
      />
      <AddNewAdditionalDetails
        open={isNewAdditionalOpen}
        mutate={mutate}
        onClose={() => setIsNewAdditionalOpen(false)}
      />
      <h1 className="text-xl flex w-full justify-between items-center text-themeDarkGray font-bold pt-5">
        Interior & Exterior Details
        <button
          className="btn-two !font-normal w-fit"
          onClick={() => setIsNewAdditionalOpen(true)}
        >
          Add
        </button>
      </h1>

      <div>
        {additionalDetails?.length === 0 ? (
          <ShowEmpty />
        ) : (
          <div className="grid grid-cols-3 w-full gap-6  ">
            {additionalDetails?.map((curElm: any) => (
              <div className="flex p-4 common-transition overflow-hidden dashboard-shadow justify-between dashboard-card-shadow items-center group gap-4 rounded-xl flex-col">
                <div className="flex h-full w-full flex-col gap-2">
                  <div className="w-full flex items-center justify-between ">
                    <p
                      className={`text-lg !text-themeDarkGray flex flex-col font-semibold`}
                    >
                      {curElm?.type}
                      <p className="text-base">{curElm?.heading}</p>
                    </p>
                    <div className="flex gap-2 items-center">
                      <div
                        onClick={() => handleOpen(curElm)}
                        className="bg-gradient-to-br  cursor-pointer from-twitter to-facebook shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  text-white flex items-center justify-center h-10 w-10 rounded-lg"
                      >
                        <Edit className="" />
                      </div>
                      <div
                        onClick={() =>
                          handleDeleteAdditionalDetails(curElm?._id)
                        }
                        className="bg-gradient-to-br cursor-pointer from-theme to-themeDarkGray shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] text-white flex items-center justify-center h-10 w-10 rounded-lg"
                      >
                        <Delete className="" />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    {curElm?.description?.map((item: any) => (
                      <p className="">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
