import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatusCode from "../utils/StatusCode";
import api from "../services/api";
import {
  addExperience,
  deleteExperience,
  setExperience,
  updateExperience,
} from "../store/slices/experience/expSlice";
import toast from "react-hot-toast";
import { formatDuration } from "../utils/helper";
const useExperienceAPI = () => {
  const dispatch = useDispatch();
  const { exp } = useSelector((state) => state.experience || {});
  const [loading, setLoading] = useState(false);

  const fetchExperience = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/experience");
      const expData = res?.data?.data;
      if (expData) {
        dispatch(setExperience(expData));
      }
      setLoading(false);
      return expData;
    } catch (err) {
      setLoading(false);
      const status = err.response?.status;
      const message = err.response?.data?.message;
      alert(StatusCode.getMessage(status, message));
      return null;
    }
  }, [dispatch]);

  const addExperienceCall = useCallback(
    async (data, isEdit = false, slug = "", id = "") => {
      try {
        setLoading(true);

        const payload = {
          role: data.role,
          company: data.company,
          duration: formatDuration(data.startDate, data.endDate),
          description: data.description,
          tech: data.tech,
        };
        if (isEdit) {
          const res = await api.put(`/experience/${slug}`, payload, {
            headers: { "Content-Type": "application/json" },
          });
          if (res) {
            const newExp = res?.data?.data;
            dispatch(
              updateExperience({
                id: newExp._id,
                updatedData: newExp,
              })
            );
            toast.success("About section updated successfully!");

            setLoading(false);
            return res.data;
          }
        } else {
          const res = await api.post("/experience", payload, {
            headers: { "Content-Type": "application/json" },
          });
          if (res) {
            const newExp = res?.data?.data;
            dispatch(addExperience(newExp));
            toast.success("Experience section created successfully!");

            setLoading(false);
            return res.data;
          }
        }
      } catch (err) {
        setLoading(false);
        toast.error(err.response?.data?.message || "Error updating about");
        return null;
      }
    },
    [dispatch, exp]
  );

  const deleteExperienceAction = useCallback(
    async (slug) => {
      try {
        const res = await api.delete(`/experience/${slug}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (res) {
          dispatch(deleteExperience(slug));
          toast.success("Experience deleted successfully!");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Error updating about");
        return null;
      }
    },
    [dispatch, exp]
  );

  return { fetchExperience, addExperienceCall, deleteExperienceAction, loading };
};

export default useExperienceAPI;
