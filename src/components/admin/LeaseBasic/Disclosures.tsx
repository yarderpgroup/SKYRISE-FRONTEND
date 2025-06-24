import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { post } from "api";
import { RippleLoadingButton } from "components/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const otherPolicyArr = [
  {
    id: 13,
    heading: "Notice of Forclousure",
    subtitle:
      "if the property is currently going through a foreclosure you may be required disclose this information to your prospective tenants.",
    options: [
      {
        id: 16,
        value: "Yes this property is in foreclosure",
      },
      {
        id: 17,
        value: "No this property is in foreclosure",
      },
    ],
  },
  {
    id: 2,
    heading: "Condition Affecting of Habitability",
    subtitle:
      "if the property is currently going through a foreclosure you may be required disclose this information to your prospective tenants.",
    options: [
      {
        id: 15,
        value:
          "No iam not aware of any conditions affecting hability regarding this property.",
        description:
          "No iam not aware of any conditions affecting hability regarding this property.",
        price: false,
        date: false,
      },
      {
        id: 16,
        value:
          "Yes iam aware of any conditions affecting hability regarding this property.",
        description:
          "Yes iam aware of any conditions affecting hability regarding this property.",
        price: false,
        date: false,
      },
    ],
  },
  {
    id: 3,
    heading: "Lead Paint Disclosure",
    subtitle:
      "if the property is currently going through a foreclosure you may be required disclose this information to your prospective tenants.",
    options: [
      {
        id: 17,
        value: "Yes I am aware of lead issue regrading this property.",
        description: "Yes I am aware of lead issue regrading this property.",
        price: false,
        date: false,
      },
      {
        id: 18,
        value: "No I am aware of lead issue regrading this property..",
        description: "No I am aware of lead issue regrading this property.",
        price: false,
        date: false,
      },
    ],
  },
  {
    id: 4,
    heading: "Radon Disclosures",
    subtitle:
      "if the property is currently going through a foreclosure you may be required disclose this information to your prospective tenants.",
    options: [
      {
        id: 20,
        value: "Yes I am aware of radon issue regrading this property.",
        description: "Yes I am aware of radon issue regrading this property..",
        price: false,
        date: false,
      },
      {
        id: 21,
        value: "No I am aware of radon issue regrading this property..",
        description: "No I am aware of radon issue regrading this property.",
        price: false,
        date: false,
      },
    ],
  },
  {
    id: 4,
    heading: "Mold Disclosure",
    subtitle:
      "if the property is currently going through a foreclosure you may be required disclose this information to your prospective tenants.",
    options: [
      {
        id: 11,
        value: "Yes I am aware of Mold  issue regrading this property.",
        description: "Yes I am aware of Mold  issue regrading this property..",
        price: false,
        date: false,
      },
      {
        id: 16,
        value: "No I am aware of Mold  issue regrading this property..",
        description: "No I am aware of Mold  issue regrading this property..",
        price: false,
        date: false,
      },
    ],
  },
  {
    id: 2,
    heading: "Asbestos Disclosure",
    subtitle:
      "if the property is currently going through a foreclosure you may be required disclose this information to your prospective tenants.",
    options: [
      {
        id: 11,
        value: "Yes I am aware of Asbestos  issue regrading this property.",
        description:
          "Yes I am aware of Asbestos  issue regrading this property..",
        price: false,
        date: false,
      },
      {
        id: 16,
        value: "No I am aware of Asbestos  issue regrading this property..",
        description:
          "No I am aware of Asbestos  issue regrading this property..",
        price: false,
        date: false,
      },
    ],
  },
];

let data: any = [];
const Disclosures = () => {
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const router = useRouter();

  const ID = router?.query?.management;

  const tenantId: any = router?.query?.tenant;
  let isArray = Array.isArray(tenantId);

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
  const handleSelect = async (e: any) => {
    const isExistData: any = otherPolicyArr.find((item) =>
      item?.options?.map((innerItem) => innerItem?.value === e?.target?.value)
    );
    data.push({
      title: isExistData?.heading,
      question: isExistData?.subtitle,
      options: e?.target?.value,
      propertyId: ID,
    });
    const title = data[0]?.title;
    const question = data[0]?.question;
    const options = data[0]?.options;

    data = [];
    const formData = new FormData();
    formData.append("title", title);
    formData.append("question", question);
    formData.append("options", options);
    formData.append("propertyId", ID as any);
    if (isArray) {
      tenantId?.map((item: any) => formData?.append("tenantId", item));
    } else {
      formData?.append("tenantId", tenantId);
    }

    const response = await post({
      path: `lease/add/disclosure`,
      isAlert: true,
      body: JSON.stringify({
        title: title,
        question: question,
        options: options,
        propertyId: ID,
        tenantId: tenantId,
      }),
    });
  };
  const handleSubmit = async () => {
    router.push(`/panel/admin/rent/${ID}/lease-details/attachment${tenant}`);
  };
  return (
    <div className="">
      <div className="shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-5 rounded-lg bg-white">
        <div className="flex justify-between w-full">
          <h1 className="text-xl font-bold text-themeDarkGray">Disclosures</h1>
        </div>
        {/*discloures options*/}
        <div className="flex flex-col py-5 ">
          {otherPolicyArr?.map((item) => (
            <div key={item?.id} className="flex flex-col gap-3">
              <h1 className="text-themeDarkGray font-bold text-xl">
                {item?.heading}
              </h1>
              <p className="text-base text-gray-600 pt-2"> {item?.subtitle}</p>

              <FormControl>
                <RadioGroup>
                  {item?.options?.map((innerItem) => (
                    <FormControlLabel
                      value={innerItem?.value}
                      onChange={(e) => handleSelect(e)}
                      control={
                        <Radio
                          sx={{
                            color: "#999999",
                            "&.Mui-checked": {
                              color: "#E33324",
                            },
                          }}
                        />
                      }
                      label={<div>{innerItem?.value}</div>}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          ))}
        </div>
        <div className="flex items-center col-span-12  justify-center flex-col gap-2 py-8">
          <RippleLoadingButton
            type="submit"
            title="Save & Continue"
            className="w-full"
            loading={isStatusLoading}
            handleClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Disclosures;
