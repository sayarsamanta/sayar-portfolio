const TimelineExpSkeletonCard = ({ isLeft = true }) => {
  return (
    <div className={`relative w-full flex ${isLeft ? "justify-start" : "justify-end"} h-48`}>
      {/* Timeline vertical line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] h-full opacity-30"
        style={{
          background: "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent)",
        }}
      />

      {/* Timeline dot */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-3 w-3 h-3 rounded-full z-10 shadow-md"
        style={{
          background: "var(--primary)",
        }}
      />

      {/* Glass card */}
      <div className="glass-card rounded-xl p-4 max-w-xs md:max-w-sm w-full shadow-sm ml-6">
        <div className="glass-card h-4 rounded mb-3 w-3/4" />
        <div className="glass-card h-3 rounded mb-3 w-1/2" />
        <div className="glass-card h-3 rounded mb-3 w-5/6" />
        <div className="glass-card h-3 rounded w-2/3" />
      </div>
    </div>
  );
};

const TimelineExpSkeleton = () => {
  return (
    <div className="mt-24">
      {/* Heading */}
      <div className="glass-card h-12 w-52 mx-auto rounded-xl mb-16" />

      <div className="relative max-w-4xl mx-auto">
        {/* Main timeline line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] h-full opacity-30"
          style={{
            background:
              "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))",
          }}
        />

        <div>
          {Array.from({ length: 4 }).map((_, index) => (
            <TimelineExpSkeletonCard key={index} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineExpSkeleton;
