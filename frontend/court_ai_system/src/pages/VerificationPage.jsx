import { useState } from "react";
import axios from "axios";

function VerificationPage({ data }) {

  const [approved, setApproved] = useState(false);

  const ragAnswers = data.rag_answers;
  const actionPlan = data.action_plan;

  const [editedPlan, setEditedPlan] = useState(actionPlan);

  const handleChange = (field, value) => {
    setEditedPlan({
      ...editedPlan,
      [field]: value
    });
  };

  const handleApprove = async () => {

    try {

      await axios.post(
        "http://127.0.0.1:8000/verify",
        {
          rag_answers: ragAnswers,
          action_plan: editedPlan
        }
      );

      setApproved(true);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">

      <h2>Human Verification Panel</h2>

      {/* Extracted Information */}
      <div className="card mt-4 p-3">

        <h4>Extracted Information</h4>

        {Object.entries(ragAnswers).map(([key, value]) => (
          <div key={key} className="mb-3">

            <label className="fw-bold">{key}</label>

            <textarea
              className="form-control"
              rows="2"
              value={value}
              readOnly
            />

          </div>
        ))}

      </div>

      {/* Action Plan */}
      <div className="card mt-4 p-3">

        <h4>AI Action Plan</h4>

        <div className="mb-3">
          <label className="fw-bold">Recommended Action</label>

          <input
            className="form-control"
            value={editedPlan.recommended_action}
            onChange={(e) =>
              handleChange("recommended_action", e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Priority</label>

          <input
            className="form-control"
            value={editedPlan.priority}
            onChange={(e) =>
              handleChange("priority", e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Deadline</label>

          <input
            className="form-control"
            value={editedPlan.deadline}
            onChange={(e) =>
              handleChange("deadline", e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Department</label>

          <input
            className="form-control"
            value={editedPlan.department}
            onChange={(e) =>
              handleChange("department", e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label className="fw-bold">Reason</label>

          <textarea
            rows="3"
            className="form-control"
            value={editedPlan.reason}
            onChange={(e) =>
              handleChange("reason", e.target.value)
            }
          />
        </div>

      </div>

      {/* Approve Buttons */}
      <div className="mt-4">

        <button
          className="btn btn-success me-3"
          onClick={handleApprove}
        >
          Approve
        </button>

        <button className="btn btn-danger">
          Reject
        </button>

      </div>

      {approved && (
        <div className="alert alert-success mt-4">
          Case Approved Successfully
        </div>
      )}

    </div>
  );
}

export default VerificationPage;