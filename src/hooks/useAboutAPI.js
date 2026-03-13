import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "../services/api";
import { setAboutData } from "../store/slices/about/aboutSlice";

/**
 * Custom hook for About API
 * Handles fetching user and saving/updating About section
 */
const useAboutAPI = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Fetch user data
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/user");
      const userData = res?.data?.data;

      if (userData) {
        dispatch(setAboutData(userData?.about));
        dispatch({ type: "about/setUser", payload: userData }); // optional
      }

      setLoading(false);
      return userData;
    } catch (err) {
      setLoading(false);

      const status = err.response?.status;
      const message = err.response?.data?.message;

      alert(StatusCode.getMessage(status, message));
      return null;
    }
  }, [dispatch]);

  // Save or update About
  const saveAbout = useCallback(
    async (about, validateIntro) => {
      try {
        if (validateIntro && !validateIntro()) return null;
        setLoading(true);

        const payload = {
          role: "admin",
          stats: { projects: 2, experienceYears: 7, clients: 10 },
          about: {
            intro: about.intro,
            skills: about.skills,
            achievements: about.achievements,
            education: about.education,
            personalInterests: about.personalInterests,
          },
        };

        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));

        if (about.intro?.profileFile instanceof File) {
          formData.append("profileImg", about.intro.profileFile);
        }

        // Optional: debug FormData
        // for (let pair of formData.entries()) {
        //   console.log(pair[0], pair[1]);
        // }

        const res = await api.post("/user", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        dispatch(setAboutData(res.data?.data?.about));
        toast.success("About section updated successfully!");

        setLoading(false);
        return res.data;
      } catch (err) {
        console.error(err);
        setLoading(false);
        toast.error(err.response?.data?.message || "Error updating about");
        return null;
      }
    },
    [dispatch]
  );

  return { fetchUser, saveAbout, loading };
};

export default useAboutAPI;
