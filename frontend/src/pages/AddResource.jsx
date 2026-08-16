import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddResource.css";
import disaster from "../assets/disaster.jpg";

function AddResource() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("https://disaster-relief-management-system-bcio.onrender.com/resources/", {
        name,
        quantity,
        unit,
        location,
      })
      .then(() => {
        alert("Resource Added Successfully");
        navigate("/resources");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to add resource");
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
        <h1>Add New Resource</h1>
        <p>Enter resource details for relief management</p>

        <form onSubmit={handleSubmit}>
          <label>Resource Name</label>
          <input
            type="text"
            placeholder="e.g. Rice bags, First Aid kits"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Quantity</label>
          <input
            type="text"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <label>Unit</label>
          <input
            type="text"
            placeholder="e.g. kg, boxes, litres, pieces"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          />

          <label>Location</label>
          <input
            type="text"
            placeholder="Enter storage/camp location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Add Resource</button>
        </form>
      </div>
    </div>
  );
}

export default AddResource;