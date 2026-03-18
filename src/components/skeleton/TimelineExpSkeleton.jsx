const TimelineExpSkeletonCard = ({ isLeft = true }) => {
  return (
    <div className={`relative w-full flex ${isLeft ? "justify-start" : "justify-end"} h-48`}>
      {/* Timeline vertical gradient line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] h-full opacity-30"
        style={{
          background: "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))",
        }}
      />

      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 top-3 w-3 h-3 rounded-full bg-[var(--primary)] z-10 shadow-md animate-pulse" />

      {/* Skeleton card */}
      <div className="bg-gray-200 rounded-xl p-4 max-w-xs md:max-w-sm w-full shadow-sm animate-pulse ml-6">
        {/* Placeholder lines inside the card */}
        <div className="h-4 bg-gray-300 rounded mb-2 w-3/4" />
        <div className="h-3 bg-gray-300 rounded mb-2 w-1/2" />
        <div className="h-3 bg-gray-300 rounded mb-2 w-5/6" />
        <div className="h-3 bg-gray-300 rounded w-2/3" />
      </div>
    </div>
  );
};

const TimelineExpSkeleton = () => {
  return (
    <div className="mt-16">
      <h1 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16 animate-pulse">
        Experience
      </h1>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] h-full opacity-30 bg-gradient-to-b from-primary via-secondary to-accent" />

        <div className="flex flex-col gap-10 relative">
          {Array.from({ length: 6 }).map((_, index) => (
            <TimelineExpSkeletonCard key={index} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineExpSkeleton;
