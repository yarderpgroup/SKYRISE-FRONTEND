import { Visibility } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const attachmentDetails = [
  {
    id: 11,
    title: "Lead Paint Pamplet",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 12,
    title: "Lead Paint Pamplet",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 13,
    title: "Lead Paint Pamplet",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
  {
    id: 14,
    title: "Lead Paint Pamplet",
    url: "https://www.africau.edu/images/default/sample.pdf",
  },
];
const AttachmentDetails = () => {
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);

  const [isDocumentData, setDocumentData] = useState<any>();
  const handleDocumentOpen = (val: any) => {
    setIsDocumentOpen(true);
    setDocumentData(val);
  };
  return (
    <div className="flex gap-2 flex-col p-5">
      <p className="md:text-xl text-lg italic pt-5 border-b bordre-primaryBorder/50">
        Attachments
      </p>
      <ul className="flex flex-col gap-8 px-5">
        {attachmentDetails?.map((item) => (
          <li key={item.id} className="list-decimal">
            <p className="font-semibold">
              {item?.title}
              <IconButton>
                <Visibility onClick={() => handleDocumentOpen(item)} />
              </IconButton>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttachmentDetails;
