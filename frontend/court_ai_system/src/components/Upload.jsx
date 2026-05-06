import { useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Upload successful!");
      console.log(res.data);

    } catch (err) {
      console.error(err);
      setMessage("Upload failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Court Judgment PDF</h2>

      <input 
        type="file" 
        className="form-control mt-3"
        onChange={handleFileChange}
      />

      <button 
        className="btn btn-primary mt-3"
        onClick={handleUpload}
      >
        Upload
      </button>

      <p className="mt-3">{message}</p>
    </div>
  );
}

export default Upload;