import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddDisaster.css";
import disaster from "../assets/disaster.jpg";

function AddDisaster() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://127.0.0.1:8000/disasters/", {
        title,
        location,
        status,
        description,
      })
      .then(() => {
        alert("Disaster Report Submitted");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to submit disaster report");
      });
  };

  return (
    <div className="add-page">
      {/* Left Side Image */}
      <div className="image-section">
        <img src={disaster} alt="Disaster" className="disaster-image" />

        <div className="image-text">
          <h1>Disaster Relief</h1>
          <h2>Management System</h2>
          <p>Together we can rebuild a better tomorrow.</p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="add-card">
        <h1>Add New Disaster Report</h1>
        <p>Enter disaster details for relief management</p>

        <form onSubmit={handleSubmit}>
          <label>Disaster Title</label>

          <input
            type="text"
            placeholder="Enter disaster title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Location</label>

          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Status</label>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>

          <label>Description</label>

          <textarea
            placeholder="Enter disaster description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Submit Report</button>
        </form>
      </div>
    </div>
  );
}

export default AddDisaster;
