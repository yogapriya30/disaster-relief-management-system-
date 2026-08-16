import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddTask.css";
import disaster from "../assets/disaster.jpg";

function AddTask() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [assignedTo, setAssignedTo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://127.0.0.1:8000/tasks/", {
        title,
        status,
        assigned_to: Number(assignedTo),
      })
      .then(() => {
        alert("Task Added Successfully");
        navigate("/tasks");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to add task");
      });
  };

  return (
    <div className="add-page">
      <div className="image-section">
        <img src={disaster} alt="Disaster" className="disaster-image" />
        <div className="image-text">
          <h1>Disaster Relief</h1>
          <h2>Management System</h2>
          <p>Together we can rebuild a better tomorrow.</p>
        </div>
      </div>

      <div className="add-card">
        <h1>Add New Task</h1>
        <p>Enter task details for relief management</p>

        <form onSubmit={handleSubmit}>
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <label>Assigned To (Volunteer ID)</label>
          <input
            type="number"
            placeholder="Enter volunteer ID"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;