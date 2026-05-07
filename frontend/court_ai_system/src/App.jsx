import { useState } from "react";

import UploadPage from "./pages/UploadPage";
import DashboardPage from "./pages/DashboardPage";

function App() {

  const [page, setPage] = useState("upload");

  return (
    <div>

      <nav className="p-3 bg-dark">

        <button
          className="btn btn-light me-3"
          onClick={() => setPage("upload")}
        >
          Upload
        </button>

        <button
          className="btn btn-warning"
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </button>

      </nav>

      {page === "upload" && <UploadPage />}

      {page === "dashboard" && <DashboardPage />}

    </div>
  );
}

export default App;