import "../../styles/EmailModal.css";
import { useEffect, useState } from "react";
import { getAssessmentTemplates } from "../../services/api";

function EmailModal({
  isOpen,
  onClose,
  onSubmit,
  initialEmail = ""
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState("");

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const data = await getAssessmentTemplates();
        setTemplates(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTemplates();
  }, []);

  useEffect(() => {

    if (isOpen) {

      setEmail(initialEmail);

    }

  }, [isOpen, initialEmail]);

  if (!isOpen) return null;

  const validate = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!templateId) {
      alert("Please select a template.");
      return;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      email,
      templateId: Number(templateId),
      message
    });

    setEmail("");
    setMessage("");
    setErrors({});

    onClose(); // ✅ CLOSE MODAL AFTER SUBMIT
  };

  return (
    <div className="EmailModal-overlay">

      <div className="EmailModal-box">

        {/* HEADER */}
        <div className="EmailModal-header">
          <h3>Send Vendor Questionnaire</h3>
          <button className="EmailModal-close" onClick={onClose}>✖</button>
        </div>

        {/* DESCRIPTION */}
        <p className="EmailModal-desc">
          Send a security assessment questionnaire to your vendor. The vendor will
          receive an email with a link to complete their assessment.
        </p>

        {/* EMAIL INPUT */}
        <div className="EmailModal-group">
          <label>Vendor Contact Email</label>
          <input
            type="email"
            placeholder="security@vendor.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
            className={`EmailModal-input ${errors.email ? "error" : ""}`}
          />
          {errors.email && (
            <span className="EmailModal-error">{errors.email}</span>
          )}
        </div>

        {/* template select */}
        <div className="form-group">
          <label>Assessment Template</label>

          <select
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            required
          >
            <option value="">
              Select Template
            </option>

            {templates.map(template => (
              <option
                key={template.id}
                value={template.id}
              >
                {template.name}
              </option>
            ))}
          </select>
        </div>

        {/* MESSAGE */}
        <div className="EmailModal-group">
          <label>Message (optional)</label>
          <textarea
            placeholder="Hi, we'd like to request your security assessment as part of our vendor risk management process."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="EmailModal-textarea"
          />
        </div>

        {/* ACTIONS */}
        <div className="EmailModal-actions">

          <button
            className="EmailModal-btn cancel"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="EmailModal-btn primary"
            onClick={handleSubmit}
          >
            Send Questionnaire
          </button>

        </div>

      </div>
    </div>
  );
}

export default EmailModal;