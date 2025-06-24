import { Dialog, Skeleton } from "@mui/material";
import { post } from "api";
import PropertyFound from "components/common/PropertyFound";
import { PhotoSkeleton } from "components/skeleton/propertyDetails";
import useSWRAPI from "hooks/useSWRAPI";
import { toast } from "react-toastify";

type Props = {
  open?: boolean | any;
  onClose?: () => void;
  setRealtime?: (value: boolean) => void;
  mutate?: any;
  allPhotoDetails?: any;
  isLoading: boolean;
};
const AllPhotoUpload = ({
  open,
  onClose,
  mutate,
  allPhotoDetails,
  isLoading,
}: Props) => {
  return (
    <Dialog
      maxWidth={"lg"}
      fullWidth
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={() => onClose && onClose()}
    >
      {allPhotoDetails ? (
        <div className="p-4">
          {isLoading ? (
            <div className="w-full p-5">
              <PhotoSkeleton />
            </div>
          ) : (
            <div className="pt-4 p-5">
              <h1 className="text-xl hotel-content font-bold text-themeDarkGray ">
                Property Photos
              </h1>

              <div className="grid grid-cols-3 w-full gap-8  pt-4 ">
                {allPhotoDetails?.map((item: any) => (
                  <div key={item?._id}>
                    <img
                      src={item?.photo}
                      alt=""
                      className="w-full h-40 2xl:h-48 rounded-md "
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <PropertyFound title="No Property photo Found" />
      )}
    </Dialog>
  );
};

export default AllPhotoUpload;
