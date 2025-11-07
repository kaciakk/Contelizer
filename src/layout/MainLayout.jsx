import { Outlet } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
const MainLayout = () => {
  return (
    <div>
      <MainNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
