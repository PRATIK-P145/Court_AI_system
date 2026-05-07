import axios from "axios";

const API = "http://127.0.0.1:8000";

export const uploadPDF = async (formData) => {
  return await axios.post(`${API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};