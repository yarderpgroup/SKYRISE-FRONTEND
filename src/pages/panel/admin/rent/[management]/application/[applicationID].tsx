import { AdharCard, DL, Passport, IncomeProof } from "assets/admin";
import ApplicationQuestions from "components/admin/rentProperty/ApplicationQuestions";
import BasicInformation from "components/admin/rentProperty/BasicInformation";
import IncomeVerification from "components/admin/rentProperty/IncomeVerification";
import ResidenceHistory from "components/admin/rentProperty/ResidenceHistory";
import WorkHistory from "components/admin/rentProperty/WorkHistory";
import useSWRAPI from "hooks/useSWRAPI";
import { TenantLayout } from "layouts";
import { useRouter } from "next/router";
import React from "react";

const ViewApplication = () => {
  const router = useRouter();
  const property = router?.query?.management;
  console.log(property);
  const applicationID = router?.query?.applicationID;
  const { data, error, isValidating, mutate } = useSWRAPI(
    `application/landlord/application-info/${property}?tenantId=${applicationID}`
  );
  const viewDetails = data?.data?.data;
  console.log(data);
  return (
    <TenantLayout title="View Application">
      <div className="min-h-[calc(100vh-5.5rem)] gap-6 grid grid-cols-12 text-themeDarkGray p-4">
        <div className="col-span-6  gap-4">
          <BasicInformation
            viewDetails={viewDetails?.basicInformation}
            tenant={viewDetails?.tenant}
          />
        </div>
        <div className="col-span-6 gap-4">
          <WorkHistory viewDetails={viewDetails?.workHistories} />
        </div>
        <div className="col-span-6  gap-4">
          <IncomeVerification viewDetails={viewDetails?.incomeVerifications} />
        </div>
        <div className="col-span-6 gap-4 ">
          <ResidenceHistory viewDetails={viewDetails?.residenceHistories} />
        </div>
        <div className="w-full col-span-12 gap-4 mt-4">
          <ApplicationQuestions viewDetails={viewDetails?.customQuestions} />
        </div>
      </div>
    </TenantLayout>
  );
};

export default ViewApplication;
