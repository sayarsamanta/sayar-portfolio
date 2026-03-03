import { BarChart } from "lucide-react";
import {
  FiHome,
  FiFolder,
  FiBriefcase,
  FiCpu,
  FiFileText,
  FiMail,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
const navItems = [
  { name: "Dashboard", path: "/admin", icon: FiHome },
  { name: "Projects", path: "/admin/projects", icon: FiFolder },
  { name: "Experience", path: "/admin/experience", icon: FiBriefcase },
  { name: "Skills", path: "/admin/skills", icon: FiCpu },
  { name: "Resume", path: "/admin/resume", icon: FiFileText },
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];
export function SidebarContent({ close }) {
  return (
    <div className="flex flex-col h-full p-4 font-sans">
      {/* Logo */}
      <div className="text-xl font-bold mb-8 tracking-wide">Admin Panel</div>
      <div className="mb-6">
        <Link
          to="/" // normal user dashboard
          className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-[var(--primary)] hover:text-[var(--text-button)] transition-all duration-200"
        >
          <BarChart size={18} /> User Dashboard
        </Link>
      </div>
      {/* Nav Links */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                  ${
                    isActive
                      ? "bg-[var(--primary)] text-white"
                      : "text-[var(--text-secondary)] hover:bg-[var(--background)]"
                  }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition">
        <FiLogOut size={18} />
        Logout
      </button>
    </div>
  );
}
