import  { useState, useEffect } from "react";

const EmployeeTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/task/my-tasks", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching tasks" + err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      {loading ? <p>Loading tasks...</p> : error ? <p>{error}</p> : null}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeTaskList;
