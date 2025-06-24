import { ShowEmpty } from "components/core";

const PropertiesVideo = ({ curElm }: any) => {
  return (
    <div className="py-4 w-full flex flex-col gap-5">
      {curElm.length === 0 ? (
        <ShowEmpty />
      ) : (
        <div className="grid grid-cols-4 w-full gap-6 ">
          {curElm.map((curElm: any) => (
            <div key={curElm.id}>
              <iframe src={curElm?.video} className="w-full h-40 2xl:h-48" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertiesVideo;
