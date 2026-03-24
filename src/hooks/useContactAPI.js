import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import api from "../services/api";


const useContactAPI = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  
  const sendEmail = useCallback(
    async (name, email, message) => {
      try {
        setLoading(true);

        const res = await api.post("/contact", { name, email, message });
        if (res.status === 200) {
          toast.success("Form submitted successfully!!");
          return res.data;
        }
      } catch (err) {
        setLoading(false);

        toast.error(err.response?.data?.message || "Error submitting form");
        return null;
      }
    },
    [dispatch]
  );

  return { sendEmail, loading };
};

export default useContactAPI;
