import { NavLink, useNavigate } from "react-router-dom"
import { FiUser, FiFileText, FiSettings, FiAlertCircle, FiLogOut } from "react-icons/fi"

const Sidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/")
  }

  return (
    <div className="w-64 bg-black text-white p-5 flex flex-col min-h-screen fixed">
      <h1 className="text-3xl font-extrabold mt-3 mb-3">
        Civic<span className="text-blue-400">Eye</span>
      </h1>

      <nav className="space-y-2 flex-grow">
        <SidebarButton to="/admin" icon={<FiFileText />} text="Dashboard" exact={true} />
        <SidebarButton to="/admin/complaints" icon={<FiAlertCircle />} text="Complaints" />
        <SidebarButton to="/admin/users" icon={<FiUser />} text="User Management" />
        <SidebarButton to="/admin/reports" icon={<FiSettings />} text="Reports" />
      </nav>

      {/* Logout Button  */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 py-3 px-5 rounded-lg transition duration-300 w-full text-left bg-red-600 hover:bg-red-700 text-white mt-auto"
      >
        <FiLogOut />
        Logout
      </button>
    </div>
  );
};

const SidebarButton = ({ to, icon, text, exact }) => {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex items-center gap-2 py-3 px-5 rounded-lg transition duration-300 w-full text-left group ${
          isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700 hover:text-white"
        }`
      }
    >
      <span className="group-hover:text-gray-200 transition-colors duration-200">{icon}</span>
      {text}
    </NavLink>
  );
};

export default Sidebar;
