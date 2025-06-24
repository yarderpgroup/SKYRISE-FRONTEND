import { post } from "api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const AddVideo = ({}) => {
  const [selectedVideo, setSelectedVideo] = useState<any>(undefined);
  const [videoPreviews, setVideoPreviews] = useState([]);

  const router = useRouter();

  const formData = new FormData();
  for (let x in selectedVideo) {
    formData.append("propertyVideo", selectedVideo[x] as any);
  }

  const handleSend = async () => {
    try {
      const response = await post({
        path: `property/video/${router?.query?.propertyID}`,
        isImage: true,
        isAlert: true,
        body: formData,
      });
      if (response.status === 200) {
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <div className="w-full flex flex-col">
      <div className="pt-3 flex flex-row justify-between items-center w-full"></div>
    </div>
  );
};

export default AddVideo;
