import { FiBriefcase, FiCpu, FiFolder } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { projects } = useSelector((state) => state.projects);
  const { exp } = useSelector((state) => state.experience);
  const { user } = useSelector((state) => state.about);
  const { skills } = user?.about || [];
  const stats = [
    { label: "Projects", value: projects?.length || 0, icon: FiFolder },
    { label: "Experience", value: exp?.length || 0, icon: FiBriefcase },
    { label: "Skills", value: skills?.length || 0, icon: FiCpu },
  ];

  return (
    <div className="space-y-8 text-[var(--text-primary)] font-sans">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage your portfolio content and monitor activity.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          if (stat.value > 0) {
            return (
              <div
                key={index}
                className="
              rounded-2xl
              border border-[var(--border)]
              
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
          }
        })}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-[var(--border)] p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin/projects"
              className="flex items-center gap-3 px-6 py-3 bg-[var(--primary)] text-[var(--text-button)] rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow hover:shadow-lg min-w-[150px] justify-center"
            >
              + Add Project
            </Link>
            <Link
              to="/admin/experience"
              className="flex items-center gap-3 px-6 py-3 bg-[var(--primary)] text-[var(--text-button)] rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow hover:shadow-lg min-w-[150px] justify-center"
            >
              + Add Experience
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
