import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div
      className="
        glass-card rounded-3xl p-2 overflow-hidden
        border flex-[0_0_100%] sm:flex-[0_0_380px] lg:flex-[0_0_460px] xl:flex-[0_0_500px]
        max-w-full min-h-[460px] lg:min-h-[520px]
        flex flex-col relative shadow-sm
      "
      style={{
        borderColor: "var(--glass-border)",
      }}
    >
      {/* Image slider placeholder */}
      <div className="relative h-full w-full rounded-[1.5rem] glass-card overflow-hidden">
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="w-2 h-2 rounded-full glass-card" />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 flex flex-col flex-grow gap-3 mt-4">
        <div className="glass-card h-4 w-20 rounded-full" />

        <div className="glass-card h-6 w-3/4 rounded-lg" />

        <div className="glass-card h-5 w-16 rounded-full mt-1" />

        <div className="glass-card h-3 w-full rounded" />
        <div className="glass-card h-3 w-5/6 rounded" />
        <div className="glass-card h-3 w-2/3 rounded" />

        <div
          className="mt-auto flex items-center justify-between pt-4"
          style={{ borderTop: "1px solid var(--glass-border)" }}
        >
          <div className="glass-card h-4 w-24 rounded" />

          <div className="flex -space-x-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="glass-card w-8 h-8 lg:w-9 lg:h-9 rounded-full" />
            ))}
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
      style={{ background: "var(--gradient-bg)" }}
    >
      {/* Heading */}
      <div className="glass-card h-12 w-56 mx-auto rounded-xl" />

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "Fullstack", "Frontend"].map((cat) => (
          <div key={cat} className="glass-card w-20 h-8 rounded-full" />
        ))}
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-10 w-full max-w-[1400px] mx-auto px-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <ProjectCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPageSkeleton;
