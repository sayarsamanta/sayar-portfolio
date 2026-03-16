import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "../services/api";
import { setAboutData } from "../store/slices/about/aboutSlice";

/**
 * Custom hook for About API
 * Handles fetching user and saving/updating About section
 */
const useResumeHandler = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Save or update About
  const uploadResume = useCallback(
    async (resumeFile) => {
      try {
        const formData = new FormData();
        formData.append("resume", resumeFile);

        setLoading(true);

        const res = await api.post("/upload-resume", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res) {
          toast.success("Resume uploaded successfully!!");
          dispatch(setAboutData(res.data.user.about));
          dispatch({ type: "about/setUser", payload: res.data.user });
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Error uploading resume!!");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const deleteResume = useCallback(async () => {
    try {
      setDeleteLoading(true);

      const res = await api.delete("/resume", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res) {
        toast.success("Resume deleted successfully!!");
        dispatch(setAboutData(res.data.data.about));
        dispatch({ type: "about/setUser", payload: res.data.data });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting resume!!");
    } finally {
      setDeleteLoading(false);
    }
  }, [dispatch]);

  return { uploadResume, loading, deleteResume, deleteLoading };
};

export default useResumeHandler;
