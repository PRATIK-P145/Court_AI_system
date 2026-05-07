import { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage() {

  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/dashboard"
      );

      setCases(res.data.cases);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">

      <h2>Government Action Dashboard</h2>

      {cases.length === 0 ? (
        <p>No approved cases yet</p>
      ) : (
        cases.map((item, index) => {

          const plan = item.action_plan;

          return (
            <div
              key={index}
              className="card mt-4 p-4"
            >

              <h4>
                {item.rag_answers["What is the case title?"]}
              </h4>

              <p>
                <strong>Recommended Action:</strong>
                {" "}
                {plan.recommended_action}
              </p>

              <p>
                <strong>Priority:</strong>
                {" "}
                {plan.priority}
              </p>

              <p>
                <strong>Deadline:</strong>
                {" "}
                {plan.deadline}
              </p>

              <p>
                <strong>Department:</strong>
                {" "}
                {plan.department}
              </p>

              <p>
                <strong>Reason:</strong>
                {" "}
                {plan.reason}
              </p>

              <hr />

              <h5>Tasks</h5>

              <ul>
                {plan.tasks?.map((task, idx) => (
                  <li key={idx}>
                    {task.task}
                    {" — "}
                    {task.owner}
                    {" — "}
                    {task.timeline}
                  </li>
                ))}
              </ul>

            </div>
          );
        })
      )}

    </div>
  );
}

export default DashboardPage;