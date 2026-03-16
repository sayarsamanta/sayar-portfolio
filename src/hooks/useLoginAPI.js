import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";

/**
 * Custom hook for About API
 * Handles fetching user and saving/updating About section
 */
const useLoginAPI = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Fetch user data
  const authUser = useCallback(
    async (email, password) => {
      try {
        setLoading(true);

        const res = await api.get("/user");

        setLoading(false);
        return userData;
      } catch (err) {
        setLoading(false);

        const status = err.response?.status;
        const message = err.response?.data?.message;

        alert(StatusCode.getMessage(status, message));
        return null;
      }
    },
    [dispatch]
  );

  return { authUser, loading };
};

export default useLoginAPI;
