import { useEffect, useState } from "react";
import ProjectCard from "../../components/project/ProjectCard";
import DetailedModel from "../../components/project/DetailedModel";
import { useSelector } from "react-redux";
import EmptySection from "../../components/admin/experience/EmptySection";

export default function Projects() {
  const projects = useSelector((state) => state.projects.projects);
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);
  const filteredProjects =
    filter === "All" ? projects : projects.filter((proj) => proj.type === filter);

  return (
    <>
      <div
        className="
    min-h-screen w-full
    px-4 sm:px-6 md:px-12 lg:px-20 
    py-16 sm:py-20 md:py-24 
    flex flex-col gap-16 md:gap-20 
    font-body
    
  "
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      >
        {projects && projects.length === 0 && <EmptySection type={"Project"} />}
        {/* Section Title */}
        {projects && projects.length > 0 && (
          <>
            <h1
              className="
        text-3xl 
        sm:text-4xl 
        md:text-5xl 
        lg:text-6xl 
        font-heading font-bold 
        text-center 
        mb-6 md:mb-10
      "
              style={{ color: "var(--text-primary)" }}
            >
              Projects
            </h1>

            {/* Filter Toggle */}
            <div className="flex justify-center gap-4 mb-10">
              {["All", "Fullstack", "Frontend"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="
  px-4 sm:px-5 
  py-1.5 sm:py-2 
  text-xs sm:text-sm 
  rounded-full 
  font-heading font-medium 
  border 
  transition duration-200
"
                  style={{
                    backgroundColor: filter === cat ? "var(--primary)" : "var(--card)",
                    color: filter === cat ? "var(--text-light)" : "var(--text-secondary)",
                    borderColor: filter === cat ? "var(--primary)" : "var(--border)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-full mx-auto px-8">
              <div className="flex flex-wrap gap-8 justify-center">
                {/* Project Cards */}
                {filteredProjects.map((proj, idx) => (
                  <ProjectCard proj={proj} key={idx} onClick={() => setSelectedProject(proj)} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {/* Projects Grid */}
      {selectedProject && (
        <DetailedModel selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
      )}
    </>
  );
}
