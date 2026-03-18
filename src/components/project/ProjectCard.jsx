import { motion } from "framer-motion";
import ImageSlider from "./ImageSlider";
import { FiArrowUpRight } from "react-icons/fi";
import { getTechIcon } from "./getTechIcon";
import { useMemo } from "react";

const ProjectCard = ({ proj, onClick }) => {
  const techList = useMemo(() => proj?.tech.flat() || [], [proj.tech]);
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      onClick={() => onClick(proj)}
      className="
group cursor-pointer
rounded-3xl p-2 overflow-hidden
border flex-[0_0_100%] sm:flex-[0_0_380px] lg:flex-[0_0_460px] xl:flex-[0_0_500px]
max-w-full min-h-[460px] lg:min-h-[520px]
flex flex-col relative
transition-all duration-500
hover:shadow-[0_18px_35px_rgba(0,0,0,0.08)]
backdrop-blur-sm shadow-sm
"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {" "}
      <div className="p-2 flex-shrink-0 relative">
        <div
          className="rounded-[1.5rem] overflow-hidden h-[210px] lg:h-[250px] w-full relative"
          style={{
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          {" "}
          <ImageSlider
            images={proj.screenshots}
            autoplay
            interval={4000}
            showDots={true}
            showArrows={false}
            height="h-full"
          />
          ```
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <div className="bg-white/90 text-black px-3 py-1.5 rounded-full flex items-center gap-2 font-medium text-[11px] shadow-md">
              View Details <FiArrowUpRight size={13} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col max-w-[80%]">
            <span className="text-[10px] uppercase tracking-[0.16em] text-primary font-medium opacity-70 mb-1">
              {proj.type}
            </span>

            <h3
              className="text-xl lg:text-2xl font-semibold tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2"
              style={{ color: "var(--text-primary)" }}
            >
              {proj.name}
            </h3>
          </div>

          <div
            className="mt-1 flex items-center gap-1.5 px-2 py-1 rounded-full border"
            style={{
              backgroundColor: "rgba(34,197,94,0.08)",
              borderColor: "rgba(34,197,94,0.18)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />

            <span className="text-[9px] font-medium text-green-500">Live</span>
          </div>
        </div>

        <p
          className="text-sm lg:text-[15px] leading-6 opacity-65 line-clamp-3 mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          {proj.description}
        </p>

        <div
          className="mt-auto flex items-center justify-between pt-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-1 text-[11px] font-medium text-primary opacity-80 group-hover:opacity-100 transition-all">
            View Project <FiArrowUpRight size={14} />
          </div>

          <div className="flex -space-x-2">
            {techList.slice(0, 3).map((techName, i) => (
              <div
                key={i}
                title={techName}
                className="
                w-8 h-8 lg:w-9 lg:h-9 rounded-full
                bg-primary
                border-2 border-[var(--card)]
                shadow-sm
                flex items-center justify-center
                text-white text-sm
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
              w-8 h-8 lg:w-9 lg:h-9 rounded-full
              bg-primary
              border-2 border-[var(--card)]
              flex items-center justify-center
              text-[10px] font-medium
              text-white
            "
              >
                +{proj.tech.flat().length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
