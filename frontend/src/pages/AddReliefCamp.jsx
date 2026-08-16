import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddReliefCamp.css";
import disaster from "../assets/disaster.jpg";

function AddReliefCamp() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("https://disaster-relief-management-system-bcio.onrender.com/relief-camps/", {
        name,
        location,
        capacity: Number(capacity),
      })
      .then(() => {
        alert("Relief Camp Added Successfully");
        navigate("/relief-camps");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to add relief camp");
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
        <h1>Add New Relief Camp</h1>
        <p>Enter relief camp details</p>

        <form onSubmit={handleSubmit}>
          <label>Camp Name</label>
          <input
            type="text"
            placeholder="Enter camp name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

          <label>Capacity</label>
          <input
            type="number"
            placeholder="Enter capacity (number of people)"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Add Relief Camp</button>
        </form>
      </div>
    </div>
  );
}

export default AddReliefCamp;