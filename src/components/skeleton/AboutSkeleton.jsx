import React from "react";

const AboutSkeleton = () => {
  return (
    <div
      className="min-h-screen px-6 md:px-14 lg:px-24 xl:px-32 py-16 flex flex-col gap-14"
      style={{ background: "var(--gradient-bg)" }}
    >
      {/* Intro Section */}
      <section className="w-full py-10 flex flex-col items-center text-center ">
        <div className="glass-card w-32 h-32 rounded-full mb-6" />

        <div className="glass-card h-10 w-72 md:w-96 rounded-xl mb-4" />

        <div className="glass-card h-6 w-52 md:w-72 rounded-lg mb-6" />

        <div className="space-y-3 max-w-4xl w-full">
          <div className="glass-card h-4 rounded w-5/6 mx-auto" />
          <div className="glass-card h-4 rounded w-4/6 mx-auto" />
          <div className="glass-card h-4 rounded w-2/3 mx-auto" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card h-9 w-24 rounded-full" />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-card h-7 w-24 rounded-full" />
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="">
        <div className="glass-card h-7 w-52 rounded-lg mb-5 mx-auto" />

        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card h-4 rounded w-full" />
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="">
        <div className="glass-card h-7 w-44 rounded-lg mb-5 mx-auto" />

        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card h-4 rounded w-full" />
          ))}
        </div>
      </section>

      {/* Personal Interests */}
      <section className="">
        <div className="glass-card h-7 w-56 rounded-lg mb-5 mx-auto" />

        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card h-7 w-24 rounded-full" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutSkeleton;
