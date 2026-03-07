export const formatDuration = (startDate, endDate) => {
  if (!startDate) return "";

  const format = (date) =>
    new Date(date + "-01").toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  const start = format(startDate);
  const end = endDate ? format(endDate) : "Present";

  return `${start} – ${end}`;
};
