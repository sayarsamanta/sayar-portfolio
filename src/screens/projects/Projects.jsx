import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import EmptySection from "../../components/admin/experience/EmptySection";
import useProjectAPI from "../../hooks/useProjectAPI";

import ProjectCard from "../../components/project/ProjectCard";

// Lazy load the DetailedModel modal
const DetailedModel = React.lazy(() => import("../../components/project/DetailedModel"));

export default function Projects() {
  const projects = useSelector((state) => state.projects.projects);
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const { fetchProjects } = useProjectAPI();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchProjects();
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    if (filter === "All") {
      return projects;
    } else {
      return projects.filter((p) => p.type === filter);
    }
  }, [projects, filter]);

  return (
    <>
      <div
        className="
    min-h-screen w-full
    px-4 sm:px-6 md:px-12 lg:px-20
    py-10 sm:py-14 md:py-20
    flex flex-col
    gap-8 sm:gap-12 md:gap-16
    font-body pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-32   
  "
        style={{ backgroundColor: "var(--background)", color: "var(--text-primary)" }}
      >
        {!loading && projects.length === 0 && <EmptySection type={"Project"} />}

        {!loading && projects.length > 0 && (
          <>
            <h1
              className="text-3xl sm:text-4xl font-heading font-bold text-center mt-4 sm:mt-6"
              style={{ color: "var(--text-primary)" }}
            >
              Projects
            </h1>

            <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              {["All", "Fullstack", "Frontend"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full font-heading font-medium border transition duration-200"
                  style={{
                    backgroundColor: filter === cat ? "var(--primary)" : "var(--card)",
                    color: filter === cat ? "white" : "var(--text-secondary)",
                    borderColor: filter === cat ? "var(--primary)" : "var(--border)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 w-full max-w-[1400px] mx-auto px-2 sm:px-4">
              {filteredProjects.map((proj, idx) => (
                <ProjectCard proj={proj} key={idx} onClick={() => setSelectedProject(proj)} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lazy-loaded modal */}
      <Suspense
        fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <span className="text-white animate-pulse">Loading...</span>
          </div>
        }
      >
        {selectedProject && (
          <DetailedModel
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        )}
      </Suspense>
    </>
  );
}
