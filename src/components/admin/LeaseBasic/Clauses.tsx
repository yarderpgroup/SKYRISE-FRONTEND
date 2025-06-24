import { post } from "api";
import { RippleLoadingButton } from "components/core";
import { yupToFormErrors } from "formik";
import useSWRAPI from "hooks/useSWRAPI";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { ManageRulesDetails } from "../managementEdit";
import EmptyComponents from "components/core/ShowEmpty";

const Clauses = () => {
  const AddDetails = [
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
  const ID = router?.query?.management;
  const tenantId: any = router?.query?.tenant;
  const [openHomeDetails, setOpenHomeDetails] = useState(false);
  const [addMoreModal, setAddMoreModal] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  const { data, error, mutate, isValidating } = useSWRAPI(
    `lease/get-all/rules-clauses`
  );

  let isArray = Array.isArray(tenantId);
  console.log(tenantId, "tenantId");

  let tenant = "";
  if (isArray) {
    tenantId?.forEach((item: any, i: number) => {
      if (i === 0) {
        tenant = "?tenant=" + item;
      } else {
        tenant += `&tenant=${item}`;
      }
    });
  } else {
    tenant = "?tenant=" + tenantId;
  }
  const handleSend = async () => {
    setIsStatusLoading(true);
    try {
      const formData = new FormData();
      formData.append("propertyId", ID as any);
      if (isArray) {
        console.log("run1");
        tenantId?.map((item: any) => formData?.append("tenantId", item));
      } else {
        formData?.append("tenantId", tenantId);
      }
      const response = await post({
        path: `lease/save/rules-clauses`,
        isAlert: true,
        isImage: true,
        body: formData,
        // body: JSON.stringify({
        //   propertyId: ID,
        //   tenantId: tenantId,
        // }),
      });
      setIsStatusLoading(false);
      console.log(response);
      if (response?.status === 200) {
        router.push(
          `/panel/admin/rent/${ID}/lease-details/disclosures${tenant}`
        );
      }
    } catch (error: any) {
      toast.error(error);
      setIsStatusLoading(false);
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
          propertyID={ID as any}
        />

        <div className="flex justify-between">
          <h1 className="text-xl text-themeDarkGray font-bold pt-5">
            Rules and Clauses
          </h1>

          <button
            onClick={() => setAddMoreModal(!addMoreModal)}
            className="btn-two w-52"
          >
            Add Clauses & Rules
          </button>
        </div>
        {data?.data?.data?.data?.length ? (
          <div className="grid grid-cols-2 gap-5">
            {data?.data?.data?.data?.map((curElm: any) => (
              <div className="flex p-6 flex--row  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-gradient-to-br from-theme/5 to-themeGray/5 justify-between flex-row dashboard-card-shadow items-center  gap-4 rounded-xl">
                <div key={curElm?._id} className="flex h-full w-full flex-col ">
                  <div className="flex w-full flex-col">
                    <div className="flex w-full justify-between">
                      <div>
                        <h4 className={` font-bold text-xl text-themeDarkGray`}>
                          {curElm?.type}
                        </h4>
                        <h4 className={` font-semibold`}>{curElm?.title}</h4>
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
        ) : (
          <EmptyComponents />
        )}
        <div className="flex items-center col-span-12  justify-center flex-col gap-2 py-8">
          <RippleLoadingButton
            type="submit"
            title="Save & Continue"
            className="w-full"
            loading={isStatusLoading}
            handleClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default Clauses;
