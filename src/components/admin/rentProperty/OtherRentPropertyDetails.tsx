const amenitiesArr = [
  {
    id: 1,

    info: [
      {
        id: 11,
        name: "Parking",
      },
      {
        id: 12,
        name: "Power Backup",
      },
      {
        id: 13,
        name: "Club house",
      },
      {
        id: 14,
        name: "Swimming Pool",
      },
      {
        id: 15,
        name: "Security Personnel",
      },
    ],
  },
];
const UtilitiesArr = [
  {
    id: 1,

    info: [
      {
        id: 11,
        name: "Internet",
      },
      {
        id: 12,
        name: "Sewer",
      },
      {
        id: 13,
        name: "Water Source",
      },
      {
        id: 14,
        name: "Ac",
      },
      {
        id: 14,
        name: "Heating",
      },
    ],
  },
];
const OtherRentPropertyDetails = () => {
  return (
    <div className="flex gap-4 py-6">
      <div className="p-5 flex gap-9 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div>
          <h1 className="font-semibold text-xl">Amenities</h1>
          <div className="gap-4 flex flex-col py-5">
            {amenitiesArr.map((item) => (
              <div key={item.id} className="flex flex-col ">
                <div className="flex flex-col gap-4">
                  {item.info.map((info) => (
                    <li
                      className="leading-6 text-base tracking-wide pl-2"
                      key={item.id}
                    >
                      {info?.name}
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold text-xl">Utilities</h1>
          <div className="gap-4 grid grid-cols-1 py-5">
            {UtilitiesArr.map((item) => (
              <div key={item.id} className="flex flex-col ">
                <div className="flex flex-col gap-4">
                  {item.info.map((info) => (
                    <li
                      className="leading-6 text-base tracking-wide pl-2"
                      key={item.id}
                    >
                      {info?.name}
                    </li>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherRentPropertyDetails;
