import React from "react";

const ResumePageSkeleton = () => {
  return (
    <div
      className="w-full min-h-screen flex justify-center px-4 py-8 mt-48"
      style={{
        background: "var(--gradient-bg)",
      }}
    >
      <div className="glass-card w-full max-w-[1000px] rounded-2xl p-6">
        {/* Download button row */}
        <div className="flex justify-end mb-6">
          <div className="glass-card h-10 w-28 rounded-lg" />
        </div>

        {/* PDF pages */}
        <div className="flex flex-col gap-8 items-center">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="glass-card w-full max-w-[900px] rounded-xl p-6"
              style={{
                aspectRatio: "1 / 1.4",
              }}
            >
              <div className="flex flex-col gap-3">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div
                    key={i}
                    className={`glass-card h-3 rounded ${
                      i % 5 === 0 ? "w-3/4" : i % 4 === 0 ? "w-2/3" : "w-full"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumePageSkeleton;
