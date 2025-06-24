import { TenantLayout } from "layouts";
import { Avatar, Dialog } from "@mui/material";
import { FeatureOne, FeatureTwo, FeatureFive } from "assets/property";
import { useEffect, useState } from "react";
import { EditApplicationDetails } from ".";
import ViewDetailApplication from "./ViewDetailsApplication";
import { TESTIMONIALONE } from "assets/property";
import { useRouter } from "next/router";
import StatusApplication from "./StatusApplication";
import useSWRAPI from "hooks/useSWRAPI";
import { EmptyComponents, ShowEmpty } from "components/core";
import EmptyData from "components/common/Empty";

const PendingStatusRequest = ({ activeType }: any) => {
  const [openStatus, setOpenStatus] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tenantData, setTenantData] = useState<any>();
  const router = useRouter();
  const propertyID = router?.query?.management;
  const { data, error, isValidating, mutate } = useSWRAPI(
    `application/landlord/pending/${propertyID}?status=false`
  );

  const handleOpenTenant = (data: any) => {
    setTenantData(data);
    setOpenStatus(true);
  };
  useEffect(() => {
    mutate();
  }, [activeType, mutate]);
  return (
    <>
      <StatusApplication
        open={openStatus}
        tenantData={tenantData}
        mutate={mutate}
        onClose={() => setOpenStatus(false)}
      />
      <EditApplicationDetails
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
      <div className="w-full py-5 md:py-10 px-3 md:px-5 text-themeDarkGray  md:min-h-[calc(100vh-4.5rem)]">
        {data?.data?.data?.length === 0 ? (
          <EmptyComponents />
        ) : (
          <div className="w-full grid grid-cols-12 gap-3 md:gap-5">
            {data?.data?.data?.map((item: any) => (
              <div className="md:col-span-4 col-span-12 flex flex-col bg-white rounded-lg overflow-hidden shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] common-transition">
                <div className="p-2 flex gap-4 flex-col">
                  <div className="w-full flex justify-start gap-2 px-3 items-center">
                    <Avatar
                      src={item?.photoUrl}
                      alt={"img"}
                      className="!h-20 !w-20"
                    >
                      {item?.firstName && item?.firstName[0]}
                    </Avatar>
                    <div className="flex flex-col">
                      <p className=" font-semibold text-lg">
                        {item?.firstName} {item?.lastName}
                      </p>
                      <p className="text-base">{item.phoneNumber}</p>
                      <p className="text-base">{item.email}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-start px-3 gap-1">
                    <p className="text-base font-semibold">Status: </p>
                    <p className="text-base">{item.status}</p>
                  </div>
                </div>
                <div className="flex w-full gap-2 p-4">
                  <button
                    className="btn-two w-full"
                    onClick={() => handleOpenTenant(item)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PendingStatusRequest;
