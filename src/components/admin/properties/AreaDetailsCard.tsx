const roomArr = [
  {
    id: 1,
    bedroom: "No.of Bedrooms:",
    bathroom: "No.of Bathrooms:",
    balcoins: "No.of Balconies:",
    area: "Area:",
    FurnishingStatus: "Furnishing status:",
    Amenities: "Amenities:",
    heading: "Willing to rent out to?",
    subtitle: "Are you ok with brokers contacting you?",
    description: "Description",
  },
];
const AreaDetailsCard = () => {
  return (
    <div className="p-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-themeGray/10 rounded-lg">
      <h1 className="text-themeDarkGray text-2xl font-bold">
        Property Details
      </h1>
      {roomArr?.map((inputItem) => (
        <div key={inputItem?.id} className="flex flex-col gap-4 py-4">
          <h1 className="text-base text-themeDarkGray">{inputItem?.bedroom}</h1>
          <h1 className="text-base text-themeDarkGray">
            {inputItem?.bathroom}
          </h1>
          <h1 className="text-base text-themeDarkGray">
            {inputItem?.balcoins}
          </h1>
          <h1 className="text-base text-themeDarkGray">{inputItem?.area}</h1>
          <h1 className="text-base text-themeDarkGray">
            {inputItem?.FurnishingStatus}
          </h1>
          <h1 className="text-base text-themeDarkGray">
            {inputItem?.Amenities}
          </h1>
          <h1 className="text-base text-themeDarkGray">{inputItem?.heading}</h1>
          <h1 className="text-base text-themeDarkGray">
            {inputItem?.subtitle}
          </h1>
          <h1 className="text-base text-themeDarkGray">
            {inputItem?.description}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default AreaDetailsCard;
