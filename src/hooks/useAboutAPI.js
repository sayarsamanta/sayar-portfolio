import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "../services/api";
import { setAboutData } from "../store/slices/about/aboutSlice";

const useAboutAPI = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/user");
      const userData = res?.data?.data;

      if (userData) {
        dispatch(setAboutData(userData?.about));
        dispatch({ type: "about/setUser", payload: userData });
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

  const saveAbout = useCallback(
    async (about, validateIntro, fromSave = false, updateName = {}) => {
      try {
        if (validateIntro && !validateIntro()) return null;
        setLoading(true);
        const payload = {
          name: "name" in updateName ? updateName.name : about?.name,
          email: "email" in updateName ? updateName.email : about?.email,
          role: about?.role || "admin",
          stats: about?.stats || {
            projects: 2,
            experienceYears: 7,
            clients: 10,
          },
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

        if (fromSave) {
          const res = await api.put("/user", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          const userData = res?.data;
          if (userData) {
            dispatch(setAboutData(userData?.about));
            dispatch({ type: "about/setUser", payload: userData });
          }
          setLoading(false);
          toast.success("About section updated successfully!");
          return res.data;
        } else {
          const res = await api.post("/user", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("About section updated successfully!");
          setLoading(false);
          dispatch(setAboutData(res.data?.data?.about));
          return res.data;
        }
      } catch (err) {
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
