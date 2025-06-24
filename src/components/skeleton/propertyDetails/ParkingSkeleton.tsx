import { Skeleton } from "@mui/material";

const ParkingDetails = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
  {
    id: 8,
  },
];
const ParkingSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton variant="text" width="20%" height={40} />
      <div className="w-full grid grid-cols-12 gap-4">
        {ParkingDetails?.map((item) => (
          <div className="w-full flex col-span-3">
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="100%"
              className="!rounded-lg"
              height={75}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingSkeleton;
