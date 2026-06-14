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
  
        const data =
          await getAssessmentTemplates();
  
        const activeTemplates =
          data.filter(
            template => template.isActive
          );
  
        setTemplates(activeTemplates);
  
        // Auto select if only one template
        if (activeTemplates.length === 1) {
  
          setTemplateId(
            activeTemplates[0].id.toString()
          );
  
          setErrors(prev => ({
            ...prev,
            templateId: ""
          }));
  
        }
  
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

    // Email Validation

    if (!email.trim()) {

      newErrors.email =
        "Vendor email is required";

    }
    else {

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {

        newErrors.email =
          "Please enter a valid email address";

      }

    }

    // Template Validation

    if (!templateId) {

      newErrors.templateId =
        "Please select an assessment template";

    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );

  };

  const validateField = (name, value) => {

    let error = "";
  
    switch (name) {
  
      case "email":
  
        if (!value.trim()) {
  
          error = "Vendor email is required";
  
        } else {
  
          const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
          if (!emailRegex.test(value)) {
  
            error =
              "Please enter a valid email address";
  
          }
  
        }
  
        break;
  
      case "templateId":
  
        if (!value) {
  
          error =
            "Please select an assessment template";
  
        }
  
        break;
  
      default:
        break;
    }
  
    return error;
  };

  const handleSubmit = () => {

    if (!validate()) return;

    onSubmit({
      email,
      templateId: Number(templateId)
    });

    setEmail("");
    setTemplateId("");
    setErrors({});

    onClose();

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
            placeholder="Vendor Contact Email"
            value={email}
            onChange={(e) => {

              const value = e.target.value;
            
              setEmail(value);
            
              setErrors(prev => ({
                ...prev,
                email: validateField(
                  "email",
                  value
                )
              }));
            
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
            onChange={(e) => {

              const value = e.target.value;
            
              setTemplateId(value);
            
              setErrors(prev => ({
                ...prev,
                templateId: validateField(
                  "templateId",
                  value
                )
              }));
            
            }}
            className={`EmailModal-select ${errors.templateId ? "error" : ""
              }`}
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

          {errors.templateId && (

            <span className="EmailModal-error">
              {errors.templateId}
            </span>

          )}
        </div>

        {/* MESSAGE
        <div className="EmailModal-group">
          <label>Message (optional)</label>
          <textarea
            placeholder="Hi, we'd like to request your security assessment as part of our vendor risk management process."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="EmailModal-textarea"
          />
        </div> */}

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