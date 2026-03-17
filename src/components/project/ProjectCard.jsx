import { motion } from "framer-motion";
import ImageSlider from "./ImageSlider";
import { FiArrowUpRight } from "react-icons/fi";
import { getTechIcon } from "./getTechIcon";

const ProjectCard = ({ proj, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={() => onClick(proj)}
      className="
        group cursor-pointer
        rounded-3xl p-2 overflow-hidden
        border flex-[0_0_100%] sm:flex-[0_0_380px]
        max-w-full min-h-[460px]
        flex flex-col relative
        transition-all duration-500
        hover:-translate-y-1
        hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)]
        backdrop-blur-sm shadow-md
      "
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    ><div className="p-2 flex-shrink-0 relative">
        <div
          className="rounded-[1.5rem] overflow-hidden h-[210px] w-full relative"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
            borderColor: "var(--border)",
          }}
        >
          <ImageSlider
            images={proj.screenshots}
            autoplay
            interval={4000}
            showDots={true}
            showArrows={false}
            height="h-full"
          /><div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-10">
            <div className="bg-white/90 text-black px-3 py-1.5 rounded-full flex items-center gap-2 font-semibold text-[11px] scale-95 group-hover:scale-100 transition-transform duration-300 shadow-lg">
              View Details <FiArrowUpRight size={13} />
            </div>
          </div>
        </div>
      </div><div className="px-6 pb-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col max-w-[80%]">
            <span className="text-[10px] uppercase tracking-[0.18em] text-primary font-semibold opacity-70 mb-1">
              {proj.type}
            </span>

            <h3
              className="text-xl font-semibold tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2"
              style={{ color: "var(--text-primary)" }}
            >
              {proj.name}
            </h3>
          </div><div
            className="mt-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full border"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderColor: "var(--border)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />

            <span
              className="text-[9px] font-medium opacity-70"
              style={{ color: "var(--text-secondary)" }}
            >
              Live
            </span>
          </div>
        </div>

        <p
          className="text-sm leading-6 opacity-65 line-clamp-3 mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {proj.description}
        </p><div
          className="mt-auto flex items-center justify-between pt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-1 text-[11px] font-semibold text-primary opacity-80 group-hover:opacity-100 transition-all">
            View Project <FiArrowUpRight size={14} />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {proj.tech
                ?.flat()
                .slice(0, 3)
                .map((techName, i) => (
                  <div
                    key={i}
                    title={techName}
                    className="
                      w-8 h-8 rounded-full
                      bg-primary
                      border-2 border-[var(--card)]
                      shadow-sm
                      flex items-center justify-center
                      text-white text-sm
                      transition-transform hover:-translate-y-1 hover:z-10
                    "
                  >
                    <span className="flex items-center justify-center filter brightness-0 invert">
                      {getTechIcon(techName)}
                    </span>
                  </div>
                ))}

              {proj.tech?.flat().length > 3 && (
                <div
                  className="
                    w-8 h-8 rounded-full
                    bg-primary
                    border-2 border-[var(--card)]
                    flex items-center justify-center
                    text-[10px] font-semibold
                    text-white
                  "
                >
                  +{proj.tech.flat().length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
