import { OnDeviceTraining, Sell, ShoppingCart } from "@mui/icons-material";
import { ResponsesChart, ResponsesGraph } from "components/admin/graph";
import ResponsesCard from "components/admin/responses/ResponsesCard";
import withProtectedLandlord from "hooks/withProtectedLandlord";
import { TenantLayout } from "layouts";

const Dashboard = () => {
  return (
    <TenantLayout title="Responses Dashboard">
      <div className="w-full py-5 md:py-10 px-3 bg-gradient-to-br text-themeDarkGray from-themeGray/10 to-white md:px-5 !min-h-[calc(100vh-4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-3   content-between gap-4">
          <ResponsesCard
            title="Total Responses"
            iconClassName="bg-themeDarkGray"
            content="231"
            titleClassName="text-black font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold"
            className="col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-2  "
            icon={
              <OnDeviceTraining className="h-8 w-8 rounded-md  text-white  " />
            }
            clickableRoute="/panel/admin/responses/manage-response"
          />
          <ResponsesCard
            title="Buy Responses"
            iconClassName="bg-themeDarkGray"
            content="234"
            titleClassName="text-black font-bold text-base"
            contentClassName="text-themeDarkGray  text-3xl font-bold"
            className="col-span-12  bg-white sm:col-span-12 md:col-span-6 rounded-3xl lg:col-span-2 transition-all duration-500 ease-in-out hover:scale-95   "
            icon={
              <ShoppingCart className="h-7 w-7 rounded-md group-hover:text-white  text-white" />
            }
            clickableRoute="/panel/admin/responses/manage-response"
          />
          <ResponsesCard
            title="Rent Responses"
            iconClassName="bg-themeDarkGray"
            content="235"
            titleClassName="text-black font-bold text-base"
            contentClassName="text-themeDarkGray text-3xl font-bold"
            className="col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-2 transition-all duration-500 ease-in-out hover:scale-95   "
            icon={
              <Sell className="h-7 w-7 rounded-md group-hover:text-white  text-white" />
            }
            clickableRoute="/panel/admin/responses/manage-response"
          />
        </div>
        <div className=" flex gap-5 mt-10 lg:flex-row flex-col py-7">
          <div className="lg:w-2/5 w-full bg-white  shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
            <ResponsesGraph
              type="donut"
              labels={["Buy", "Sell"]}
              series={[850, 747]}
            />
          </div>
          <div className="lg:w-2/3 w-full bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ">
            <ResponsesChart type="bar" text="Weekly Status" />
          </div>
        </div>
      </div>
    </TenantLayout>
  );
};

export default withProtectedLandlord(Dashboard);
