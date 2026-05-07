import { useState } from "react";
import { uploadPDF } from "../services/api";
import VerificationPage from "./VerificationPage";

function UploadPage() {

  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) {
      alert("Select PDF");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {

      setLoading(true);

      const res = await uploadPDF(formData);

      setData(res.data);

    } catch (err) {
      console.error(err);
      alert("Upload failed");

    } finally {
      setLoading(false);
    }
  };

  if (data) {
    return <VerificationPage data={data} />;
  }

  return (
    <div className="container mt-5">

      <h2>Court Judgment Upload</h2>

      <input
        type="file"
        className="form-control mt-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="btn btn-primary mt-3"
        onClick={handleUpload}
      >
        {loading ? "Processing..." : "Upload PDF"}
      </button>

    </div>
  );
}

export default UploadPage;