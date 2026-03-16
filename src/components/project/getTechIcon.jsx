import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiFramer,
  SiNextdotjs,
} from "react-icons/si";

export const getTechIcon = (name) => {
  const iconMap = {
    react: <SiReact className="text-[#61DAFB]" />,
    "node.js": <SiNodedotjs className="text-[#339933]" />,
    nodejs: <SiNodedotjs className="text-[#339933]" />,
    mongodb: <SiMongodb className="text-[#47A248]" />,
    tailwind: <SiTailwindcss className="text-[#06B6D4]" />,
    javascript: <SiJavascript className="text-[#F7DF1E]" />,
    typescript: <SiTypescript className="text-[#3178C6]" />,
    framer: <SiFramer className="text-white" />,
    nextjs: <SiNextdotjs className="text-white" />,
  };

  return iconMap[name.toLowerCase()] || <span className="text-[8px] font-bold">{name[0]}</span>;
};
