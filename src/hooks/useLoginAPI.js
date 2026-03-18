import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import toast from "react-hot-toast";

const useLoginAPI = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const authUser = useCallback(
    async (form) => {
      try {
        setLoading(true);

        const res = await api.post("auth/login", form);
        if (res) {
          localStorage.setItem("adminToken", res.data.token);
          toast.success("Logged in successfully!");
          setSuccess(true);
        }
        setLoading(false);

        return res.data;
      } catch (err) {
        setLoading(false);
        const message = err.response?.data?.message;

        toast.error(message || "Error logging in");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return { authUser, loading, success };
};

export default useLoginAPI;
