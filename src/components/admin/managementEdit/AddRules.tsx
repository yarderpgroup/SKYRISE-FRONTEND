import { yupToFormErrors } from "formik";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { useState } from "react";
import { ManageRulesDetails, RulesEdit } from ".";
import * as Yup from "yup";
import { Edit } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import { remove } from "api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ShowEmpty } from "components/core";

export default function AddRules() {
  const AddDetails = [
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
      key: "2",
      name: "type",
      label: "Type",
      options: [
        {
          label: "Rules",
          value: "rules",
        },
        {
          label: "Clauses",
          value: "clauses",
        },
      ],
      styleContact: "rounded-xl overflow-hidden bg-white ",
      type: "select",
      validationSchema: Yup.string().required("Type is Required"),
      initialValue: "",
      required: true,
      multiline: true,
      rows: 3,
      className: "col-span-6",
    },

    {
      key: "3",
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
  const router = useRouter();
  const propertyID = router?.query?.propertyID;
  const [openHomeDetails, setOpenHomeDetails] = useState(false);
  const [addMoreModal, setAddMoreModal] = useState(false);
  const [openRules, setOpenRules] = useState(false);
  const [activeData, setActiveData] = useState<any>();

  const { data, error, mutate, isValidating } = useSWRAPI(
    `lease/get-all/rules-clauses`
  );
  const handelOpen = (data: any) => {
    setOpenRules(true);
    setActiveData(data);
  };
  const handleDeleteRules = async (row: any) => {
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
            path: `lease/delete/rule-clauses/${row?._id}`,
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
      <div className="!text-themeDarkGray flex flex-col gap-6">
        <ManageRulesDetails
          setAddMoreModal={setAddMoreModal}
          addMoreModal={addMoreModal}
          AddDetails={AddDetails}
          mutate={mutate}
          propertyID={propertyID as any}
        />
        <RulesEdit
          open={openRules}
          activeData={activeData}
          mutate={mutate}
          onClose={() => setOpenRules(false)}
        />
        <div className="flex justify-between">
          <h1 className="text-xl text-themeDarkGray font-bold pt-5">
            Rules and Clauses
          </h1>

          <button
            onClick={() => setAddMoreModal(!addMoreModal)}
            className="btn-two w-20"
          >
            Add
          </button>
        </div>
        <div>
          {data?.data?.data?.data?.length === 0 ? (
            <ShowEmpty />
          ) : (
            <div className="grid grid-cols-2 gap-5">
              {data?.data?.data?.data?.map((curElm: any) => (
                <div className="flex p-6 flex--row  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gradient-to-br from-theme/5 to-themeGray/5 justify-between flex-row dashboard-card-shadow items-center  gap-4 rounded-xl">
                  <div
                    key={curElm?._id}
                    className="flex h-full w-full flex-col "
                  >
                    <div className="flex w-full flex-col">
                      <div className="flex w-full justify-between">
                        <div>
                          <h4
                            className={` font-bold text-xl text-themeDarkGray`}
                          >
                            {curElm?.type}
                          </h4>
                          <h4 className={` font-semibold`}>{curElm?.title}</h4>
                        </div>

                        <div className="flex gap-2 ">
                          <div
                            onClick={() => handelOpen(curElm)}
                            className="bg-gradient-to-br from-twitter cursor-pointer to-facebook shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  text-white flex items-center justify-center h-10 w-10 rounded-lg"
                          >
                            <Edit />
                          </div>
                          <div
                            onClick={() => handleDeleteRules(curElm)}
                            className="bg-gradient-to-br from-theme cursor-pointer to-themeDarkGray shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] text-white flex items-center justify-center h-10 w-10 rounded-lg"
                          >
                            <Delete />
                          </div>
                        </div>
                      </div>
                      <h1 className={`font-semibold  text-justify pt-2`}>
                        {curElm?.description}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
