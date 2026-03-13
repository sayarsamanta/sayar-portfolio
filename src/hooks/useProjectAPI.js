import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject, editProjects, setProjects } from "../store/slices/projects/projectSlice";
import StatusCode from "../utils/StatusCode";
import api from "../services/api";
import toast from "react-hot-toast";
const useProjectAPI = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { projects } = useSelector((state) => state.projects);
  // Fetch user data
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/projects");

      const projectData = res?.data?.data;
      if (projectData) {
        dispatch(setProjects(projectData));
      }

      setLoading(false);
      return projectData;
    } catch (err) {
      console.error(err.message);
      setLoading(false);

      const status = err.response?.status;
      const message = err.response?.data?.message;

      alert(StatusCode.getMessage(status, message));
      return null;
    }
  }, [dispatch, projects]);

  const addProjectCall = useCallback(
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
          const res = await api.put(`/projects/${slug}`, payload, {
            headers: { "Content-Type": "application/json" },
          });
          if (res) {
            const newExp = res?.data?.data;
            dispatch(
              editProjects({
                id: newExp._id,
                updatedData: newExp,
              })
            );
            toast.success("Project section updated successfully!");

            setLoading(false);
            return res.data;
          }
        } else {
          const res = await api.post("/projects", payload, {
            headers: { "Content-Type": "application/json" },
          });
          if (res) {
            const newExp = res?.data?.data;
            dispatch(addProject(newExp));
            toast.success("Project section created successfully!");

            setLoading(false);
            return res.data;
          }
        }
      } catch (err) {
        setLoading(false);
        toast.error(err.response?.data?.message || "Error updating project");
        return null;
      }
    },
    [dispatch, projects]
  );

  const deleteProjectAction = useCallback(
    async (slug) => {
      try {
        const res = await api.delete(`/projects/${slug}`, {
          headers: { "Content-Type": "application/json" },
        });
        if (res) {
          dispatch(deleteExperience(slug));
          toast.success("Experience deleted successfully!");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Error updating project");
        return null;
      }
    },
    [dispatch, projects]
  );

  return { fetchProjects, deleteProjectAction, addProjectCall, deleteProjectAction };
};

export default useProjectAPI;
