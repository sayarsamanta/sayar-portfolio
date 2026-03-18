import React from "react";

const AboutSkeleton = () => {
  return (
    <div className="min-h-screen px-6 md:px-14 lg:px-24 xl:px-32 py-16 flex flex-col gap-14">
      {/* Intro Section */}
      <section className="w-full py-10 flex flex-col items-center text-center animate-pulse">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-gray-300 mb-6" />

        {/* Headline */}
        <div className="h-8 md:h-10 lg:h-12 w-64 md:w-96 bg-gray-300 rounded mb-4" />

        {/* Subtext */}
        <div className="h-5 md:h-6 w-48 md:w-72 bg-gray-300 rounded mb-6" />

        {/* Story */}
        <div className="space-y-3 max-w-4xl w-full">
          <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto" />
          <div className="h-4 bg-gray-300 rounded w-4/6 mx-auto" />
          <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="animate-pulse">
        {/* Skill category buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-300 rounded-full" />
          ))}
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 w-20 bg-gray-300 rounded-full" />
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="animate-pulse">
        <div className="h-6 w-48 bg-gray-300 rounded mb-4 mx-auto" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded w-full" />
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="animate-pulse">
        <div className="h-6 w-40 bg-gray-300 rounded mb-4 mx-auto" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded w-full" />
          ))}
        </div>
      </section>

      {/* Personal Interests Section */}
      <section className="animate-pulse">
        <div className="h-6 w-56 bg-gray-300 rounded mb-4 mx-auto" />
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 w-24 bg-gray-300 rounded-full" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutSkeleton;
