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
export const parseDuration = (duration) => {
  if (!duration) return { startDate: "", endDate: "", current: false };

  const [start, end] = duration.split(" – ");

  const formatMonth = (value) => {
    if (!value || value === "Present") return "";

    const [month, year] = value.split(" ");
    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    return `${year}-${months[month]}`;
  };

  return {
    startDate: formatMonth(start),
    endDate: end === "Present" ? "" : formatMonth(end),
    current: end === "Present",
  };
};
export const validateExp = (form, setErrors) => {
  const newErrors = {};

  if (!form.company?.trim()) {
    newErrors.company = "Company required";
  }

  if (!form.role?.trim()) {
    newErrors.role = "Role required";
  }

  if (!form.startDate) {
    newErrors.startDate = "Start date required";
  }

  if (!form.isPresent && !form.endDate) {
    newErrors.endDate = "End date required";
  }
  if (!form.isPresent && form.startDate && form.endDate && form.startDate > form.endDate) {
    newErrors.endDate = "End date cannot be before start date";
  }

  if (!form.description?.trim()) {
    newErrors.description = "Description required";
  }
  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
