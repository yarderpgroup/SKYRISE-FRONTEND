import { ShowEmpty } from "components/core";

const PropertiesPhoto = ({ curElm }: any) => {
  return (
    <div className="py-4 flex flex-col gap-5 w-full">
      {curElm.length === 0 ? (
        <ShowEmpty />
      ) : (
        <div className="grid grid-cols-4 w-full gap-6">
          {curElm.map((curElm: any) => (
            <div key={curElm.id}>
              <img
                src={curElm?.photo}
                alt=""
                className="w-full h-48 2xl:h-52 object-fill rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesPhoto;
