import withProtectedRoute from "hooks/withProtectedRoute";
import Sidebar from "./Sidebar";
import LoginModal from "components/common/LoginModal";

type Props = {
  children: JSX.Element[] | JSX.Element;
};
const PublicLayout = ({ children }: Props) => {
  return (
    <div className="w-full flex">
      <div className="w-full flex custom-container gap-8">
        <div className="w-1/4 h-full relative hidden md:block">
          <Sidebar />
        </div>
        <div className="w-full md:w-3/4">{children}</div>
      </div>
    </div>
  );
};

export default PublicLayout;
