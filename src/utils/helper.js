import toast from "react-hot-toast";

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

export const validateSection = (sectionName, data) => {
  if (!data) return false;

  // for object sections
  if (typeof data === "object" && !Array.isArray(data)) {
    const hasValue = Object.values(data).some(
      (val) => val !== "" && val !== null && val !== undefined
    );

    if (!hasValue) {
      toast.error(`${sectionName} cannot be empty`);
      return false;
    }
  }

  // for array sections
  if (Array.isArray(data) && data.length === 0) {
    toast.error(`${sectionName} cannot be empty`);
    return false;
  }

  return true;
};
export const flattenObject = (obj, parent = "", res = {}) => {
  for (let key in obj) {
    const propName = parent ? `${parent}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }

  return res;
};
