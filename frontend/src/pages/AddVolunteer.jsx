import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddVolunteer.css";
import disaster from "../assets/disaster.jpg";

function AddVolunteer() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [skill, setSkill] = useState("");
  const [availability, setAvailability] = useState("available");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("https://disaster-relief-management-system-bcio.onrender.com/volunteers/", {
        name,
        phone,
        email,
        skill,
        availability,
      })
      .then(() => {
        alert("Volunteer Added Successfully");
        navigate("/volunteers");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to add volunteer");
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
        <h1>Add New Volunteer</h1>
        <p>Enter volunteer details for relief management</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" placeholder="Enter volunteer name" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Phone Number</label>
          <input type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          <label>Email</label>
          <input type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Skill / Expertise</label>
          <input type="text" placeholder="e.g. First Aid, Cooking, Driving" value={skill} onChange={(e) => setSkill(e.target.value)} required />

          <label>Availability</label>
          <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Add Volunteer</button>
        </form>
      </div>
    </div>
  );
}

export default AddVolunteer;