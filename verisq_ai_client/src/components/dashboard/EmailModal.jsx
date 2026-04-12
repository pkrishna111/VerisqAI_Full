import { useState } from "react";

function EmailModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    onSubmit(email);
    setEmail("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className="modal-header">
          <h3>Enter Vendor Email</h3>
          <button onClick={onClose}>✖</button>
        </div>

        <div style={{ marginTop: "15px" }}>
          <input
            type="email"
            placeholder="vendor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button onClick={onClose} style={{ marginRight: "10px" }}>
            Cancel
          </button>

          <button onClick={handleSubmit}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default EmailModal;