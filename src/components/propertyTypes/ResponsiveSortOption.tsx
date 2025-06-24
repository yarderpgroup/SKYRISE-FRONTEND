import { SortIcon } from "assets/static";
import { CustomDrawer } from "components/core";
import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import {
  Check,
  HowToVote,
  LocalOffer,
  NewReleases,
  SettingsSuggest,
} from "@mui/icons-material";

const sortBy = [
  {
    id: 2,
    name: "Newest First",
    value: "newestFirst",
    icon: <NewReleases />,
  },
  {
    id: 3,
    name: "Price (Low to high)",
    value: "priceLowToHigh",
    icon: <ArrowUpwardIcon />,
  },
  {
    id: 4,
    name: "Price (High to low)",
    value: "priceHighToLow",
    icon: <ArrowDownwardIcon />,
  },

  {
    id: 6,
    name: "Price/Sq.ft",
    value: "pricePerSqFt",
    icon: <LocalOffer />,
  },
  {
    id: 7,
    name: "Owner",
    value: "owner",
    icon: <LocalOffer />,
  },
  {
    id: 8,
    name: "WithPhotos",
    value: "withPhotos",
    icon: <LocalOffer />,
  },
];

const ResponsiveSortOption = ({ setSort, sort }: any) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleSort = (e: string) => {
    setSort(e);
    setDrawerOpen(false);
  };
  return (
    <section className="w-full  gradientButton !text-themeDarkGray">
      <div
        onClick={() => setDrawerOpen(true)}
        className="w-full flex text-white items-center h-12 justify-center gap-2 text-center"
      >
        <div className="w-5">
          <img src={SortIcon.src} alt="logo" className="w-full" />
        </div>
        Sort
      </div>
      <CustomDrawer
        anchor="bottom"
        onClose={() => setDrawerOpen(false)}
        open={isDrawerOpen}
        height="100%"
      >
        <div className="w-full h-full flex flex-col text-themeDarkGray">
          <p className="text-xl items-start font-semibold p-5 border-b border-primaryBorder/50">
            Sort By
          </p>
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col gap-4 px-3 py-2">
              {sortBy.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSort(item.value)}
                  className="flex items-center gap-2 w-full"
                >
                  <p className="text-themeDarkGray">{item.icon}</p>
                  <p className="flex items-center gap-3 p-1 rounded-lg">
                    {item.name}
                    {sort === item.value && (
                      <Check className="text-themeDarkGray -mt-0.5" />
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CustomDrawer>
    </section>
  );
};

export default ResponsiveSortOption;
