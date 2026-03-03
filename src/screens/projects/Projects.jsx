import { useEffect, useState } from "react";
import sample1 from "../../assets/sample1.jpg";
import sample2 from "../../assets/sample2.jpg";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ProjectCard from "../../components/project/ProjectCard";
import DetailedModel from "../../components/project/DetailedModel";
const projectData = [
  {
    id: 1,
    name: "Fullstack Portfolio",
    type: "Fullstack",
    tech: ["React", "Node.js", "Tailwind"],
    description:
      "A fully animated portfolio using React and Node.js with dynamic content from DB.",
    screenshots: [sample1, sample2],
  },
  {
    id: 2,
    name: "E-commerce Platform",
    type: "Fullstack",
    tech: ["React", "Express", "MongoDB"],
    description:
      "End-to-end e-commerce platform with cart, payment, and admin panel.",
    screenshots: [sample1],
  },
  {
    id: 3,
    name: "Landing Page UI",
    type: "Frontend",
    tech: ["React", "Tailwind"],
    description:
      "Responsive landing page with animations and interactive components.",
    screenshots: [sample2],
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { darkMode } = useContext(ThemeContext);

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
    filter === "All"
      ? projectData
      : projectData.filter((proj) => proj.type === filter);

  return (
    <>
      <div
        className="
    min-h-screen 
    px-4 sm:px-6 md:px-12 lg:px-20 
    py-16 sm:py-20 md:py-24 
    flex flex-col gap-16 md:gap-20 
    font-body
    max-w-7xl mx-auto
  "
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      >
        {/* Section Title */}
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
                backgroundColor:
                  filter === cat ? "var(--primary)" : "var(--card)",
                color:
                  filter === cat
                    ? "var(--text-light)"
                    : "var(--text-secondary)",
                borderColor:
                  filter === cat ? "var(--primary)" : "var(--border)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((proj, idx) => (
            <ProjectCard
              proj={proj}
              key={idx}
              onClick={() => setSelectedProject(proj)}
            />
          ))}
        </div>
      </div>
      {selectedProject && (
        <DetailedModel
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      )}
    </>
  );
}
