
import { Outlet } from "react-router-dom";
import AppSidebar from "../sidebar/AppSidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
