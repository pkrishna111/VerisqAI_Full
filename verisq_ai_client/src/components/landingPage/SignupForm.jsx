import { useState } from "react";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { registerUser } from "../../services/api";

function SignupForm() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        companyName: "",
        companyDomain: "",
        mobilePhone: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const result = await registerUser(formData);

            setMessage("Registration successful. Check your email.");

            console.log(result);

        } catch (error) {
            setMessage(error.message);
        }

        setLoading(false);
    };

    return (
        <div className="form-section" id="form">
            <div className="form-card">

                <div className="form-header">
                    <div className="form-badge">
                        <Zap size={14} />
                        NO CREDIT CARD REQUIRED
                    </div>

                    <h2 className="form-title">
                        Try Verisq AI Free
                    </h2>

                    <p className="form-subtitle">
                        Get LiveThreat scores for 5 vendors
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            className="form-input"
                            placeholder="Jane Smith"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Work Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="jane@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            className="form-input"
                            placeholder="Acme Corp"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Company Domain</label>
                        <input
                            type="text"
                            name="companyDomain"
                            className="form-input"
                            placeholder="acme.com"
                            value={formData.companyDomain}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Mobile Phone</label>
                        <input
                            type="text"
                            name="mobilePhone"
                            className="form-input"
                            placeholder="+1 (555) 123-4567"
                            value={formData.mobilePhone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn-submit" disabled={loading}>
                        {loading ? "Processing..." : "Start My Free Trial"}
                        <ArrowRight size={20} />
                    </button>

                </form>

                {message && (
                    <p style={{ marginTop: "10px", color: "green" }}>
                        {message}
                    </p>
                )}

                <p className="form-disclaimer">
                    By signing up, you agree to our Terms of Service.<br />
                    No public email domains (Gmail, Yahoo, etc.) allowed.
                </p>

                <div className="trust-badge">
                    <ShieldCheck size={18} />
                    <span>Your vendor data stays yours. Always.</span>
                </div>

            </div>
        </div>
    );
}

export default SignupForm;