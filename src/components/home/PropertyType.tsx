import { PROPERTYTYPE } from "../../assets/backgrounds";
import { useState } from "react";
import { ExpandMore, KeyboardArrowRight } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
const property_type = [
  {
    id: "1",
    title: "Modern Villa",
    des: "To own a home for living or for investment is the dream of everyone, but to find the right home require a lot of research and hard work. Key components require to start your home search journey are budget, locality, property type, amenities, and a lot more.",
  },
  {
    id: "2",
    title: "Family House",
    des: "To own a home for living or for investment is the dream of everyone, but to find the right home require a lot of research and hard work. Key components require to start your home search journey are budget, locality, property type, amenities, and a lot more.",
  },
  {
    id: "3",
    title: "Town House",
    des: "To own a home for living or for investment is the dream of everyone, but to find the right home require a lot of research and hard work. Key components require to start your home search journey are budget, locality, property type, amenities, and a lot more.",
  },
  {
    id: "4",
    title: "Apartment",
    des: "To own a home for living or for investment is the dream of everyone, but to find the right home require a lot of research and hard work. Key components require to start your home search journey are budget, locality, property type, amenities, and a lot more.",
  },
];
const PropertyType = () => {
  const [activeId, setActiveId] = useState("1");

  const handleActive = (ID: string) => {
    if (activeId.includes(ID)) {
      setActiveId("");
      return;
    }
    setActiveId(ID);
  };
  return (
    <section className="w-full bg-white custom-container md:py-10 py-6">
      <div className="flex flex-col gap-4 md:gap-6">
        <p className="flex gap-2 title-styling font-semibold text-themeDarkGray">
          <span className="relative after:absolute after:-bottom-2 md:after:-bottom-3 after:left-0 after:w-full after:h-[3px] after:bg-theme ">
            Types
          </span>
          <span className="">of Properties</span>
        </p>
        <p className="leading-6 md:leading-7 md:text-lg text-base text-themeDarkGray">
          Handpicked projects for you. Local SkyRise Agents price your home
          right and make it shine online. <br className="md:flex hidden" /> Get
          started with a free consultation.
        </p>
        <div className="flex flex-col md:flex-row w-full gap-5">
          <div className="md:w-1/2 w-full !order-2 md:!order-1">
            <div className="w-full flex justify-start gap-2 md:gap-3 h-full flex-col">
              {property_type?.map((item) => (
                <div key={item?.id} className="flex flex-col">
                  <Accordion
                    expanded={activeId === item?.id}
                    sx={{
                      boxShadow: "none !important",
                      background: "",
                    }}
                  >
                    <AccordionSummary>
                      <p
                        onClick={() => handleActive(item?.id)}
                        className={`${
                          activeId === item?.id
                            ? "text-theme before:absolute before:top-0 before:left-0 h-0 md:before:h-40 before:w-1 before:bg-theme"
                            : "text-themeDarkGray "
                        }  flex  w-full md:text-xl text-lg relative rounded-lg cursor-pointer items-center justify-between md:px-5 text-clip font-semibold common-transition `}
                      >
                        <p>{item?.title}</p>
                        {activeId === item.id ? (
                          <p>
                            <ExpandMore className="text-3xl" />
                          </p>
                        ) : (
                          <p>
                            <KeyboardArrowRight className="text-3xl" />
                          </p>
                        )}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="w-full md:px-5 text-base leading-6 text-themeDarkGray">
                        {item.des}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 w-full !order-1 md:!order-2">
            <img src={PROPERTYTYPE.src} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyType;
