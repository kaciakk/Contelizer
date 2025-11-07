import { NavLink } from "react-router-dom";

const MainNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-center gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-600 shadow"
                : "hover:bg-blue-500 hover:shadow-md"
            }`
          }
        >
          First
        </NavLink>

        <NavLink
          to="/second"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-600 shadow"
                : "hover:bg-blue-500 hover:shadow-md"
            }`
          }
        >
          Second
        </NavLink>

        <NavLink
          to="/third"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
              isActive
                ? "bg-white text-blue-600 shadow"
                : "hover:bg-blue-500 hover:shadow-md"
            }`
          }
        >
          Third
        </NavLink>
      </div>
    </nav>
  );
};

export default MainNavbar;
