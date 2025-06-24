import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

const PaginationButton = ({
  previousDisable,
  currentPage,
  setCurrentPage,
  isLastChunk,
  reload,
}: {
  currentPage: number;
  previousDisable: boolean;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isLastChunk: any;
  reload?: any;
}) => {
  const router = useRouter();
  const previousPages = () => {
    if (previousDisable) return;
    if (Boolean(reload)) router.push(reload);
    setCurrentPage((prev) => prev - 1);
  };
  const nextPage = () => {
    if (Boolean(reload)) router.push(reload);
    if (isLastChunk) return setCurrentPage(1);

    setCurrentPage((prev) => prev + 1);
  };
  return (
    <div className="flex w-full justify-center items-center gap-2">
      <Button
        disabled={previousDisable}
        className="!border-2 rounded-lg px-4 py-2 !border-primaryBorder !border-dashed w-32"
        onClick={previousPages}
      >
        Previous
      </Button>
      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-theme to-themeDarkGray text-white font-semibold flex items-center justify-center shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        {currentPage}
      </div>
      <Button
        disabled={isLastChunk as any}
        className="!border-2 rounded-lg px-4 py-2 !border-primaryBorder !border-dashed w-32"
        onClick={nextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationButton;
