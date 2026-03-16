import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  deleteProjects,
  editProjects,
  setProjects,
} from "../store/slices/projects/projectSlice";
import StatusCode from "../utils/StatusCode";
import api from "../services/api";
import toast from "react-hot-toast";
const useProjectAPI = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { projects } = useSelector((state) => state.projects);

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
    async (data, isEdit = false, slug = "", id = "", rawFiles = []) => {
      try {
        setLoading(true);

        const payload = data;
        if (isEdit) {
          const data = new FormData();

          // 1. Add text fields
          Object.keys(payload).forEach((key) => {
            if (key !== "screenshots" && key !== "tech" && key !== "features") {
              const value = payload[key];

              // ONLY append if the value exists and isn't null
              // This prevents sending "null" strings to your backend
              if (value !== null && value !== undefined) {
                data.append(key, value);
              }
            }
          });

          const cleanTech = payload.tech.flat();
          cleanTech.forEach((item) => {
            if (item && item.trim() !== "") {
              data.append("tech", item);
            }
          });

          payload.features.forEach((item) => {
            if (item.trim() !== "") {
              data.append("features", item);
            }
          });

          rawFiles.forEach((file) => {
            data.append("screenshots", file);
          });
          console.log(JSON.stringify(data));
          const result = await api.put(`/projects/${slug}`, data);
          console.log(result);
          toast.success("Project updated successfully!!");
          setLoading(false);
          dispatch(editProjects({ id: result.data.data._id, updatedData: result.data.data }));
          return result?.data;
        } else {
          console.log(payload);
          setLoading(true);
          const data = new FormData();

          Object.keys(payload).forEach((key) => {
            if (key !== "screenshots" && key !== "tech" && key !== "features") {
              data.append(key, payload[key]);
            }
          });

          // form.tech.forEach((t) => data.append("tech", t));
          // form.features.forEach((f) => data.append("features", f));
          payload.tech.forEach((item) => {
            if (item.trim() !== "") {
              data.append("tech", item);
            }
          });

          payload.features.forEach((item) => {
            if (item.trim() !== "") {
              data.append("features", item);
            }
          });

          rawFiles.forEach((file) => {
            data.append("screenshots", file);
          });

          const result = await api.post("/projects", data);
          console.log(result);
          toast.success("Project created successfully!!");
          setLoading(false);
          dispatch(addProject(result.data.data));
          return result?.data;
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
          dispatch(deleteProjects(slug));
          toast.success("Experience deleted successfully!");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Error updating project");
        return null;
      }
    },
    [dispatch, projects]
  );

  return { fetchProjects, deleteProjectAction, addProjectCall, deleteProjectAction, loading };
};

export default useProjectAPI;
