import { useContext, useEffect } from "react";
import { FiFolder, FiBriefcase, FiCpu, FiHome, FiFileText, FiSettings } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
const navItems = [
  { name: "Dashboard", path: "/admin", icon: FiHome },
  { name: "Projects", path: "/admin/projects", icon: FiFolder },
  { name: "Experience", path: "/admin/experience", icon: FiBriefcase },
  { name: "Skills", path: "/admin/skills", icon: FiCpu },
  { name: "Resume", path: "/admin/resume", icon: FiFileText },
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];
export default function AdminDashboard() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const stats = [
    { label: "Projects", value: 8, icon: FiFolder },
    { label: "Experience", value: 4, icon: FiBriefcase },
    { label: "Skills", value: 18, icon: FiCpu },
  ];
  console.log("AdminDashboard rendered with darkMode:", darkMode);

  return (
    <div className="space-y-8 text-[var(--text-primary)] font-sans">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage your portfolio content and monitor activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={index}
              className="
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--card)]
            p-6
            transition-all duration-200
            hover:border-[var(--primary)]
            hover:shadow-md
          "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                  <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                </div>

                <div
                  className="
                p-3
                rounded-xl
                bg-[var(--background)]
                border border-[var(--border)]
                text-[var(--text-secondary)]
              "
                >
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Messages */}
        {/* <div
          className="
        xl:col-span-2
        rounded-2xl
        border border-[var(--border)]
        bg-[var(--card)]
        p-6
      "
        >
          <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
              flex items-center justify-between
              p-4
              rounded-xl
              bg-[var(--background)]
              border border-[var(--border)]
              transition-all duration-200
              hover:border-[var(--primary)]
              hover:shadow-sm
            "
              >
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Interested in collaboration.
                  </p>
                </div>

                <span className="text-xs text-[var(--text-secondary)]">
                  2h ago
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Quick Actions */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>

          <div className="flex flex-wrap gap-4">
            {/* Add Project */}
            <Link
              to="/admin/projects"
              className="flex items-center gap-3 px-6 py-3 bg-[var(--primary)] text-[var(--text-button)] rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow hover:shadow-lg min-w-[150px] justify-center"
            >
              + Add Project
            </Link>

            {/* Add Experience */}
            <Link
              to="/admin/experience"
              className="flex items-center gap-3 px-6 py-3 bg-[var(--primary)] text-[var(--text-button)] rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow hover:shadow-lg min-w-[150px] justify-center"
            >
              + Add Experience
            </Link>

            {/* Upload Resume */}
            <Link
              to="/admin/resume"
              className="flex items-center gap-3 px-6 py-3 bg-[var(--primary)] text-[var(--text-button)] rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow hover:shadow-lg min-w-[150px] justify-center"
            >
              + Upload Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
