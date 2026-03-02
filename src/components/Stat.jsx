import React from "react";
export const Stat = ({ count, label }) => {
  const [number, setNumber] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = count;
    const duration = 3000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setNumber(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-3xl font-bold font-heading">
        {number}+
      </span>
      <span className="text-sm text-[var(--text-secondary)]">{label}</span>
    </div>
  );
};
