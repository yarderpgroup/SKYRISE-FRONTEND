import { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Drought, Fire, Flood, Heat, Storm } from "../../assets/staticImages";

export const ClimateRiskArr = [
  {
    id: "1",
    heading: "Flood Factor",
    des: "Minimal - Unlikely to flood in next 30 years",
    icon: Flood.src,
  },
  {
    id: "2",
    heading: "Storm Risk",
    des: "Very High - 22 storms expected in 2050",
    icon: Storm.src,
  },
  {
    id: "3",
    heading: "Drought Risk",
    des: "Moderate - Water stress expected to be 8% in 2050",
    icon: Drought.src,
  },
  {
    id: "4",
    heading: "Heat Risk",
    des: "Moderate - 29 hot days expected in 2050",
    icon: Heat.src,
  },
  {
    id: "5",
    heading: "Fire Risk",
    des: "Relatively Low - 0.6% of land expected to burn in 2050",
    icon: Fire.src,
  },
];
const ClimateRisk = () => {
  const [activeId, setActiveId] = useState("");
  const [isClimate, setIsClimate] = useState(false);

  const handleActive = (ID: string) => {
    if (activeId.includes(ID)) {
      setActiveId("");
      return;
    }
    setActiveId(ID);
  };

  return (
    <section className="flex flex-col w-full gap-3 text-themeDarkGray">
      <h1 className="text-xl font-semibold ">Climate Risk</h1>
      <p>
        Most homes have some risk of natural disasters, and may be impacted by
        climate change due to rising
        <br /> temperatures and sea levels.
      </p>
      <div>
        {ClimateRiskArr?.map((item) => (
          <div key={item?.id} className="flex flex-col">
            <Accordion
              // expanded={activeId === item?.id}
              sx={{
                boxShadow: "none !important",
                background: "",
                padding: "0px !important",
              }}
            >
              <AccordionSummary>
                <div
                  onClick={() => handleActive(item?.id)}
                  className={`${
                    activeId === item?.id
                      ? " border-l-8 border-primaryBorder shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                      : "bg-white border text-themeDarkGray border-primaryBorder"
                  }  flex w-full h-24 rounded-md cursor-pointer items-center justify-between px-5 hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] common-transition shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}
                >
                  <div className="flex gap-4 items-center">
                    <img src={item.icon} alt="icon" className="w-8 h-8" />
                    <div>
                      <p className="text-lg font-semibold ">{item?.heading}</p>
                      <p className="text-sm">{item?.des}</p>
                    </div>
                  </div>
                  {activeId === item.id ? (
                    <p>
                      <KeyboardArrowUp className="!text-2xl text-themeDarkGray" />
                    </p>
                  ) : (
                    <p>
                      <KeyboardArrowDown className="!text-2xl text-themeDarkGray" />
                    </p>
                  )}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="mt-3 p-5 rounded-[12px] w-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur tenetur unde vero sint nesciunt eos quaerat obcaecati
                  dolore et, animi repellendus quia laudantium dolor ad delectus
                  eveniet odio similique eaque.
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <p>
          Climate risk data is provided for informational purposes only. If you
          have questions or feedback about this data, get help at riskfactor.com
          and climatecheck.com.
        </p>
        <p>
          SkyRise does not endorse nor guarantee this information. By providing
          this information, Redfin and its agents are not providing advice or
          guidance on flood risk, flood insurance, or other climate risks.
          SkyRise strongly recommends that consumers independently investigate
          the property’s climate risks to their own personal satisfaction.
        </p>
      </div>
    </section>
  );
};

export default ClimateRisk;
