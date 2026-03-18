import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div
      className="
        rounded-3xl p-2 overflow-hidden
        border flex-[0_0_100%] sm:flex-[0_0_380px] lg:flex-[0_0_460px] xl:flex-[0_0_500px]
        max-w-full min-h-[460px] lg:min-h-[520px]
        flex flex-col relative
        shadow-sm animate-pulse
      "
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Image slider placeholder */}
      <div
        className={`relative h-full w-full rounded-[1.5rem] bg-gray-300 overflow-hidden animate-pulse`}
        style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
      >
        {/* Optional overlay for hover effect mimic */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0">
          <div className="bg-white/20 rounded-full w-16 h-16" />
        </div>

        {/* Dots placeholder */}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="w-2 h-2 rounded-full bg-gray-400" />
          ))}
        </div>
      </div>

      {/* Card content */}
      <div className="px-6 pb-6 flex flex-col flex-grow gap-3">
        {/* Type badge */}
        <div className="h-4 w-20 bg-gray-300 rounded-full" />

        {/* Project name */}
        <div className="h-6 bg-gray-300 rounded w-3/4" />

        {/* Live badge */}
        <div className="h-5 w-16 bg-gray-300 rounded-full mt-1" />

        {/* Description */}
        <div className="h-3 bg-gray-300 rounded w-full mt-2" />
        <div className="h-3 bg-gray-300 rounded w-5/6" />
        <div className="h-3 bg-gray-300 rounded w-2/3" />

        {/* Bottom section */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-300">
          {/* View Project */}
          <div className="h-4 bg-gray-300 rounded w-24" />

          {/* Tech tags */}
          <div className="flex -space-x-2">
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gray-300 border-2 border-gray-200" />
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gray-300 border-2 border-gray-200" />
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gray-300 border-2 border-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsPageSkeleton = () => {
  return (
    <div
      className="min-h-screen w-full px-4 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24 flex flex-col gap-16 md:gap-20 font-body"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Page heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-6 md:mb-10 animate-pulse bg-gray-300 h-12 w-48 mx-auto rounded" />

      {/* Filter buttons */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "Fullstack", "Frontend"].map((cat) => (
          <div
            key={cat}
            className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full font-heading font-medium border bg-gray-200 animate-pulse w-16 h-8"
          />
        ))}
      </div>

      {/* Project cards */}
      <div className="flex flex-wrap justify-center gap-10 w-full max-w-[1400px] mx-auto px-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <ProjectCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPageSkeleton;
