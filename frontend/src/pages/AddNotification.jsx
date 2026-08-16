import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNotification.css";
import disaster from "../assets/disaster.jpg";

function AddNotification() {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .post("http://127.0.0.1:8000/notifications/", {
        message,
        recipient,
        user_id: Number(userId),
      })
      .then(() => {
        alert("Notification Added Successfully");
        navigate("/notifications");
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to add notification");
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
        <h1>Add New Notification</h1>
        <p>Send a notification for relief coordination</p>

        <form onSubmit={handleSubmit}>
          <label>Message</label>
          <textarea
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <label>Recipient</label>
          <input
            type="text"
            placeholder="Enter recipient name/role"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />

          <label>User ID</label>
          <input
            type="number"
            placeholder="Enter user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Send Notification</button>
        </form>
      </div>
    </div>
  );
}

export default AddNotification;