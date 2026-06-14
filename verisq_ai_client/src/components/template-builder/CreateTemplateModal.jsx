import { useState, useEffect } from "react";

import { X, Plus } from "lucide-react";

import {
  createAssessmentTemplate,
  updateAssessmentTemplate,
} from "../../services/api";

function CreateTemplateModal({
  open,
  onClose,
  onCreated,
  mode = "create",
  editingTemplate = null,
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    version: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    version: 1,
    isActive: true,
  });

  useEffect(() => {
    if (mode === "edit" && editingTemplate) {
      setFormData({
        name: editingTemplate.name || "",

        description: editingTemplate.description || "",

        version: editingTemplate.version || 1,

        isActive: editingTemplate.isActive,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        version: 1,
        isActive: true,
      });
    }
    setErrors({
      name: "",
      description: "",
      version: ""
    });
  }, [mode, editingTemplate, open]);

  if (!open) return null;
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Template name is required";
        } else if (value.trim().length < 3) {
          error = "Template name must be at least 3 characters";
        }

        break;

      case "version":
        if (!value || Number(value) < 1) {
          error = "Version must be greater than 0";
        }

        break;

      default:
        break;
    }

    return error;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async () => {

    const newErrors = {
      name: validateField(
        "name",
        formData.name
      ),
      version: validateField(
        "version",
        formData.version
      )
    };
  
    setErrors(newErrors);
  
    if (
      Object.values(newErrors)
        .some(error => error)
    ) {
      return;
    }
  
    try {
  
      setLoading(true);
  
      if (
        mode === "edit"
      ) {
  
        await updateAssessmentTemplate(
          editingTemplate.id,
          {
            name: formData.name,
            description:
              formData.description,
            version:
              Number(
                formData.version
              ),
            isActive:
              formData.isActive
          }
        );
  
      } else {
  
        await createAssessmentTemplate({
          name: formData.name,
          description:
            formData.description,
          version:
            Number(
              formData.version
            ),
          isActive: true
        });
  
      }
  
      onCreated();
  
      onClose();
  
      setFormData({
        name: "",
        description: "",
        version: 1,
        isActive: true
      });
  
      setErrors({
        name: "",
        description: "",
        version: ""
      });
  
    } catch (err) {
  
      console.error(err);
  
      alert(
        err.message ||
        "Failed to create template."
      );
  
    } finally {
  
      setLoading(false);
    }
  };

  // const newErrors = {
  //   name: validateField("name", formData.name),
  //   version: validateField("version", formData.version),
  // };

  return (
    <div className="avm-overlay">
      <div className="avm-container">
        {/* HEADER */}
        <div className="avm-header">
          <h2 className="avm-title">
            {mode === "edit"
              ? "Edit Assessment Template"
              : "Create Assessment Template"}
          </h2>

          <button className="avm-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="avm-header-divider"></div>

        {/* BODY */}
        <div className="avm-body">
          <div className="avm-field">
            <label className="avm-label">Template Name</label>

            <input
              type="text"
              name="name"
              className="avm-input"
              placeholder="Template Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="avm-error">{errors.name}</p>}
          </div>

          <div className="avm-field">
            <label className="avm-label">Description</label>

            <textarea
              name="description"
              className="avm-input"
              placeholder="Description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="avm-field">
            <label className="avm-label">Version</label>

            <input
              type="number"
              min="1"
              name="version"
              className="avm-input"
              placeholder="v1"
              value={formData.version}
              onChange={handleChange}
            />
            {errors.version && <p className="avm-error">{errors.version}</p>}
          </div>
        </div>

        <div className="avm-footer-divider"></div>

        {/* FOOTER */}
        <div className="avm-footer">
          <button className="avm-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="avm-submit-btn"
            onClick={handleSubmit}
            disabled={loading || !!errors.name || !!errors.version}
          >
            <Plus size={16} />

            {loading
              ? mode === "edit"
                ? "Updating..."
                : "Creating..."
              : mode === "edit"
              ? "Update Template"
              : "Create Template"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTemplateModal;
