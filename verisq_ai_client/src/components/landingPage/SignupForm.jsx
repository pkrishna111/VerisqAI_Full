
import { useState } from "react";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

function SignupForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        companyName: "",
        companyDomain: "",
        mobilePhone: ""
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        companyName: "",
        companyDomain: "",
        mobilePhone: ""
    });

    const validateField = (name, value, currentFormData) => {
        const publicDomains = [
            // "gmail.com",
            "yahoo.com",
            "hotmail.com",
            "outlook.com",
            "live.com",
            "aol.com",
            "icloud.com"
        ];
    
        let error = "";
    
        switch (name) {
    
            case "fullName":
                if (
                    value.trim() &&
                    value.trim().split(" ").length < 2
                ) {
                    error = "Please enter your full name.";
                }
                break;
    
            case "email":
                if (!value.trim()) {
                    error = "Work email is required.";
                } else {
                    const emailDomain =
                        value.split("@")[1]?.toLowerCase();
    
                    if (
                        emailDomain &&
                        publicDomains.includes(emailDomain)
                    ) {
                        error =
                            "Public email domains are not allowed.";
                    }
                }
                break;
    
            case "companyName":
                if (!value.trim()) {
                    error = "Company name is required.";
                }
                break;
    
            case "companyDomain":
                if (!value.trim()) {
                    error = "Company domain is required.";
                } else {
                    const emailDomain =
                        currentFormData.email
                            .split("@")[1]
                            ?.toLowerCase();
    
                    const companyDomain =
                        value
                            .replace("https://", "")
                            .replace("http://", "")
                            .replace("www.", "")
                            .toLowerCase()
                            .trim();
    
                    if (
                        emailDomain &&
                        emailDomain !== companyDomain
                    ) {
                        error =
                            "Company domain must match work email.";
                    }
                }
                break;
    
            case "mobilePhone":
                if (
                    value.length > 0 &&
                    !/^\d{10}$/.test(value)
                ) {
                    error =
                        "Mobile number must be exactly 10 digits.";
                }
                break;
    
            default:
                break;
        }
    
        return error;
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
    
        const updatedFormData = {
            ...formData,
            [name]: value
        };
    
        setFormData(updatedFormData);
    
        setErrors({
            ...errors,
            [name]: validateField(
                name,
                value,
                updatedFormData
            )
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        const publicDomains = [
            // "gmail.com",
            "yahoo.com",
            "hotmail.com",
            "outlook.com",
            "live.com",
            "aol.com",
            "icloud.com"
        ];

        const newErrors = {
            fullName: "",
            email: "",
            companyName: "",
            companyDomain: "",
            mobilePhone: ""
        };

        try {

            const emailDomain =
                formData.email
                    .split("@")[1]
                    ?.toLowerCase();

            const companyDomain =
                formData.companyDomain
                    .replace("https://", "")
                    .replace("http://", "")
                    .replace("www.", "")
                    .toLowerCase()
                    .trim();

            if (
                formData.fullName
                    .trim()
                    .split(" ")
                    .length < 2
            ) {
                newErrors.fullName =
                    "Please enter your full name.";
            }

            if (!formData.email.trim()) {

                newErrors.email =
                    "Work email is required.";

            }
            else if (
                publicDomains.includes(
                    emailDomain
                )
            ) {

                newErrors.email =
                    "Public email domains are not allowed.";

            }

            if (!formData.companyName.trim()) {

                newErrors.companyName =
                    "Company name is required.";

            }

            if (!formData.companyDomain.trim()) {

                newErrors.companyDomain =
                    "Company domain is required.";

            }
            else if (
                emailDomain &&
                emailDomain !== companyDomain
            ) {

                newErrors.companyDomain =
                    "Company domain must match work email.";

            }
            const phoneRegex = /^\d{10}$/;

            if (
                !phoneRegex.test(
                    formData.mobilePhone
                )
            ) {

                newErrors.mobilePhone =
                    "Mobile number must be exactly 10 digits.";

            }

            if (
                Object.values(newErrors)
                    .some(error => error)
            ) {

                setErrors(newErrors);

                setLoading(false);

                return;
            }

            const result =
                await registerUser(
                    formData
                );

            console.log(result);

            setMessage(
                "Registration successful. Check your email."
            );

            navigate(
                `/request-received?email=${formData.email}`
            );

        }
        catch (error) {

            setMessage(
                error.message ||
                "Registration failed."
            );

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

                        <label className="form-label">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            className={`form-input ${errors.fullName ? "error" : ""}`}
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                        {errors.fullName && (
                            <p className="field-error">
                                {errors.fullName}
                            </p>
                        )}

                    </div>

                    <div className="form-group">

                        <label className="form-label">
                            Work Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className={`form-input ${errors.email ? "error" : ""}`}
                            placeholder=" Work Email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        {errors.email && (
                            <p className="field-error">
                                {errors.email}
                            </p>
                        )}

                    </div>

                    <div className="form-group">

                        <label className="form-label">
                            Company Name
                        </label>

                        <input
                            type="text"
                            name="companyName"
                            className={`form-input ${errors.companyName ? "error" : ""}`}
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleChange}
                        />

                        {errors.companyName && (
                            <p className="field-error">
                                {errors.companyName}
                            </p>
                        )}

                    </div>

                    <div className="form-group">

                        <label className="form-label">
                            Company Domain
                        </label>

                        <input
                            type="text"
                            name="companyDomain"
                            className={`form-input ${errors.companyDomain ? "error" : ""}`}
                            placeholder=" Company Domain"
                            value={formData.companyDomain}
                            onChange={handleChange}
                        />

                        {errors.companyDomain && (
                            <p className="field-error">
                                {errors.companyDomain}
                            </p>
                        )}

                    </div>

                    <div className="form-group">

                        <label className="form-label">
                            Mobile Phone
                        </label>

                        <input
                            type="text"
                            name="mobilePhone"
                            className={`form-input ${errors.mobilePhone ? "error" : ""
                                }`}
                            placeholder="Mobile Phone"
                            value={formData.mobilePhone}
                            inputMode="numeric"
                            maxLength={10}
                            onChange={(e) => {

                                const value =
                                    e.target.value.replace(/\D/g, "");
                            
                                if (value.length <= 10) {
                            
                                    const updatedFormData = {
                                        ...formData,
                                        mobilePhone: value
                                    };
                            
                                    setFormData(updatedFormData);
                            
                                    setErrors({
                                        ...errors,
                                        mobilePhone: validateField(
                                            "mobilePhone",
                                            value,
                                            updatedFormData
                                        )
                                    });
                                }
                            }}
                        />

                        {errors.mobilePhone && (
                            <p className="field-error">
                                {errors.mobilePhone}
                            </p>
                        )}

                    </div>

                    <button
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Processing..."
                            : "Start My Free Trial"}

                        <ArrowRight size={20} />
                    </button>

                    <div className="login-link-wrapper">

                        <span>
                            Already have access?
                        </span>

                        <button
                            type="button"
                            className="login-link"
                            onClick={() =>
                                navigate("/send-code")
                            }
                        >
                            Login
                        </button>

                    </div>

                </form>

                {message && (

                    <p
                        style={{
                            marginTop: "12px",
                            textAlign: "center",
                            color:
                                message.includes("successful")
                                    ? "#10b981"
                                    : "#ef4444",
                            fontWeight: 600
                        }}
                    >
                        {message}
                    </p>

                )}

                <p className="form-disclaimer">

                    By signing up, you agree to our Terms of Service.

                    <br />

                    No public email domains
                    (Gmail, Yahoo, etc.) allowed.

                </p>

                <div className="trust-badge">

                    <ShieldCheck size={18} />

                    <span>
                        Your vendor data stays yours. Always.
                    </span>

                </div>

            </div>

        </div>
    );
}

export default SignupForm;
