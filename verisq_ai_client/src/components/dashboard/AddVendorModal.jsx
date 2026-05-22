import { useState } from "react";
import API_BASE_URL from "../../services/api";

function AddVendorModal({ isOpen, onClose, companyDomain, onRequireEmail }) {
    const [vendorName, setVendorName] = useState("");
    const [vendorDomain, setVendorDomain] = useState("");
    const [vendorEmail, setVendorEmail] = useState("");
    const [dataClassification, setDataClassification] = useState("");
    const [sendQuestionnaire, setSendQuestionnaire] = useState(false);

    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    // validation Function (as per document rules)
    const validate = () => {
        let newErrors = {};

        // vendor Name
        if (!vendorName.trim()) {
            newErrors.vendorName = "Vendor Name is required";
        } else if (vendorName.trim().length < 2) {
            newErrors.vendorName = "Vendor Name must be at least 2 characters";
        }

        // vendor Domain
        const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

        if (!vendorDomain.trim()) {
            newErrors.vendorDomain = "Vendor Domain is required";
        } else if (!domainRegex.test(vendorDomain.trim())) {
            newErrors.vendorDomain = "Enter valid domain (e.g., company.com)";
        } else if (
            companyDomain &&
            vendorDomain.trim().toLowerCase() === companyDomain.toLowerCase()
        ) {
            newErrors.vendorDomain = "Vendor domain must be different from your company domain";
        }

        //   Data Classification
        if (!dataClassification) {
            newErrors.dataClassification = "Please select data classification";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        // HANDLE EMAIL MODAL FLOW
        if (sendQuestionnaire && !vendorEmail.trim()) {
            onRequireEmail({
                name: vendorName,
                domain: vendorDomain,
                sendQuestionnaire: true
            });
            return;
        }

        try {
            await fetch(`${API_BASE_URL}/api/dashboard/add-vendor`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: vendorName,
                    domain: vendorDomain,
                    email: vendorEmail,
                    sendQuestionnaire: sendQuestionnaire
                })
            }).then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text);
                }
            });

            // reset
            setVendorName("");
            setVendorDomain("");
            setVendorEmail("");
            setDataClassification("");
            setSendQuestionnaire(false);

            onClose(true); // pass success flag

        } catch (err) {
            alert(err.message);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="avm-overlay" onClick={handleOverlayClick}>
            <div className="avm-container">

                {/* Header */}
                <div className="avm-header">
                    <h2 className="avm-title">Add New Vendor</h2>
                    <button className="avm-close-btn" onClick={onClose}>&#x2715;</button>
                </div>

                {/* Body */}
                <div className="avm-body">

                    <div className="avm-field">
                        <label className="avm-label">Vendor Name <span className="avm-asterisk">*</span></label>
                        <input
                            type="text"
                            className="avm-input"
                            placeholder="e.g., Acme Solutions"
                            value={vendorName}
                            onChange={(e) => {
                                setVendorName(e.target.value);
                                setErrors({ ...errors, vendorName: "" });
                            }}
                        />
                        {errors.vendorName && (
                            <p style={{ color: "red", marginTop: "4px" }}>
                                {errors.vendorName}
                            </p>
                        )}
                    </div>

                    <div className="avm-field">
                        <label className="avm-label">Vendor Domain <span className="avm-asterisk">*</span></label>
                        <input
                            type="text"
                            className="avm-input"
                            placeholder="e.g., acmesolutions.com"
                            value={vendorDomain}
                            onChange={(e) => {
                                setVendorDomain(e.target.value);
                                setErrors({ ...errors, vendorDomain: "" });
                            }}
                        />
                        <p className="avm-hint">Must be different from your company domain</p>
                        {errors.vendorDomain && (
                            <p style={{ color: "red", marginTop: "4px" }}>
                                {errors.vendorDomain}
                            </p>
                        )}
                    </div>

                    {/* <div className="avm-field">
                        <label className="avm-label">
                            Vendor Email <span className="avm-asterisk">*</span>
                        </label>

                        <input
                            type="email"
                            className="avm-input"
                            placeholder="e.g., vendor@example.com"
                            value={vendorEmail}
                            onChange={(e) => setVendorEmail(e.target.value)}
                        />
                    </div> */}

                    <div className="avm-field">
                        <label className="avm-label">
                            What data do you share with this vendor?
                            <span className="avm-asterisk">*</span>
                        </label>

                        <select
                            className="avm-select"
                            value={dataClassification}
                            onChange={(e) => {
                                setDataClassification(e.target.value);
                                setErrors({ ...errors, dataClassification: "" });
                            }}
                        >
                            <option value="">Select data classification...</option>
                            <option value="none">No Data</option>
                            <option value="public">Public</option>
                            <option value="internal">Internal Use</option>
                            <option value="confidential">Restricted - Confidential</option>
                            <option value="pii">PII - Personally Identifiable Information</option>
                            <option value="spi">SPI - Sensitive Personal Information</option>
                            <option value="pci">PCI - Financial & Payment Information</option>
                            <option value="phi">PHI - Protected Health Information (HIPAA)</option>
                        </select>

                        {errors.dataClassification && (
                            <p style={{ color: "red", marginTop: "4px" }}>
                                {errors.dataClassification}
                            </p>
                        )}
                    </div>

                    <div className="avm-checkbox-group">
                        <input
                            type="checkbox"
                            id="sendQuestionnaire"
                            className="avm-checkbox"
                            checked={sendQuestionnaire}
                            onChange={(e) => setSendQuestionnaire(e.target.checked)}
                        />
                        <div className="avm-checkbox-text">
                            <label htmlFor="sendQuestionnaire" className="avm-checkbox-label">
                                Also send a security questionnaire
                            </label>
                            <p className="avm-hint">Vendor will receive an email to complete assessment</p>
                        </div>
                    </div>

                    <div className="avm-spacer"></div>

                </div>

                <div className="avm-divider"></div>

                <div className="avm-footer">
                    <button className="avm-cancel-btn" onClick={onClose}>Cancel</button>
                    <button className="avm-submit-btn" onClick={handleSubmit}>+ Add Vendor</button>
                </div>

            </div>
        </div>
    );
}

export default AddVendorModal;